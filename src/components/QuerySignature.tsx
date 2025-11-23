import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from 'recharts';
import { TrendingUp, TrendingDown, AlertTriangle, CheckCircle, ArrowUpDown } from 'lucide-react';
import { StudentTimeline } from './StudentTimeline';

interface QuerySignatureProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
  };
}

interface StudentQueryData {
  name: string;
  queryVolume: number;
  basic: number;
  intermediate: number;
  advanced: number;
  repetition: number;
  relevance: number;
  confusionClusters: number;
  trend: 'up' | 'down' | 'stable';
}

const studentQueryData: StudentQueryData[] = [
  { name: 'Emma Johnson', queryVolume: 45, basic: 15, intermediate: 18, advanced: 12, repetition: 8, relevance: 95, confusionClusters: 2, trend: 'up' },
  { name: 'Liam Smith', queryVolume: 62, basic: 42, intermediate: 12, advanced: 8, repetition: 15, relevance: 88, confusionClusters: 4, trend: 'up' },
  { name: 'Olivia Brown', queryVolume: 38, basic: 18, intermediate: 10, advanced: 10, repetition: 5, relevance: 92, confusionClusters: 1, trend: 'stable' },
  { name: 'Noah Davis', queryVolume: 71, basic: 55, intermediate: 10, advanced: 6, repetition: 22, relevance: 82, confusionClusters: 6, trend: 'up' },
  { name: 'Ava Wilson', queryVolume: 53, basic: 28, intermediate: 15, advanced: 10, repetition: 12, relevance: 90, confusionClusters: 3, trend: 'stable' },
  { name: 'Ethan Martinez', queryVolume: 47, basic: 30, intermediate: 10, advanced: 7, repetition: 10, relevance: 86, confusionClusters: 3, trend: 'down' },
  { name: 'Sophia Anderson', queryVolume: 35, basic: 8, intermediate: 12, advanced: 15, repetition: 4, relevance: 96, confusionClusters: 1, trend: 'stable' },
  { name: 'Mason Taylor', queryVolume: 58, basic: 38, intermediate: 12, advanced: 8, repetition: 14, relevance: 85, confusionClusters: 5, trend: 'up' },
];

type SortKey = 'name' | 'queryVolume' | 'confusionClusters' | 'relevance';

