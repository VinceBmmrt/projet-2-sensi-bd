/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { LocalStorage } from './LocalStorage';

// je crée une instance d'axios préconfiguré
// Cela permet de spécifier une configuration pour toutes les requêtes effectuées avec cette instance
export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000',
});

// Je rajoute un intercepteur, cela me permet avant que la requête soit faite de modifier la configuration
axiosInstance.interceptors.request.use((config) => {
  // Je récupère l'utilisateur connecter en localStorage
  const user = LocalStorage.getItem('user');

  // Si il y a bien quelqu'un
  if (user) {
    // Je rajoute son token dans le header Authorization de ma requête
    // eslint-disable-next-line no-param-reassign
    config.headers.Authorization = `Bearer ${user.token}`;
  }
  return config;
});
