import { Brain, Video, HelpCircle, AlertTriangle, TrendingUp, Clock, CheckCircle } from 'lucide-react';

interface ClassInsightsProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
  };
}

interface StudentActivity {
  name: string;
  doubtsAsked: number;
  videosWatched: number;
  timeSpent: string;
  strugglingWith: string[];
  status: 'struggling' | 'improving' | 'confident';
  lastActivity: string;
}

interface TopicStruggle {
  topic: string;
  studentsAffected: number;
  avgDoubts: number;
  severity: 'high' | 'medium' | 'low';
}

// Mock data for student activities
const studentActivitiesData: StudentActivity[] = [
  {
    name: 'Emma Johnson',
    doubtsAsked: 5,
    videosWatched: 8,
    timeSpent: '2.5 hrs',
    strugglingWith: ['Quadratic Equations'],
    status: 'improving',
    lastActivity: '15 mins ago'
  },
  {
    name: 'Liam Smith',
    doubtsAsked: 12,
    videosWatched: 15,
    timeSpent: '3.2 hrs',
    strugglingWith: ['Calculus', 'Geometry'],
    status: 'struggling',
    lastActivity: '30 mins ago'
  },
  {
    name: 'Olivia Brown',
    doubtsAsked: 3,
    videosWatched: 10,
    timeSpent: '2.8 hrs',
    strugglingWith: [],
    status: 'confident',
    lastActivity: '1 hour ago'
  },
  {
    name: 'Noah Davis',
    doubtsAsked: 8,
    videosWatched: 6,
    timeSpent: '1.8 hrs',
    strugglingWith: ['Fractions', 'Algebra'],
    status: 'struggling',
    lastActivity: '45 mins ago'
  },
  {
    name: 'Ava Wilson',
    doubtsAsked: 4,
    videosWatched: 12,
    timeSpent: '3.0 hrs',
    strugglingWith: ['Statistics'],
    status: 'improving',
    lastActivity: '20 mins ago'
  },
  {
    name: 'Ethan Martinez',
    doubtsAsked: 6,
    videosWatched: 9,
    timeSpent: '2.3 hrs',
    strugglingWith: ['Geometry'],
    status: 'improving',
    lastActivity: '1 hour ago'
  }
];

const topicStruggles: TopicStruggle[] = [
  { topic: 'Calculus', studentsAffected: 8, avgDoubts: 9.5, severity: 'high' },
  { topic: 'Geometry', studentsAffected: 6, avgDoubts: 7.2, severity: 'high' },
  { topic: 'Algebra', studentsAffected: 5, avgDoubts: 6.5, severity: 'medium' },
  { topic: 'Fractions', studentsAffected: 4, avgDoubts: 5.8, severity: 'medium' },
  { topic: 'Statistics', studentsAffected: 3, avgDoubts: 4.2, severity: 'low' },
];

export function ClassInsights({ filters }: ClassInsightsProps) {
  // Filter activities based on selected student
  const getFilteredActivities = () => {
    if (filters.students.length > 0) {
      return studentActivitiesData.filter(s => filters.students.includes(s.name));
    }
    return studentActivitiesData;
  };

  const filteredActivities = getFilteredActivities();

  // Calculate insights
  const totalDoubts = filteredActivities.reduce((sum, s) => sum + s.doubtsAsked, 0);
  const totalVideos = filteredActivities.reduce((sum, s) => sum + s.videosWatched, 0);
  const strugglingStudents = filteredActivities.filter(s => s.status === 'struggling').length;
  const improvingStudents = filteredActivities.filter(s => s.status === 'improving').length;

  const getStatusColor = (status: string) => {
    if (status === 'confident') return 'text-green-600 bg-green-100';
    if (status === 'improving') return 'text-blue-600 bg-blue-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'confident') return <CheckCircle className="w-4 h-4" />;
    if (status === 'improving') return <TrendingUp className="w-4 h-4" />;
    return <AlertTriangle className="w-4 h-4" />;
  };

  const getSeverityColor = (severity: string) => {
    if (severity === 'high') return 'bg-red-500';
    if (severity === 'medium') return 'bg-yellow-500';
    return 'bg-green-500';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <div className="flex items-center gap-3 mb-4">
          <Brain className="w-6 h-6 text-purple-600" />
          <h2 className="text-gray-900">Class Insights</h2>
        </div>
        <p className="text-gray-600">
          AI-powered insights into student learning behavior, engagement patterns, and areas requiring attention
        </p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-6">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Doubts</span>
            <HelpCircle className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-blue-600 mb-1">{totalDoubts}</div>
          <div className="text-gray-500">Questions asked</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Videos Watched</span>
            <Video className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-green-600 mb-1">{totalVideos}</div>
          <div className="text-gray-500">Learning materials</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Struggling</span>
            <AlertTriangle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-red-600 mb-1">{strugglingStudents} students</div>
          <div className="text-gray-500">Need attention</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Improving</span>
            <TrendingUp className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-blue-600 mb-1">{improvingStudents} students</div>
          <div className="text-gray-500">Showing progress</div>
        </div>
      </div>

      {/* Student Activity Details */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-800">Individual Student Behavior</h3>
        </div>
        
        {/* Learning Behavior Inference - Moved above the table */}
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <h4 className="text-blue-900 mb-2">Learning Behavior Insights</h4>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Students who ask more doubts (8+) are actively engaging but may need targeted intervention on specific topics</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>High video consumption paired with high doubts indicates students are self-learning but encountering conceptual gaps</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span>Students with low engagement (fewer doubts and videos) may require motivation or are already confident with the material</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Recommendation:</strong> Focus additional support on Liam Smith and Noah Davis who show high struggle patterns</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Student</th>
                <th className="px-6 py-4 text-left text-gray-600">Doubts Asked</th>
                <th className="px-6 py-4 text-left text-gray-600">Videos Watched</th>
                <th className="px-6 py-4 text-left text-gray-600">Time Spent</th>
                <th className="px-6 py-4 text-left text-gray-600">Struggling With</th>
                <th className="px-6 py-4 text-left text-gray-600">Status</th>
                <th className="px-6 py-4 text-left text-gray-600">Last Activity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredActivities.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800">{student.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">{student.doubtsAsked}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{student.videosWatched}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-gray-400" />
                      <span className="text-gray-700">{student.timeSpent}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    {student.strugglingWith.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {student.strugglingWith.map((topic, idx) => (
                          <span key={idx} className="px-2 py-1 bg-red-100 text-red-700 rounded text-xs">
                            {topic}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="text-gray-400">None</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs ${getStatusColor(student.status)}`}>
                      {getStatusIcon(student.status)}
                      <span className="capitalize">{student.status}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{student.lastActivity}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}