export function QuerySignature({ filters }: QuerySignatureProps) {
  const [sortBy, setSortBy] = useState<SortKey>('queryVolume');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [confusionFilter, setConfusionFilter] = useState<'all' | 'high' | 'medium' | 'low'>('all');
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [selectedDifficulty, setSelectedDifficulty] = useState<'all' | 'basic' | 'intermediate' | 'advanced'>('all');

  const getFilteredData = () => {
    let data = [...studentQueryData];

    // Filter by student if selected
    if (filters.students.length > 0) {
      data = data.filter(s => filters.students.includes(s.name));
    }

    // Filter by confusion level
    if (confusionFilter !== 'all') {
      data = data.filter(s => {
        if (confusionFilter === 'high') return s.confusionClusters >= 5;
        if (confusionFilter === 'medium') return s.confusionClusters >= 3 && s.confusionClusters < 5;
        if (confusionFilter === 'low') return s.confusionClusters < 3;
        return true;
      });
    }

    // Filter by difficulty level
    if (selectedDifficulty !== 'all') {
      data = data.filter(s => {
        if (selectedDifficulty === 'basic') return s.basic > 0;
        if (selectedDifficulty === 'intermediate') return s.intermediate > 0;
        if (selectedDifficulty === 'advanced') return s.advanced > 0;
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

  // Calculate aggregate stats
  const totalQueries = filteredData.reduce((sum, s) => sum + s.queryVolume, 0);
  const avgRelevance = Math.round(filteredData.reduce((sum, s) => sum + s.relevance, 0) / filteredData.length);
  const highConfusionCount = filteredData.filter(s => s.confusionClusters >= 5).length;
  const avgRepetition = Math.round(filteredData.reduce((sum, s) => sum + s.repetition, 0) / filteredData.length);

  // Prepare chart data for volume
  const volumeChartData = filteredData.slice(0, 8).map(s => ({
    name: s.name.split(' ')[0],
    queries: s.queryVolume
  }));

  // Prepare difficulty breakdown for all students
  const totalBasic = filteredData.reduce((sum, s) => sum + s.basic, 0);
  const totalIntermediate = filteredData.reduce((sum, s) => sum + s.intermediate, 0);
  const totalAdvanced = filteredData.reduce((sum, s) => sum + s.advanced, 0);
  const difficultyData = [
    { name: 'Basic', value: totalBasic, color: '#60a5fa' },
    { name: 'Intermediate', value: totalIntermediate, color: '#8b5cf6' },
    { name: 'Advanced', value: totalAdvanced, color: '#ec4899' }
  ];

  const getConfusionLevel = (clusters: number) => {
    if (clusters >= 5) return { label: 'High', color: 'text-red-600', bg: 'bg-red-100' };
    if (clusters >= 3) return { label: 'Medium', color: 'text-yellow-600', bg: 'bg-yellow-100' };
    return { label: 'Low', color: 'text-green-600', bg: 'bg-green-100' };
  };

  const getRelevanceColor = (relevance: number) => {
    if (relevance >= 90) return 'text-green-600';
    if (relevance >= 80) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-gray-800 mb-1">Query Signature Analysis</h3>
          <p className="text-gray-500">Student query patterns and learning engagement</p>
        </div>
        
        {/* Confusion Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Confusion Level:</span>
          <select
            value={confusionFilter}
            onChange={(e) => setConfusionFilter(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="high">High (5+)</option>
            <option value="medium">Medium (3-4)</option>
            <option value="low">Low (&lt;3)</option>
          </select>
        </div>
        
        {/* Difficulty Filter */}
        <div className="flex items-center gap-2">
          <span className="text-gray-600">Difficulty Level:</span>
          <select
            value={selectedDifficulty}
            onChange={(e) => setSelectedDifficulty(e.target.value as any)}
            className="px-3 py-1 border border-gray-300 rounded-lg text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All</option>
            <option value="basic">Basic</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </select>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="text-gray-600 mb-1">Total Queries</div>
          <div className="text-blue-600">{totalQueries}</div>
        </div>
        <div className="p-4 bg-green-50 rounded-lg">
          <div className="text-gray-600 mb-1">Avg Relevance</div>
          <div className="text-green-600">{avgRelevance}%</div>
        </div>
        <div className="p-4 bg-yellow-50 rounded-lg">
          <div className="text-gray-600 mb-1">Avg Repetition</div>
          <div className="text-yellow-600">{avgRepetition} queries</div>
        </div>
        <div className="p-4 bg-red-50 rounded-lg">
          <div className="text-gray-600 mb-1">High Confusion</div>
          <div className="text-red-600">{highConfusionCount} students</div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Stacked Bar Chart - Query Volume by Student with Difficulty Distribution */}
        <div>
          <h4 className="text-gray-700 mb-3">
            Query Volume by Student 
            {selectedDifficulty !== 'all' && (
              <span className="ml-2 text-sm text-blue-600">
                (Filtered: {selectedDifficulty.charAt(0).toUpperCase() + selectedDifficulty.slice(1)})
              </span>
            )}
          </h4>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart 
              data={filteredData.slice(0, 8).map(s => ({
                name: s.name.split(' ')[0],
                basic: selectedDifficulty === 'all' || selectedDifficulty === 'basic' ? s.basic : 0,
                intermediate: selectedDifficulty === 'all' || selectedDifficulty === 'intermediate' ? s.intermediate : 0,
                advanced: selectedDifficulty === 'all' || selectedDifficulty === 'advanced' ? s.advanced : 0,
              }))}
              onClick={(data) => {
                if (data && data.activeLabel) {
                  const student = filteredData.find(s => s.name.split(' ')[0] === data.activeLabel);
                  if (student) setSelectedStudent(student.name);
                }
              }}
            >
              <XAxis dataKey="name" stroke="#6b7280" tick={{ fontSize: 11 }} />
              <YAxis stroke="#6b7280" tick={{ fontSize: 11 }} />
              <Tooltip 
                cursor={{ fill: 'rgba(59, 130, 246, 0.1)' }}
                content={({ active, payload }) => {
                  if (active && payload && payload.length) {
                    const data = payload[0].payload;
                    return (
                      <div className="bg-white p-3 rounded-lg shadow-lg border border-gray-200">
                        <p className="font-medium text-gray-800 mb-2">{data.name}</p>
                        {data.basic > 0 && (
                          <p className="text-sm text-blue-600">Basic: {data.basic}</p>
                        )}
                        {data.intermediate > 0 && (
                          <p className="text-sm text-purple-600">Intermediate: {data.intermediate}</p>
                        )}
                        {data.advanced > 0 && (
                          <p className="text-sm text-pink-600">Advanced: {data.advanced}</p>
                        )}
                        <p className="text-sm text-gray-600 mt-1 pt-1 border-t">
                          Total: {data.basic + data.intermediate + data.advanced}
                        </p>
                      </div>
                    );
                  }
                  return null;
                }}
              />
              <Legend />
              {(selectedDifficulty === 'all' || selectedDifficulty === 'basic') && (
                <Bar 
                  dataKey="basic" 
                  stackId="a" 
                  fill="#60a5fa" 
                  name="Basic"
                  radius={selectedDifficulty === 'basic' ? [4, 4, 0, 0] : undefined}
                />
              )}
              {(selectedDifficulty === 'all' || selectedDifficulty === 'intermediate') && (
                <Bar 
                  dataKey="intermediate" 
                  stackId="a" 
                  fill="#8b5cf6" 
                  name="Intermediate"
                  radius={selectedDifficulty === 'intermediate' ? [4, 4, 0, 0] : undefined}
                />
              )}
              {(selectedDifficulty === 'all' || selectedDifficulty === 'advanced') && (
                <Bar 
                  dataKey="advanced" 
                  stackId="a" 
                  fill="#ec4899" 
                  name="Advanced"
                  radius={selectedDifficulty === 'all' || selectedDifficulty === 'advanced' ? [4, 4, 0, 0] : undefined}
                />
              )}
            </BarChart>
          </ResponsiveContainer>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click on a bar to view detailed student timeline
          </p>
        </div>

        {/* Difficulty Distribution - Interactive Pie Chart */}
        <div>
          <h4 className="text-gray-700 mb-3">Query Difficulty Distribution</h4>
          <div className="flex items-center justify-center h-[300px]">
            <ResponsiveContainer width="60%" height="100%">
              <PieChart>
                <Pie
                  data={difficultyData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={5}
                  dataKey="value"
                  onClick={(entry) => {
                    const difficultyMap: { [key: string]: 'basic' | 'intermediate' | 'advanced' } = {
                      'Basic': 'basic',
                      'Intermediate': 'intermediate',
                      'Advanced': 'advanced'
                    };
                    const difficulty = difficultyMap[entry.name];
                    setSelectedDifficulty(selectedDifficulty === difficulty ? 'all' : difficulty);
                  }}
                  cursor="pointer"
                >
                  {difficultyData.map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={entry.color}
                      opacity={selectedDifficulty === 'all' || selectedDifficulty === entry.name.toLowerCase() ? 1 : 0.3}
                      stroke={selectedDifficulty === entry.name.toLowerCase() ? '#1f2937' : 'none'}
                      strokeWidth={selectedDifficulty === entry.name.toLowerCase() ? 3 : 0}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
            <div className="ml-4 space-y-2">
              {difficultyData.map((item) => {
                const isSelected = selectedDifficulty === item.name.toLowerCase();
                return (
                  <div 
                    key={item.name} 
                    className={`flex items-center gap-2 cursor-pointer p-2 rounded transition-all ${
                      isSelected ? 'bg-gray-100 ring-2 ring-blue-400' : 'hover:bg-gray-50'
                    }`}
                    onClick={() => {
                      const difficulty = item.name.toLowerCase() as 'basic' | 'intermediate' | 'advanced';
                      setSelectedDifficulty(selectedDifficulty === difficulty ? 'all' : difficulty);
                    }}
                  >
                    <div 
                      className="w-4 h-4 rounded-full" 
                      style={{ 
                        backgroundColor: item.color,
                        opacity: selectedDifficulty === 'all' || isSelected ? 1 : 0.3
                      }} 
                    />
                    <div className="flex-1">
                      <span className={`text-gray-700 ${isSelected ? 'font-medium' : ''}`}>
                        {item.name}
                      </span>
                      <span className="text-gray-500 ml-1">({item.value})</span>
                    </div>
                    {isSelected && (
                      <CheckCircle className="w-4 h-4 text-blue-600" />
                    )}
                  </div>
                );
              })}
              <div className="pt-2 border-t border-gray-200">
                <button
                  onClick={() => setSelectedDifficulty('all')}
                  className="text-xs text-blue-600 hover:text-blue-700 underline"
                >
                  Clear Filter
                </button>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Click on a difficulty level to filter the stacked chart
          </p>
        </div>
      </div>

      {/* Student Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th 
                onClick={() => handleSort('name')}
                className="px-4 py-3 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  Student
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('queryVolume')}
                className="px-4 py-3 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  Volume
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-gray-600">Difficulty</th>
              <th className="px-4 py-3 text-left text-gray-600">Repetition</th>
              <th 
                onClick={() => handleSort('relevance')}
                className="px-4 py-3 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  Relevance
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th 
                onClick={() => handleSort('confusionClusters')}
                className="px-4 py-3 text-left text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors"
              >
                <div className="flex items-center gap-1">
                  Confusion
                  <ArrowUpDown className="w-3 h-3" />
                </div>
              </th>
              <th className="px-4 py-3 text-left text-gray-600">Trend</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredData.map((student, index) => {
              const confusionLevel = getConfusionLevel(student.confusionClusters);
              const basicPercent = Math.round((student.basic / student.queryVolume) * 100);
              const intermediatePercent = Math.round((student.intermediate / student.queryVolume) * 100);
              const advancedPercent = 100 - basicPercent - intermediatePercent;

              return (
                <tr 
                  key={index} 
                  className="hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => setSelectedStudent(student.name)}
                >
                  <td className="px-4 py-3 text-gray-800">{student.name}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">{student.queryVolume}</span>
                      <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${Math.min((student.queryVolume / 80) * 100, 100)}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-1 text-gray-600">
                      <span className="text-blue-600">{basicPercent}%</span>
                      <span>/</span>
                      <span className="text-purple-600">{intermediatePercent}%</span>
                      <span>/</span>
                      <span className="text-pink-600">{advancedPercent}%</span>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <span className="text-gray-700">{student.repetition}</span>
                      {student.repetition > 15 && (
                        <AlertTriangle className="w-4 h-4 text-yellow-500" />
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className={getRelevanceColor(student.relevance)}>
                      {student.relevance}%
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded text-xs ${confusionLevel.bg} ${confusionLevel.color}`}>
                      {confusionLevel.label} ({student.confusionClusters})
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    {student.trend === 'up' && <TrendingUp className="w-4 h-4 text-green-600" />}
                    {student.trend === 'down' && <TrendingDown className="w-4 h-4 text-red-600" />}
                    {student.trend === 'stable' && <CheckCircle className="w-4 h-4 text-gray-400" />}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Legend */}
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4 text-xs text-gray-600">
          <div>
            <span className="font-medium">Volume:</span> Total queries submitted
          </div>
          <div>
            <span className="font-medium">Difficulty:</span> Basic vs Advanced concept ratio
          </div>
          <div>
            <span className="font-medium">Repetition:</span> Same questions asked multiple times
          </div>
          <div>
            <span className="font-medium">Relevance:</span> On-topic vs off-topic queries
          </div>
          <div>
            <span className="font-medium">Confusion:</span> Bursts of related queries (clusters)
          </div>
          <div>
            <span className="font-medium">Trend:</span> Query volume direction over time
          </div>
        </div>
      </div>

      {/* Student Timeline */}
      {selectedStudent && (
        <StudentTimeline studentName={selectedStudent} onClose={() => setSelectedStudent(null)} />
      )}
    </div>
  );
}