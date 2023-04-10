import { prefixPluginTranslations } from '@strapi/helper-plugin';

import pluginPkg from '../../package.json';
import pluginId from './pluginId';
import getTrad from './utils/getTrad';
import SlugFromRichTextIcon from './components/SlugFromRichText/SlugFromRichTextIcon';
import Initializer from './components/Initializer';

const formatMessage = (message: any) => message;

const customFieldToRegister = {
  name: 'slug',
  pluginId: pluginId,
  type: 'string',
  icon: SlugFromRichTextIcon,
  intlLabel: {
      id: getTrad("field.slug.label"),
      defaultMessage: 'Slug from richtext',
    },
  intlDescription: {
    id: getTrad("field.slug.description"),
    defaultMessage: 'This slug is generated automatically from the richtext field',
  },
  components: {
    Input: async () => import(/* webpackChunkName: "slug-component" */ './components/SlugFromRichText'),
  },
  options: {
  }
};

const plugin = {
  id: pluginId,
  initializer: Initializer,
  isReady: false,
  name: pluginId,
};

export default {
  register(app: any) {
    app.customFields.register(customFieldToRegister);
    app.registerPlugin(plugin);
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
