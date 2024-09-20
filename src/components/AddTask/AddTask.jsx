import { useState } from "react";
import { useDispatch } from "react-redux";
import { addTask, updateTask } from "../../redux-store/tasksSlice";
import styles from "./AddTask.module.css";

const AddTask = ({ editingTask, setEditingTask }) => {
  const [taskTitle, setTaskTitle] = useState(
    editingTask ? editingTask.title : ""
  );
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (taskTitle.trim()) {
      if (editingTask) {
        dispatch(updateTask({ id: editingTask.id, title: taskTitle }));
        setEditingTask(null);
      } else {
        dispatch(addTask(taskTitle));
      }
      setTaskTitle("");
    } else {
      alert("Task title cannot be empty");
    }
  };

  return (
    <div className={styles.addTaskContainer}>
      <input
        type="text"
        placeholder="Enter task title"
        value={taskTitle}
        onChange={(e) => setTaskTitle(e.target.value)}
      />
      <button onClick={handleSubmit}>
        {editingTask ? "Update Task" : "Add Task"}
      </button>
    </div>
  );
};

export default AddTask;
