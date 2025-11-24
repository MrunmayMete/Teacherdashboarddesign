import { ChevronDown, X, Check, Search, LogOut } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { students as allStudents } from '../data/dashboardData';
import { BIOLOGY_TOPICS } from '../constants/biologyTopics';

interface FilterBarProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel: 'low' | 'medium' | 'high' | null;
    learningMode: 'All' | 'Classroom' | 'Self-Learning';
  };
  setFilters: (filters: any) => void;
  currentPage: 'dashboard' | 'queries' | 'performance' | 'content' | 'notes';
  setCurrentPage: (page: 'dashboard' | 'queries' | 'performance' | 'content' | 'notes') => void;
  onLogout?: () => void;
}

const classes = ['All Classes', 'Grade 6A', 'Grade 6B', 'Grade 7A', 'Grade 7B', 'Grade 8A', 'Grade 8B'];
const subjects = ['Biology'];
const topics = ['All Topics', ...BIOLOGY_TOPICS];
const students = allStudents.map(s => s.name);
const learningModes = ['All', 'Classroom', 'Self-Learning'];

export function FilterBar({ filters, setFilters, currentPage, setCurrentPage, onLogout }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [searchQueries, setSearchQueries] = useState<{ [key: string]: string }>({
    class: '',
    subject: '',
    topic: '',
    learningMode: '',
    students: ''
  });

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleFilterChange = (filterType: string, value: string) => {
    if (filterType === 'topic') {
      // Set topic to null if "All Topics" is selected
      setFilters({ ...filters, topic: value === 'All Topics' ? null : value });
    } else {
      setFilters({ ...filters, [filterType]: value });
    }
    setOpenDropdown(null);
  };

  const handleStudentToggle = (student: string) => {
    const currentStudents = filters.students;
    if (currentStudents.includes(student)) {
      // Remove student
      const newStudents = currentStudents.filter(s => s !== student);
      setFilters({ ...filters, students: newStudents.length === 0 ? [] : newStudents });
    } else {
      // Add student
      setFilters({ ...filters, students: [...currentStudents, student] });
    }
  };

  const handleSelectAllStudents = () => {
    if (filters.students.length === students.length) {
      // Deselect all
      setFilters({ ...filters, students: [] });
    } else {
      // Select all
      setFilters({ ...filters, students: [...students] });
    }
  };

  const removeStudent = (student: string) => {
    const newStudents = filters.students.filter(s => s !== student);
    setFilters({ ...filters, students: newStudents });
  };

  const clearTopicFilter = () => {
    setFilters({ ...filters, topic: null });
  };

  const Dropdown = ({ label, options, value, filterType }: { label: string; options: string[]; value: string; filterType: string }) => {
    const filteredOptions = options.filter(option => 
      option.toLowerCase().includes(searchQueries[filterType].toLowerCase())
    );

    return (
      <div className="relative">
        <button
          onClick={() => {
            setOpenDropdown(openDropdown === filterType ? null : filterType);
            if (openDropdown !== filterType) {
              setSearchQueries({ ...searchQueries, [filterType]: '' });
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-600">{label}:</span>
          <span>{value}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        {openDropdown === filterType && (
          <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000]">
            {/* Search Bar */}
            <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQueries[filterType]}
                  onChange={(e) => setSearchQueries({ ...searchQueries, [filterType]: e.target.value })}
                  placeholder="Search..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>
            
            {/* Options List with scrollbar - max 5 items visible */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredOptions.length > 0 ? (
                filteredOptions.map((option) => (
                  <button
                    key={option}
                    onClick={() => {
                      handleFilterChange(filterType, option);
                      setSearchQueries({ ...searchQueries, [filterType]: '' });
                    }}
                    className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                      value === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    {option}
                  </button>
                ))
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">No results found</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  const MultiSelectDropdown = () => {
    const displayText = filters.students.length === 0 
      ? 'All Students' 
      : filters.students.length === 1 
      ? filters.students[0] 
      : `${filters.students.length} Students`;

    const filteredStudents = students.filter(student => 
      student.toLowerCase().includes(searchQueries.students.toLowerCase())
    );

    return (
      <div className="relative">
        <button
          onClick={() => {
            setOpenDropdown(openDropdown === 'students' ? null : 'students');
            if (openDropdown !== 'students') {
              setSearchQueries({ ...searchQueries, students: '' });
            }
          }}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-600">Students:</span>
          <span>{displayText}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        {openDropdown === 'students' && (
          <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-[10000]">
            {/* Search Bar */}
            <div className="sticky top-0 bg-white p-2 border-b border-gray-200 z-20">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  type="text"
                  value={searchQueries.students}
                  onChange={(e) => setSearchQueries({ ...searchQueries, students: e.target.value })}
                  placeholder="Search students..."
                  className="w-full pl-9 pr-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  onClick={(e) => e.stopPropagation()}
                />
              </div>
            </div>

            {/* Select All Option */}
            <button
              onClick={handleSelectAllStudents}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-200 text-gray-700 sticky top-[60px] bg-white z-10"
            >
              <div className="flex items-center gap-2">
                <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                  filters.students.length === students.length
                    ? 'bg-blue-600 border-blue-600'
                    : 'border-gray-300'
                }`}>
                  {filters.students.length === students.length && (
                    <Check className="w-3 h-3 text-white" />
                  )}
                </div>
                <span className={filters.students.length === students.length ? 'text-blue-600' : ''}>
                  Select All
                </span>
              </div>
            </button>
            
            {/* Individual Students with scrollbar - max 5 items visible */}
            <div className="max-h-[200px] overflow-y-auto">
              {filteredStudents.length > 0 ? (
                filteredStudents.map((student) => {
                  const isSelected = filters.students.includes(student);
                  return (
                    <button
                      key={student}
                      onClick={() => handleStudentToggle(student)}
                      className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-center gap-2">
                        <div className={`w-5 h-5 border-2 rounded flex items-center justify-center ${
                          isSelected
                            ? 'bg-blue-600 border-blue-600'
                            : 'border-gray-300'
                        }`}>
                          {isSelected && (
                            <Check className="w-3 h-3 text-white" />
                          )}
                        </div>
                        <span className={isSelected ? 'text-blue-600' : 'text-gray-700'}>
                          {student}
                        </span>
                      </div>
                    </button>
                  );
                })
              ) : (
                <div className="px-4 py-2 text-gray-500 text-sm">No students found</div>
              )}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="bg-white border-b border-gray-200 px-8 py-4 fixed top-0 left-0 right-0 z-[9999]">
      <div className="flex items-center justify-between gap-4">
        {/* Left side - Filters */}
        <div className="flex items-center gap-4 flex-wrap flex-1">
          <Dropdown label="Class" options={classes} value={filters.class} filterType="class" />
          <Dropdown label="Subject" options={subjects} value={filters.subject} filterType="subject" />
          <Dropdown label="Topic" options={topics} value={filters.topic || 'All Topics'} filterType="topic" />
          <Dropdown label="Mode" options={learningModes} value={filters.learningMode} filterType="learningMode" />
          <MultiSelectDropdown />
        </div>
        
        {/* Right side - Logout Button */}
        {onLogout && (
          <button
            onClick={onLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-500 text-white border border-red-500 rounded-lg hover:bg-red-600 transition-colors flex-shrink-0"
          >
            <LogOut className="w-4 h-4" />
            <span>Logout</span>
          </button>
        )}
      </div>
    </div>
  );
}