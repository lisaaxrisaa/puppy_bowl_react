import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../../index';
import axios from 'axios';
// import { useLocation } from 'react-router-dom';

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');
  // const location = useLocation();

  useEffect(() => {
    const getPlayers = async () => {
      const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];

      const apiPlayers = await fetchPlayers();

      const mergedPlayers = [
        ...savedPlayers,
        ...apiPlayers.filter(
          (apiPlayer) =>
            !savedPlayers.some((localPlayer) => localPlayer.id === apiPlayer.id)
        ),
      ];

      setPlayers(mergedPlayers);
      setFilteredPlayers(mergedPlayers);
      localStorage.setItem('players', JSON.stringify(mergedPlayers));
    };

    getPlayers();
  }, []);

  const handleSearchChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);

    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(text)
    );
    setFilteredPlayers(filtered);
  };

  const handleDeletePlayer = async (id) => {
    const playerToDelete = players.find((player) => player.id === id);

    if (!playerToDelete?.isNew) {
      alert('You can only delete players that you added.');
      return;
    }

    try {
      await axios.delete(
        `https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players/${id}`
      );

      const updatedPlayers = players.filter((player) => player.id !== id);
      setPlayers(updatedPlayers);
      setFilteredPlayers(updatedPlayers);
      localStorage.setItem('players', JSON.stringify(updatedPlayers));

      alert('Player deleted successfully.');
    } catch (error) {
      console.error(`Failed to delete player with id ${id}:`, error);
      alert('Failed to delete the player. Please try again.');
    }
  };

  return (
    <>
      <div className="container">
        <h1>Welcome to the Puppy Bowl!</h1>

        <input
          type="text"
          placeholder="Search players by name..."
          value={searchText}
          onChange={handleSearchChange}
          style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
        />

        <h2>All Puppy Players</h2>

        {Array.isArray(filteredPlayers) && filteredPlayers.length === 0 ? (
          <p>No players found.</p>
        ) : (
          <div className="players-grid">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="player-card">
                <img
                  src={player.imageUrl}
                  alt={player.name}
                  className="player-image"
                />
                <div className="player-details">
                  <h4>{player.name}</h4>
                  <p>Breed: {player.breed || 'Unknown'}</p>
                  <div className="button">
                    <button onClick={() => navigate(`/players/${player.id}`)}>
                      View Details
                    </button>
                    <button
                      onClick={() => handleDeletePlayer(player.id)}
                      disabled={!player.isNew}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllPlayers;
