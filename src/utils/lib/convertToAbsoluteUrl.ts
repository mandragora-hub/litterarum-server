import isAbsoluteURL from "./isAbsoluteUrl";

/**
 * Convert relative path URL to absolute path URL using JavaScript
 * @param url relative URL
 */
const convertToAbsoluteUrl = (url: string) => {
  if (isAbsoluteURL(url)) return url;

  const newUrl = new URL(url, "https://localhost:3000/");
  const result = newUrl.toString();
  return result;
};

export default convertToAbsoluteUrl;
