import { X, Clock, BookOpen, Edit3, MessageSquare, Coffee, AlertTriangle, RotateCcw, Info } from 'lucide-react';
import { useState } from 'react';

interface StudentTimelineProps {
  studentName: string;
  onClose: () => void;
}

interface TimelineSegment {
  activity: 'reading' | 'writing' | 'app-usage' | 'queries' | 'idle';
  startTime: string;
  endTime: string;
  duration: number; // in minutes
  details?: string;
}

interface TimelineEvent {
  time: string;
  type: 'confusion-spike' | 'repeated-query' | 'inactivity' | 'achievement';
  description: string;
  severity?: 'high' | 'medium' | 'low';
}

// Sample timeline data for different students
const studentTimelineData: { [key: string]: { segments: TimelineSegment[], events: TimelineEvent[] } } = {
  'Emma Johnson': {
    segments: [
      { activity: 'reading', startTime: '09:00', endTime: '09:25', duration: 25, details: 'Algebra textbook chapter 5' },
      { activity: 'writing', startTime: '09:25', endTime: '09:50', duration: 25, details: 'Practice problems 1-10' },
      { activity: 'queries', startTime: '09:50', endTime: '10:00', duration: 10, details: 'Asked 3 questions about quadratic equations' },
      { activity: 'app-usage', startTime: '10:00', endTime: '10:30', duration: 30, details: 'Interactive math simulations' },
      { activity: 'reading', startTime: '10:30', endTime: '10:50', duration: 20, details: 'Review notes' },
      { activity: 'writing', startTime: '10:50', endTime: '11:20', duration: 30, details: 'Completed quiz' },
      { activity: 'idle', startTime: '11:20', endTime: '11:25', duration: 5, details: 'Break' },
      { activity: 'app-usage', startTime: '11:25', endTime: '11:45', duration: 20, details: 'Video tutorials' },
    ],
    events: [
      { time: '09:55', type: 'repeated-query', description: 'Asked same question twice about factoring', severity: 'medium' },
      { time: '11:15', type: 'achievement', description: 'Completed quiz with 92%', severity: 'low' }
    ]
  },
  'Noah Davis': {
    segments: [
      { activity: 'reading', startTime: '09:00', endTime: '09:15', duration: 15, details: 'Fractions introduction' },
      { activity: 'queries', startTime: '09:15', endTime: '09:30', duration: 15, details: 'Asked 8 questions about denominators' },
      { activity: 'idle', startTime: '09:30', endTime: '09:45', duration: 15, details: 'Off-task' },
      { activity: 'app-usage', startTime: '09:45', endTime: '10:00', duration: 15, details: 'Watched tutorial' },
      { activity: 'queries', startTime: '10:00', endTime: '10:20', duration: 20, details: 'Asked 5 more questions about same concept' },
      { activity: 'writing', startTime: '10:20', endTime: '10:40', duration: 20, details: 'Practice problems' },
      { activity: 'idle', startTime: '10:40', endTime: '11:00', duration: 20, details: 'Extended break' },
      { activity: 'reading', startTime: '11:00', endTime: '11:20', duration: 20, details: 'Re-reading same section' },
      { activity: 'queries', startTime: '11:20', endTime: '11:35', duration: 15, details: 'More clarification questions' },
      { activity: 'writing', startTime: '11:35', endTime: '11:50', duration: 15, details: 'Homework attempt' },
    ],
    events: [
      { time: '09:20', type: 'confusion-spike', description: 'Cluster of 5 related queries in 10 minutes', severity: 'high' },
      { time: '10:10', type: 'repeated-query', description: 'Same question asked 3 times', severity: 'high' },
      { time: '10:40', type: 'inactivity', description: '20 minutes of inactivity', severity: 'medium' }
    ]
  },
  'Olivia Brown': {
    segments: [
      { activity: 'reading', startTime: '09:00', endTime: '09:35', duration: 35, details: 'Literature chapter analysis' },
      { activity: 'writing', startTime: '09:35', endTime: '10:15', duration: 40, details: 'Essay outline and draft' },
      { activity: 'queries', startTime: '10:15', endTime: '10:20', duration: 5, details: 'Quick citation question' },
      { activity: 'app-usage', startTime: '10:20', endTime: '10:35', duration: 15, details: 'Research sources' },
      { activity: 'writing', startTime: '10:35', endTime: '11:25', duration: 50, details: 'Essay completion' },
      { activity: 'reading', startTime: '11:25', endTime: '11:45', duration: 20, details: 'Peer review' },
    ],
    events: [
      { time: '11:20', type: 'achievement', description: 'Submitted essay early with high quality', severity: 'low' }
    ]
  },
  'Liam Smith': {
    segments: [
      { activity: 'reading', startTime: '09:00', endTime: '09:20', duration: 20, details: 'Science lab instructions' },
      { activity: 'app-usage', startTime: '09:20', endTime: '09:40', duration: 20, details: 'Virtual lab simulation' },
      { activity: 'queries', startTime: '09:40', endTime: '09:50', duration: 10, details: 'Safety procedure questions' },
      { activity: 'writing', startTime: '09:50', endTime: '10:25', duration: 35, details: 'Lab report observations' },
      { activity: 'idle', startTime: '10:25', endTime: '10:35', duration: 10, details: 'Break' },
      { activity: 'reading', startTime: '10:35', endTime: '10:50', duration: 15, details: 'Review experiment results' },
      { activity: 'queries', startTime: '10:50', endTime: '11:00', duration: 10, details: 'Data analysis questions' },
      { activity: 'writing', startTime: '11:00', endTime: '11:40', duration: 40, details: 'Lab report conclusion' },
    ],
    events: [
      { time: '09:45', type: 'repeated-query', description: 'Asked about same safety step twice', severity: 'low' },
      { time: '11:35', type: 'achievement', description: 'Completed comprehensive lab report', severity: 'low' }
    ]
  }
};

