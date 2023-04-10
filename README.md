# Strapi plugin strapi-plugin-slugify-from-richtext

Adding a custom field of type string, which is populated from another field of type 'richText'

## Plugin registration
```javascript
export default {
  // ...
  'strapi-plugin-slugify-from-richtext': {
    enabled: true,
    resolve: './src/plugins/strapi-plugin-slugify-from-richtext'
  },
  // ...
}
```

## Using the plugin

#### Example in the content-type of a collection :
``` json
  "myDescription": {
    "type": "richtext"
  },
  "myGenerateTitle": {
    "type": "customField",
    "customField": "plugin::strapi-plugin-slugify-from-richtext.slug-from-richtext",
    "relatedTo": "myDescription",
    "wordJoiner": "-",
    "wordMaxNb": 4
  }
```
