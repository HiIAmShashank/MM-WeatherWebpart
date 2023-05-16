//function to capitalize first letter of every word in a string
export function capitalizeAllFirstLetters(text:string): string{
    return text.replace(/(^\w{1})|(\s+\w{1})/g, letter => letter.toUpperCase());
}
