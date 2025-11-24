import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Brain, Sparkles } from 'lucide-react';
import { useState } from 'react';
import { BIOLOGY_TOPICS, ALL_STUDENTS } from '../constants/biologyTopics';

interface EngagementScatterPlotProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel: 'low' | 'medium' | 'high' | null;
  };
  setFilters?: (filters: any) => void;
}

interface StudentEngagementData {
  student: string;
  topic: string;
  engagement: number;
  topicIndex: number;
}

// Generate engagement data for each student across topics
const generateEngagementData = (studentNames: string[]): StudentEngagementData[] => {
  const data: StudentEngagementData[] = [];
  
  studentNames.forEach((student) => {
    BIOLOGY_TOPICS.forEach((topic, topicIndex) => {
      // Generate varied engagement levels (20-95%) for each student-topic combination
      const baseEngagement = 40 + Math.random() * 55;
      const engagement = Math.round(baseEngagement);
      
      data.push({
        student,
        topic,
        engagement,
        topicIndex
      });
    });
  });
  
  return data;
};

export function EngagementScatterPlot({ filters, setFilters }: EngagementScatterPlotProps) {
  const [showActiveStudents, setShowActiveStudents] = useState(false);
  
  // Define currently active students (simulated - in real app this would come from live data)
  const currentlyActiveStudents = ['Emma Johnson', 'Liam Smith', 'Olivia Brown', 'Noah Davis', 'Sophia Anderson'];
  
  // Filter students based on dashboard filters
  const selectedStudents = filters.students.length > 0 
    ? filters.students 
    : ALL_STUDENTS;
  
  const engagementData = generateEngagementData(selectedStudents);
  
  // Filter by topic if selected
  const filteredData = filters.topic 
    ? engagementData.filter(d => d.topic === filters.topic)
    : engagementData;
  
  // Determine engagement color
  const getEngagementColor = (engagement: number) => {
    if (engagement < 50) return '#fbbf24'; // Yellow for low engagement
    if (engagement < 70) return '#84cc16'; // Light green for medium
    return '#16a34a'; // Dark green for high engagement
  };
  
  const getEngagementLevel = (engagement: number) => {
    if (engagement < 50) return 'Low';
    if (engagement < 70) return 'Medium';
    return 'High';
  };
  
  // Calculate statistics
  const avgEngagement = Math.round(
    filteredData.reduce((sum, s) => sum + s.engagement, 0) / filteredData.length
  );
  const lowEngagementCount = filteredData.filter(s => s.engagement < 50).length;
  const mediumEngagementCount = filteredData.filter(s => s.engagement >= 50 && s.engagement < 70).length;
  const highEngagementCount = filteredData.filter(s => s.engagement >= 70).length;
  
  // AI Inference - Analyze engagement patterns
  const generateAIInference = () => {
    const insights = [];
    
    // Analyze by topic
    const topicAverages = BIOLOGY_TOPICS.map(topic => {
      const topicData = filteredData.filter(d => d.topic === topic);
      const avg = topicData.length > 0 
        ? topicData.reduce((sum, d) => sum + d.engagement, 0) / topicData.length 
        : 0;
      return { topic, avg, count: topicData.length };
    }).filter(t => t.count > 0);
    
    const lowestTopic = topicAverages.reduce((min, t) => t.avg < min.avg ? t : min, topicAverages[0] || { topic: 'N/A', avg: 0 });
    const highestTopic = topicAverages.reduce((max, t) => t.avg > max.avg ? t : max, topicAverages[0] || { topic: 'N/A', avg: 0 });
    
    // Analyze by student
    const studentAverages = selectedStudents.map(student => {
      const studentData = filteredData.filter(d => d.student === student);
      const avg = studentData.length > 0
        ? studentData.reduce((sum, d) => sum + d.engagement, 0) / studentData.length
        : 0;
      return { student, avg, count: studentData.length };
    }).filter(s => s.count > 0);
    
    const strugglingStudents = studentAverages.filter(s => s.avg < 50);
    const excellingStudents = studentAverages.filter(s => s.avg >= 80);
    
    // Generate insights
    if (lowestTopic && lowestTopic.avg < 50) {
      insights.push({
        type: 'critical',
        text: `<strong>${lowestTopic.topic}</strong> shows critically low engagement (${Math.round(lowestTopic.avg)}%). Immediate intervention recommended through interactive labs or simplified content.`
      });
    }
    
    if (strugglingStudents.length > 0) {
      const names = strugglingStudents.map(s => s.student).join(', ');
      insights.push({
        type: 'warning',
        text: `${strugglingStudents.length} student${strugglingStudents.length > 1 ? 's' : ''} showing consistent low engagement: <strong>${names}</strong>. Consider one-on-one sessions or personalized learning paths.`
      });
    }
    
    if (highestTopic && lowestTopic && highestTopic.topic !== lowestTopic.topic) {
      insights.push({
        type: 'success',
        text: `<strong>${highestTopic.topic}</strong> (${Math.round(highestTopic.avg)}%) demonstrates strong engagement. Consider using similar teaching methods for ${lowestTopic.topic}.`
      });
    }
    
    if (excellingStudents.length > 0) {
      insights.push({
        type: 'info',
        text: `${excellingStudents.length} high-performing student${excellingStudents.length > 1 ? 's' : ''} could benefit from advanced materials or peer tutoring opportunities.`
      });
    }
    
    // Engagement distribution analysis
    const lowPercentage = (lowEngagementCount / filteredData.length) * 100;
    if (lowPercentage > 30) {
      insights.push({
        type: 'critical',
        text: `${Math.round(lowPercentage)}% of engagement data points are below 50%. Class-wide engagement strategy needs review.`
      });
    } else if (lowPercentage > 15) {
      insights.push({
        type: 'warning',
        text: `${Math.round(lowPercentage)}% low engagement detected. Monitor trends and consider supplementary resources.`
      });
    }
    
    if (insights.length === 0) {
      insights.push({
        type: 'success',
        text: 'Overall engagement levels are healthy across all topics and students. Continue current teaching strategies.'
      });
    }
    
    return insights;
  };
  
  const aiInferences = generateAIInference();

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      const color = getEngagementColor(data.engagement);
      const level = getEngagementLevel(data.engagement);
      
      return (
        <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
          <p className="font-medium text-gray-800 mb-1">{data.student}</p>
          <p className="text-sm text-gray-600 mb-1">Topic: {data.topic}</p>
          <p className="text-sm text-gray-600">
            Engagement: <span style={{ color, fontWeight: 'bold' }}>
              {data.engagement}%
            </span>
          </p>
          <p className="text-xs text-gray-500 mt-1">
            Level: {level}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      {/* Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <Users className="w-5 h-5 text-blue-600" />
            <h3 className="text-gray-800">Student Engagement by Topic</h3>
          </div>
          
          {/* Engagement Level Filter Buttons */}
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-600 mr-2">Filter by Level:</span>
            <button
              onClick={() => setFilters && setFilters({ ...filters, engagementLevel: filters.engagementLevel === 'low' ? null : 'low' })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.engagementLevel === 'low'
                  ? 'bg-yellow-500 text-white shadow-md scale-105'
                  : 'bg-yellow-50 text-yellow-700 border border-yellow-200 hover:bg-yellow-100'
              }`}
            >
              Low {'(<50%)'}
            </button>
            <button
              onClick={() => setFilters && setFilters({ ...filters, engagementLevel: filters.engagementLevel === 'medium' ? null : 'medium' })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.engagementLevel === 'medium'
                  ? 'bg-lime-500 text-white shadow-md scale-105'
                  : 'bg-lime-50 text-lime-700 border border-lime-200 hover:bg-lime-100'
              }`}
            >
              Medium (50-70%)
            </button>
            <button
              onClick={() => setFilters && setFilters({ ...filters, engagementLevel: filters.engagementLevel === 'high' ? null : 'high' })}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                filters.engagementLevel === 'high'
                  ? 'bg-green-600 text-white shadow-md scale-105'
                  : 'bg-green-50 text-green-700 border border-green-200 hover:bg-green-100'
              }`}
            >
              High (70%+)
            </button>
            
            <div className="w-px h-8 bg-gray-300 mx-2" />
            
            <div className="relative">
              <button
                onClick={() => setShowActiveStudents(!showActiveStudents)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2 ${
                  showActiveStudents
                    ? 'bg-blue-600 text-white shadow-md scale-105'
                    : 'bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Currently Active Students
                <span className="ml-1 px-2 py-0.5 bg-blue-600 text-white rounded-full text-xs">
                  {currentlyActiveStudents.length}
                </span>
              </button>
              
              {/* Active Students Dropdown */}
              {showActiveStudents && (
                <div className="absolute right-0 mt-2 w-72 bg-white rounded-lg shadow-xl border border-gray-200 z-50 max-h-80 overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 bg-blue-50">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="text-gray-800">Active Students</h4>
                      <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded-full flex items-center gap-1">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Online Now
                      </span>
                    </div>
                    <p className="text-xs text-gray-600">
                      Students currently engaged in learning activities
                    </p>
                  </div>
                  
                  <div className="p-2">
                    {currentlyActiveStudents.map((student, index) => {
                      const studentData = engagementData.filter(d => d.student === student);
                      const avgEngagement = studentData.length > 0
                        ? Math.round(studentData.reduce((sum, d) => sum + d.engagement, 0) / studentData.length)
                        : 0;
                      const lastActivity = ['2 min ago', '5 min ago', '8 min ago', '10 min ago', '12 min ago'][index];
                      
                      return (
                        <button
                          key={student}
                          onClick={() => {
                            setFilters && setFilters({ ...filters, students: [student] });
                            setShowActiveStudents(false);
                          }}
                          className="w-full p-3 rounded-lg hover:bg-blue-50 transition-colors text-left border border-transparent hover:border-blue-200 mb-1"
                        >
                          <div className="flex items-center justify-between mb-1">
                            <div className="flex items-center gap-2">
                              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center text-white text-sm">
                                {student.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="text-gray-800 text-sm">{student}</div>
                                <div className="text-xs text-gray-500">{lastActivity}</div>
                              </div>
                            </div>
                            <div className="text-right">
                              <div className={`text-xs px-2 py-1 rounded-full ${
                                avgEngagement >= 70 ? 'bg-green-100 text-green-700' :
                                avgEngagement >= 50 ? 'bg-lime-100 text-lime-700' :
                                'bg-yellow-100 text-yellow-700'
                              }`}>
                                {avgEngagement}%
                              </div>
                            </div>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-1.5">
                            <div 
                              className={`h-1.5 rounded-full ${
                                avgEngagement >= 70 ? 'bg-green-500' :
                                avgEngagement >= 50 ? 'bg-lime-500' :
                                'bg-yellow-500'
                              }`}
                              style={{ width: `${avgEngagement}%` }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                  
                  <div className="p-3 border-t border-gray-200 bg-gray-50">
                    <button
                      onClick={() => {
                        setFilters && setFilters({ ...filters, students: currentlyActiveStudents });
                        setShowActiveStudents(false);
                      }}
                      className="w-full px-3 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors"
                    >
                      View All Active Students
                    </button>
                  </div>
                </div>
              )}
            </div>
            
            {filters.engagementLevel && (
              <button
                onClick={() => setFilters && setFilters({ ...filters, engagementLevel: null })}
                className="px-3 py-2 rounded-lg text-sm text-gray-600 bg-gray-100 hover:bg-gray-200 transition-colors"
              >
                Clear
              </button>
            )}
          </div>
        </div>
        <p className="text-gray-500 text-sm">
          Each dot represents a student's engagement level for a specific topic
          {filters.engagementLevel && (
            <span className="ml-2 text-blue-600 font-medium">
              • Currently filtering: {filters.engagementLevel.charAt(0).toUpperCase() + filters.engagementLevel.slice(1)} engagement
            </span>
          )}
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-gray-600 text-sm mb-1">Students</div>
          <div className="text-gray-900 text-lg">{selectedStudents.length}</div>
        </div>
        <div className="p-3 bg-yellow-50 rounded-lg border border-yellow-200">
          <div className="text-gray-600 text-sm mb-1">Low {'(<50%)'}</div>
          <div className="text-yellow-600 text-lg">{lowEngagementCount}</div>
        </div>
        <div className="p-3 bg-lime-50 rounded-lg border border-lime-200">
          <div className="text-gray-600 text-sm mb-1">Medium (50-70%)</div>
          <div className="text-lime-600 text-lg">{mediumEngagementCount}</div>
        </div>
        <div className="p-3 bg-green-100 rounded-lg border border-green-300">
          <div className="text-gray-600 text-sm mb-1">High (70%+)</div>
          <div className="text-green-700 text-lg">{highEngagementCount}</div>
        </div>
      </div>

      {/* Scatter Plot */}
      <div className="mb-4">
        <ResponsiveContainer width="100%" height={450}>
          <ScatterChart
            margin={{ top: 20, right: 30, bottom: 80, left: 60 }}
          >
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="#e5e7eb"
            />
            <XAxis
              type="category"
              dataKey="topic"
              name="Topic"
              allowDuplicatedCategory={false}
              stroke="#6b7280"
              tick={{ fontSize: 11, angle: -45, textAnchor: 'end' }}
              height={80}
              label={{ 
                value: 'Biology Topics', 
                position: 'insideBottom', 
                offset: -60,
                style: { fontSize: 14, fill: '#374151', fontWeight: 500 }
              }}
            />
            <YAxis
              type="number"
              dataKey="engagement"
              name="Engagement Level"
              domain={[0, 100]}
              ticks={[0, 20, 40, 60, 80, 100]}
              stroke="#6b7280"
              tick={{ fontSize: 12 }}
              label={{ 
                value: 'Engagement Level (%)', 
                angle: -90, 
                position: 'insideLeft',
                offset: 10,
                style: { fontSize: 14, fill: '#374151', fontWeight: 500 }
              }}
            />
            <Tooltip 
              content={<CustomTooltip />}
              cursor={{ strokeDasharray: '3 3' }}
            />
            <Scatter 
              data={filteredData} 
              shape="circle"
              onClick={(data) => {
                if (data && data.student) {
                  // Toggle student filter - if already selected, deselect
                  if (setFilters) {
                    const isAlreadySelected = filters.students.length === 1 && filters.students[0] === data.student;
                    if (isAlreadySelected) {
                      setFilters({ ...filters, students: [] });
                    } else {
                      setFilters({ ...filters, students: [data.student], topic: data.topic });
                    }
                  }
                }
              }}
            >
              {filteredData.map((entry, index) => {
                const color = getEngagementColor(entry.engagement);
                const isSelected = filters.students.includes(entry.student) && 
                                   (filters.topic === entry.topic || !filters.topic);
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={color}
                    r={isSelected ? 8 : 5}
                    stroke={isSelected ? '#1f2937' : '#fff'}
                    strokeWidth={isSelected ? 3 : 1.5}
                    style={{ cursor: 'pointer' }}
                    opacity={isSelected ? 1 : 0.85}
                  />
                );
              })}
            </Scatter>
          </ScatterChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}
      <div className="flex items-center justify-center gap-8 pt-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-yellow-400 border-2 border-white shadow-sm" />
          <span className="text-sm text-gray-700">Low Engagement {'(<50%)'}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-lime-500 border-2 border-white shadow-sm" />
          <span className="text-sm text-gray-700">Medium Engagement (50-70%)</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-full bg-green-600 border-2 border-white shadow-sm" />
          <span className="text-sm text-gray-700">High Engagement (70%+)</span>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
        <p className="text-sm text-gray-700">
          <span className="font-medium text-blue-700">Average Engagement:</span> {avgEngagement}%
          {avgEngagement < 50 && (
            <span className="ml-2 text-yellow-700">⚠️ Below target - consider intervention strategies</span>
          )}
          {avgEngagement >= 50 && avgEngagement < 70 && (
            <span className="ml-2 text-lime-600">✓ Moderate performance - room for improvement</span>
          )}
          {avgEngagement >= 70 && (
            <span className="ml-2 text-green-700">✓ Excellent performance - maintain momentum</span>
          )}
        </p>
      </div>

      {/* AI Inferences */}
      <div className="mt-6 space-y-3">
        <div className="flex items-center gap-2 mb-4">
          <Brain className="w-5 h-5 text-purple-600" />
          <h4 className="text-gray-800">AI-Powered Insights & Recommendations</h4>
        </div>
        
        {aiInferences.map((insight, index) => {
          const getInferenceStyle = (type: string) => {
            switch(type) {
              case 'critical':
                return 'bg-red-50 border-red-200 text-red-800';
              case 'warning':
                return 'bg-yellow-50 border-yellow-200 text-yellow-800';
              case 'success':
                return 'bg-green-50 border-green-200 text-green-800';
              case 'info':
                return 'bg-blue-50 border-blue-200 text-blue-800';
              default:
                return 'bg-gray-50 border-gray-200 text-gray-800';
            }
          };
          
          const getIcon = (type: string) => {
            switch(type) {
              case 'critical':
                return '🚨';
              case 'warning':
                return '⚠️';
              case 'success':
                return '✅';
              case 'info':
                return '💡';
              default:
                return '📊';
            }
          };
          
          return (
            <div 
              key={index} 
              className={`p-4 rounded-lg border ${getInferenceStyle(insight.type)}`}
            >
              <div className="flex items-start gap-3">
                <span className="text-lg mt-0.5">{getIcon(insight.type)}</span>
                <p className="text-sm flex-1" dangerouslySetInnerHTML={{ __html: insight.text }} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}