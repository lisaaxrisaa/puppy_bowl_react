// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';

// const NewPlayerForm = () => {
//   const [name, setName] = useState('');
//   const [position, setPosition] = useState('');
//   const navigate = useNavigate();

//   const handleSubmit = (event) => {
//     event.preventDefault();

//     if (!name.trim() || !position.trim()) {
//       alert('Name and position are required!');
//       return;
//     }

//     const newPlayer = { id: Date.now(), name, position, isNew: true };
//     const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
//     const updatedPlayers = [newPlayer, ...savedPlayers];
//     // console.log('Updated Players:', updatedPlayers);
//     localStorage.setItem('players', JSON.stringify(updatedPlayers)); // Save to localStorage
//     navigate('/'); // Navigate back to home
//   };

//   return (
//     <form onSubmit={handleSubmit} className="single-player">
//       <label>
//         Name:
//         <input
//           type="text"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//         />
//       </label>
//       <br />
//       <label>
//         Position:
//         <input
//           type="text"
//           value={position}
//           onChange={(e) => setPosition(e.target.value)}
//         />
//       </label>
//       <br />
//       <button type="submit">Add Player</button>
//     </form>
//   );
// };

// export default NewPlayerForm;

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPlayer } from '../../index';

const NewPlayerForm = () => {
  const [name, setName] = useState('');
  const [breed, setBreed] = useState('');
  const [status, setStatus] = useState('bench');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!name.trim() || !breed.trim()) {
      alert('Name and breed are required!');
      return;
    }

    const newPlayer = { name, breed, status };

    try {
      const createdPlayer = await createPlayer(newPlayer);

      if (createdPlayer) {
        const newPlayerWithFlag = { ...createdPlayer, isNew: true };

        alert(`Player "${createdPlayer.name}" created successfully!`);
        setName('');
        setBreed('');
        setStatus('bench');

        const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
        const updatedPlayers = [newPlayerWithFlag, ...savedPlayers];
        localStorage.setItem('players', JSON.stringify(updatedPlayers));

        navigate('/');
      } else {
        alert('Failed to create player. Please try again.');
      }
    } catch (error) {
      console.error('Error creating player:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="single-player">
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
        Breed:
        <input
          type="text"
          value={breed}
          onChange={(e) => setBreed(e.target.value)}
        />
      </label>
      <br />
      <label>
        Status:
        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="bench">Bench</option>
          <option value="field">Field</option>
        </select>
      </label>
      <br />
      <button type="submit">Add Player</button>
    </form>
  );
};

export default NewPlayerForm;
