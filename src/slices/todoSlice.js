import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tasks: JSON.parse(localStorage.getItem("tasks")) || [],
  filter: "all",
};

// Create a slice for todo list tasks and export it
const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTask: (state, { payload }) => {
      state.tasks.push(payload);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    removeTask: (state, { payload }) => {
      state.tasks = state.tasks.filter((task) => task.id !== payload.id);
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    toggleCompletedStatus: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          return { ...task, completed: !task.completed };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    editTask: (state, { payload }) => {
      state.tasks = state.tasks.map((task) => {
        if (task.id === payload.id) {
          return { ...task, ...payload };
        }
        return task;
      });
      localStorage.setItem("tasks", JSON.stringify(state.tasks));
    },
    setFilter: (state, { payload }) => {
      state.filter = payload;
    },
  },
});

export const {
  addTask,
  removeTask,
  toggleCompletedStatus,
  editTask,
  setFilter,
} = todoSlice.actions;

export default todoSlice.reducer;
