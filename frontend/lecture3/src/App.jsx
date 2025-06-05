import { useState } from 'react';
import './App.css';

export default function App() {
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState({
    title: '',
    description: ''
  });

  const addTodo = () => {
    if (task.title.trim() !== '') {
      setTodos([...todos, {
        title: task.title,
        description: task.description,
        completed: false,
        id: Date.now()
      }]);
      setTask({ title: '', description: '' });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setTask(prev => ({ ...prev, [name]: value }));
  };

  const toggleComplete = (id) => {
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div className="app">
      <h1> To-Do List</h1>
      <div className="todo-form">
        <div className="form-group">
          <input
            type="text"
            name="title"
            value={task.title}
            onChange={handleInputChange}
            placeholder="Task title"
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
            required
          />
        </div>
        <div className="form-group">
          <textarea
            name="description"
            value={task.description}
            onChange={handleInputChange}
            placeholder="Task description (optional)"
            rows="2"
          />
        </div>
        <button onClick={addTodo}>Add Task</button>
      </div>
      <ul className="todo-list">
        {todos.map((todo) => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <div className="todo-content" onClick={() => toggleComplete(todo.id)}>
              <h3>{todo.title}</h3>
              {todo.description && <p>{todo.description}</p>}
            </div>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}