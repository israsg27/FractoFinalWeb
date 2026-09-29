import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css';
import './responsive.css';

const iosSafe=/iPad|iPhone|iPod/.test(navigator.userAgent);
document.documentElement.classList.toggle('ios-safe',iosSafe);

ReactDOM.createRoot(document.getElementById('root')!).render(<React.StrictMode><App /></React.StrictMode>);
