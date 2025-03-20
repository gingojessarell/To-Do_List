// Manages the state of all tasks (list of tasks, completed tasks, etc.).
// Handles filtering tasks (all, completed, incomplete).
// Saves and loads tasks from local storage.
// Uses ToDo.jsx to display each task and ToDoForm.jsx to add new tasks.

import React, { useState, useEffect } from 'react'; // Import React hooks: useState (for state management) and useEffect (for side effects).
import { FaCheck } from 'react-icons/fa'; // Import the check icon from FontAwesome.
import ToDoForm from './ToDoForm'; // Import the ToDoForm component for adding tasks.
import ToDo from './ToDo'; // Import the ToDo component to display individual tasks.

const ToDoList = () => { // Define the ToDoList functional component.

  
  const [todos, setTodos] = useState(() => {
    const storedTodos = localStorage.getItem('todos'); // Get stored tasks from local storage.
    return storedTodos ? JSON.parse(storedTodos) : []; // Convert JSON string to array or return an empty array if no data exists.
  });

  const [filter, setFilter] = useState('all'); // State to store the current filter: 'all', 'completed', or 'incomplete'.
  const [error, setError] = useState(""); // State to store error messages (e.g., if a task already exists).
  const [editIndex, setEditIndex] = useState(null); // State to track which task is being edited.
  const [editText, setEditText] = useState(""); // State to store the edited task text.

  // useEffect hook to save the todos list to local storage whenever it changes.
  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos)); // Convert the tasks to a JSON string and save them.
  }, [todos]); // Runs whenever the `todos` state updates.


  const addTodo = (text) => {
    
    if (todos.some(todo => todo.text.toLowerCase() === text.toLowerCase())) {
      setError("Task already exists!"); 
      setTimeout(() => setError(""), 2000); // Remove the error after 2 seconds.
      return; // Stop the function to prevent duplicate tasks.
    }
    setTodos([...todos, { text, completed: false }]); // Add the new task with "completed: false" to the list.
  };

  // Function to mark a task as completed or incomplete.
  const toggleComplete = (index) => {
    setTodos(todos.map((todo, i) => 
      i === index ? { ...todo, completed: !todo.completed } : todo // Toggle the "completed" state for the selected task.
    ));
  };

  // Function to delete a task from the list.
  const deleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index)); // Remove the task that matches the given index.
  };

  // Function to start editing a task.
  const startEditing = (index) => {
    setEditIndex(index); // Store the index of the task being edited.
    setEditText(todos[index].text); // Set the current task's text in the input field.
  };

  // Function to save the edited task.
  const saveEdit = () => {
    setTodos(todos.map((todo, i) => 
      i === editIndex ? { ...todo, text: editText } : todo // Update the task with the new text.
    ));
    setEditIndex(null); // Reset editing state after saving.
    setEditText(""); // Clear the edit text input.
  };

  // Function to filter tasks based on the selected filter.
  const filteredTodos = todos.filter(todo => 
    filter === 'completed' ? todo.completed : 
    filter === 'incomplete' ? !todo.completed : 
    true // If the filter is "all", return all tasks.
  );

  return (
    <div className="app-container"> {/* Main container for the to-do list app */}
      <h1>To-Do List</h1> {/* Title of the app */}
      
      {/* Display error message if there is one */}
      {error && <p className="error-message">{error}</p>} 

      {/* Include the ToDoForm component to add new tasks */}
      <ToDoForm addTodo={addTodo} /> 

      {/* Buttons for filtering tasks: all, completed, or incomplete */}
      <div className="filter-buttons">
        <button onClick={() => setFilter('all')}>All</button>
        <button onClick={() => setFilter('completed')}>Completed</button>
        <button onClick={() => setFilter('incomplete')}>Incomplete</button>
      </div>

      {/* Display the filtered list of tasks */}
      <ul>
        {filteredTodos.map((todo, index) => (
          editIndex === index ? ( // If the task is being edited, show an input field.
            <li key={index}>
              <input 
                type="text" 
                value={editText} 
                onChange={(e) => setEditText(e.target.value)} // Update state when user types.
              />
              <button onClick={saveEdit} title="Save"> {/* Button to save the edited task */}
                <FaCheck color="green" />
              </button>
            </li>
          ) : ( // If the task is not being edited, show the regular ToDo component.
            <ToDo
              key={index} // Assign a unique key to each task.
              todo={todo} // Pass the task data as props.
              onComplete={() => toggleComplete(index)} // Function to mark task as complete.
              onDelete={() => deleteTodo(index)} // Function to delete task.
              onEdit={() => startEditing(index)} // Function to edit task.
            />
          )
        ))}
      </ul>
    </div>
  );
};

export default ToDoList; // Export the ToDoList component for use in other files.
