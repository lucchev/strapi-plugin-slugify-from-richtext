export const slugify = (text:string = "", wordJoiner: string = "-", wordMaxNb = 4, removeUpperCase?: boolean, removeAccents?: boolean, removeSpecialCharacters?: boolean) => {
  // Replace non-word characters with {wordJoiner} and convert to lowercase
  let slug = text;
  
  if (removeUpperCase) 
    slug = slug.toLowerCase();

  if (removeAccents) 
    slug = slug
    .replace(/[àâä]/g, 'a')
    .replace(/[éèëë]/g, 'e')
    .replace(/[îï]/g, 'i')
    .replace(/[ôö]/g, 'o')
    .replace(/[ùüû]/g, 'u')
    .replace(/[ç]/g, 'c')
    .replace(/[ÀÂÄ]/g, 'A')
    .replace(/[ÉÈÊË]/g, 'E')
    .replace(/[ÎÏ]/g, 'I')
    .replace(/[ÔÖ]/g, 'O')
    .replace(/[ÛÙÜ]/g, 'U')
    .replace(/[Ç]/g, 'C')
  

  if (removeSpecialCharacters)
    slug = slug.replace(/[,;._*$&'"`-]/g, ' ');

  slug = slug
  .replace(/[^a-z0-9À-ÿ ]+/g, '')
  .replace(/\s+/g, ' ') || '';
  // Split the slug into words and keep only the first {wordMaxNb}
  let words = slug.split(' ');
  const len = words.length;
  words = words.slice(0, wordMaxNb);
  // Join the words back together with {wordJoiner} and return the result
  const res = words.join(wordJoiner);
  return len > wordMaxNb ? `${res}...`: res;
}
