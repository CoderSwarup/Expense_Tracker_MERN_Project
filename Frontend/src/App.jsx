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

function App() {
  const [theme, setTheme] = useState("dark");
  const Theme = theme === "light" ? LightTheme : DarkTheme;

  useEffect(() => {
    const gettheme = localStorage.getItem("theme");

    setTheme(gettheme);
  }, []);

  return (
    <>
      <ThemeProvider theme={Theme}>
        <GlobalStyle></GlobalStyle>
        <BrowserRouter>
          <Header theme={theme} setTheme={setTheme}></Header>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/signin" element={<SignUp />} />
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
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
