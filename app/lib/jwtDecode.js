import { jwtDecode } from 'jwt-decode';

export const getUserFromToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp * 1000 < Date.now()) {
        localStorage.removeItem('token');
        return null;
      }
      return decoded;
    } catch (error) {
      console.error('Failed to decode token:', error);
      localStorage.removeItem('token');
      return null;
    }
  }
  return null;
};
