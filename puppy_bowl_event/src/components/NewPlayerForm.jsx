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
    const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
    const updatedPlayers = [newPlayer, ...savedPlayers];
    console.log('Updated Players:', updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers)); // Save to localStorage
    navigate('/'); // Navigate back to home
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
