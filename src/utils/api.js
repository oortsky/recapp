import axios from "axios";

const baseURL = "https://recapp-backend-production.up.railway.app/api/";

const axiosInstance = axios.create({
  baseURL
});

// Function to fetch data
export const fetchAPI = async (endpoint) => {
  try {
    const response = await axiosInstance.get(endpoint);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Function to create data
export const createAPI = async (endpoint, data) => {
  try {
    const response = await axiosInstance.post(endpoint, data);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

// Function to update data
export const updateAPI = async (endpoint, id, data) => {
  try {
    const response = await axiosInstance.put(`${endpoint}/${id}`, data);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Function to delete data
export const deleteAPI = async (endpoint, id) => {
  try {
    const response = await axiosInstance.delete(`${endpoint}/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};