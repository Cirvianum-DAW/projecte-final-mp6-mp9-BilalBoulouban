
// src/pages/Dashboard.js

import { renderAddTaskModal } from '../../components/AddModal';
import { renderEditModal } from '../../components/EditModal';
import { renderTodoList } from '../../components/TodoList';
import {
  getAllTasks,
  deleteTask,
  updateTask,
  createTask,
} from '../services/tasks';
import {
  getUserFromLocalStorage,
  saveUserToLocalStorage,
} from '../utils/helpers';

export async function renderDashboardPage() {
  const user = getUserFromLocalStorage();

  if (!user) {
    console.error('User not found in localStorage');
    return;
  }

  const userId = user.id;
  const welcomeMessage = `Welcome, ${user.firstName}!`;

  const welcomeElement = document.getElementById('welcome');
  welcomeElement.textContent = welcomeMessage;

  const todoListContainer = document.getElementById('taskLists');

  // Function to handle the editing of a task.
  // The callback function will be called when the user clicks the save button in the modal
  async function handleEdit(todo) {
    try {
      renderEditModal(todo, async (updatedTodo) => {
        // 1st -> Update the task in the database
        await updateTask(userId, todo.id, updatedTodo);
        // 2nd -> We obtain again the list of todos in the database
        const todos = await getAllTasks(userId);
        // 3rd -> We update the local storage with the new list of todos
        saveUserToLocalStorage(userId, todos);
        // 4th -> Now yes, we can render the updated list of todos
        render();
      });
    } catch (error) {
      console.error(error);
    }
  }

  // Function to handle the deletion of a task
  async function handleDelete(todoId) {
    try {
      // 1st -> We delete the task in the database
      await deleteTask(userId, todoId);
      // 2nd -> We obtain again the list of todos in the database
      const todos = await getAllTasks(userId);
      // 3rd -> We update the local storage with the new list of todos
      saveUserToLocalStorage(userId, todos);
      // 4th -> Now yes, we can render the updated list of todos
      render();
    } catch (error) {
      console.error(error);
    }
  }

  // Function to handle the addition of a task
  async function handleAddTask(newTodo) {
    try {
      // 1st -> We create the task in the database
      await createTask(userId, newTodo);
      // 2nd -> We obtain again the list of todos in the database
      console.log('getting all tasks');
      const todos = await getAllTasks(userId);
      // 3rd -> We update the local storage with the new list of todos
      saveUserToLocalStorage(userId, todos);
      // 4th -> Now yes, we can render the updated list of todos
      render();
    } catch (error) {
      console.error(error);
    }
  }

  // Every time the todos are updated, re-render the todo list
  async function render() {
    try {
      // 1st -> We obtain the list of todos in the database
      const todos = await getAllTasks(userId);
      // 2nd -> We update the local storage with the new list of todos
      saveUserToLocalStorage(userId, todos);
      // 3rd -> We render the updated list of todos
      todoListContainer.innerHTML = '';
      renderTodoList(todos, 'taskLists', handleEdit, handleDelete);
    } catch (error) {
      console.error('Error fetching tasks:', error);
    }
  }

  // In this case, the EventListener, as it is single button in the dashboard,
  // we define it here in the DashboardPage.js
  const addTodoButton = document.getElementById('addTodoButton');
  // When the user clicks the button, we render the modal to add a new task and we pass
  // the handleAddTask as a callback function to be called when the user clicks the save button in the modal
  addTodoButton.addEventListener('click', () => {
    renderAddTaskModal(handleAddTask);
  });

  render();
}
