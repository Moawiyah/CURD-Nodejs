const data = require("./data");

function getTodos() {
    return data;
}

function getTodo(id) {
    return data.filter((element) => element.id == id);
}

function createTodo(reqData) {
    data.push(JSON.parse(reqData))
    return data;
}

function updateTodo(id, reqData) {
    const { title, description, completed } = JSON.parse(reqData)

    if (title != null) {
        data[id - 1].title = title;
    }
    if (description != null) {
        data[id - 1].description = description;
    }
    if (completed != null) {
        data[id - 1].completed = completed;
    }

    return data;
}

function deleteTodo(id) {
    return data.filter((element) => element.id !== id);
}

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
}