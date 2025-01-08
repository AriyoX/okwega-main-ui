import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MentorDashboard } from './pages/MentorDashboard';
import { MenteeDashboard } from './pages/MenteeDashboard';
import { Header } from './components/Header';
import './index.css';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userRole = 'mentor';
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
              <Header 
                user={user} 
                onMenuClick={() => setIsSidebarOpen(true)} 
              />
              {userRole === 'mentor' ? (
                <MentorDashboard 
                  sidebarOpen={isSidebarOpen}
                  onSidebarClose={() => setIsSidebarOpen(false)}
                />
              ) : (
                <MenteeDashboard 
                  sidebarOpen={isSidebarOpen}
                  onSidebarClose={() => setIsSidebarOpen(false)}
                />
              )}
            </>
          } 
        />
      </Routes>
    </Router>
  );
}

export default App;