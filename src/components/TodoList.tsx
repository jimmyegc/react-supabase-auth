import { useEffect, useState } from "react"
import { Todo } from "./Todo.type"
import { TodoItem } from "./TodoItem"
import { checkTodo, createTodo, deleteTodo, getTodos } from "../services/todo.service"
import { TodoModal } from "./TodoModal"

export const TodoList = () => {
  const [todos, setTodos] = useState<Todo[]>([])
  const [isModalOpen, setModalOpen] = useState<boolean>(false)

  const fetchTodos = async () => {
    const allTodos = await getTodos()
    setTodos(allTodos)
  }

  useEffect(() => {
    fetchTodos()
  }, [])

  const handleDeleteTodo = async (id: number) => {
    await deleteTodo(id)
    await fetchTodos()
  }

  const handleTodoCreate = async (title: string, description: string) => {
    await createTodo(title, description)
    await fetchTodos()
    setModalOpen(false)
  }

  const handleModalClose = () => {
    setModalOpen(false)
  }

  const handleNewTask = () => setModalOpen(true)

  const handleChecked = async (id: number, newValue: boolean) => {
    await checkTodo(id, newValue)
    await fetchTodos()
  }

  return (
    <>
      <div className="flex flex-col gap-3">
        {todos?.map((todo) => (
          <TodoItem
            id={todo.id}
            key={todo.id}
            title={todo.title}
            description={todo.description}
            isCompleted={todo.isCompleted}
            onDelete={handleDeleteTodo}
            onCheck={handleChecked}
          />
        ))}
        {/* {loading && <span>Loading...</span>} */}
        <button
          className="p-2 bg-blue-600 rounded-md border border-blue-300 hover:bg-blue-400 active:scale-95 text-white"
          onClick={handleNewTask}
        >Nueva Tarea</button>
      </div>
      {isModalOpen && <TodoModal
        onClose={handleModalClose}
        onCreate={handleTodoCreate} />}

    </>

  )
}