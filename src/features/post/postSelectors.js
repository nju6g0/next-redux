export const selectPosts = (state) => state.posts.list;
export const selectPostsLoading = (state) => state.posts.loading;
export const selectPostsPageSize = (state) => state.posts.pageSize;
export const selectPostsEndPoint = (state) => state.posts.endPoint;
export const selectPaginatedPosts = (state) => {
  const { endPoint, pageSize, list } = state.posts;
  return list.slice(endPoint, endPoint + pageSize);
};
export const selectPostsCount = (state) => state.posts.list.length;
