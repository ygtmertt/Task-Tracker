import Task from './Task';

const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    <>
      {tasks.map((element) => (
        <Task
          key={element.id}
          task={element}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </>
  )
}

export default Tasks
