"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import {
  setPosts,
  // getPosts,
  addPost,
  updatePost,
  deletePost,
  setEndPoint,
  searchPost,
} from "@/features/post/postSlice";
import {
  selectPosts,
  selectPaginatedPosts,
  selectPostsLoading,
  selectPostsPageSize,
  selectPostsEndPoint,
  selectPostsCount,
} from "@/features/post/postSelectors";
import {
  ButtonPink,
  ButtonGray,
  ButtonBlue,
  InputText,
  Textarea,
  HighlightText,
} from "@/components/common";
import PostCard from "./components/postCard";

const TITLE = "title";
const BODY = "body";

export default function PostPage({ initialPosts }) {
  const posts = useSelector(selectPaginatedPosts);
  const loading = useSelector(selectPostsLoading);
  const endPoint = useSelector(selectPostsEndPoint);
  const pageSize = useSelector(selectPostsPageSize);
  const postsCount = useSelector(selectPostsCount);
  const dispatch = useDispatch();

  // about add post
  const [showAdd, setShowAdd] = useState(false);
  const [values, setValues] = useState({
    [TITLE]: "",
    [BODY]: "",
  });

  const handleClickAdd = () => {
    setShowAdd(true);
  };
  const handleValueChange = (key, value) => {
    setValues((prev) => ({
      ...prev,
      [key]: value,
    }));
  };
  const handleAdd = async () => {
    dispatch(setEndPoint(0));
    // dispatch(searchPost(""));
    await dispatch(addPost({ title: values[TITLE], body: values[BODY] }));
    setValues({
      [TITLE]: "",
      [BODY]: "",
    });
    setKeyword("");
    setInputValue("");
    setShowAdd(false);
  };

  // about search post
  const [inputValue, setInputValue] = useState("");
  const [keyword, setKeyword] = useState("");
  const handleKeyword = (e) => {
    setInputValue(e.target.value);
  };
  const handleSearch = () => {
    dispatch(setEndPoint(0));
    dispatch(searchPost(inputValue));
  };
  const handleSearchKeyDown = (e) => {
    if (e.key === "Enter") {
      setKeyword(inputValue);
      handleSearch();
    }
  };

  const handleUpdate = (Post) => {
    dispatch(updatePost({ ...Post, done: !Post.done }));
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  const goPrev = () => {
    if (endPoint === 0) return;
    const prevEndPoint = endPoint - pageSize < 0 ? 0 : endPoint - pageSize;
    dispatch(setEndPoint(prevEndPoint));
  };

  const goNext = () => {
    if (endPoint >= postsCount) return;
    const nextEndPoint =
      endPoint + pageSize > postsCount ? endPoint : endPoint + pageSize;
    dispatch(setEndPoint(nextEndPoint));
  };

  useEffect(() => {
    dispatch(setPosts(initialPosts));
  }, [dispatch, initialPosts]);

  return (
    <div>
      <h1>Post Page</h1>
      <label>
        SEARCH:{" "}
        <InputText
          value={inputValue}
          onChange={handleKeyword}
          onKeyDown={handleSearchKeyDown}
        />
      </label>
      <div className="w-xs flex flex-col p-2 my-5">
        {showAdd ? (
          <>
            <InputText
              placeholder="請輸入標題"
              value={values.title}
              onChange={(e) => {
                handleValueChange(TITLE, e.target.value);
              }}
            />
            <Textarea
              className="h-32 mt-2"
              placeholder="請輸入內容"
              value={values.body}
              onChange={(e) => {
                handleValueChange(BODY, e.target.value);
              }}
            />
            <ButtonBlue onClick={handleAdd} loading={loading}>
              新增
            </ButtonBlue>
          </>
        ) : (
          <ButtonBlue onClick={handleClickAdd} disabled={loading}>
            新增 Post
          </ButtonBlue>
        )}
      </div>

      <ul className="columns-3">
        {posts.map((post) => (
          <li
            key={post.id}
            className="break-inside-avoid"
            // style={{ pageBreakInside: "avoid" }}
          >
            <PostCard {...post} keyword={keyword} />
          </li>
        ))}
      </ul>
      <div className="flex items-center">
        <ButtonPink onClick={goPrev} disabled={endPoint <= 0}>
          prev
        </ButtonPink>
        <ButtonGray
          onClick={goNext}
          disabled={endPoint + pageSize >= postsCount}
        >
          next
        </ButtonGray>
      </div>
    </div>
  );
}
