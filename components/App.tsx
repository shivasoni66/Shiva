
import React, { useState, useEffect } from 'react';
import { generateInitialData } from '../services/geminiService';
// Fix: Moved ToastType and ShowToastFunction to types.ts for better code organization.
import type { User, Job, Event, Alumni, AlumniUser, ToastType, ShowToastFunction } from '../types';
import type { Page } from '../constants';
import Header from './Header';
import Sidebar from './Sidebar';
import Dashboard from './Dashboard';
import AlumniDirectory from './AlumniDirectory';
import Mentorship from './Mentorship';
import Jobs from './Jobs';
import Events from './Events';
import Spinner from './Spinner';
import Toast from './Toast';
import LoginPage from './LoginPage';
import ProfilePage from './ProfilePage';
import AdminPanel from './AdminPanel';

function App() {
  const [appData, setAppData] = useState<{ alumni: Alumni[], jobs: Job[], events: Event[] } | null>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  useEffect(() => {
    const loadInitialData = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const initialData = await generateInitialData();
        setAppData(initialData);
      } catch (err) {
        setError('Failed to load application data. Please check your API key and try again.');
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };
    loadInitialData();
  }, []);

  const showToast: ShowToastFunction = (message, type) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    setCurrentPage('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentPage('dashboard');
  };

  const handleDeleteAlumni = (id: number) => {
    setAppData(prev => prev ? ({ ...prev, alumni: prev.alumni.filter(a => a.id !== id) }) : null);
    showToast('Alumni profile deleted successfully.', 'info');
  };

  const handleAddJob = (job: Omit<Job, 'id'>) => {
    setAppData(prev => {
      if (!prev) return null;
      const newJob = { ...job, id: Date.now() };
      return { ...prev, jobs: [newJob, ...prev.jobs] };
    });
    showToast('Job posting added successfully.', 'success');
  };

  const handleDeleteJob = (id: number) => {
    setAppData(prev => prev ? ({ ...prev, jobs: prev.jobs.filter(j => j.id !== id) }) : null);
    showToast('Job posting deleted successfully.', 'info');
  };

  const handleAddEvent = (event: Omit<Event, 'id'>) => {
    setAppData(prev => {
      if (!prev) return null;
      const newEvent = { ...event, id: Date.now() };
      return { ...prev, events: [newEvent, ...prev.events] };
    });
    showToast('Event added successfully.', 'success');
  };

  const handleDeleteEvent = (id: number) => {
    setAppData(prev => prev ? ({ ...prev, events: prev.events.filter(e => e.id !== id) }) : null);
    showToast('Event deleted successfully.', 'info');
  };

  const renderPage = () => {
      if (!appData || !currentUser) return null;

      switch (currentPage) {
          case 'dashboard':
              return <Dashboard user={currentUser} alumni={appData.alumni} jobs={appData.jobs} events={appData.events} showToast={showToast} onNavigate={setCurrentPage} />;
          case 'directory':
              return <AlumniDirectory alumni={appData.alumni} showToast={showToast} />;
          case 'mentorship':
              return <Mentorship alumni={appData.alumni} showToast={showToast} />;
          case 'jobs':
              return <Jobs jobs={appData.jobs} showToast={showToast} />;
          case 'events':
              return <Events events={appData.events} showToast={showToast} />;
          case 'profile':
              return currentUser.role === 'alumni' ? <ProfilePage user={currentUser as AlumniUser} /> : <div>Access Denied</div>;
          case 'admin':
               return currentUser.role === 'admin' ? <AdminPanel data={appData} onDeleteAlumni={handleDeleteAlumni} onAddJob={handleAddJob} onDeleteJob={handleDeleteJob} onAddEvent={handleAddEvent} onDeleteEvent={handleDeleteEvent} showToast={showToast} /> : <div>Access Denied</div>;
          default:
              return <div>Page not found</div>;
      }
  };

  if (isLoading) {
      return <div className="min-h-screen flex items-center justify-center"><Spinner /></div>;
  }
  
  if (error) {
      return <div className="min-h-screen flex items-center justify-center text-center text-red-500 p-8"><p>{error}</p></div>;
  }

  if (!currentUser) {
      return <LoginPage onLogin={handleLogin} alumni={appData?.alumni ?? []} showToast={showToast} />;
  }
  
  return (
    <div className="bg-slate-100 min-h-screen">
      <Toast toast={toast} onClose={() => setToast(null)} />
      <Header 
        user={currentUser} 
        onLogout={handleLogout} 
        onToggleSidebar={() => setSidebarOpen(!isSidebarOpen)} 
        onNavigate={setCurrentPage}
      />
      <div className="flex">
        <Sidebar 
          currentPage={currentPage} 
          onNavigate={setCurrentPage} 
          isOpen={isSidebarOpen} 
          onClose={() => setSidebarOpen(false)}
          showToast={showToast}
          userRole={currentUser.role}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 transition-all duration-300">
          {renderPage()}
        </main>
      </div>
    </div>
  );
}

export default App;