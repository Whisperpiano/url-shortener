export function capitalizeFirstLetter(string: string) {
  const firstLetter = string.charAt(0);
  const restOfWord = string.slice(1);
  return firstLetter.toUpperCase() + restOfWord.toLowerCase();
}
