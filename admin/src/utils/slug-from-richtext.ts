export const slugify = (text:string, wordJoiner: string = "-", wordMaxNb = 4) => {
  // Replace non-word characters with {wordJoiner} and convert to lowercase
  const slug = text.toLowerCase().replace(/[,;.]/g, ' ').replace(/[^a-z0-9 ]+/g, '').replace(/\s+/g, ' ');
  // Split the slug into words and keep only the first {wordMaxNb}
  const words = slug.split(' ').slice(0, wordMaxNb);
  // Join the words back together with dashes and return the result
  return words.join(wordJoiner);
}