// Centralized API base URL configuration
const API_BASE_URL = import.meta.env.PROD 
  ? '/api'  // In production, use relative path since both frontend and backend are on same domain
  : 'http://localhost:5006'; // In development, use the local backend URL

export default API_BASE_URL;
