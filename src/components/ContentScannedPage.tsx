import { Scan, Video, HelpCircle, CheckCircle, XCircle, AlertCircle, PieChart as PieChartIcon, Brain, MessageSquare } from 'lucide-react';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';

interface ContentScannedPageProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
  };
}

interface ContentItem {
  topic: string;
  totalPages: number;
  scannedPages: number;
  queriesMade: number;
  videosWatched: number;
  status: 'completed' | 'partial' | 'not-started';
  queryTypes: {
    doubts: number;
    concepts: number;
    questions: number;
  };
}

const contentData: ContentItem[] = [
  {
    topic: 'Cell Structure',
    totalPages: 45,
    scannedPages: 45,
    queriesMade: 23,
    videosWatched: 8,
    status: 'completed',
    queryTypes: { doubts: 12, concepts: 6, questions: 5 }
  },
  {
    topic: 'Photosynthesis',
    totalPages: 38,
    scannedPages: 38,
    queriesMade: 20,
    videosWatched: 9,
    status: 'completed',
    queryTypes: { doubts: 8, concepts: 7, questions: 5 }
  },
  {
    topic: 'Cell Division',
    totalPages: 52,
    scannedPages: 15,
    queriesMade: 25,
    videosWatched: 12,
    status: 'partial',
    queryTypes: { doubts: 18, concepts: 4, questions: 3 }
  },
  {
    topic: 'DNA & Genetics',
    totalPages: 48,
    scannedPages: 42,
    queriesMade: 28,
    videosWatched: 10,
    status: 'partial',
    queryTypes: { doubts: 15, concepts: 8, questions: 5 }
  },
  {
    topic: 'Human Anatomy',
    totalPages: 55,
    scannedPages: 0,
    queriesMade: 0,
    videosWatched: 0,
    status: 'not-started',
    queryTypes: { doubts: 0, concepts: 0, questions: 0 }
  },
  {
    topic: 'Ecology',
    totalPages: 40,
    scannedPages: 0,
    queriesMade: 0,
    videosWatched: 0,
    status: 'not-started',
    queryTypes: { doubts: 0, concepts: 0, questions: 0 }
  },
  {
    topic: 'Respiration',
    totalPages: 42,
    scannedPages: 42,
    queriesMade: 18,
    videosWatched: 7,
    status: 'completed',
    queryTypes: { doubts: 9, concepts: 5, questions: 4 }
  },
  {
    topic: 'Nervous System',
    totalPages: 35,
    scannedPages: 28,
    queriesMade: 16,
    videosWatched: 6,
    status: 'partial',
    queryTypes: { doubts: 10, concepts: 3, questions: 3 }
  }
];

