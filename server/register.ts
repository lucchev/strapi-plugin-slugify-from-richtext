import { Strapi } from '@strapi/strapi';

export default ({ strapi }: { strapi: Strapi }) => {
  strapi.customFields.register({
    name: 'slug',
    plugin: 'slugify-from-richtext',
    type: 'string',
  });
};
