import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import NotFoundPage from './NotFoundPage.jsx'
import Dashboard from './Dashboard.jsx'
import Topbar from './Topbar.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    {/* <App /> */}
    <Dashboard/>
    {/* <NotFoundPage/> */}
  </StrictMode>,
)
