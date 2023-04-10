import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';
import SlugFromRichTextIcon from './components/SlugFromRichText/SlugFromRichTextIcon';

const name = pluginPkg.strapi.name;

export default {
  register(app: any) {
    app.customFields.register({
      name: 'slug-from-richtext',
      pluginId: pluginId,
      type: 'string',
      icon: SlugFromRichTextIcon,
      intlLabel: {
        id: getTrad(`${pluginId}.fields.slug-from-richtext.label`),
        defaultMessage: 'Slug from richtext',
      },
      intlDescription: {
        id: getTrad(`${pluginId}.field.slug-from-richtext.description`),
        defaultMessage: 'This slug is generated automatically from the richtext field',
      },
      components: {
        Input: async () =>
          import(/* webpackChunkName: "slug-from-richtext-component" */ './components/SlugFromRichText'),
      },
      options: {
      },
      visible: false
    });
  },

  bootstrap(app: any) {},

  async registerTrads(app: any) {
    const { locales } = app;

    const importedTrads = await Promise.all(
      (locales as any[]).map((locale) => {
        return import(`./translations/${locale}.json`)
          .then(({ default: data }) => {
            return {
              data: prefixPluginTranslations(data, pluginId),
              locale,
            };
          })
          .catch(() => {
            return {
              data: {},
              locale,
            };
          });
      })
    );

    return Promise.resolve(importedTrads);
  },
};
