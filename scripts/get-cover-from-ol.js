#! /bin/node --experimental-fetch
/* eslint-disable no-undef */
const LITTERARUM_API = "http://localhost:3000/api/v1/books";
const TOKEN_API =
  "2d2084688dd7c91302101d5e8887aca2e38b2ac9af499e03b5120499739bc7a80c3e37a1104383eb1d3368ad5370942c63b5994be28a6c36bb1f258512147fa0";
const OPEN_LIBRARY_SEARCH_URL = "https://openlibrary.org/search.json";
const OPEN_LIBRARY_COVER_URL = "https://covers.openlibrary.org";

async function getBooks() {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${TOKEN_API}`);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  const result = await fetch(LITTERARUM_API, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log("error", error));

  return result;
}

async function updateBookCover(bookId, newCoverUrl) {
  const myHeaders = new Headers();
  myHeaders.append("Authorization", `Bearer ${TOKEN_API}`);
  myHeaders.append("Content-Type", "application/json");

  const requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify({ coverUrl: newCoverUrl }),
  };

  const result = await fetch(`${LITTERARUM_API}/${bookId}`, requestOptions)
    .then((response) => response.json())
    .then((result) => result.data)
    .catch((error) => console.log("error", error));

  return result;
}

const normalize = (str) => {
  const cleanText = str.replaceAll(" ", "+").trim().toLowerCase();
  return cleanText;
};

async function getOpenLibraryFirstElement(titleBook) {
  const url = `${OPEN_LIBRARY_SEARCH_URL}?q=${normalize(titleBook)}`;
  const result = await fetch(url)
    .then((result) => result.json())
    .then((result) => result)
    .catch((err) => {
      console.error(err);
    });

  const { numFound, docs } = result;
  if (numFound === 0) return;
  return docs[1];
}

async function getOpenLibraryCover(coverId) {
  const url = `${OPEN_LIBRARY_COVER_URL}/b/id/${coverId}.json?default=false`;
  const result = await fetch(url)
    .then((result) => result.json())
    .then((result) => result)
    .catch((err) => {
      console.error(err);
    });

  const { source_url } = result;
  return source_url;
}

//** Main */
(async function () {
  const books = await getBooks();
  for (const book of books) {
    const titleBook = book.title;
    const bookId = book._id;
    const docs = await getOpenLibraryFirstElement(titleBook);
    const coverId = docs?.cover_i;
    if (coverId) {
      const coverUrl = await getOpenLibraryCover(coverId);
      if (coverUrl) {
        console.log({ titleBook, coverUrl });
        await updateBookCover(bookId, coverUrl);
      }
    }
  }
})();
