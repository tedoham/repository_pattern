import Database, { ITodo } from "./Database"

export class TodoRepository {
    private readonly _db = Database

    async save(title: ITodo['title']) {
        return this._db.create({
            title,
            completed: false,
        })
    }
}

export class TodoService {
    constructor(private readonly _todoRepo: TodoRepository) {}

    async createTodo(title: ITodo['title']) {
        if (title.length < 6) {
            throw new Error('Title has to have at least 6 characters.')
        }

        return this._todoRepo.save(title)
    }
}

class TodosController {
    constructor(private readonly _todoService: TodoService) {}

    async store(requestData: string) {
        return this._todoService.createTodo(requestData)
    }
}

const repository = new TodoRepository()
const service = new TodoService(repository)
const controller = new TodosController(service)
controller.store("Yooooo everything is working...").then(console.log)