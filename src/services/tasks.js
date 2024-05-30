// src/services/tasks.js

import fetchFromApi from './fetchAPI';

// GET ALL TASKS
async function getAllTasks(userId) {
  try {
    const response = await fetchFromApi(`users/${userId}`);
    if (!response.status === 200) {
      console.log('Hei!');
      // It can happen that the user has no tasks, in that case we return an empty array
      if (response.status === 404) {
        // No tasks found, return an empty array
        return [];
      }
      throw new Error('Failed to fetch tasks');
    }
    console.log(response.userTasks);
    return response.userTasks;
  } catch (error) {
    console.error('Error fetching tasks:', error);
    throw error;
  }
}

// GET A SINGLE TASK BY ID
async function getTaskById(userId, taskId) {
  return fetchFromApi(`users/${userId}/tasks/${taskId}`);
}

// CREATE A NEW TASK
async function createTask(userId, task) {
  return fetchFromApi(`users/${userId}/tasks`, {
    method: 'POST',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// UPDATE A TASK
async function updateTask(userId, taskId, task) {
  return fetchFromApi(`users/${userId}/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(task),
    headers: {
      'Content-Type': 'application/json',
    },
  });
}

// DELETE A TASK
async function deleteTask(userId, taskId) {
  return fetchFromApi(`users/${userId}/tasks/${taskId}`, {
    method: 'DELETE',
  });
}

export { getAllTasks, getTaskById, createTask, updateTask, deleteTask };