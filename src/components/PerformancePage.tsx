import { useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Award, Target, AlertCircle, Users, ArrowUpDown } from 'lucide-react';
import { EngagementScatterPlot } from './EngagementScatterPlot';

interface PerformancePageProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel?: 'low' | 'medium' | 'high' | null;
  };
  setFilters: (filters: any) => void;
}

// Performance trend data
const performanceTrendData = [
  { month: 'Jan', average: 72, class: 75, individual: 68 },
  { month: 'Feb', average: 74, class: 77, individual: 71 },
  { month: 'Mar', average: 76, class: 78, individual: 74 },
  { month: 'Apr', average: 79, class: 82, individual: 78 },
  { month: 'May', average: 81, class: 84, individual: 81 },
  { month: 'Jun', average: 83, class: 86, individual: 84 },
];

// Student performance data
interface StudentPerformance {
  name: string;
  average: number;
  assignments: number;
  quizzes: number;
  participation: number;
  improvement: number;
  grade: string;
  trend: 'up' | 'down' | 'stable';
}

const studentPerformanceData: StudentPerformance[] = [
  { name: 'Emma Johnson', average: 92, assignments: 95, quizzes: 91, participation: 89, improvement: 5, grade: 'A', trend: 'up' },
  { name: 'Liam Smith', average: 78, assignments: 75, quizzes: 80, participation: 79, improvement: 2, grade: 'B-', trend: 'up' },
  { name: 'Olivia Brown', average: 88, assignments: 90, quizzes: 87, participation: 87, improvement: 3, grade: 'B+', trend: 'stable' },
  { name: 'Noah Davis', average: 65, assignments: 62, quizzes: 68, participation: 65, improvement: -4, grade: 'D', trend: 'down' },
  { name: 'Ava Wilson', average: 85, assignments: 87, quizzes: 84, participation: 84, improvement: 4, grade: 'B', trend: 'up' },
  { name: 'Ethan Martinez', average: 81, assignments: 79, quizzes: 83, participation: 81, improvement: 1, grade: 'B-', trend: 'stable' },
  { name: 'Sophia Anderson', average: 94, assignments: 96, quizzes: 93, participation: 93, improvement: 6, grade: 'A', trend: 'up' },
  { name: 'Mason Taylor', average: 73, assignments: 70, quizzes: 75, participation: 74, improvement: -2, grade: 'C', trend: 'down' },
];

// Subject performance comparison
const subjectPerformanceData = [
  { subject: 'Cell Biology', score: 82 },
  { subject: 'Genetics', score: 78 },
  { subject: 'Ecology', score: 85 },
  { subject: 'Human Anatomy', score: 76 },
  { subject: 'Molecular Bio', score: 80 },
];

// Performance categories radar
const performanceCategoriesData = [
  { category: 'Assignments', score: 85 },
  { category: 'Quizzes', score: 82 },
  { category: 'Participation', score: 88 },
  { category: 'Homework', score: 79 },
  { category: 'Projects', score: 91 },
];

type SortKey = 'name' | 'average' | 'improvement';

