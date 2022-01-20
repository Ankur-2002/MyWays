export const setUser = user => {
  return {
    type: 'SET_USER',
    user,
  };
};
export const blogs = blogs => {
  return {
    type: 'SET_BLOGS',
    blogs,
  };
};
export const DeleteBlog = id => {
  return {
    type: 'DELETE_BLOG',
    id,
  };
};
export const Editblog = blog => {
  return {
    type: 'EDIT_BLOG',
    blog,
  };
};
