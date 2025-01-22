import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { MentorDashboard } from './pages/MentorDashboard';
import { MenteeDashboard } from './pages/MenteeDashboard';
import { SessionsPage } from './pages/SessionsPage';
import { FindMentors } from './pages/FindMentors';
import { CalendarPage } from './pages/CalendarPage';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import './index.css';
import LearningPathPage from './pages/LearningPathPage';
import MessagesPage from './pages/MessagePage';

function App() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const userRole = 'mentee';
  const user = {
    name: 'John Doe',
    avatar: undefined
  };

  const Layout = ({ children }: { children: React.ReactNode }) => (
    <div className="min-h-screen">
      <Header
        user={user}
        onMenuClick={() => setIsSidebarOpen(true)}
      />
      <div className="flex pt-16">
        <Sidebar
          role={userRole}
          user={user}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>
    </div>
  );

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              {userRole === 'mentor' ? (
                <MentorDashboard />
              ) : (
                <MenteeDashboard />
              )}
            </Layout>
          }
        />
        <Route
          path="/mentors"
          element={
            <Layout>
              <FindMentors />
            </Layout>
          }
        />
        <Route
          path="/sessions"
          element={
            <Layout>
              <SessionsPage />
            </Layout>
          }
        />
        <Route
          path="/calendar"
          element={
            <Layout>
              <CalendarPage />
            </Layout>
          }
        />
        <Route
          path="/learning-path"
          element={
            <Layout>
              <LearningPathPage />
            </Layout>
          }
        />
        <Route
          path="/messages"
          element={
            <Layout>
              <MessagesPage />
            </Layout>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;