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
                />
                <main className="flex-1 overflow-y-auto p-6">
                     {/* Role Toggle Button */}
                    <div className="mb-4 text-right">
                      <button
                        onClick={toggleUserRole}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                      >
                        Switch to {userRole === 'mentor' ? 'Mentee' : 'Mentor'}
                      </button>
                    </div>
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
                 <Route
                    path="/resources"
                    element={
                        <Layout>
                            <ResourcesPage />
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
            </Routes>
        </Router>
    );
}

export default App;