import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type TTodo = {
  id: string;
  title: string;
  description: string;
  isCompleted?: boolean;
};

type TInitialState = {
  todos: TTodo[];
};

const initialState: TInitialState = {
  todos: [],
};

const todoSlice = createSlice({
  name: "todo",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<TTodo>) => {
      state.todos.push({ ...action.payload, isCompleted: false });
    },
    editTodo: (state, action: PayloadAction<TTodo>) => {
      const todo = state.todos.find((item) => item.id === action.payload.id);
      if (todo) {
        todo.title = action.payload.title;
        todo.description = action.payload.description;
      }
    },
    removeTodo: (state, action: PayloadAction<string>) => {
      const newData = state.todos.filter((item) => item.id != action.payload);
      state.todos = newData;
    },
    toggleStatus: (state, action: PayloadAction<string>) => {
      state.todos.forEach((item) => {
        if (item.id === action.payload) {
          item.isCompleted = !item.isCompleted;
        }
      });
      state.todos = state.todos.sort(
        (a, b) => Number(a.isCompleted) - Number(b.isCompleted)
      );
    },
  },
});

export const { addTodo, editTodo, removeTodo, toggleStatus } =
  todoSlice.actions;
export default todoSlice.reducer;
