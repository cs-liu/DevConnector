import React, { Fragment, useEffect } from "react";

//在 react-router-dom v6 中，<Route> 组件不能像 v5 一样直接使用，而是需要包裹在 <Routes> 组件中。
//Switch也被取消，使用Routes代替它的功能
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Alert from "./components/layout/Alert";
import Dashboard from "./components/dashboard/Dashboard";
import CreateProfile from "./components/profile-forms/CreateProfile";
import EditProfile from "./components/profile-forms/EditProfile";
import AddExperience from "./components/profile-forms/AddExperience";
import AddEducation from "./components/profile-forms/AddEducation";
import Profiles from "./components/profiles/Profiles";
import Profile from "./components/profile/Profile";
import Posts from "./components/posts/Posts";
import Post from "./components/post/Post";
import PrivateRoute from "./components/routing/PrivateRoute";

//Redux
import { Provider } from "react-redux";
import store from "./store";
import { loaduser } from "./actions/auth";
import setAuthToken from "./utils/setAuthToken";

import "./App.css";

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loaduser());
  }, []);
  //状态更新时，useEffect会继续运行并且将是一个恒定的循环，除非我们增加第二个空括号的参数，
  //所以我们添加，[]是为了让他只运行一次

  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Routes>
            <Route path="/" element={<Landing />} />
          </Routes>
          <section className="container">
            <Alert />
            <Routes>
              <Route exact path="/register" element={<Register />} />
              <Route exact path="/login" element={<Login />} />
              <Route exact path="/profiles" element={<Profiles />} />
              <Route exact path="/profile/:id" element={<Profile />} />
              <Route element={<PrivateRoute />}>
                <Route path="/dashboard" element={<Dashboard />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/create-profile" element={<CreateProfile />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/edit-profile" element={<EditProfile />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/add-experience" element={<AddExperience />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/add-education" element={<AddEducation />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/posts" element={<Posts />} />
              </Route>
              <Route element={<PrivateRoute />}>
                <Route path="/post/:id" element={<Post />} />
              </Route>
            </Routes>
          </section>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
