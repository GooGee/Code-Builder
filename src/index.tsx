import React from 'react'
import ReactDOM from 'react-dom'
import 'reactjs-popup/dist/index.css'
import './asset/style.css'
import App from './App'
import reportWebVitals from './reportWebVitals'
import state from './state'

ReactDOM.render(
    <React.StrictMode>
        <App state={state} />
    </React.StrictMode>,
    document.getElementById('root'),
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