const activityConfig = {
  'reading': { color: 'bg-blue-500', label: 'Reading', icon: BookOpen },
  'writing': { color: 'bg-green-500', label: 'Writing', icon: Edit3 },
  'app-usage': { color: 'bg-purple-500', label: 'App Usage', icon: Clock },
  'queries': { color: 'bg-yellow-500', label: 'Queries', icon: MessageSquare },
  'idle': { color: 'bg-gray-400', label: 'Idle', icon: Coffee }
};

const eventConfig = {
  'confusion-spike': { color: 'text-red-600', bgColor: 'bg-red-100', icon: AlertTriangle },
  'repeated-query': { color: 'text-yellow-600', bgColor: 'bg-yellow-100', icon: RotateCcw },
  'inactivity': { color: 'text-gray-600', bgColor: 'bg-gray-100', icon: Coffee },
  'achievement': { color: 'text-green-600', bgColor: 'bg-green-100', icon: Info }
};

export function StudentTimeline({ studentName, onClose }: StudentTimelineProps) {
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);
  
  const data = studentTimelineData[studentName] || studentTimelineData['Emma Johnson'];
  const { segments, events } = data;

  // Calculate total time for each activity
  const activityTotals = segments.reduce((acc, seg) => {
    acc[seg.activity] = (acc[seg.activity] || 0) + seg.duration;
    return acc;
  }, {} as { [key: string]: number });

  // Find dominant activities
  const sortedActivities = Object.entries(activityTotals).sort((a, b) => b[1] - a[1]);
  const mostTimeSpent = sortedActivities[0];

  // Find confusion patterns
  const confusionEvents = events.filter(e => e.type === 'confusion-spike' || e.type === 'repeated-query');
  const inactivityEvents = events.filter(e => e.type === 'inactivity');

  // Generate insights
  const generateInsights = () => {
    const insights = [];
    
    if (mostTimeSpent) {
      const activity = activityConfig[mostTimeSpent[0] as keyof typeof activityConfig];
      insights.push(`Spent most time ${activity.label.toLowerCase()} (${mostTimeSpent[1]} minutes)`);
    }

    if (confusionEvents.length > 0) {
      insights.push(`${confusionEvents.length} confusion event${confusionEvents.length > 1 ? 's' : ''} detected`);
    }

    if (inactivityEvents.length > 0) {
      insights.push(`${inactivityEvents.length} period${inactivityEvents.length > 1 ? 's' : ''} of extended inactivity`);
    }

    const queryTime = activityTotals['queries'] || 0;
    if (queryTime > 30) {
      insights.push('High query volume - may need additional support');
    } else if (queryTime > 0) {
      insights.push('Active participation with questions');
    }

    return insights;
  };

  const insights = generateInsights();

  // Calculate total duration for timeline positioning
  const totalMinutes = segments.reduce((sum, seg) => sum + seg.duration, 0);

  // Convert time to minutes from start
  const timeToMinutes = (time: string) => {
    const [hours, minutes] = time.split(':').map(Number);
    const startHour = parseInt(segments[0].startTime.split(':')[0]);
    return (hours - startHour) * 60 + minutes;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between z-10">
          <div>
            <h2 className="text-gray-800 mb-1">{studentName} - Activity Timeline</h2>
            <p className="text-gray-500">Detailed view of learning activities and engagement patterns</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-2 hover:bg-gray-100 rounded-lg"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Insights Summary */}
        <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-b border-gray-200">
          <h3 className="text-gray-800 mb-3 flex items-center gap-2">
            <Info className="w-5 h-5 text-blue-600" />
            Key Insights
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
            {insights.map((insight, index) => (
              <div key={index} className="bg-white p-3 rounded-lg border border-gray-200">
                <p className="text-gray-700">{insight}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Timeline */}
        <div className="p-6">
          <h3 className="text-gray-800 mb-4">Activity Timeline</h3>
          
          {/* Time markers */}
          <div className="mb-2 flex justify-between text-xs text-gray-500 px-1">
            <span>{segments[0]?.startTime}</span>
            <span>{segments[segments.length - 1]?.endTime}</span>
          </div>

          {/* Timeline bar */}
          <div className="relative mb-8">
            <div className="flex h-16 rounded-lg overflow-hidden border border-gray-300 shadow-sm">
              {segments.map((segment, index) => {
                const widthPercent = (segment.duration / totalMinutes) * 100;
                const config = activityConfig[segment.activity];
                
                return (
                  <div
                    key={index}
                    className={`${config.color} relative cursor-pointer transition-all hover:brightness-110 flex items-center justify-center`}
                    style={{ width: `${widthPercent}%` }}
                    onMouseEnter={() => setHoveredSegment(index)}
                    onMouseLeave={() => setHoveredSegment(null)}
                  >
                    {segment.duration > 15 && (
                      <span className="text-white text-xs font-medium">{segment.duration}m</span>
                    )}
                    
                    {/* Tooltip */}
                    {hoveredSegment === index && (
                      <div className="absolute bottom-full mb-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap z-20 shadow-lg">
                        <div className="font-medium mb-1">{config.label}</div>
                        <div>{segment.startTime} - {segment.endTime}</div>
                        <div className="text-gray-300 mt-1">{segment.details}</div>
                        <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Event markers */}
            {events.map((event, index) => {
              const eventMinutes = timeToMinutes(event.time);
              const position = (eventMinutes / totalMinutes) * 100;
              const config = eventConfig[event.type];
              
              return (
                <div
                  key={index}
                  className="absolute -bottom-6 transform -translate-x-1/2 cursor-pointer group"
                  style={{ left: `${position}%` }}
                >
                  <div className={`${config.bgColor} ${config.color} p-1 rounded-full shadow-md`}>
                    <config.icon className="w-4 h-4" />
                  </div>
                  
                  {/* Event tooltip */}
                  <div className="absolute top-full mt-2 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs rounded-lg py-2 px-3 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 shadow-lg">
                    <div className="font-medium">{event.time}</div>
                    <div className="text-gray-300">{event.description}</div>
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Legend */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <h4 className="text-gray-700 mb-3">Activity Types</h4>
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-6">
              {Object.entries(activityConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`w-4 h-4 rounded ${config.color}`}></div>
                  <span className="text-gray-700">{config.label}</span>
                  <span className="text-gray-500">({activityTotals[key] || 0}m)</span>
                </div>
              ))}
            </div>

            <h4 className="text-gray-700 mb-3">Event Markers</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(eventConfig).map(([key, config]) => (
                <div key={key} className="flex items-center gap-2">
                  <div className={`${config.bgColor} ${config.color} p-1 rounded-full`}>
                    <config.icon className="w-3 h-3" />
                  </div>
                  <span className="text-gray-700 capitalize">{key.replace('-', ' ')}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed Event List */}
          {events.length > 0 && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <h4 className="text-gray-700 mb-3">Event Details</h4>
              <div className="space-y-2">
                {events.map((event, index) => {
                  const config = eventConfig[event.type];
                  return (
                    <div key={index} className={`${config.bgColor} p-3 rounded-lg flex items-start gap-3`}>
                      <div className={`${config.color} flex-shrink-0`}>
                        <config.icon className="w-5 h-5" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-800">{event.time}</span>
                          {event.severity && (
                            <span className={`text-xs px-2 py-0.5 rounded ${
                              event.severity === 'high' ? 'bg-red-200 text-red-700' :
                              event.severity === 'medium' ? 'bg-yellow-200 text-yellow-700' :
                              'bg-green-200 text-green-700'
                            }`}>
                              {event.severity}
                            </span>
                          )}
                        </div>
                        <p className="text-gray-700">{event.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
