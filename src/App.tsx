import React, { useState } from 'react';
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
import ResourcesPage from './pages/ResourcesPage';
import MenteePage from './pages/MenteesPage';
import CreateLearningPath from './pages/CreateLearningPath';
import ViewLearningPath from './pages/ViewLearningPath'; 
import { MentorSessionsPage } from './pages/SessionsMentor'
import EditLearningPath from './pages/EditLearningPath';
import MentorAnalytics from './pages/MentorAnalytics';
import SettingsPage from './pages/SettingsMentorPage';
import MenteeSettingsPage from './pages/SettingsPageMentee';
import PaymentsPage from './pages/PaymentsPage';
import MentorPaymentsPage from './pages/PaymentsPageMentor';

function App() {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [userRole, setUserRole] = useState<'mentor' | 'mentee'>('mentor'); // Initialize with 'mentor'
    const user = {
        name: 'John Doe',
        avatar: undefined,
    };

    const toggleUserRole = () => {
        setUserRole(prevRole => (prevRole === 'mentor' ? 'mentee' : 'mentor'));
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
                    onToggleRole={toggleUserRole} 
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
                    path="/sessions-mentor"
                    element={
                        <Layout>
                            <MentorSessionsPage />
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
                 <Route
                    path="/resources"
                    element={
                        <Layout>
                            <ResourcesPage />
                        </Layout>
                    }
                />
                 <Route
                    path="/analytics"
                    element={
                        <Layout>
                            <MentorAnalytics />
                        </Layout>
                    }
                />
                 <Route
                    path="/mentees"
                    element={
                        <Layout>
                            <MenteePage />
                        </Layout>
                    }
                />
                <Route
                    path="/settings-mentor"
                    element={
                        <Layout>
                            <SettingsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/settings"
                    element={
                        <Layout>
                            <MenteeSettingsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/payments"
                    element={
                        <Layout>
                            <PaymentsPage />
                        </Layout>
                    }
                />
                <Route
                    path="/payments-mentor"
                    element={
                        <Layout>
                            <MentorPaymentsPage />
                        </Layout>
                    }
                />
                <Route 
                    path="mentees/:menteeId/learning-path/create" 
                    element={
                        <Layout>
                          <CreateLearningPath />
                        </Layout>
                      }
                  />
                  <Route 
                    path="mentees/:menteeId/learning-path/edit" 
                    element={
                        <Layout>
                          <EditLearningPath />
                        </Layout>
                      }
                  />
                <Route 
                    path="mentees/:menteeId/learning-path/" 
                    element={
                        <Layout>
                          <ViewLearningPath />
                        </Layout>
                      }
                  />
            </Routes>
        </Router>
    );
}

export default App;