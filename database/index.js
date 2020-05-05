const fs = require('fs');

class DB {
  path = './database/data'

  findAll() {
    return JSON.parse(fs.readFileSync(`${this.path}/todos.json`))
  }

  findOne(id) {
    return this.findAll().find((obj) => obj.id === parseInt(id))
  }

  createOne(task) {
    const todos = this.findAll()

    const todo = {
      id: this.findAll()[this.findAll().length - 1].id + 1,
      task: task,
      done: false
    }
    todos.push(todo)

    fs.writeFileSync(`${this.path}/todos.json`, JSON.stringify(todos))

    return todo
  }

  editOne(id, task = undefined, done = undefined) {
    const todo = this.findOne(id)
    const todos = this.findAll()

    todo.task = task ?? todo.task
    todo.done = done ?? todo.done

    for (const key in todos) {
      if (todos[key].id === todo.id) {
        todos[key] = todo
      }
    }

    fs.writeFileSync(`${this.path}/todos.json`, JSON.stringify(todos))

    return todo
  }

  deleteOne(id) {
    const todos = this.findAll().filter((todo) => todo.id !== parseInt(id))
    fs.writeFileSync(`${this.path}/todos.json`, JSON.stringify(todos))
  }
}

module.exports.DB = DB