import axiosInstance from './axios';

export const sendHelpRequest = async (email, comment) => {
  try {
    const response = await axiosInstance.post('/help', {
      email,
      comment,
    });
    return response.data;
  } catch (error) {
    console.error('Help API Error:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status,
      error: error,
    });
    throw error;
  }
};
