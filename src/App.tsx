import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MentorDashboard } from './pages/MentorDashboard';
import { MenteeDashboard } from './pages/MenteeDashboard';
import './index.css'; // Add this import

function App() {
  // In a real app, this would be determined by authentication
  const userRole = 'mentor'; // or 'mentee'

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={userRole === 'mentor' ? <MentorDashboard /> : <MenteeDashboard />} 
        />
      </Routes>
    </Router>
  );
}

export default App;