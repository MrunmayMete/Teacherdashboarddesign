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

export function PerformancePage({ filters }: PerformancePageProps) {
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
          {[
            { value: 'all', label: 'All Students' },
            { value: 'high', label: 'High (≥85%)' },
            { value: 'medium', label: 'Medium (70-84%)' },
            { value: 'low', label: 'Low (<70%)' },
            { value: 'declining', label: 'Declining' }
          ].map(filter => (
            <button
              key={filter.value}
              onClick={() => setPerformanceFilter(filter.value as any)}
              className={`px-4 py-2 rounded-lg transition-colors ${
                performanceFilter === filter.value
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Class Average</span>
            <Target className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-blue-600 mb-1">{classAverage}%</div>
          <div className="text-gray-500">Overall performance</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Top Performers</span>
            <Award className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-green-600 mb-1">{topPerformers} students</div>
          <div className="text-gray-500">Scoring ≥90%</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Needs Support</span>
            <AlertCircle className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-red-600 mb-1">{needsSupport} students</div>
          <div className="text-gray-500">Scoring {'<'}70%</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Improvement</span>
            {avgImprovement >= 0 ? (
              <TrendingUp className="w-5 h-5 text-green-500" />
            ) : (
              <TrendingDown className="w-5 h-5 text-red-500" />
            )}
          </div>
          <div className={avgImprovement >= 0 ? 'text-green-600 mb-1' : 'text-red-600 mb-1'}>
            {avgImprovement > 0 ? '+' : ''}{avgImprovement}%
          </div>
          <div className="text-gray-500">vs last month</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Performance Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Performance Trend (6 Months)</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={performanceTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[60, 90]} />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="average" stroke="#3b82f6" strokeWidth={2} name="School Average" />
              <Line type="monotone" dataKey="class" stroke="#10b981" strokeWidth={2} name="Class Average" />
              <Line type="monotone" dataKey="individual" stroke="#8b5cf6" strokeWidth={2} name="Individual" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Subject Performance */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Performance by Subject</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={subjectPerformanceData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="subject" stroke="#6b7280" />
              <YAxis stroke="#6b7280" domain={[0, 100]} />
              <Tooltip />
              <Bar dataKey="score" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance Categories Radar */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-gray-800 mb-4">Performance by Category</h3>
        <ResponsiveContainer width="100%" height={400}>
          <RadarChart data={performanceCategoriesData}>
            <PolarGrid stroke="#e5e7eb" />
            <PolarAngleAxis dataKey="category" stroke="#6b7280" />
            <PolarRadiusAxis angle={90} domain={[0, 100]} stroke="#6b7280" />
            <Radar name="Class Performance" dataKey="score" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
            <Tooltip />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      {/* Engagement Scatter Plot */}
      <div className="mb-8">
        <EngagementScatterPlot filters={filters} />
      </div>

      {/* Student Performance Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-800">Student Performance Details</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th 
                  onClick={() => handleSort('name')}
                  className="px-6 py-4 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Student
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th 
                  onClick={() => handleSort('average')}
                  className="px-6 py-4 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Average
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Assignments</th>
                <th className="px-6 py-4 text-left text-gray-600">Quizzes</th>
                <th className="px-6 py-4 text-left text-gray-600">Participation</th>
                <th 
                  onClick={() => handleSort('improvement')}
                  className="px-6 py-4 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
                >
                  <div className="flex items-center gap-1">
                    Improvement
                    <ArrowUpDown className="w-3 h-3" />
                  </div>
                </th>
                <th className="px-6 py-4 text-left text-gray-600">Grade</th>
                <th className="px-6 py-4 text-left text-gray-600">Trend</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredData.map((student, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800">{student.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">{student.average}%</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${student.average}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{student.assignments}%</td>
                  <td className="px-6 py-4 text-gray-700">{student.quizzes}%</td>
                  <td className="px-6 py-4 text-gray-700">{student.participation}%</td>
                  <td className="px-6 py-4">
                    <span className={getImprovementColor(student.improvement)}>
                      {student.improvement > 0 ? '+' : ''}{student.improvement}%
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-3 py-1 rounded text-xs ${getGradeColor(student.grade)}`}>
                      {student.grade}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {student.trend === 'up' && <TrendingUp className="w-5 h-5 text-green-600" />}
                    {student.trend === 'down' && <TrendingDown className="w-5 h-5 text-red-600" />}
                    {student.trend === 'stable' && <div className="w-5 h-0.5 bg-gray-400" />}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}