import { useDispatch } from "react-redux";
import { removeTask, toggleComplete } from "../../redux-store/tasksSlice";
import styles from "./TaskItem.module.css";

const TaskItem = ({ task }) => {
  const dispatch = useDispatch();

  return (
    <div className={styles.taskItem}>
      <span
        className={task.completed ? styles.completed : ""}
        onClick={() => dispatch(toggleComplete(task.id))}
      >
        {task.title}
      </span>
      <button onClick={() => dispatch(removeTask(task.id))}>Delete</button>
    </div>
  );
};

export default TaskItem;
