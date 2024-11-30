import React from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { fetchPlayers } from '../../index';
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

  // useEffect(() => {
  //   const getPlayers = async () => {
  //     const playersData = await fetchPlayers();
  //     // console.log('Fetched players from API:', playersData);

  //     setPlayers(playersData);
  //     setFilteredPlayers(playersData);
  //     localStorage.setItem('players', JSON.stringify(playersData));
  //   };

  //   getPlayers();
  // }, []);

  // useEffect(() => {
  //   const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
  //   console.log('Loaded players from localStorage:', savedPlayers);
  //   if (savedPlayers.length > 0) {
  //     setPlayers(savedPlayers);
  //     setFilteredPlayers(savedPlayers);
  //   } else {
  //     const getPlayers = async () => {
  //       const playersData = await fetchPlayers();
  //       // console.log('Fetched players from API:', playersData);
  //       setPlayers(playersData);
  //       setFilteredPlayers(playersData);
  //       localStorage.setItem('players', JSON.stringify(playersData));
  //     };
  //     getPlayers();
  //   }
  // }, []);

  // useEffect(() => {
  //   const savedPlayers = JSON.parse(localStorage.getItem('players')) || [];
  //   setPlayers(savedPlayers);
  //   setFilteredPlayers(savedPlayers);
  // }, []);

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

    const updatedPlayers = players.filter((player) => player.id !== id);
    setPlayers(updatedPlayers);
    setFilteredPlayers(updatedPlayers);
    localStorage.setItem('players', JSON.stringify(updatedPlayers));
    alert('Player deleted successfully.');
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
