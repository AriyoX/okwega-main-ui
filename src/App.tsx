import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MentorDashboard } from './pages/MentorDashboard';
import { MenteeDashboard } from './pages/MenteeDashboard';
import { Header } from './components/Header';
import './index.css';

function App() {
  const userRole = 'mentee';
  const user = {
    name: 'John Doe',
    avatar: undefined
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            <>
              <Header user={user} />
              {userRole === 'mentor' ? <MentorDashboard /> : <MenteeDashboard />}
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;