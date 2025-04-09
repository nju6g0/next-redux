"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setTodos,
  // getTodos,
  addTodo,
  updateTodo,
  deleteTodo,
} from "@/features/todosAPI/todoAPISlice";
import {
  selectTodos,
  selectTodosLoading,
} from "@/features/todosAPI/todoAPISelectors";

export default function TodoAPIPage({ initialTodos }) {
  const todos = useSelector(selectTodos);
  const loading = useSelector(selectTodosLoading);
  const dispatch = useDispatch();
  console.log(todos);

  // useEffect(() => {
  //   dispatch(getTodos());
  // }, []);
  useEffect(() => {
    dispatch(setTodos(initialTodos));
  }, [dispatch, initialTodos]);

  const handleAdd = () => {
    dispatch(addTodo({ title: "新的代辦", done: false }));
  };

  const handleUpdate = (todo) => {
    dispatch(updateTodo({ ...todo, done: !todo.done }));
  };

  const handleDelete = (id) => {
    dispatch(deleteTodo(id));
  };

  if (loading) return <div>Loading...</div>;
  return (
    <div>
      <h1>我的 TODO</h1>
      <button onClick={handleAdd}>新增</button>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            <span
              style={{ textDecoration: todo.done ? "line-through" : "none" }}
              onClick={() => handleUpdate(todo)}
            >
              {todo.title}
            </span>
            <button onClick={() => handleDelete(todo.id)}>刪除</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
