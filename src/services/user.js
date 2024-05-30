// Let's create general CRUD operations for users
// This file contains contains operations related to users.

// We'll use the API.js file to make requests to the server. Here
// we will just implement the general CRUD operations for users.

import fetchFromApi from './fetchAPI';

// GET ALL USERS
async function getAllUsers() {
  return fetchFromApi('users');
}

// GET A SINGLE USER BY ID
async function getUserById(id) {
  return fetchFromApi(`users/${id}`);
}

// CREATE A NEW USER
async function createUser(user) {
  return fetchFromApi('users', {
    method: 'POST',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// UPDATE A USER
async function updateUser(id, user) {
  return fetchFromApi(`users/${id}`, {
    method: 'PUT',
    body: JSON.stringify(user),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// DELETE A USER
async function deleteUser(id) {
  return fetchFromApi(`users/${id}`, {
    method: 'DELETE',
  });
}

export { getAllUsers, getUserById, createUser, updateUser, deleteUser };