import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`

@font-face {
  font-family: "CustomFont";
  src: url("./Kajiro.ttf") format("truetype");
  /* You can specify multiple font formats for better compatibility */
}

*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Roboto', sans-serif;
    transition: background-color 0.4s, color 0.1s;
}

html{
    font-size: 62.5%;
}

body{
    background:  ${({ theme }) => theme.color.body.backgroundColor} ;
    color:  ${({ theme }) => theme.color.body.color} ;
    min-height:100vh;
    
}

/* #popup{
    position: fixed;
    top: 0;
    width: 100%;
    height: 100%;
    backdrop-filter: blur(10px);
} */


#popup{
    z-index: 999;
    position: relative;
    width: 100%;
    height: 100%;
}

.MainContainer{
    width: 100%;
    min-height: 100vh;
}

.buttonPrimary{
    background:#6674CC;
    border: .6px solid #fff;
    border-radius: 10px;
}
.buttonSecondary{
    background: rgb(255 255 255);
    border: .6px solid #fff;
    border-radius: 10px;
}

.Link{
    list-style: none;
    text-decoration: none;
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

.d-flex{
    display: flex;
    align-items: center;
    justify-content: space-between;
}
`;

export default GlobalStyle;
