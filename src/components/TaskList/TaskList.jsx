import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import {
  removeTask,
  updateTask,
  toggleComplete,
} from "../../redux-store/tasksSlice";
import styles from "./TaskList.module.css";

const TaskList = () => {
  const tasks = useSelector((state) => state.tasks.tasks);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const dispatch = useDispatch();

  const handleEditTask = (taskId, title) => {
    setEditingTaskId(taskId);
    setNewTaskTitle(title);
  };

  const handleUpdateTask = (taskId) => {
    if (newTaskTitle.trim()) {
      dispatch(updateTask({ id: taskId, title: newTaskTitle }));
      setEditingTaskId(null);
      setNewTaskTitle("");
    } else {
      alert("Task title cannot be empty");
    }
  };

  const handleToggleComplete = (taskId) => {
    dispatch(toggleComplete(taskId));
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setNewTaskTitle("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "incomplete") return !task.completed;
    return true;
  });

  return (
    <div className={styles.taskListContainer}>
      {/* Filter buttons */}
      <div className={styles.filterButtons}>
        <button
          onClick={() => setFilter("all")}
          className={`${styles.filterBtn} ${
            filter === "all" ? styles.activeFilter : ""
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("completed")}
          className={`${styles.filterBtn} ${
            filter === "completed" ? styles.activeFilter : ""
          }`}
        >
          Completed
        </button>
        <button
          onClick={() => setFilter("incomplete")}
          className={`${styles.filterBtn} ${
            filter === "incomplete" ? styles.activeFilter : ""
          }`}
        >
          Incomplete
        </button>
      </div>

      {filteredTasks.length === 0 ? (
        <p className={styles.noTasksText}>No tasks available</p>
      ) : (
        filteredTasks.map((task) => (
          <div
            key={task.id}
            className={`${styles.taskItem} ${
              task.completed ? styles.completedTask : ""
            }`}
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => handleToggleComplete(task.id)}
              className={styles.taskCheckbox}
            />

            {editingTaskId === task.id ? (
              <div className={styles.editTaskContainer}>
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  className={styles.editTaskInput}
                />
                <button
                  onClick={() => handleUpdateTask(task.id)}
                  className={styles.saveBtn}
                >
                  Save
                </button>
                <button onClick={handleCancelEdit} className={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            ) : (
              <div className={styles.taskDetails}>
                <span className={styles.taskTitle}>{task.title}</span>
                <div className={styles.taskActions}>
                  <button
                    onClick={() => handleEditTask(task.id, task.title)}
                    className={styles.editBtn}
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => dispatch(removeTask(task.id))}
                    className={styles.deleteBtn}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;
