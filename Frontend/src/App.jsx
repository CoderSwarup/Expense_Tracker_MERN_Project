import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Header from "./Components/Header";
import Home from "./Pages/Hero/Home";
import { useState } from "react";
import { DarkTheme, LightTheme } from "./Styles/ThemeConfig";
import Footer from "./Components/Footer";
import PageNotFound from "./Pages/Hero/PageNotFound";
import SignUp from "./Pages/User_Forms/SignUp";
import Login from "./Pages/User_Forms/Login";
import { useEffect } from "react";
import Forgot_Password from "./Pages/User_Forms/Forgot_Password";
import Verify_password from "./Pages/User_Forms/Verify_password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Components/Loading";
import { GetUser } from "./Store/Actions/UserActions";
import { clearError, clearMessage } from "./Store/Slices/UserSlice";
import VerifyUser from "./Components/VerifyUser";
import About from "./Pages/Hero/About";

function App() {
  const Dispatch = useDispatch();
  const { loading, isAuthenticated } = useSelector((state) => state.user);

  //Theme Change Part
  const [theme, setTheme] = useState("dark");
  const Theme = theme === "light" ? LightTheme : DarkTheme;

  useEffect(() => {
    const gettheme = localStorage.getItem("theme");
    setTheme(gettheme);

    Dispatch(GetUser());
    Dispatch(clearMessage());
    Dispatch(clearError());
  }, [Dispatch]);

  //Theme Change Part End

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle></GlobalStyle>
        <BrowserRouter>
          {loading && <Loading></Loading>}
          <Header theme={theme} setTheme={setTheme}></Header>
          <Routes>
            {/* Main Page */}
            <Route exact path="/" element={<Home />}></Route>

            {/* Login Page */}
            <Route exact path="/login" element={<Login />} />

            {/* Register Page */}
            <Route exact path="/signin" element={<SignUp />} />

            {/* Forgot Password Page */}
            <Route
              exact
              path="/forgot/password"
              element={<Forgot_Password />}
            />

            <Route
              exact
              path="/reset/password-verify/:token"
              element={<Verify_password />}
            />

            <Route exact path="/verify/user/:token" element={<VerifyUser />} />

            <Route exact path="/aboutus" element={<About />} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>

          {/* React toastify */}
          <ToastContainer
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme={theme === "light" ? "dark" : "light"}
          />

          {/* Footer */}
          <Footer></Footer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
