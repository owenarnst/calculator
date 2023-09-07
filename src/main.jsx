import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <p id="info" className="text-center mt-2 text-light">Built with React 18 and Bootstrap 5. Coded by Owen Arnst.</p>
  </React.StrictMode>,
)
