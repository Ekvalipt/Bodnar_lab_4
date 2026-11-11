import './App.css';
import TodoList from './components/TodoList'; // Зверни увагу на регістр
import UpdateList from './components/UpdateList';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [tasks, updateTasks] = useState([]);
  const apiUrl = 'https://jsonplaceholder.typicode.com/todos';

  // Отримання даних (GET)[cite: 144]
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const res = await axios.get(`${apiUrl}?_limit=5`); // Беремо лише перші 5 для зручності
        updateTasks(res.data);
      } catch (err) {
        console.error('Помилка завантаження завдань:', err);
      }
    };
    fetchTasks();
  }, []);

  // Додавання (POST)[cite: 145]
  const addTask = async (newTaskData) => {
    try {
      const res = await axios.post(apiUrl, newTaskData);
      // JSONPlaceholder повертає id=201 для всіх нових, створюємо фейковий унікальний id для коректного відображення
      const createdTask = { ...res.data, id: Date.now() }; 
      updateTasks((prev) => [...prev, createdTask]);
    } catch (err) {
      console.error('Помилка додавання:', err);
    }
  };

  // Видалення (DELETE)[cite: 142]
  const removeTask = async (idToRemove) => {
    try {
      await axios.delete(`${apiUrl}/${idToRemove}`);
      updateTasks((prev) => prev.filter(task => task.id !== idToRemove));
    } catch (err) {
      console.error('Помилка видалення:', err);
    }
  };

  // Редагування (PUT)[cite: 143, 145]
  const editTask = async (idToEdit, updatedTaskData) => {
     try {
       // Для фейкових id (які ми додали локально) API поверне 404, тому робимо перевірку
       if (idToEdit <= 200) { 
         await axios.put(`${apiUrl}/${idToEdit}`, updatedTaskData);
       }
       updateTasks((prev) => prev.map(task => task.id === idToEdit ? updatedTaskData : task));
     } catch (err) {
       console.error('Помилка редагування:', err);
     }
  }

  return (
    <div className='container'>
      <h2>Мій список завдань</h2>
      <UpdateList onAddTask={addTask} />
      <TodoList tasks={tasks} onDelete={removeTask} onEdit={editTask} />
    </div>
  );
}

export default App;