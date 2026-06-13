import { useState } from 'react'
import './App.css'

function App() {
  const [todos, setTodos] = useState([])
  const [text, setText] = useState('')
  const [filter, setFilter] = useState('all')
  const addTodo = (event) => {
    event.preventDefault()
    const trimmed = text.trim()
    if (!trimmed) return
    setTodos((current) => [
      ...current,
      { id: crypto.randomUUID(), text: trimmed, done: false },
    ])
    setText('')
  }
  
  const toggleTodo = (id) => {
    setTodos((current) =>
      current.map((todo) =>
        todo.id === id ? { ...todo, done: !todo.done } : todo,
      ),
    )
  }

  const deleteTodo = (id) => {
    setTodos((current) => current.filter((todo) => todo.id !== id))
  }

  const clearCompleted = () => {
    setTodos((current) => current.filter((todo) => !todo.done))
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === 'active') return !todo.done
    if (filter === 'completed') return todo.done
    return true
  })

  return (
    <main className="app-shell">
      <section className="todo-card">
        <header>
          <h1>Simple Todo List</h1>
          <p>Use React state to add, finish, and remove tasks.</p>
        </header>

        <form className="todo-form" onSubmit={addTodo}>
          <input
            value={text}
            onChange={(event) => setText(event.target.value)}
            placeholder="Type a task and press Add"
            aria-label="Add new todo"
          />
          <button type="submit">Add</button>
        </form>

        <div className="filters">
          {['all', 'active', 'completed'].map((value) => (
            <button
              key={value}
              type="button"
              className={filter === value ? 'active' : ''}
              onClick={() => setFilter(value)}
            >
              {value.charAt(0).toUpperCase() + value.slice(1)}
            </button>
          ))}
        </div>

        <ul className="todo-list">
          {filteredTodos.length === 0 ? (
            <li className="empty-state">No tasks yet. Add one above.</li>
          ) : (
            filteredTodos.map((todo) => (
              <li key={todo.id} className={todo.done ? 'done' : ''}>
                <label>
                  <input
                    type="checkbox"
                    checked={todo.done}
                    onChange={() => toggleTodo(todo.id)}
                  />
                  <span>{todo.text}</span>
                </label>
                <button
                  type="button"
                  className="remove"
                  onClick={() => deleteTodo(todo.id)}
                >
                  Remove
                </button>
              </li>
            ))
          )}
        </ul>

        <div className="footer-actions">
          <span>{todos.length} task{todos.length === 1 ? '' : 's'}</span>
          <button
            type="button"
            className="clear"
            onClick={clearCompleted}
            disabled={!todos.some((todo) => todo.done)}
          >
            Clear completed
          </button>
        </div>
      </section>
    </main>
  )
}

export default App
