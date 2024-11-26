import React from 'react';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
// import { fetchPlayers } from '../../index';
import { fetchSinglePlayer } from '../../index';

const SinglePlayer = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlayer = async () => {
      const playerData = await fetchSinglePlayer(id);
      setPlayer(playerData);
      setLoading(false);
    };

    getPlayer();
  }, [id]); //

  if (loading) {
    return <p>Loading player details...</p>;
  }

  if (!player) {
    return <p>Player not found.</p>;
  }

  return (
    <div>
      <h2>{player.name}</h2>
      <img src={player.imageUrl} alt={player.name} style={{ width: '200px' }} />
      <p>Breed: {player.breed || 'Unknown'}</p>
      <p>Status: {player.status}</p>
      <p>Team ID: {player.teamId || 'No team'}</p>
      <p>Cohort ID: {player.cohortId}</p>
      {/* Add other details as needed */}
    </div>
  );
};

export default SinglePlayer;
