
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css'
import ChatBot from './ChatBot'

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/chat" replace />} />
        <Route path="/:slug" element={<ChatBot />} />
      </Routes>
    </Router>
  )
}

export default App
