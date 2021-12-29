import styled, { createGlobalStyle } from 'styled-components'
import BGImage from './images/bg.jpg'
export const GlobalStyle  = createGlobalStyle`
    html {
        height: 100vh;
    }
    body {
        background-image: url(${BGImage});
        background-size: cover;
        display: flex;
        justify-content: center;
        align-items:center;
        margin: 
    }

    * {
        box-size: border-box;
        font-family: "Roboto", sans-serif;
    }

    button {
        border: none;
        border-radius: 4px;
        padding: 20px;
    }

    button:hover {
        opacity: .8;
    }
`

export const QuizContainer = styled.div`
    margin-top: 60px;
    display: flex;
    flex-direction: column;
    background: #fff;
    width: 500px;
    height: 500px;
    text-align: center;
    border: .15rem solid #000;
    border-radius:4px;
    padding: 10px;
    box-shadow:  30px -16px rgba(0, 0, 255, .2);
    h1 {
        font-size: 2rem;
        font-weight : 200;
    }

    .loader {
        color: teal;
    }

    .start {
        margin-top: 50px;
        background: rgba(0, 0, 255, .3)
    }

    .score {
        font-weight: 400;
        font-size: 1.2rem;
        letter-spacing: 1px;
    }
`