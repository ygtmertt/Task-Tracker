import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from "./components/Tasks";
import { useState } from "react";

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState(
    [{
      id: 1,
      text: "Doctor's Appointment",
      day: 'Feb 5th at 2:30pm',
      reminder: true,
    },
    {
      id: 2,
      text: "Meeting at School",
      day: 'Feb 6th at 1:30pm',
      reminder: true,
    },
    {
      id: 3,
      text: "Food Shopping",
      day: 'Feb 5th at 4:00pm',
      reminder: false,
    },]
  );

  // Add Task
  const addTask = (task) => {
    const id = Math.floor(Math.random() * 10000)+1;
    const newTask = {id, ...task};
    setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = (id) => {
    setTasks(tasks.filter((element) => element.id !== id))
  }

  // Toggle reminder
  const toggleReminder = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? 
        { ...task, reminder: !task.reminder } : task
      )
    )
  }

  return (
    <>
      <div className='container'>
        <Header title={"Task Tracker"} onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        {showAddTask && <AddTask onAdd={ addTask } />} 
        {tasks.length > 0 ?  
          <Tasks tasks={ tasks } onDelete={ deleteTask } onToggle={ toggleReminder } />
          :
          'Nothing here yet...'  // If there are no tasks, we get this message.
        }
      </div>
    </>
  );

}

export default App;