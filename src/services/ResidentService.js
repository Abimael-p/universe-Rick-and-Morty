import axios from "axios";

const ResidentService = {
  async getResidentInfo(ResidentUrl) {
    try {
      const response = await axios.get(ResidentUrl);
      return response.data;
    } catch (error) {
      console.error("Error fetching resident info:", error);
      throw error;
    }
  },
};

export default ResidentService;