export function ContentScannedPage({ filters }: ContentScannedPageProps) {
  // Calculate metrics
  const totalContent = contentData.length;
  const completedContent = contentData.filter(c => c.status === 'completed').length;
  const partialContent = contentData.filter(c => c.status === 'partial').length;
  const notStartedContent = contentData.filter(c => c.status === 'not-started').length;
  
  const totalPages = contentData.reduce((sum, c) => sum + c.totalPages, 0);
  const scannedPages = contentData.reduce((sum, c) => sum + c.scannedPages, 0);
  const scanPercentage = Math.round((scannedPages / totalPages) * 100);

  const totalQueries = contentData.reduce((sum, c) => sum + c.queriesMade, 0);
  const totalVideos = contentData.reduce((sum, c) => sum + c.videosWatched, 0);

  // Data for engagement pie chart
  const engagementData = [
    { name: 'Content with Queries', value: contentData.filter(c => c.queriesMade > 0).length },
    { name: 'Content with Videos', value: contentData.filter(c => c.videosWatched > 0 && c.queriesMade === 0).length },
    { name: 'No Engagement', value: contentData.filter(c => c.queriesMade === 0 && c.videosWatched === 0).length }
  ];

  // Data for query nature chart
  const queryNatureData = contentData
    .filter(c => c.queriesMade > 0)
    .map(c => ({
      topic: c.topic,
      doubts: c.queryTypes.doubts,
      concepts: c.queryTypes.concepts,
      questions: c.queryTypes.questions
    }));

  // Overall query distribution
  const totalDoubts = contentData.reduce((sum, c) => sum + c.queryTypes.doubts, 0);
  const totalConcepts = contentData.reduce((sum, c) => sum + c.queryTypes.concepts, 0);
  const totalQuestions = contentData.reduce((sum, c) => sum + c.queryTypes.questions, 0);

  const queryDistributionData = [
    { name: 'Asking Doubts', value: totalDoubts },
    { name: 'Discussing Concepts', value: totalConcepts },
    { name: 'Solving Questions', value: totalQuestions }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getStatusColor = (status: string) => {
    if (status === 'completed') return 'text-green-600 bg-green-100';
    if (status === 'partial') return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getStatusIcon = (status: string) => {
    if (status === 'completed') return <CheckCircle className="w-4 h-4" />;
    if (status === 'partial') return <AlertCircle className="w-4 h-4" />;
    return <XCircle className="w-4 h-4" />;
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-gray-800 mb-2">Content Scanned Analysis</h2>
        <p className="text-gray-600">Comprehensive insights into content engagement, scanning patterns, and query behavior</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Scan Progress</span>
            <Scan className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-blue-600 mb-1">{scanPercentage}%</div>
          <div className="text-gray-500">{scannedPages}/{totalPages} pages</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Completed Topics</span>
            <CheckCircle className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-green-600 mb-1">{completedContent}/{totalContent}</div>
          <div className="text-gray-500">Fully scanned</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Queries</span>
            <HelpCircle className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-purple-600 mb-1">{totalQueries}</div>
          <div className="text-gray-500">Questions asked</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Videos Watched</span>
            <Video className="w-5 h-5 text-red-500" />
          </div>
          <div className="text-red-600 mb-1">{totalVideos}</div>
          <div className="text-gray-500">Learning videos</div>
        </div>
      </div>

      {/* Query Types by Topic */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-gray-800 mb-4">Query Types by Topic</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={queryNatureData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="topic" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="doubts" fill="#ef4444" name="Asking Doubts" />
            <Bar dataKey="concepts" fill="#3b82f6" name="Discussing Concepts" />
            <Bar dataKey="questions" fill="#10b981" name="Solving Questions" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Content Scanning Insights - Moved above pie charts */}
      <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-start gap-3">
          <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
          <div className="flex-1">
            <div className="text-blue-900 mb-2">Content Scanning Insights</div>
            <ul className="space-y-2 text-blue-800">
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Not Started:</strong> {notStartedContent} topics (Human Anatomy, Ecology) have not been accessed yet. Consider sending reminders or checking if these topics are in the curriculum.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>High Engagement:</strong> Topics with both high scan rates and queries (Cell Structure, Respiration) show active learning. Students are engaged and seeking clarification.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Low Scan, High Queries:</strong> Cell Division has low scan percentage (29%) but high queries (25). Students may be jumping to specific sections when confused rather than studying systematically.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-blue-600 mt-1">•</span>
                <span><strong>Recommendation:</strong> Encourage systematic content scanning for Cell Division and initiate topics that haven't been started. Provide more practice questions for topics with low question-solving queries.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Engagement Level Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Engagement Level Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={engagementData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {engagementData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Query Nature Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Query Nature Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={queryDistributionData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {queryDistributionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Detailed Content Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-800">Content Scanning Details</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Topic</th>
                <th className="px-6 py-4 text-left text-gray-600">Scan Progress</th>
                <th className="px-6 py-4 text-left text-gray-600">Pages</th>
                <th className="px-6 py-4 text-left text-gray-600">Queries Made</th>
                <th className="px-6 py-4 text-left text-gray-600">Videos Watched</th>
                <th className="px-6 py-4 text-left text-gray-600">Query Types</th>
                <th className="px-6 py-4 text-left text-gray-600">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {contentData.map((content, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800">{content.topic}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${(content.scannedPages / content.totalPages) * 100}%` }}
                        />
                      </div>
                      <span className="text-gray-600">{Math.round((content.scannedPages / content.totalPages) * 100)}%</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{content.scannedPages}/{content.totalPages}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700">{content.queriesMade}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Video className="w-4 h-4 text-red-500" />
                      <span className="text-gray-700">{content.videosWatched}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex gap-1 text-xs">
                      <span className="px-2 py-1 bg-red-100 text-red-700 rounded">D: {content.queryTypes.doubts}</span>
                      <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded">C: {content.queryTypes.concepts}</span>
                      <span className="px-2 py-1 bg-green-100 text-green-700 rounded">Q: {content.queryTypes.questions}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className={`inline-flex items-center gap-1 px-3 py-1 rounded text-xs ${getStatusColor(content.status)}`}>
                      {getStatusIcon(content.status)}
                      <span className="capitalize">{content.status.replace('-', ' ')}</span>
                    </div>
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