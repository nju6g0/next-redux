"use client";
import React, { useEffect, useState, useRef } from "react";
import { useDispatch } from "react-redux";

import { updateTodo, deleteTodo } from "@/features/todo/todoSlice";
import { useClickOutside } from "@/lib/hooks";
import { ButtonPink, ButtonGray, InputText } from "@/components/common";

function TodoItem({ todo }) {
  const inputRef = useRef(null);
  const dispatch = useDispatch();

  // about Edit
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState("");

  // about Edit
  const clearEdit = () => {
    setIsEditing(false);
    setEditValue("");
  };
  const handleEditTodo = () => {
    dispatch(updateTodo({ id: todo.id, title: editValue }));
    clearEdit();
  };
  const handleEditKeydown = (e) => {
    if (e.key === "Enter" && editValue.trim()) {
      handleEditTodo();
      return;
    }
    if (e.key === "Escape" || e.key === "Tab") {
      clearEdit();
    }
  };
  const handleEdit = (e) => {
    setEditValue(e.target.value);
  };
  const handleDoubleClick = (todo) => {
    setIsEditing(true);
    setEditValue(todo.title);
  };
  //   const handleEditBlur = () => {
  //     clearEdit();
  //   };

  // about Toggle
  const handleToggle = () => {
    dispatch(updateTodo({ id: todo.id, completed: !todo.completed }));
  };

  // about Delete
  const handleDelete = () => {
    window.confirm(`確定要刪除:${todo.title}嗎?`) &&
      dispatch(deleteTodo(todo.id));
  };

  useClickOutside(inputRef, () => {
    if (isEditing) {
      clearEdit();
    }
  });

  // 自動 focus input
  //   useEffect(() => {
  //     if (inputRef.current) {
  //       inputRef.current.focus();
  //       inputRef.current.select(); // 如果希望自動選取內容
  //     }

  //     // 監聽點擊事件，當點擊在 inputRef 以外的地方時，清除編輯狀態
  //     const handleClickOutside = (e) => {
  //       if (inputRef.current && editId && !inputRef.current.contains(e.target)) {
  //         clearEdit();
  //       }
  //     };

  //     document.addEventListener("mousedown", handleClickOutside);
  //     return () => document.removeEventListener("mousedown", handleClickOutside);
  //   }, [editId]);

  return (
    <li
      key={todo.id}
      className="text-xl"
      onDoubleClick={() => {
        handleDoubleClick(todo);
      }}
    >
      {isEditing ? (
        <InputText
          ref={inputRef}
          value={editValue}
          onChange={handleEdit}
          onKeyDown={handleEditKeydown}
          //   onBlur={handleEditBlur}
          autoFocus
        />
      ) : (
        <div className="flex items-center">
          <p className={todo.completed ? "line-through" : ""}>{todo.title}</p>
          <ButtonPink onClick={handleToggle}>toggle</ButtonPink>
          <ButtonGray onClick={handleDelete}>delete</ButtonGray>
        </div>
      )}
    </li>
  );
}

// function areEqual(prevProps, nextProps) {
//   return (
//     prevProps.todo.id === nextProps.todo.id &&
//     prevProps.todo.title === nextProps.todo.title
//   );
// }

// export default React.memo(TodoItem, areEqual);
export default React.memo(TodoItem);
