import { Brain, Video, HelpCircle, AlertTriangle, TrendingUp, Clock, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { EngagementScatterPlot } from './EngagementScatterPlot';

interface ClassInsightsProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel?: 'low' | 'medium' | 'high' | null;
  };
  setFilters?: (filters: any) => void;
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

export function ClassInsights({ filters, setFilters }: ClassInsightsProps) {
  const [activeTab, setActiveTab] = useState<'behavior' | 'engagement'>('behavior');
  
  // Filter activities based on selected student
  const getFilteredActivities = () => {
    if (filters.students.length > 0) {
      return studentActivitiesData.filter(s => filters.students.includes(s.name));
    }
    return studentActivitiesData;
  };

  const filteredActivities = getFilteredActivities();

  const totalDoubts = filteredActivities.reduce((sum, s) => sum + s.doubtsAsked, 0);
  const totalVideos = filteredActivities.reduce((sum, s) => sum + s.videosWatched, 0);
  const strugglingStudents = filteredActivities.filter(s => s.status === 'struggling').length;
  const improvingStudents = filteredActivities.filter(s => s.status === 'improving').length;
  const confidentStudents = filteredActivities.filter(s => s.status === 'confident').length;

  // Generate comprehensive academic insights based on filters
  const generateAcademicInsights = () => {
    const insights = [];
    const isIndividual = filters.students.length === 1;
    const isGroup = filters.students.length > 1 && filters.students.length < studentActivitiesData.length;
    const isWholeClass = filters.students.length === 0 || filters.students.length === studentActivitiesData.length;
    
    // Academic State Analysis
    if (isIndividual) {
      const student = filteredActivities[0];
      const doubtLevel = student.doubtsAsked > 10 ? 'very high' : student.doubtsAsked > 6 ? 'high' : student.doubtsAsked > 3 ? 'moderate' : 'low';
      const engagementLevel = student.videosWatched > 12 ? 'high' : student.videosWatched > 8 ? 'good' : 'needs improvement';
      
      insights.push({
        type: 'academic-state',
        text: `${student.name} shows ${doubtLevel} questioning behavior (${student.doubtsAsked} doubts) with ${engagementLevel} self-learning engagement (${student.videosWatched} videos watched). Current status: ${student.status.toUpperCase()}.`
      });

      if (student.strugglingWith.length > 0) {
        insights.push({
          type: 'focus-area',
          text: `PRIORITY INTERVENTION: Focus on ${student.strugglingWith.join(', ')} - student is actively struggling with these topics.`
        });
      } else {
        insights.push({
          type: 'focus-area',
          text: `STRONG PERFORMANCE: Student demonstrates conceptual clarity. Consider advancing to more challenging material or peer mentoring roles.`
        });
      }
    } else if (isGroup) {
      const avgDoubts = (totalDoubts / filteredActivities.length).toFixed(1);
      const avgVideos = (totalVideos / filteredActivities.length).toFixed(1);
      const strugglingPct = ((strugglingStudents / filteredActivities.length) * 100).toFixed(0);
      
      insights.push({
        type: 'academic-state',
        text: `Selected group (${filteredActivities.length} students): ${strugglingPct}% struggling, ${confidentStudents} confident. Average ${avgDoubts} doubts and ${avgVideos} videos per student - indicating ${parseFloat(avgDoubts) > 7 ? 'active engagement but conceptual gaps' : parseFloat(avgDoubts) > 4 ? 'moderate engagement' : 'low engagement or high confidence'}.`
      });

      // Group topic analysis
      const groupTopics = new Map<string, number>();
      filteredActivities.forEach(s => {
        s.strugglingWith.forEach(topic => {
          groupTopics.set(topic, (groupTopics.get(topic) || 0) + 1);
        });
      });
      
      if (groupTopics.size > 0) {
        const topTopics = Array.from(groupTopics.entries())
          .sort((a, b) => b[1] - a[1])
          .slice(0, 3)
          .map(([topic, count]) => `${topic} (${count} students)`);
        
        insights.push({
          type: 'focus-area',
          text: `TARGETED INTERVENTION NEEDED: ${topTopics.join(', ')}. Recommend small-group focused sessions for these topics.`
        });
      }
    } else {
      // Whole class analysis
      const avgDoubts = (totalDoubts / filteredActivities.length).toFixed(1);
      const avgVideos = (totalVideos / filteredActivities.length).toFixed(1);
      const strugglingPct = ((strugglingStudents / filteredActivities.length) * 100).toFixed(0);
      const improvingPct = ((improvingStudents / filteredActivities.length) * 100).toFixed(0);
      
      insights.push({
        type: 'academic-state',
        text: `CLASS OVERVIEW: ${strugglingPct}% struggling (${strugglingStudents} students), ${improvingPct}% showing improvement (${improvingStudents} students), ${confidentStudents} confident. Class average: ${avgDoubts} doubts, ${avgVideos} videos - overall ${parseFloat(avgDoubts) > 6 ? 'HIGH engagement with conceptual challenges' : parseFloat(avgDoubts) > 3 ? 'MODERATE engagement' : 'LOW engagement or strong mastery'}.`
      });

      // Identify student groups needing attention
      const highStrugglers = filteredActivities.filter(s => s.doubtsAsked > 8 && s.status === 'struggling');
      const lowEngagers = filteredActivities.filter(s => s.doubtsAsked < 3 && s.videosWatched < 6);
      
      if (highStrugglers.length > 0) {
        insights.push({
          type: 'focus-area',
          text: `URGENT: ${highStrugglers.map(s => s.name).join(', ')} need immediate intervention - high doubts (${highStrugglers.map(s => s.doubtsAsked).join(', ')}) indicate serious conceptual gaps.`
        });
      }
      
      if (lowEngagers.length > 0) {
        insights.push({
          type: 'focus-area',
          text: `ENGAGEMENT CONCERN: ${lowEngagers.map(s => s.name).join(', ')} show low activity - requires motivation check or alternative teaching approach.`
        });
      }
    }

    // Topic-based recommendations
    if (filters.topic) {
      insights.push({
        type: 'recommendation',
        text: `Topic Filter Active (${filters.topic}): Focus remedial sessions on this specific topic. Consider breaking down into sub-concepts with visual aids and hands-on activities.`
      });
    }

    // Engagement level filter insights
    if (filters.engagementLevel) {
      const levelText = filters.engagementLevel === 'low' ? 'LOW engagement students need motivation, 1-on-1 check-ins, and alternative teaching methods' :
                       filters.engagementLevel === 'medium' ? 'MEDIUM engagement students are on track - maintain momentum with regular formative assessments' :
                       'HIGH engagement students are excelling - consider enrichment activities, peer tutoring roles, or advanced material';
      
      insights.push({
        type: 'recommendation',
        text: `Engagement Filter Active (${filters.engagementLevel.toUpperCase()}): ${levelText}.`
      });
    }

    return insights;
  };

  const academicInsights = generateAcademicInsights();

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
      {/* Learning Behavior Inference - Outside tabs, on top */}
      <div className="p-6 border border-gray-200 rounded-lg bg-gradient-to-r from-purple-50 to-blue-50">
        <div className="flex items-start gap-3">
          <Brain className="w-6 h-6 text-purple-600 mt-1 flex-shrink-0" />
          <div className="flex-1">
            {/* Main Title */}
            <div className="mb-4">
              <h2 className="text-purple-900 mb-1">
                Academic & Learning State Analysis
              </h2>
              <p className="text-sm text-purple-700">
                AI-powered insights based on current filter selections
              </p>
            </div>
            
            {/* Insights Section */}
            <div className="space-y-4">
              {academicInsights.map((insight, idx) => (
                <div 
                  key={idx} 
                  className={`p-4 rounded-lg ${
                    insight.type === 'academic-state' ? 'bg-blue-100 border border-blue-200' :
                    insight.type === 'focus-area' ? 'bg-orange-100 border border-orange-200' :
                    'bg-green-100 border border-green-200'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`text-xl mt-0.5 flex-shrink-0 ${
                      insight.type === 'academic-state' ? 'text-blue-600' :
                      insight.type === 'focus-area' ? 'text-orange-600' :
                      'text-green-600'
                    }`}>
                      {insight.type === 'academic-state' ? '📊' : insight.type === 'focus-area' ? '🎯' : '💡'}
                    </div>
                    <div className="flex-1">
                      {/* Insight Type Label */}
                      <h3 className={`mb-2 uppercase tracking-wide ${
                        insight.type === 'academic-state' ? 'text-blue-700' :
                        insight.type === 'focus-area' ? 'text-orange-700' :
                        'text-green-700'
                      }`}>
                        {insight.type === 'academic-state' ? 'Current State' :
                         insight.type === 'focus-area' ? 'Action Required' :
                         'Recommendation'}
                      </h3>
                      {/* Insight Text */}
                      <p className={`leading-relaxed ${
                        insight.type === 'academic-state' ? 'text-blue-900' :
                        insight.type === 'focus-area' ? 'text-orange-900' :
                        'text-green-900'
                      }`}>
                        {insight.text}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Help Text Footer */}
            <div className="mt-5 pt-4 border-t border-purple-200">
              <h4 className="text-purple-800 mb-2">
                How to Use This Analysis
              </h4>
              <p className="text-sm text-purple-700 leading-relaxed">
                💡 Adjust filters above (Class, Subject, Topic, Students, Learning Mode) to get targeted insights for specific groups or individuals. The analysis updates dynamically based on your selections.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabbed Content */}
      <div className="bg-white rounded-lg border border-gray-200">
        {/* Tab Headers */}
        <div className="border-b border-gray-200">
          <div className="flex">
            <button
              onClick={() => setActiveTab('behavior')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'behavior'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <h3>Individual Student Behavior</h3>
            </button>
            <button
              onClick={() => setActiveTab('engagement')}
              className={`px-6 py-4 border-b-2 transition-colors ${
                activeTab === 'engagement'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-600 hover:text-gray-800 hover:border-gray-300'
              }`}
            >
              <h3>Student Engagement by Topic</h3>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        {activeTab === 'behavior' ? (
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
        ) : (
          <div className="p-6">
            <EngagementScatterPlot filters={filters} />
          </div>
        )}
      </div>
    </div>
  );
}