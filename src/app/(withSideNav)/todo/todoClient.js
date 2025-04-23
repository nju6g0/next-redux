"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  setTodos,
  searchTodo,
  addTodo,
  updateTodo,
  fetchTodos,
} from "@/features/todo/todoSlice";
import {
  selectFilteredTodos,
  selectTodosFromServer,
} from "@/features/todo/todoSelectors";
import TodoItem from "./components/todoItem";
import { InputText, ButtonBlue } from "@/components/common";

export default function TodoClient({ initialTodos }) {
  const dispatch = useDispatch();
  // const todos = useSelector((state) => state.todos.filtered);
  const todos = useSelector(selectFilteredTodos);
  const todosFromServer = useSelector(selectTodosFromServer);
  console.log(todosFromServer);

  // about Search
  const [keyword, setKeyword] = useState("");
  const [newTodoTitle, setNewTodoTitle] = useState("");

  // about Search
  const handleKeywordChange = (e) => {
    setKeyword(e.target.value);
  };
  const handleSearch = () => {
    dispatch(searchTodo(keyword));
    // if (keyword.trim()) {
    //   // 若有建立 searchTodo 可 dispatch(searchTodo(keyword))
    //   dispatch(getTodos()); // 這裡示意：呼叫 getTodos 或替換為 searchTodo(keyword)
    // }
  };
  const handleKeydown = (e) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  // about Add
  const handleTitleChange = (e) => {
    setNewTodoTitle(e.target.value);
  };
  const handleAdd = () => {
    const newTodo = {
      title: newTodoTitle,
    };
    dispatch(addTodo(newTodo));
    setNewTodoTitle("");
  };

  // initialTodos
  useEffect(() => {
    dispatch(setTodos(initialTodos));
  }, [dispatch, initialTodos]);

  useEffect(() => {
    dispatch(fetchTodos());
  }, [dispatch]);

  return (
    <div>
      <h1 className="text-3xl font-bold underline">Todo</h1>
      <p className="text-2xl">Todo List</p>
      <label>
        search:
        <InputText
          className="p-2"
          value={keyword}
          onChange={handleKeywordChange}
          onKeyDown={handleKeydown}
        />
      </label>
      <div className="my-5 flex items-center space-x-2">
        <InputText
          className="p-2"
          value={newTodoTitle}
          onChange={handleTitleChange}
        />
        <ButtonBlue onClick={handleAdd}>ADD</ButtonBlue>
      </div>
      <ul>
        {todos.map((todo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
      </ul>
    </div>
  );
}
