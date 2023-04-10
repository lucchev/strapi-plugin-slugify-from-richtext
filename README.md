# Strapi plugin strapi-plugin-slugify-from-richtext

Adding a custom field of type string, which is populated from another field of type 'richText'

## Enregistrement du plugin
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

## Utilisation du plugin

#### Exemple dans le content-type d'une collection :
``` json
  "myDescription": {
    "type": "richtext"
  },
  "myGenerateTitle": {
    "type": "customField",
    "customField": "plugin::strapi-plugin-slugify-from-richtext.slug-from-richtext",
    "relatedTo": "myText",
    "wordJoiner": "-",
    "wordMaxNb": 4
  }
```
