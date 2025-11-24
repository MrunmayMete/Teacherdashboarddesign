import { useState, useEffect } from 'react';
import { LayoutDashboard, MessageSquare, TrendingUp, BookOpen, FileText } from 'lucide-react';
import { biologyTopics, students, queryData, noteData, contentScanData } from '../data/dashboardData';

interface SidebarProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
  };
  setFilters: (filters: any) => void;
  currentPage: 'dashboard' | 'queries' | 'performance' | 'content' | 'notes';
  setCurrentPage: (page: 'dashboard' | 'queries' | 'performance' | 'content' | 'notes') => void;
}

export function Sidebar({ filters, setFilters, currentPage, setCurrentPage }: SidebarProps) {
  return (
    <div className="w-64 bg-white border-r border-gray-200 h-[calc(100vh-72px)] p-6 fixed top-[72px] left-0 overflow-y-auto">
      {/* Navigation Links */}
      <div>
        <h3 className="text-gray-800 mb-4">Navigation</h3>
        <div className="space-y-2">
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              currentPage === 'dashboard' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCurrentPage('dashboard')}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span>Dashboard</span>
          </button>
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              currentPage === 'queries' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCurrentPage('queries')}
          >
            <MessageSquare className="w-5 h-5" />
            <span>Query Analysis</span>
          </button>
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              currentPage === 'performance' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCurrentPage('performance')}
          >
            <TrendingUp className="w-5 h-5" />
            <span>Performance</span>
          </button>
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              currentPage === 'content' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCurrentPage('content')}
          >
            <BookOpen className="w-5 h-5" />
            <span>Content Scanned</span>
          </button>
          <button
            className={`w-full flex items-center gap-3 p-3 rounded-lg transition-all ${
              currentPage === 'notes' 
                ? 'bg-blue-600 text-white' 
                : 'text-gray-700 hover:bg-gray-50'
            }`}
            onClick={() => setCurrentPage('notes')}
          >
            <FileText className="w-5 h-5" />
            <span>Notes</span>
          </button>
        </div>
      </div>
    </div>
  );
}