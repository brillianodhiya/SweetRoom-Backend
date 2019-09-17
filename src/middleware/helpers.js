// crypto = require('crypto')
// module.exports = {
//     response: (res, result, status, err) => {
//         let resultPrint = {}
//         resultPrint.err = err || null
//         resultPrint.status_req = status || 200
//         resultPrint.result = result

//         return res.status(resultPrint.status_req).json(resultPrint)
//     },
//     generateSalt: (length) => {
//         return crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, length)
//     },
//     setPassword: (password, salt) => {
//         let hash = crypto.createHmac('sha512', salt)
//         hash.update(password)
//         let value = hash.digest('hex')
//         return {
//             salt: salt,
//             password: value
//         }
//     }
// }