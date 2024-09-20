import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: [],
  filter: "all",
  user: JSON.parse(localStorage.getItem("user"))?.username || null,
};

const tasksSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    setTasks: (state, action) => {
      const username = action.payload;
      state.user = username;
      state.tasks = JSON.parse(localStorage.getItem(`tasks_${username}`)) || [];
    },
    addTask: (state, action) => {
      const newTask = {
        id: Date.now(),
        title: action.payload,
        completed: false,
      };
      state.tasks.push(newTask);
      localStorage.setItem(`tasks_${state.user}`, JSON.stringify(state.tasks));
    },
    removeTask: (state, action) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
      localStorage.setItem(`tasks_${state.user}`, JSON.stringify(state.tasks));
    },
    toggleComplete: (state, action) => {
      const task = state.tasks.find((task) => task.id === action.payload);
      if (task) {
        task.completed = !task.completed;
        localStorage.setItem(
          `tasks_${state.user}`,
          JSON.stringify(state.tasks)
        );
      }
    },
    updateTask: (state, action) => {
      const { id, title } = action.payload;
      const task = state.tasks.find((task) => task.id === id);
      if (task) {
        task.title = title;
        localStorage.setItem(
          `tasks_${state.user}`,
          JSON.stringify(state.tasks)
        );
      }
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
  },
});

export const {
  setTasks,
  addTask,
  removeTask,
  toggleComplete,
  updateTask,
  setFilter,
} = tasksSlice.actions;
export default tasksSlice.reducer;
