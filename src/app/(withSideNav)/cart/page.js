"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchItems, addItem, deleteItem } from "@/features/cart/cartSlice";
import { selectAllItems } from "@/features/cart/cartSelectors";
import { ButtonGray } from "@/components/common";

export default function CartClient({ initialTodos }) {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  console.log(items);

  const handleAddItem = () => {
    dispatch(addItem({}));
  };
  const handleDeleteItem = (id) => {
    dispatch(deleteItem(id));
  };

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      <h1>I'm a cart</h1>
      <ButtonGray onClick={handleAddItem}>add new</ButtonGray>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
          <ButtonGray
            onClick={() => {
              handleDeleteItem(item.id);
            }}
          >
            delete
          </ButtonGray>
        </div>
      ))}
    </>
  );
}
