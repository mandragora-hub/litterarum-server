db = connect("mongodb://localhost/TodoApp");

const rand = function () {
  return Math.random().toString(36).substring(2); // remove `0.`
};

const token = function () {
  return rand() + rand(); // to make it longer
};

db.users.insertOne({
  name: "ADMIN",
  token: token(),
});
