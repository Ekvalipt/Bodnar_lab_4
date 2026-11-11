import React, { useState } from 'react';

function UpdateList({ onAddTask }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) {
      onAddTask({ title: value.trim(), completed: false }); // Формат для API
    }
    setValue('');
  };

  return (
    <form className="update-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Нове завдання"
      />
      <button type="submit">Додати</button>
    </form>
  );
}

export default UpdateList;