import pkg from 'bcryptjs'
const { genSaltSync, hashSync } = pkg
const salt = genSaltSync(10)
const hashedPassword = hashSync('atkl', salt)

console.log(hashedPassword)
