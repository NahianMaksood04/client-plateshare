import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import AuthProvider from './contexts/AuthProvider';
import QueryProvider from './providers/QueryProvider';

ReactDOM.createRoot(document.getElementById('root')).render(
<React.StrictMode>
<QueryProvider>
<BrowserRouter>
<AuthProvider>
<App />
</AuthProvider>
</BrowserRouter>
</QueryProvider>
</React.StrictMode>
);

