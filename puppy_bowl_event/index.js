import axios from 'axios';

export const fetchPlayers = async () => {
  try {
    const response = await axios.get(
      'https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players'
    );
    return response.data.data.players || [];
  } catch (error) {
    console.error('Failed to fetch players:', error);
    return [];
  }
};

export const fetchSinglePlayer = async (id) => {
  try {
    const response = await axios.get(
      `https://fsa-puppy-bowl.herokuapp.com/api/2408-ftb-et-web-am/players/${id}`
    );
    return response.data.data.player || null;
  } catch (error) {
    console.error(`Failed to fetch player with id ${id}:`, error);
    return null;
  }
};
