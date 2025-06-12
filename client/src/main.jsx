import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import StudentLoginContext from './components/contexts/StudentLoginContext.jsx'
import TutorLoginContext from './components/contexts/TutorLoginContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TutorLoginContext>
      <StudentLoginContext>
      <App />
    </StudentLoginContext>
    </TutorLoginContext>
  </StrictMode>,
)
