#! /bin/node --experimental-fetch
/* eslint-disable no-undef */

const url = "https://litterarum.onrender.com/api/v1/files";

const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
const normalize = (str) => {
  const cleanText = str.replaceAll("-", " ").trim();
  return capitalize(cleanText);
};

fetch(url)
  .then((result) => result.json())
  .then((result) => {
    const { message, data } = result;
    console.log(message);
    const batch = [];
    for (book of data) {
      batch.push({
        title: normalize(book.basename),
        basename: book.basename,
        coverUrl: "",
        author: {
          name: "[Authorize]",
          alias: "",
          biography: "[]",
          photoUrl: "",
        },
        tags: [
          {
            tag: "tag",
          },
        ],
      });
    }
    console.log(JSON.stringify(batch));
  })
  .catch((err) => {
    console.error(err);
  });
