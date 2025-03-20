// Displays each task in the list.
// Provides buttons for editing, marking as complete, and deleting tasks using icons.

import React from 'react';
import { FaCheck, FaTrash, FaEdit } from 'react-icons/fa';

const ToDo = ({ todo, onComplete, onDelete, onEdit }) => { //This line create a function called ToDo 
// which is React Functional Component. Kay ang ToDo component receives data and functions from a 
// parent component using props.
// Props (todo, onComplete, onDelete, onEdit) are passed as arguments to the function.

// This code determines the CSS class that should be applied to a task. It checks if the 
// task is completed and assigns a class name accordingly. This helps with styling 
// (e.g., adding a strikethrough or changing the background color for completed tasks).
let className = ''; // This sets a CSS class for the task based on whether it's completed or not.
  if (todo.completed) { // If todo.completed is true, it means the task is done.
    className = 'completed'; // The className is changed to "completed" 
  }

  // This part of the code returns the JSX (HTML-like structure) that will be shown on the screen. 
  // It defines how a single task (To-Do item) looks in the app.
  return ( // This returns the JSX that will be displayed on the screen.
    <li className={className}> {/* ✔ Purpose: Creates a <li> (list item) element that will contain the task.
                                  ✔ Function: The {className} dynamically sets a CSS class to style the task. */}
      {todo.text}  {/* Displays the task text inside the <li>. */}
      <div>
        <button onClick={onEdit} title="Edit">
          <FaEdit color="blue" />
        </button>
        <button onClick={onComplete} title="Complete">
          <FaCheck color="green" />
        </button>
        <button onClick={onDelete} title="Delete">
          <FaTrash color="red" />
        </button>
      </div>
    </li>
  );
};

export default ToDo;
