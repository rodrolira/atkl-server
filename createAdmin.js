import pkg from 'bcryptjs'
const { genSaltSync, hashSync } = pkg
const salt = genSaltSync(10)
const password = process.env.ADMIN_PASSWORD || 'default_password';
const hashedPassword = hashSync(password, salt);

console.log(hashedPassword)
