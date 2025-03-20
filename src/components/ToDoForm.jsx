// Handles task input and submission.
// Allows users to type a new task and add it to the list.

import React, { useState } from 'react'; 


const ToDoForm = ({ addTodo }) => { // create a function called ToDoForm. This function is used to add a new task to the list.
  const [inputValue, setInputValue] = useState(''); // inputValue stores what the user types into the input field.
  //setInputValue updates the value of inputValue

  // Function to handle form submission
  const handleSubmit = (e) => { // This function will be triggered when the user submits the form.
    e.preventDefault(); // Prevents page refresh on form submit
    if (inputValue.trim()) { // If the input is empty, it won’t add a blank task.
      addTodo(inputValue); // Calls the addTodo function to add the task
      setInputValue(''); // Clears input field after adding the task
    }
  }

  return (
    <form onSubmit={handleSubmit} className="input-container"> {/* Form for adding tasks */}
      <input
        type="text"
        value={inputValue} // Binds input field to state
        onChange={(e) => setInputValue(e.target.value)} // Updates state when user types
        placeholder="Add a new task" // Placeholder text inside input field
      />
      <button type="submit">Add</button> {/* Button to submit the task */}
    </form>
  );
};

export default ToDoForm; // Export the component for use in other files
