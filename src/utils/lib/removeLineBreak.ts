//Credits to -> https://stackoverflow.com/questions/10805125/how-to-remove-all-line-breaks-from-a-string

// Use this function to remove line breaks from a string
export function removeLineBreak(str: string) { return str.replace(/\s+/g, ' ').trim(); }