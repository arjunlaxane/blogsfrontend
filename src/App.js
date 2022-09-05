import { Fragment, useEffect } from 'react';
import Header from './components/Header';
import { Route, Routes } from 'react-router-dom';
import Auth from './components/Auth';
import Blogs from './components/Blogs';
import UserBlogs from './components/UserBlogs';
import BlogDetails from './components/BlogDetails';
import AddBlog from './components/AddBlog';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store';
function App() {
  const isLoggedIn = useSelector(state => state.isLoggedIn);
  const dispatch = useDispatch();
  console.log(isLoggedIn);

  useEffect(() => {
    if (localStorage.getItem('userId')) {
      dispatch(authActions.login());
    }
  }, [dispatch]);

  return (
    <Fragment>
      <Header />

      <Routes>
        {!isLoggedIn ? (
          <Route path="/auth" element={<Auth />} />
        ) : (
          <>
            <Route path="/blogs" element={<Blogs />} />
            <Route path="/myBlogs" element={<UserBlogs />} />
            <Route path="/myBlogs/:id" element={<BlogDetails />} />
            <Route path="/blog/add" element={<AddBlog />} />{' '}
          </>
        )}
      </Routes>
    </Fragment>
  );
}

export default App;
