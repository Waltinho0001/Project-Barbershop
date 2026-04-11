const bcryptjs = require("bcryptjs");
const {SALT_HASH_PASSWORD} = require("../../config/config.js");

async function hashPassword(password){
  const saltRounds = Number(SALT_HASH_PASSWORD || 10);
  
  const hashedPassword = await bycrptjs.hash(password, saltRounds);
  
  return hashedPassword;
}

module.exports = hashPassword;