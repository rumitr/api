const faker = require("faker");
function getUsers(page, size) {
  let users = [];
  for (let i = (page - 1) * size; i < page * size; i++) {
    users.push(getUser(i));
  }
  return users;
}
function getUser(index) {
  let user = {};
  user.id = index + 1;
  user.name = faker.name.firstName() + " " + faker.name.lastName();
  user.jobTitle = faker.name.jobTitle();
  user.prefix = faker.name.prefix();
  user.suffix = faker.name.suffix();
  user.jobArea = faker.name.jobArea();
  user.gender = faker.random.arrayElement(["male", "female"]);

  user.phone = faker.phone.phoneNumber();
  return user;
}
const headers = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE",
};
exports.handler = async function (event, context) {
  const { page = 1, size = 11 } = event.queryStringParameters;
  const total = Math.ceil(10000 / size);
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify({ page, total, size, data: getUsers(page, size) }),
  };
};
