import fetchFromApi from './fetchAPI.js';

export async function login(username, password) {
  try {
    const users = await fetchFromApi('users');
    const user = users.find(user => user.userName === username && user.password === password);
    if (!user) {
      throw new Error('Invalid username or password');
    }
    return user;
  } catch (error) {
    console.error('An error occurred while logging in:', error);
    throw error;
  }
}
