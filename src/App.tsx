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
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function App() {
  const [filters, setFilters] = useState({
    class: 'All Classes',
    subject: 'All Subjects',
    students: [] as string[],
    topic: null as string | null
  });
  const [currentPage, setCurrentPage] = useState<'dashboard' | 'queries' | 'performance' | 'content' | 'notes'>('dashboard');

  return (
    <div className="min-h-screen bg-gray-50 pt-[140px] overflow-x-hidden">
      {/* Filter Bar */}
      <FilterBar filters={filters} setFilters={setFilters} currentPage={currentPage} setCurrentPage={setCurrentPage} />

      <div className="flex relative">
        {/* Fixed Sidebar */}
        <div className="w-56 flex-shrink-0">
          <Sidebar filters={filters} setFilters={setFilters} currentPage={currentPage} setCurrentPage={setCurrentPage} />
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {currentPage === 'dashboard' ? (
            <DashboardContent filters={filters} setFilters={setFilters} />
          ) : currentPage === 'queries' ? (
            <QueryAnalysisPage filters={filters} />
          ) : currentPage === 'performance' ? (
            <PerformancePage filters={filters} />
          ) : currentPage === 'content' ? (
            <ContentScannedPage filters={filters} />
          ) : (
            <NotesPage filters={filters} />
          )}
        </div>
      </div>
      <ChatBot filters={filters} />
      <StudentQuestionsPanel filters={filters} />
    </div>
  );
}