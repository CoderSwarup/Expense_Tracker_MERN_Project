import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Header from "./Components/Common/Header";
import Home from "./Pages/Hero/Home";
import { useState } from "react";
import { DarkTheme, LightTheme } from "./Styles/ThemeConfig";
import Footer from "./Components/Common/Footer";
import PageNotFound from "./Pages/Hero/PageNotFound";
import SignUp from "./Pages/User_Forms/SignUp";
import Login from "./Pages/User_Forms/Login";
import { useEffect } from "react";
import Forgot_Password from "./Pages/User_Forms/Forgot_Password";
import Verify_password from "./Pages/User_Forms/Verify_password";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import Loading from "./Components/Common/Loading";
import { GetUser } from "./Store/Actions/UserActions";
import { clearError, clearMessage } from "./Store/Slices/UserSlice";
import VerifyUser from "./Components/Common/VerifyUser";
import About from "./Pages/Hero/About";
import Contact from "./Components/Common/Contact";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import DashBoard from "./Pages/DashBoard";
import Profile from "./Pages/Profile";

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import CategoryDashBoard from "./Components/Category/CategoryDashBoard";
import DailyExpenses from "./Pages/DailyExpenses";

ChartJS.register(ArcElement, Tooltip, Legend);
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
            {!isAuthenticated ? (
              <>
                <Route exact path="/" element={<Home />}></Route>
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

                <Route
                  exact
                  path="/verify/user/:token"
                  element={<VerifyUser />}
                />
              </>
            ) : (
              <Route exact path="/" element={<DashBoard />} />
            )}

            {/* Login Page */}
            <Route exact path="/login" element={<Login />} />

            {/* Register Page */}
            <Route exact path="/signin" element={<SignUp />} />

            {/* Protected Routes */}
            <Route
              element={<ProtectedRoute isAuthenticated={isAuthenticated} />}
            >
              <Route exact path="/profile" element={<Profile />} />
              <Route exact path="/category" element={<CategoryDashBoard />} />
              <Route exact path="/dailyexpense" element={<DailyExpenses />} />
            </Route>

            {/* Public Routes */}
            <Route exact path="/aboutus" element={<About />} />
            <Route exact path="/contact" element={<Contact />} />
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
          {!isAuthenticated && <Footer></Footer>}
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
