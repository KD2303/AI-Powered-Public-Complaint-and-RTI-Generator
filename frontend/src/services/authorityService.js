import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const suggestAuthority = async (issueCategory, state, district) => {
  try {
    const response = await axios.post(`${API_URL}/authority`, { 
      issue_category: issueCategory,
      state,
      district
    });
    return response.data;
  } catch (error) {
    console.error('Authority suggestion error:', error);
    throw error;
  }
};
