import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { useState } from "react";
import { DarkTheme, LightTheme } from "./Styles/ThemeConfig";
import Footer from "./Components/Footer";
import PageNotFound from "./Pages/PageNotFound";

function App() {
  const [theme, setTheme] = useState("dark");
  const Theme = theme === "light" ? LightTheme : DarkTheme;

  return (
    <>
      <ThemeProvider theme={Theme}>
        <BrowserRouter>
          <GlobalStyle></GlobalStyle>
          <Header theme={theme} setTheme={setTheme}></Header>
          <Routes>
            <Route exact path="/" element={<Home></Home>}></Route>
            <Route exact path="/login" element={<h1>helloUSER</h1>} />
            <Route exact path="/signin" element={<h1>SignIn</h1>} />
            <Route exact path="*" element={<PageNotFound />} />
          </Routes>
          <Footer></Footer>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
