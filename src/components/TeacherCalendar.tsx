import { useState } from 'react';
import { ChevronLeft, ChevronRight, X } from 'lucide-react';

interface TimetableEvent {
  id: string;
  class: string;
  subject: string;
  topic: string;
  startTime: string;
  endTime: string;
  room: string;
  day: number; // 0 = Sunday, 1 = Monday, etc.
}

const timetableEvents: TimetableEvent[] = [
  // Monday
  { id: '1', class: 'Grade 6A', subject: 'Biology', topic: 'Cell Structure', startTime: '08:00', endTime: '09:00', room: 'Lab 1', day: 1 },
  { id: '2', class: 'Grade 7A', subject: 'Molecular Biology', topic: 'DNA Structure', startTime: '09:30', endTime: '10:30', room: 'Lab 2', day: 1 },
  { id: '3', class: 'Grade 8A', subject: 'Ecology', topic: 'Ecosystems', startTime: '11:00', endTime: '12:00', room: 'Room 301', day: 1 },
  { id: '4', class: 'Grade 6B', subject: 'Biology', topic: 'Photosynthesis', startTime: '13:00', endTime: '14:00', room: 'Lab 1', day: 1 },
  
  // Tuesday
  { id: '5', class: 'Grade 7B', subject: 'Botany', topic: 'Plant Structure', startTime: '08:00', endTime: '09:00', room: 'Lab 3', day: 2 },
  { id: '6', class: 'Grade 6A', subject: 'Biology', topic: 'Cell Division', startTime: '09:30', endTime: '10:30', room: 'Lab 1', day: 2 },
  { id: '7', class: 'Grade 8B', subject: 'Genetics', topic: 'Mitosis', startTime: '11:00', endTime: '12:00', room: 'Lab 2', day: 2 },
  { id: '8', class: 'Grade 7A', subject: 'Anatomy & Physiology', topic: 'Respiration', startTime: '13:00', endTime: '14:00', room: 'Room 302', day: 2 },
  
  // Wednesday
  { id: '9', class: 'Grade 8A', subject: 'Microbiology', topic: 'Bacteria', startTime: '08:00', endTime: '09:00', room: 'Lab 4', day: 3 },
  { id: '10', class: 'Grade 6B', subject: 'Biology', topic: 'Food Chains', startTime: '09:30', endTime: '10:30', room: 'Room 301', day: 3 },
  { id: '11', class: 'Grade 7B', subject: 'Zoology', topic: 'Animal Behavior', startTime: '11:00', endTime: '12:00', room: 'Lab 3', day: 3 },
  { id: '12', class: 'Grade 8B', subject: 'Ecology', topic: 'Homeostasis', startTime: '14:00', endTime: '15:00', room: 'Room 303', day: 3 },
  
  // Thursday
  { id: '13', class: 'Grade 6A', subject: 'Biology', topic: 'Genetics', startTime: '08:00', endTime: '09:00', room: 'Lab 1', day: 4 },
  { id: '14', class: 'Grade 7A', subject: 'Molecular Biology', topic: 'Protein Synthesis', startTime: '09:30', endTime: '10:30', room: 'Lab 2', day: 4 },
  { id: '15', class: 'Grade 8A', subject: 'Biology', topic: 'Evolution', startTime: '11:00', endTime: '12:00', room: 'Room 301', day: 4 },
  { id: '16', class: 'Grade 6B', subject: 'Botany', topic: 'Photosynthesis', startTime: '13:00', endTime: '14:00', room: 'Lab 3', day: 4 },
  
  // Friday
  { id: '17', class: 'Grade 7B', subject: 'Anatomy & Physiology', topic: 'Circulatory System', startTime: '08:00', endTime: '09:00', room: 'Room 302', day: 5 },
  { id: '18', class: 'Grade 8B', subject: 'Biology', topic: 'Meiosis', startTime: '09:30', endTime: '10:30', room: 'Lab 2', day: 5 },
  { id: '19', class: 'Grade 6A', subject: 'Ecology', topic: 'Food Chains', startTime: '11:00', endTime: '12:00', room: 'Room 301', day: 5 },
  { id: '20', class: 'Grade 7A', subject: 'Biology', topic: 'Cell Biology', startTime: '13:00', endTime: '14:00', room: 'Lab 1', day: 5 },
];

