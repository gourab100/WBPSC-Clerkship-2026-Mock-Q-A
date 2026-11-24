import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

if (typeof window !== 'undefined') {
  window.addEventListener('unhandledrejection', (event) => {
    const reasonText = String(
      event.reason?.message || event.reason || ''
    ).toLowerCase();
    if (
      reasonText.includes('websocket') ||
      reasonText.includes('vite') ||
      reasonText.includes('hmr')
    ) {
      event.preventDefault();
    }
  });
}

createRoot(document.getElementById('root')!).render(<App />);
