// src/components/DeleteButton.js

export function renderDeleteButton(onClick) {
    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.classList.add(
      'bg-orange-500',
      'text-white',
      'px-2',
      'py-1',
      'rounded',
      'ml-2'
    );
    deleteButton.addEventListener('click', onClick);
    return deleteButton;
  }