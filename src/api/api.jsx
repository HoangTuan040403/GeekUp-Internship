import axios from "axios";

const API_URL = "https://jsonplaceholder.typicode.com";

export const getAlbums = () => axios.get(`${API_URL}/albums`);
export const getPhotosByAlbum = (albumId) => axios.get(`${API_URL}/albums/${albumId}/photos`);
export const getUsers = () => axios.get(`${API_URL}/users`);
export const getUserById = (userId) => axios.get(`${API_URL}/users/${userId}`);
export const getAlbumsByUser = (userId) => axios.get(`${API_URL}/users/${userId}/albums`);
