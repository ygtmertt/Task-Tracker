import AddTask from './components/AddTask';
import Header from './components/Header';
import Tasks from "./components/Tasks";
import Footer from './components/Footer';
import { useState, useEffect } from "react";

function App() {

  const [showAddTask, setShowAddTask] = useState(false);
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks();
  }, []);

  // Fetch Tasks
  const fetchTasks = async () => {
    const response = await fetch('http://localhost:5000/tasks')
    const data = await response.json()
    console.log(data)  // to help see us what data we pulled from db.
    return data;
  }

  // Fetch Task (Different than the one above)
  const fetchTask = async (id) => {
    const response = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await response.json()
    return data;
  }

  // Add Task
  const addTask = async (task) => {  // Ctrl + K + U uncomments, Ctrl + K + C comments the selected lines.
    const response = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })
    const data = await response.json() // That's only the new task which is being added.
    setTasks([...tasks, data]) // We add the new task with the rest.

    // const id = Math.floor(Math.random() * 10000) + 1;
    // const newTask = { id, ...task };
    // setTasks([...tasks, newTask]);
  }

  // Delete Task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })
    setTasks(tasks.filter((element) => element.id !== id))
  }

  // Toggle reminder
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updatedTask = { ...taskToToggle, reminder: !taskToToggle.reminder } //reverses the taskToToggle's reminder value.
    const response = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'PUT',
      headers: {
        'Contnet-type': 'application/json'
      },
      body: JSON.stringify(updatedTask),
    })

    const data = await response.json();

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
        {showAddTask && <AddTask onAdd={addTask} />}
        {tasks.length > 0 ?
          <Tasks
            tasks={tasks}
            onDelete={deleteTask}
            onToggle={toggleReminder} /> : 'Nothing here yet...'  // If  no tasks, we get this message.
        }
        <Footer />
      </div>
    </>
  );

}

export default App;