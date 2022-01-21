const initialState = {
  user: {},
  blogs: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_USER':
      return {
        ...state,
        user: action.user,
      };
    case 'SET_BLOGS':
      return {
        ...state,
        blogs: action.blogs,
      };
    case 'DELETE_BLOG':
      return {
        ...state,
        blogs: state.blogs.filter(blog => blog._id !== action.id),
      };
    case 'ADD_BLOG':
      return {
        ...state,
        blogs: [action.blog, ...state.blogs],
      };
    case 'EDIT_BLOG':
      console.log(action.blog.blog._id, state.blogs);
      const index = state.blogs.findIndex(
        blog => blog._id === action.blog.blog._id
      );
      const NewBlogs = state.blogs.slice();
      if (index !== -1) NewBlogs[index] = action.blog.blog;
      console.log(NewBlogs);
      return {
        ...state,
        blogs: NewBlogs,
      };
    default:
      return state;
  }
};
export default reducer;