export function TeacherCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    return new Date(year, month, 1).getDay();
  };

  const previousMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setCurrentDate(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1));
  };

  const isToday = (day: number) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentDate.getMonth() === today.getMonth() &&
      currentDate.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (day: number) => {
    if (!selectedDate) return false;
    return (
      day === selectedDate.getDate() &&
      currentDate.getMonth() === selectedDate.getMonth() &&
      currentDate.getFullYear() === selectedDate.getFullYear()
    );
  };

  const handleDateClick = (day: number) => {
    const newDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newDate);
  };

  const getEventsForDate = (day: number) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayOfWeek = date.getDay();
    return timetableEvents.filter(event => event.day === dayOfWeek);
  };

  const hasEvents = (day: number) => {
    return getEventsForDate(day).length > 0;
  };

  const daysInMonth = getDaysInMonth(currentDate);
  const firstDayOfMonth = getFirstDayOfMonth(currentDate);
  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const days = [];
  for (let i = 0; i < firstDayOfMonth; i++) {
    days.push(<div key={`empty-${i}`} className="aspect-square" />);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    days.push(day);
  }

  const selectedDateEvents = selectedDate ? getEventsForDate(selectedDate.getDate()) : [];

  return (
    <div className="p-6">
      <div className="flex gap-6">
        {/* Calendar Grid */}
        <div className="flex-1">
          {/* Calendar Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-gray-800">
              {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
            </h2>
            <div className="flex gap-2">
              <button
                onClick={previousMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronLeft className="w-5 h-5 text-gray-600" />
              </button>
              <button
                onClick={nextMonth}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
              >
                <ChevronRight className="w-5 h-5 text-gray-600" />
              </button>
            </div>
          </div>

          {/* Day Names */}
          <div className="grid grid-cols-7 gap-2 mb-2">
            {dayNames.map(day => (
              <div key={day} className="text-center text-gray-600 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar Days */}
          <div className="grid grid-cols-7 gap-2">
            {days.map((day, index) => {
              if (typeof day !== 'number') {
                return day;
              }
              return (
                <button
                  key={index}
                  onClick={() => handleDateClick(day)}
                  className={`aspect-square p-2 rounded-lg transition-colors relative ${
                    isToday(day)
                      ? 'bg-blue-600 text-white hover:bg-blue-700'
                      : isSelected(day)
                      ? 'bg-blue-100 text-blue-600 hover:bg-blue-200'
                      : 'hover:bg-gray-100 text-gray-700'
                  }`}
                >
                  <span>{day}</span>
                  {hasEvents(day) && !isToday(day) && (
                    <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-4 flex items-center gap-4 text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 bg-blue-600 rounded" />
              <span>Today</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-blue-600 rounded relative">
                <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
              </div>
              <span>Has Classes</span>
            </div>
          </div>
        </div>

        {/* Timetable Sidebar */}
        <div className="w-96 border-l border-gray-200 pl-6">
          <h3 className="text-gray-800 mb-4">
            {selectedDate 
              ? `Schedule for ${selectedDate.toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}`
              : 'Select a date to view schedule'}
          </h3>
          
          {selectedDateEvents.length > 0 ? (
            <div className="space-y-3 max-h-[500px] overflow-y-auto">
              {selectedDateEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg"
                >
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-blue-600 px-2 py-1 bg-blue-100 rounded text-sm">
                      {event.startTime} - {event.endTime}
                    </span>
                    <span className="text-gray-600 text-sm">{event.room}</span>
                  </div>
                  <h4 className="text-gray-800 mb-1">{event.class}</h4>
                  <p className="text-gray-600 mb-1">{event.subject}</p>
                  <p className="text-gray-500">Topic: {event.topic}</p>
                </div>
              ))}
            </div>
          ) : selectedDate ? (
            <div className="text-center py-8 text-gray-500">
              <p>No classes scheduled for this day</p>
            </div>
          ) : (
            <div className="text-center py-8 text-gray-400">
              <p>Click on a date to view your class schedule</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
