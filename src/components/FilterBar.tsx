import { ChevronDown, X, Check, Calendar as CalendarIcon, Clock } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { TeacherCalendar } from './TeacherCalendar';

interface FilterBarProps {
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

const classes = ['All Classes', 'Grade 6A', 'Grade 6B', 'Grade 7A', 'Grade 7B', 'Grade 8A', 'Grade 8B'];
const subjects = ['All Subjects', 'Biology', 'Molecular Biology', 'Anatomy & Physiology', 'Botany', 'Zoology', 'Microbiology', 'Ecology'];
const topics = ['All Topics', 'Cell Biology', 'Genetics', 'Evolution', 'Photosynthesis', 'Respiration', 'DNA Structure', 'Protein Synthesis', 'Mitosis', 'Meiosis', 'Ecosystems', 'Food Chains', 'Homeostasis'];
const students = ['Emma Johnson', 'Liam Smith', 'Olivia Brown', 'Noah Davis', 'Ava Wilson', 'Ethan Martinez', 'Sophia Anderson', 'Mason Taylor'];

export function FilterBar({ filters, setFilters, currentPage, setCurrentPage }: FilterBarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date());
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit' });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
  };

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

  const Dropdown = ({ label, options, value, filterType }: { label: string; options: string[]; value: string; filterType: string }) => (
    <div className="relative">
      <button
        onClick={() => setOpenDropdown(openDropdown === filterType ? null : filterType)}
        className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
      >
        <span className="text-gray-600">{label}:</span>
        <span>{value}</span>
        <ChevronDown className="w-4 h-4 text-gray-400" />
      </button>
      {openDropdown === filterType && (
        <div className="absolute top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-64 overflow-y-auto">
          {options.map((option) => (
            <button
              key={option}
              onClick={() => handleFilterChange(filterType, option)}
              className={`w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors ${
                value === option ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
              }`}
            >
              {option}
            </button>
          ))}
        </div>
      )}
    </div>
  );

  const MultiSelectDropdown = () => {
    const displayText = filters.students.length === 0 
      ? 'All Students' 
      : filters.students.length === 1 
      ? filters.students[0] 
      : `${filters.students.length} Students`;

    return (
      <div className="relative">
        <button
          onClick={() => setOpenDropdown(openDropdown === 'students' ? null : 'students')}
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
        >
          <span className="text-gray-600">Students:</span>
          <span>{displayText}</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </button>
        {openDropdown === 'students' && (
          <div className="absolute top-full mt-2 w-64 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-80 overflow-y-auto">
            {/* Select All Option */}
            <button
              onClick={handleSelectAllStudents}
              className="w-full text-left px-4 py-2 hover:bg-gray-50 transition-colors border-b border-gray-200 text-gray-700"
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
            
            {/* Individual Students */}
            {students.map((student) => {
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
            })}
          </div>
        )}
      </div>
    );
  };

  return (
    <div ref={dropdownRef} className="bg-white border-b border-gray-200 px-8 py-4 fixed top-0 left-0 right-0 z-40 overflow-x-hidden">
      <div className="flex items-center gap-4 flex-wrap">
        <Dropdown label="Class" options={classes} value={filters.class} filterType="class" />
        <Dropdown label="Subject" options={subjects} value={filters.subject} filterType="subject" />
        <Dropdown label="Topic" options={topics} value={filters.topic || 'All Topics'} filterType="topic" />
        <MultiSelectDropdown />
        
        {/* Display selected students as chips */}
        {filters.students.length > 0 && (
          <div className="flex items-center gap-2 flex-wrap">
            {filters.students.map((student) => (
              <div key={student} className="flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                <span>{student}</span>
                <button
                  onClick={() => removeStudent(student)}
                  className="hover:bg-blue-200 rounded-full p-0.5 transition-colors"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}
        
        {/* Time and Date beside filters */}
        <div className="ml-auto flex items-center gap-3 relative">
          <button
            onClick={() => setShowCalendar(!showCalendar)}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <CalendarIcon className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{formatDate(currentTime)}</span>
          </button>
          <div className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-300 rounded-lg">
            <Clock className="w-4 h-4 text-gray-400" />
            <span className="text-gray-600">{formatTime(currentTime)}</span>
          </div>
          
          {/* Calendar Dropdown */}
          {showCalendar && (
            <>
              <div className="absolute top-full right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-2xl z-50 w-[95vw] max-w-6xl max-h-[80vh] overflow-y-auto">
                <div className="flex justify-end p-2 border-b border-gray-200">
                  <button
                    onClick={() => setShowCalendar(false)}
                    className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-600" />
                  </button>
                </div>
                <TeacherCalendar />
              </div>
              <div 
                className="fixed inset-0 bg-black bg-opacity-20 z-40"
                onClick={() => setShowCalendar(false)}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}