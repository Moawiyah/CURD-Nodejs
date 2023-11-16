let users = require('../auth/auth.json');
const { v4: uuidv4 } = require('uuid'); // to initialize random id
const { writeDataToFile } = require('../utils')


function checkUser(email,pass) {
    return new Promise((resolve, reject) => {
        let user = users.find((element) => element.email == email && element.password== pass);
        if (user) {
            console.log("right information")
            resolve(true);
        } else {
            console.log("wrong information")
            resolve(false);
        }
    })
}


module.exports = {
    checkUser
}