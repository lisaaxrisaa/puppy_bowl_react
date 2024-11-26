import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../../index';
import { useLocation } from 'react-router-dom';

const AllPlayers = () => {
  const [players, setPlayers] = useState([]);
  const navigate = useNavigate();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchText, setSearchText] = useState('');
  const location = useLocation();

  useEffect(() => {
    const getPlayers = async () => {
      const playersData = await fetchPlayers();
      // console.log('Fetched players:', playersData);
      setPlayers(playersData);
      setFilteredPlayers(playersData);
    };

    getPlayers();
  }, []);

  useEffect(() => {
    if (location.state?.newPlayer) {
      const newPlayer = location.state.newPlayer;
      setPlayers((prevPlayers) => [...prevPlayers, newPlayer]);
      setFilteredPlayers((prevFiltered) => [...prevFiltered, newPlayer]);
    }
  }, [location.state]);

  const handleSearchChange = (event) => {
    const text = event.target.value.toLowerCase();
    setSearchText(text);

    const filtered = players.filter((player) =>
      player.name.toLowerCase().includes(text)
    );
    setFilteredPlayers(filtered);
  };

  const handleDeletePlayer = (id) => {
    const playerToDelete = players.find((player) => player.id === id);

    if (!playerToDelete?.isNew) {
      alert('You can only delete players that you added.');
      return;
    }

    setPlayers((prevPlayers) =>
      prevPlayers.filter((player) => player.id !== id)
    );
    setFilteredPlayers((prevFiltered) =>
      prevFiltered.filter((player) => player.id !== id)
    );

    alert('Player deleted successfully.');
  };

  return (
    <>
      <h1>All Puppy Players</h1>

      <input
        type="text"
        placeholder="Search players by name..."
        value={searchText}
        onChange={handleSearchChange}
        style={{ marginBottom: '20px', padding: '10px', width: '300px' }}
      />

      {Array.isArray(filteredPlayers) && filteredPlayers.length === 0 ? (
        <p>No players found.</p>
      ) : (
        <div>
          {filteredPlayers.map((player) => (
            <div key={player.id} style={{ marginBottom: '15px' }}>
              <h4>{player.name}</h4>
              <p>Breed: {player.breed || 'Unknown'}</p>
              <img
                src={player.imageUrl}
                alt={player.name}
                style={{ width: '150px' }}
              />
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
          ))}
        </div>
      )}
    </>
  );
};

export default AllPlayers;
