import './App.css';
import Blogs from './Components/Blogs';
// import { BrowerRouter, Route } from 'react-router-dom';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';

import { Profile } from './Components/Profile';
import { useEffect, useLayoutEffect, useState } from 'react';
import Header from './Components/Header';
import { useDispatch, useSelector } from 'react-redux';
import { blogs } from './Store/Action';
import { Fetch } from './Constants/api';
import { Blog } from './Components/Blog';
function App() {
  const [Tab, setTab] = useState(-1);
  const Dispatch = useDispatch();
  const { user } = useSelector(state => state);
  const getPost = async () => {
    const data = await Fetch('/blogs/getBlog', 'GET', {});
    // console.log(data);
    return Dispatch(blogs(data));
  };

  useEffect(() => {
    getPost();
  }, []);
  return (
    <div className="App">
      <BrowserRouter>
        <Header Tab={Tab} setTab={setTab} />
        <Routes>
          {/* First Page */}
          <Route path="/" element={<Blogs />} />

          {/* For singal Blog */}
          <Route path="/blog/:id" caseSensitive element={<Blog />} />

          {/* Private Route */}
          <Route
            caseSensitive
            path="/profile"
            element={user._id ? <Profile /> : <Navigate to={'/'} />}
          />
          {/* 404 */}
          <Route path="*" element={<>Sorry</>} />
        </Routes>

        {/* <Blogs /> */}
      </BrowserRouter>
    </div>
  );
}

export default App;
