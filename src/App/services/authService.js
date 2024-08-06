import axios from 'axios';
import { Config } from '../constant/Index';

const API_URL = `${Config.serverUrl}users`

const authService = {
  // Method for logging in the user
  async login(email, password) {
    try {
      const response = await axios.get(API_URL, {
        params: {
          email,
        },
      });

      if (response.data.length > 0) {
        const user = response.data[0];
        if (user.password === password) {
          return user;
        } else {
          throw new Error('Incorrect password.');
        }
      } else {
        throw new Error('User not found.');
      }
    } catch (error) {
      throw new Error('Error occurred during login: ' + error.message);
    }
  },

  // Method for registering a new user
  async register(userName, password, email) {
    try {
      const response = await axios.post(API_URL, {
        userName,
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw new Error('Error occurred during registration: ' + error.message);
    }
  },

  // Method for checking if the user is authenticated
  isAuthenticated() {
    return !!localStorage.getItem("user");
  },

  // Method for logging out the user
  logout() {
    localStorage.removeItem("user");
  }
};

export default authService;
