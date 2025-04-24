"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";

import { fetchItems, addItem, deleteItem } from "@/features/cart/cartSlice";
import { selectAllItems } from "@/features/cart/cartSelectors";
import { Button } from "@/components/common";

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
      <Button.Pink onClick={handleAddItem}>add new</Button.Pink>
      {items.map((item) => {
        const randomImgID = Math.floor(Math.random() * 1000);
        return (
          <div
            key={item.id}
            className="flex items-center my-2 border rounded-md border-gray-300"
          >
            <Image
              className="shrink-0"
              width={100}
              height={150}
              src={`https://picsum.photos/id/${randomImgID}/200/300.webp`}
              alt="product image"
              loading="lazy"
            />
            <div className="ml-4">
              <h2>{item.title}</h2>
              <p className="line-clamp-2">{item.description}</p>
              <p>{item.price}</p>
              <Button.Gray
                size="sm"
                onClick={() => {
                  handleDeleteItem(item.id);
                }}
              >
                delete
              </Button.Gray>
            </div>
          </div>
        );
      })}
    </>
  );
}
