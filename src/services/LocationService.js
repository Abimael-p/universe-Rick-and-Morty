import axios from "axios";

const LocacionService = {
  async getRandomLocation() {
    try {
      const randomId = Math.round(Math.random() * 126) + 1;
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/${randomId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching random location: ", error);
      throw error;
    }
  },

  async searchLocationsByName(name) {
    try {
      const response = await axios.get(
        `https://rickandmortyapi.com/api/location/?name=${name}`
      );
      return response.data;
    } catch (error) {
      console.error("Error searching locations:", error);
      throw error;
    }
  },
};

export default LocacionService;
