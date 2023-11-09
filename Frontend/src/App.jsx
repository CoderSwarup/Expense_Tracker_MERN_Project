import { ThemeProvider } from "styled-components";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import GlobalStyle from "./Styles/GlobalStyle";
import Header from "./Components/Header";
import Home from "./Pages/Home";
import { useState } from "react";
import { DarkTheme, LightTheme } from "./Styles/ThemeConfig";

function App() {
  const [theme, setTheme] = useState("light");
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
            <Route exact path="*" element={<h1>PAGE NOT FOUND</h1>} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </>
  );
}

export default App;