export function PerformancePage({ filters, setFilters }: PerformancePageProps) {
  const [sortBy, setSortBy] = useState<SortKey>('average');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [performanceFilter, setPerformanceFilter] = useState<'all' | 'high' | 'medium' | 'low' | 'declining'>('all');

  const getFilteredData = () => {
    let data = [...studentPerformanceData];

    // Filter by student if selected
    if (filters.students.length > 0) {
      data = data.filter(s => filters.students.includes(s.name));
    }

    // Filter by performance level
    if (performanceFilter !== 'all') {
      data = data.filter(s => {
        if (performanceFilter === 'high') return s.average >= 85;
        if (performanceFilter === 'medium') return s.average >= 70 && s.average < 85;
        if (performanceFilter === 'low') return s.average < 70;
        if (performanceFilter === 'declining') return s.improvement < 0;
        return true;
      });
    }

    // Sort data
    data.sort((a, b) => {
      const aVal = a[sortBy];
      const bVal = b[sortBy];
      
      if (typeof aVal === 'string' && typeof bVal === 'string') {
        return sortOrder === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      
      return sortOrder === 'asc' ? Number(aVal) - Number(bVal) : Number(bVal) - Number(aVal);
    });

    return data;
  };

  const filteredData = getFilteredData();

  const handleSort = (key: SortKey) => {
    if (sortBy === key) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(key);
      setSortOrder('desc');
    }
  };

  // Calculate metrics
  const classAverage = Math.round(filteredData.reduce((sum, s) => sum + s.average, 0) / filteredData.length);
  const topPerformers = filteredData.filter(s => s.average >= 90).length;
  const needsSupport = filteredData.filter(s => s.average < 70).length;
  const avgImprovement = Math.round(filteredData.reduce((sum, s) => sum + s.improvement, 0) / filteredData.length);

  const getGradeColor = (grade: string) => {
    if (grade.startsWith('A')) return 'text-green-600 bg-green-100';
    if (grade.startsWith('B')) return 'text-blue-600 bg-blue-100';
    if (grade.startsWith('C')) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getImprovementColor = (improvement: number) => {
    if (improvement > 3) return 'text-green-600';
    if (improvement > 0) return 'text-blue-600';
    if (improvement === 0) return 'text-gray-600';
    return 'text-red-600';
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-gray-800 mb-2">Performance Analytics</h2>
        <p className="text-gray-600">Comprehensive view of student performance, trends, and metrics</p>
      </div>

      {/* Performance Filter */}
      <div className="mb-6 flex items-center gap-4">
        <span className="text-gray-600">Filter by Performance:</span>
        <div className="flex gap-2">
          {(['all', 'high', 'medium', 'low', 'declining'] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setPerformanceFilter(filter)}
              className={`px-4 py-2 rounded-lg transition-all ${
                performanceFilter === filter
                  ? 'bg-blue-600 text-white shadow-md'
                  : 'bg-white text-gray-700 border border-gray-300 hover:bg-gray-50'
              }`}
            >
              {filter === 'all' ? 'All Students' : 
               filter === 'high' ? 'High (≥85%)' :
               filter === 'medium' ? 'Medium (70-84%)' :
               filter === 'low' ? 'Low (<70%)' :
               'Declining'}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Class Average</span>
            <Award className="w-5 h-5 text-blue-600" />
          </div>
          <div className="text-gray-900">{classAverage}%</div>
          <p className="text-gray-500 mt-1">Overall performance</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Top Performers</span>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <div className="text-gray-900">{topPerformers} Students</div>
          <p className="text-gray-500 mt-1">Scoring ≥90%</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Needs Support</span>
            <AlertCircle className="w-5 h-5 text-orange-600" />
          </div>
          <div className="text-gray-900">{needsSupport} Students</div>
          <p className="text-gray-500 mt-1">Scoring &lt;70%</p>
        </div>
        
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Improvement</span>
            {avgImprovement >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-600" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-600" />
            )}
          </div>
          <div className={`text-gray-900 ${getImprovementColor(avgImprovement)}`}>
            {avgImprovement > 0 ? '+' : ''}{avgImprovement}%
          </div>
          <p className="text-gray-500 mt-1">From last period</p>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Performance Trend Chart - MADE INTERACTIVE */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-800 mb-4">Performance Trends</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#666" />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ stroke: '#3b82f6', strokeWidth: 1 }}
              />
              <Legend />
              <Line 
                type="monotone" 
                dataKey="class" 
                stroke="#3b82f6" 
                strokeWidth={2} 
                name="Class Average"
                dot={{ r: 4, strokeWidth: 2, fill: '#fff', cursor: 'pointer' }}
                activeDot={{ r: 6, strokeWidth: 2, onClick: (data, index) => {
                  console.log('Clicked:', data);
                }}}
              />
              <Line 
                type="monotone" 
                dataKey="individual" 
                stroke="#10b981" 
                strokeWidth={2} 
                name="Individual"
                dot={{ r: 4, strokeWidth: 2, fill: '#fff', cursor: 'pointer' }}
                activeDot={{ r: 6, strokeWidth: 2 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance Chart - MADE INTERACTIVE */}
        <div className="bg-white rounded-xl border border-gray-200 p-6">
          <h3 className="text-gray-800 mb-4">Performance by Topic</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="subject" stroke="#666" angle={-15} textAnchor="end" height={80} />
              <YAxis stroke="#666" />
              <Tooltip 
                contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
              />
              <Bar 
                dataKey="score" 
                fill="#3b82f6" 
                radius={[8, 8, 0, 0]}
                cursor="pointer"
                onClick={(data) => {
                  console.log('Bar clicked:', data);
                  // Could filter by this subject
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Student Performance Table - MADE INTERACTIVE */}
      <div className="bg-white rounded-xl border border-gray-200 p-6 mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-gray-800">Student Performance Details</h3>
          <div className="flex items-center gap-2 text-gray-600">
            <ArrowUpDown className="w-4 h-4" />
            <span>Click column headers to sort</span>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th 
                  onClick={() => handleSort('name')}
                  className="text-left p-3 text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center gap-2">
                    Student Name
                    {sortBy === 'name' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('average')}
                  className="text-center p-3 text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    Average
                    {sortBy === 'average' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-center p-3 text-gray-600">Grade</th>
                <th className="text-center p-3 text-gray-600">Assignments</th>
                <th className="text-center p-3 text-gray-600">Quizzes</th>
                <th className="text-center p-3 text-gray-600">Participation</th>
                <th 
                  onClick={() => handleSort('improvement')}
                  className="text-center p-3 text-gray-600 cursor-pointer hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-center justify-center gap-2">
                    Improvement
                    {sortBy === 'improvement' && (
                      <ArrowUpDown className="w-4 h-4" />
                    )}
                  </div>
                </th>
                <th className="text-center p-3 text-gray-600">Trend</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((student, index) => (
                <tr 
                  key={index}
                  onClick={() => {
                    // Toggle student selection
                    const isSelected = filters.students.includes(student.name);
                    if (isSelected) {
                      setFilters({
                        ...filters,
                        students: filters.students.filter(s => s !== student.name)
                      });
                    } else {
                      setFilters({
                        ...filters,
                        students: [...filters.students, student.name]
                      });
                    }
                  }}
                  className={`border-b border-gray-100 cursor-pointer transition-all ${
                    filters.students.includes(student.name)
                      ? 'bg-blue-50 hover:bg-blue-100'
                      : 'hover:bg-gray-50'
                  }`}
                >
                  <td className="p-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${
                        filters.students.includes(student.name) ? 'bg-blue-600' : 'bg-gray-300'
                      }`} />
                      <span className="text-gray-800">{student.name}</span>
                    </div>
                  </td>
                  <td className="text-center p-3">
                    <span className={`px-3 py-1 rounded-full ${
                      student.average >= 90 ? 'bg-green-100 text-green-700' :
                      student.average >= 80 ? 'bg-blue-100 text-blue-700' :
                      student.average >= 70 ? 'bg-yellow-100 text-yellow-700' :
                      'bg-red-100 text-red-700'
                    }`}>
                      {student.average}%
                    </span>
                  </td>
                  <td className="text-center p-3">
                    <span className={`px-3 py-1 rounded-full ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="text-center p-3 text-gray-700">{student.assignments}%</td>
                  <td className="text-center p-3 text-gray-700">{student.quizzes}%</td>
                  <td className="text-center p-3 text-gray-700">{student.participation}%</td>
                  <td className="text-center p-3">
                    <span className={getImprovementColor(student.improvement)}>
                      {student.improvement > 0 ? '+' : ''}{student.improvement}%
                    </span>
                  </td>
                  <td className="text-center p-3">
                    {student.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600 mx-auto" />}
                    {student.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600 mx-auto" />}
                    {student.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400 mx-auto" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Categories Radar - MADE INTERACTIVE */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <h3 className="text-gray-800 mb-4">Performance Categories</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={performanceCategoriesData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="category" stroke="#666" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#666" />
            <Radar 
              name="Score" 
              dataKey="score" 
              stroke="#3b82f6" 
              fill="#3b82f6" 
              fillOpacity={0.6}
              cursor="pointer"
            />
            <Tooltip 
              contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
            />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}