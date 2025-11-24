import { useState, useEffect } from 'react';
import { FilterBar } from './components/FilterBar';
import { Sidebar } from './components/Sidebar';
import { DashboardContent } from './components/DashboardContent';
import { QueryAnalysisPage } from './components/QueryAnalysisPage';
import { PerformancePage } from './components/PerformancePage';
import { ContentScannedPage } from './components/ContentScannedPage';
import { NotesPage } from './components/NotesPage';
import { ChatBot } from './components/ChatBot';
import { StudentQuestionsPanel } from './components/StudentQuestionsPanel';
import { Login } from './components/Login';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [filters, setFilters] = useState({
    class: 'All Classes',
    subject: 'Biology',
    students: [] as string[],
    topic: null as string | null,
    engagementLevel: null as 'low' | 'medium' | 'high' | null,
    learningMode: 'All' as 'All' | 'Classroom' | 'Self-Learning'
  });
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'queries' | 'performance' | 'content' | 'notes'>('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Reset filters and page on logout
    setFilters({
      class: 'All Classes',
      subject: 'Biology',
      students: [],
      topic: null,
      engagementLevel: null,
      learningMode: 'All'
    });
    setCurrentPage('dashboard');
  };

  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-[72px] overflow-x-hidden">
      {/* Filter Bar */}
      <FilterBar 
        filters={filters} 
        setFilters={setFilters} 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage}
        onLogout={handleLogout}
      />

      <div className="flex relative">
        {/* Fixed Sidebar */}
        <div className="w-64 flex-shrink-0">
          <Sidebar filters={filters} setFilters={setFilters} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {currentPage === 'dashboard' ? (
            <DashboardContent filters={filters} setFilters={setFilters} />
          ) : currentPage === 'queries' ? (
            <QueryAnalysisPage filters={filters} />
          ) : currentPage === 'performance' ? (
            <PerformancePage filters={filters} setFilters={setFilters} />
          ) : currentPage === 'content' ? (
            <ContentScannedPage filters={filters} setFilters={setFilters} />
          ) : (
            <NotesPage filters={filters} setFilters={setFilters} />
          )}
        </div>
      </div>
      <ChatBot filters={filters} />
      <StudentQuestionsPanel filters={filters} />
    </div>
  );
}