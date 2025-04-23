"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { fetchItems } from "@/features/cart/cartSlice";
import { selectAllItems } from "@/features/cart/cartSelectors";

export default function CartClient({ initialTodos }) {
  const dispatch = useDispatch();
  const items = useSelector(selectAllItems);
  console.log(items);

  useEffect(() => {
    dispatch(fetchItems());
  }, [dispatch]);

  return (
    <>
      <h1>I'm a cart</h1>
      {items.map((item) => (
        <div key={item.id}>
          <h2>{item.title}</h2>
          <p>{item.description}</p>
          <p>{item.price}</p>
        </div>
      ))}
    </>
  );
}
