export const fetchPlayers = async () => {
  try {
    const response = await fetch(
      'https://fsa-puppy-bowl.herokuapp.com/api/2408-FTB-ET-WEB-AM/players'
    );
    const data = await response.json();
    return data.data.players || [];
  } catch (error) {
    console.error('Failed to fetch players:', error);
    return [];
  }
};

export const fetchSinglePlayer = async (id) => {
  try {
    const response = await fetch(
      `https://fsa-puppy-bowl.herokuapp.com/api/2408-FTB-ET-WEB-AM/players/${id}`
    );
    const data = await response.json();
    return data.data.player || null;
  } catch (error) {
    console.error(`Failed to fetch player with id ${id}:`, error);
    return null;
  }
};
