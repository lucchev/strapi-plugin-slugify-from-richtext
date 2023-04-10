"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ({ strapi }) => {
    strapi.customFields.register({
        name: 'slug',
        plugin: 'slugify-from-richtext',
        type: 'string',
    });
};
