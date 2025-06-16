import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { AppProvider } from "./context/GlobalContext";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import './index.css';
import "./styles/index.scss";
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AppProvider>
      <App />
    </AppProvider>
  </StrictMode>,
)