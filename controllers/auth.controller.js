const { getPostData } = require('../utils')
const { checkUser } = require('../modals/authModals')

async function getUser(req, res) {
    try {
        const userInfo = await getPostData(req);
        let start = userInfo.indexOf("=");
        let end = userInfo.indexOf("&");
        const email = userInfo.substring(start + 1, end);
        const pass = userInfo.split("=")[2];
        const check = await checkUser(email, pass)

        // res.writeHead(200, { 'Content-Type': 'application/json' })
        if (check) {
            res.writeHead(301, { Location: "http://localhost:8080/api/products" });
            res.end();
        }
        else {
            res.writeHead(301, { Location: "/" });
            res.end();
        }
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    getUser
}