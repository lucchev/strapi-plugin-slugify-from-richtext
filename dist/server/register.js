"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: 'slug-from-richtext',
        plugin: 'slugify-from-richtext',
        type: 'string',
    });
};
