import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

export const generateDraft = async (data) => {
  try {
    const response = await axios.post(`${API_URL}/draft`, data);
    return response.data;
  } catch (error) {
    console.error('Draft generation error:', error);
    throw error;
  }
};

export const downloadDocument = async (draftData, format) => {
  try {
    const response = await axios.post(`${API_URL}/download/${format}`, draftData, {
      responseType: 'blob'
    });
    return response.data;
  } catch (error) {
    console.error('Download error:', error);
    throw error;
  }
};
