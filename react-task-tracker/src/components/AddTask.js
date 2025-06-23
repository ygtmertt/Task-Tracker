import { useState } from "react"

const AddTask = ({ onAdd }) => {

  const [text, setText] = useState("");
  const [day, setDay] = useState("");
  const [reminder, setReminder] = useState(false);

  const onSubmit = (e) => {  // We use this to avoid using onAdd directly.
    e.preventDefault();
    if(!text) {
      alert('Please add a task!');  // Alerts user if there is no task written.
      return;
    }
    else {
      onAdd({ text, day, reminder });
      // After adding a task, we wanna reset the checkboxes.
      setText('');
      setDay('');
      setReminder(false);
    }
  }

  return (
    <form className='add-form' onSubmit={onSubmit}>
      <div className='form-control'>

        <div className='form-control'>
          <label>Task</label>
          <input 
            type='text'
            placeholder='Add Task'
            value={text}
            onChange={(e) => setText(e.target.value)}  // Updates the text as it goes.
          />
        </div>

        <div className='form-control'>
          <label>Day & Time</label>
          <input
            type='text'
            placeholder='Add Day & Time'
            value={day}
            onChange={(e) => setDay(e.target.value)}
          />
        </div>

        <div className="form-control form-control-check">
          <label>Set Reminder</label>
          <input
            type='checkbox'
            value={reminder}
            checked={reminder ? true:false}
            onChange={(e) => setReminder(e.currentTarget.checked)}
          />
        </div>

      </div>

      <input type='submit' value='Save Task' className="btn btn-block" />

    </form>
  )
}

export default AddTask
