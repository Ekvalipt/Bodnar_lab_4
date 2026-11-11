import React, { useState } from 'react';

function TodoItem({ task, onDelete, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(task.title);

  const handleSave = () => {
    onEdit(task.id, { ...task, title: editValue });
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      {isEditing ? (
        <>
          <input
            type="text"
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            style={{ flex: 1 }}
          />
          <button className="btn-save" onClick={handleSave}>Зберегти</button>
          <button onClick={() => setIsEditing(false)}>Скасувати</button>
        </>
      ) : (
        <>
          <span>{task.title}</span>
          <button className="btn-edit" onClick={() => setIsEditing(true)}>Редагувати</button>
          <button className="btn-delete" onClick={() => onDelete(task.id)}>Видалити</button>
        </>
      )}
    </li>
  );
}

function TodoList({ tasks = [], onDelete, onEdit }) {
  return (
    <div>
      <ul className='task-list'>
        {tasks.map((task) => (
          <TodoItem 
            key={task.id} // Використовуємо унікальний id[cite: 93]
            task={task} 
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
    </div>
  );
}

export default TodoList;