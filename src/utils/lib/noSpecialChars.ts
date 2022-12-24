//Credits to -> https://codingbeautydev.com/blog/javascript-remove-special-characters-from-string/

// Use this function to remove special characters. Useful in logger
export function noSpecialChars(str: string) { return str.replace(/[^\w ]/g, '') }