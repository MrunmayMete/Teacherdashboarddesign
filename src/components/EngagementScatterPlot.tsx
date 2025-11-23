import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import { Users, Brain, Sparkles } from 'lucide-react';

interface EngagementScatterPlotProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
  };
}

interface StudentEngagementData {
  student: string;
  topic: string;
  engagement: number;
  topicIndex: number;
}

// Biology topics
const biologyTopics = [
  'Cell Biology',
  'Genetics',
  'Evolution',
  'Photosynthesis',
  'Respiration',
  'DNA Structure',
  'Ecosystems'
];

const allStudents = [
  'Emma Johnson', 'Liam Smith', 'Olivia Brown', 'Noah Davis', 
  'Ava Wilson', 'Ethan Martinez', 'Sophia Anderson', 'Mason Taylor'
];

// Generate engagement data for each student across topics
const generateEngagementData = (studentNames: string[]): StudentEngagementData[] => {
  const data: StudentEngagementData[] = [];
  
  studentNames.forEach((student) => {
    biologyTopics.forEach((topic, topicIndex) => {
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

export function EngagementScatterPlot({ filters }: EngagementScatterPlotProps) {
  // Filter students based on dashboard filters
  const selectedStudents = filters.students.length > 0 
    ? filters.students 
    : allStudents;
  
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
    const topicAverages = biologyTopics.map(topic => {
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
        <div className="flex items-center gap-3 mb-2">
          <Users className="w-5 h-5 text-blue-600" />
          <h3 className="text-gray-800">Student Engagement by Topic</h3>
        </div>
        <p className="text-gray-500 text-sm">
          Each dot represents a student's engagement level for a specific topic
        </p>
      </div>

      {/* Stats Summary */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-3 bg-gray-50 rounded-lg">
          <div className="text-gray-600 text-sm mb-1">Data Points</div>
          <div className="text-gray-900 text-lg">{filteredData.length}</div>
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
            >
              {filteredData.map((entry, index) => {
                const color = getEngagementColor(entry.engagement);
                return (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={color}
                    r={5}
                    stroke="#fff"
                    strokeWidth={1.5}
                    style={{ cursor: 'pointer' }}
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