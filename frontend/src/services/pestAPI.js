const API_BASE_URL =
  process.env.REACT_APP_API_URL || "http://localhost:5000/api";

class PestAPI {
  // Get all pests
  static async getAllPests() {
    try {
      const response = await fetch(`${API_BASE_URL}/pests`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pests:", error);
      throw error;
    }
  }

  // Get pest by ID
  static async getPestById(id) {
    try {
      const response = await fetch(`${API_BASE_URL}/pests/${id}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching pest details:", error);
      throw error;
    }
  }

  // Upload image for detection
  static async detectPest(imageFile) {
    try {
      const formData = new FormData();
      formData.append("image", imageFile);

      const response = await fetch(`${API_BASE_URL}/detection/analyze`, {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error detecting pest:", error);
      throw error;
    }
  }

  // Record detection session
  static async recordSession(sessionData) {
    try {
      const response = await fetch(`${API_BASE_URL}/detection/session`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(sessionData),
      });

      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error recording session:", error);
      throw error;
    }
  }

  // Get detection statistics
  static async getStats() {
    try {
      const response = await fetch(`${API_BASE_URL}/detection/stats`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching stats:", error);
      throw error;
    }
  }
}

export default PestAPI;
