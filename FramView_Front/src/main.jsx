import { StrictMode } from 'react'
import {BrowserRouter, Route, Routes} from 'react-router';
import { createRoot } from 'react-dom/client'
import './App.css'
import App from './App.jsx'
import { ResultPage } from './pages/ResultPage';

createRoot(document.getElementById('root')).render(
  <StrictMode>
      <BrowserRouter>
      <Routes>
      <Route path= "/" element={ <App />} />
      <Route path= "/result" element={ < ResultPage />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
)