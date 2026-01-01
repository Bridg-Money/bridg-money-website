import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { routes } from './routes';

const router = createBrowserRouter(routes);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App router={router} />
  </StrictMode>,
)
