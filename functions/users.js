const faker = require("faker");
function getUsers(number = 109) {
  let users = [];
  for (let i = 0; i < number; i++) {
    users.push(getUser(i));
  }
  console.log(users);
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
  const { size = 29 } = event.queryStringParameters;
  return {
    statusCode: 200,
    headers,
    body: JSON.stringify(getUsers(size)),
  };
};
