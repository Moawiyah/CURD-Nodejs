const http = require('http');
const { getTodos, getTodo, createTodo, updateTodo, deleteTodo } = require('./controller');

const server = http.createServer((req, res) => {

    if (req.url == '/api/todo' && req.method == "GET") {
        const todos = getTodos();
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todos))
    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'GET') {
        const id = req.url.split("/")[3];
        todo = getTodo(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(todo))
    } else if (req.url == '/api/todo' && req.method == "POST") {

        let bodyData = "";
        req.on("data", (chunk) => {
            bodyData += chunk.toString();
        })

        req.on('end', () => {
            const reqBody = createTodo(bodyData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(reqBody))
        })
    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'PUT') {
        const id = req.url.split("/")[3];
        let bodyData = "";

        req.on("data", (chunk) => {
            bodyData += chunk.toString();
        })

        req.on('end', () => {
            const upData = updateTodo(id, bodyData);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(upData))
        })
    } else if (req.url.match(/\/api\/todo\/([0-9]+)/) && req.method === 'DELETE') {
        const id = req.url.split("/")[3];
        deleteTodo(id);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: `product ${id} removed` }))
    } else {
        res.writeHead(404, { 'Content-Type': 'application/json' });
        res.end("Page Not Found :)")
    }


});

server.listen(8080, () => { console.log("Server is running") });