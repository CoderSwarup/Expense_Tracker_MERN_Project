import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    transition: background-color 0.5s, color 0.5s;
}

html{
    font-size: 62.5%;
}

body{
    /* background: ; */
    min-height:100vh;
}

::-webkit-scrollbar{
    width: 10px;
}


::-webkit-scrollbar-track{
    background: #e188ff;
}

::-webkit-scrollbar-thumb{
    background: #8b008b;
    border-radius:10px;
    border: 5px solid transparent;
}


`;

export default GlobalStyle;
