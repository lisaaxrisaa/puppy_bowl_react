import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const NewPlayerForm = () => {
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const navigate = useNavigate();

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   console.log(`New player added: ${name}, Position: ${position}`);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!name.trim() || !position.trim()) {
      alert('Name and position are required!');
      return;
    }
    const newPlayer = { id: Date.now(), name, position, isNew: true };
    navigate('/', { state: { newPlayer } });
    setName('');
    setPosition('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Name:
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>
      <br />
      <label>
        Position:
        <input
          type="text"
          value={position}
          onChange={(e) => setPosition(e.target.value)}
        />
      </label>
      <br />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default NewPlayerForm;
