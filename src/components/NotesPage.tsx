import { FileText, Eye, TrendingUp, BookMarked, Brain, BarChart3 } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend, PieChart, Pie, Cell } from 'recharts';

interface NotesPageProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel?: 'low' | 'medium' | 'high' | null;
  };
}

interface TopicNote {
  topic: string;
  queriesMade: number;
  notesMade: number;
  timesReferred: number;
  avgReferenceTime: string;
  lastUpdated: string;
  popularityScore: number;
}

const topicNotesData: TopicNote[] = [
  {
    topic: 'Calculus',
    queriesMade: 45,
    notesMade: 28,
    timesReferred: 156,
    avgReferenceTime: '3.2 mins',
    lastUpdated: '2 hours ago',
    popularityScore: 95
  },
  {
    topic: 'Algebra',
    queriesMade: 38,
    notesMade: 22,
    timesReferred: 134,
    avgReferenceTime: '2.8 mins',
    lastUpdated: '5 hours ago',
    popularityScore: 88
  },
  {
    topic: 'Geometry',
    queriesMade: 32,
    notesMade: 18,
    timesReferred: 98,
    avgReferenceTime: '2.5 mins',
    lastUpdated: '1 day ago',
    popularityScore: 72
  },
  {
    topic: 'Trigonometry',
    queriesMade: 28,
    notesMade: 15,
    timesReferred: 87,
    avgReferenceTime: '2.1 mins',
    lastUpdated: '6 hours ago',
    popularityScore: 68
  },
  {
    topic: 'Linear Equations',
    queriesMade: 25,
    notesMade: 14,
    timesReferred: 76,
    avgReferenceTime: '2.0 mins',
    lastUpdated: '3 hours ago',
    popularityScore: 62
  },
  {
    topic: 'Quadratic Equations',
    queriesMade: 22,
    notesMade: 12,
    timesReferred: 65,
    avgReferenceTime: '1.8 mins',
    lastUpdated: '8 hours ago',
    popularityScore: 55
  },
  {
    topic: 'Fractions',
    queriesMade: 18,
    notesMade: 10,
    timesReferred: 52,
    avgReferenceTime: '1.5 mins',
    lastUpdated: '12 hours ago',
    popularityScore: 48
  },
  {
    topic: 'Statistics',
    queriesMade: 15,
    notesMade: 8,
    timesReferred: 38,
    avgReferenceTime: '1.2 mins',
    lastUpdated: '1 day ago',
    popularityScore: 35
  },
  {
    topic: 'Probability',
    queriesMade: 12,
    notesMade: 6,
    timesReferred: 24,
    avgReferenceTime: '1.0 min',
    lastUpdated: '2 days ago',
    popularityScore: 22
  }
];

// Notes creation trend over time
const notesTrendData = [
  { week: 'Week 1', notes: 45, references: 120 },
  { week: 'Week 2', notes: 52, references: 145 },
  { week: 'Week 3', notes: 48, references: 168 },
  { week: 'Week 4', notes: 65, references: 195 },
  { week: 'Week 5', notes: 72, references: 224 },
  { week: 'Week 6', notes: 78, references: 256 }
];

// Note types distribution
const noteTypesData = [
  { type: 'Formula Notes', count: 45 },
  { type: 'Concept Summary', count: 38 },
  { type: 'Problem Solutions', count: 32 },
  { type: 'Quick Tips', count: 28 }
];

export function NotesPage({ filters }: NotesPageProps) {
  // Calculate metrics
  const totalQueries = topicNotesData.reduce((sum, t) => sum + t.queriesMade, 0);
  const totalNotes = topicNotesData.reduce((sum, t) => sum + t.notesMade, 0);
  const totalReferences = topicNotesData.reduce((sum, t) => sum + t.timesReferred, 0);
  const avgNotesPerTopic = Math.round(totalNotes / topicNotesData.length);
  const avgReferencesPerNote = Math.round(totalReferences / totalNotes);

  // Most referred topics (top 3)
  const mostReferredTopics = [...topicNotesData]
    .sort((a, b) => b.timesReferred - a.timesReferred)
    .slice(0, 3);

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6'];

  const getPopularityColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-gray-800 mb-2">Notes Analysis</h2>
        <p className="text-gray-600">Comprehensive insights into note-taking patterns, topic queries, and reference behavior</p>
      </div>

      {/* Summary Metrics */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total Notes</span>
            <FileText className="w-5 h-5 text-blue-500" />
          </div>
          <div className="text-blue-600 mb-1">{totalNotes}</div>
          <div className="text-gray-500">Across all topics</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Total References</span>
            <Eye className="w-5 h-5 text-green-500" />
          </div>
          <div className="text-green-600 mb-1">{totalReferences}</div>
          <div className="text-gray-500">{avgReferencesPerNote}× per note avg</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Topic Queries</span>
            <BookMarked className="w-5 h-5 text-purple-500" />
          </div>
          <div className="text-purple-600 mb-1">{totalQueries}</div>
          <div className="text-gray-500">Questions asked</div>
        </div>

        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center justify-between mb-2">
            <span className="text-gray-600">Avg Notes/Topic</span>
            <BarChart3 className="w-5 h-5 text-orange-500" />
          </div>
          <div className="text-orange-600 mb-1">{avgNotesPerTopic}</div>
          <div className="text-gray-500">Per topic</div>
        </div>
      </div>

      {/* Most Referred Topics Highlight */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg border border-blue-200 mb-8">
        <div className="flex items-center gap-3 mb-4">
          <TrendingUp className="w-6 h-6 text-blue-600" />
          <h3 className="text-gray-800">Most Referred Topics</h3>
        </div>
        <div className="grid grid-cols-3 gap-4">
          {mostReferredTopics.map((topic, index) => (
            <div key={index} className="bg-white p-4 rounded-lg border border-gray-200">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700">{topic.topic}</span>
                <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded text-xs">#{index + 1}</span>
              </div>
              <div className="text-blue-600 mb-1">{topic.timesReferred} references</div>
              <div className="text-gray-500">{topic.notesMade} notes created</div>
            </div>
          ))}
        </div>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        {/* Notes & References Trend */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Notes Creation & Reference Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={notesTrendData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="week" stroke="#6b7280" />
              <YAxis stroke="#6b7280" />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="notes" stroke="#3b82f6" strokeWidth={2} name="Notes Created" />
              <Line type="monotone" dataKey="references" stroke="#10b981" strokeWidth={2} name="References" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Note Types Distribution */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Note Types Distribution</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={noteTypesData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ type, percent }) => `${type}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="count"
              >
                {noteTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Notes vs Queries Comparison */}
      <div className="bg-white p-6 rounded-lg border border-gray-200 mb-8">
        <h3 className="text-gray-800 mb-4">Notes Created vs Queries Made by Topic</h3>
        
        {/* AI Inference - Moved above the chart */}
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-green-600 mt-0.5" />
            <div>
              <div className="text-green-900 mb-2">Query-to-Notes Correlation</div>
              <div className="text-green-800">
                There's a strong positive correlation between queries made and notes created. Topics with higher query counts (Calculus: 45, Algebra: 38) 
                also have more notes (28, 22 respectively), indicating that students are documenting their learning when they encounter questions. 
                However, the ratio of notes to queries averages around 60%, suggesting some queries are resolved without note-taking. 
                Encouraging note-taking for all query resolutions could improve retention.
              </div>
            </div>
          </div>
        </div>
        
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={topicNotesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis dataKey="topic" stroke="#6b7280" />
            <YAxis stroke="#6b7280" />
            <Tooltip />
            <Legend />
            <Bar dataKey="queriesMade" fill="#8b5cf6" name="Queries Made" />
            <Bar dataKey="notesMade" fill="#3b82f6" name="Notes Created" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Detailed Notes Table */}
      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-6 border-b border-gray-200">
          <h3 className="text-gray-800">Topic-wise Notes Details</h3>
        </div>
        
        {/* Notes Behavior Insights - Moved above the table */}
        <div className="p-6 border-b border-gray-200 bg-blue-50">
          <div className="flex items-start gap-3">
            <Brain className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="flex-1">
              <div className="text-blue-900 mb-2">Note-Taking Behavior Insights</div>
              <ul className="space-y-2 text-blue-800">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>High Reference Topics:</strong> Calculus (156 refs), Algebra (134 refs), and Geometry (98 refs) are the most referred topics, 
                  indicating these are challenging areas where students frequently review their notes.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Note Types Pattern:</strong> Text Notes (45%) and Flashcards (35%) dominate, showing students prefer traditional note-taking. 
                  Mind Maps (15%) and Diagrams (5%) are underutilized despite being effective for visual learners.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Low Note Topics:</strong> Cell Division and Human Anatomy have fewer notes despite high query counts, 
                  suggesting students may be struggling to organize information for these topics.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 mt-1">•</span>
                  <span><strong>Recommendation:</strong> Provide note-taking templates or structured guides for topics with low note counts. 
                  Encourage diverse note types (mind maps, diagrams) for better comprehension and retention.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-4 text-left text-gray-600">Topic</th>
                <th className="px-6 py-4 text-left text-gray-600">Queries Made</th>
                <th className="px-6 py-4 text-left text-gray-600">Notes Created</th>
                <th className="px-6 py-4 text-left text-gray-600">Times Referred</th>
                <th className="px-6 py-4 text-left text-gray-600">Avg Reference Time</th>
                <th className="px-6 py-4 text-left text-gray-600">Popularity</th>
                <th className="px-6 py-4 text-left text-gray-600">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {topicNotesData.map((topic, index) => (
                <tr key={index} className="hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-4 text-gray-800">{topic.topic}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <BookMarked className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-700">{topic.queriesMade}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <FileText className="w-4 h-4 text-blue-500" />
                      <span className="text-gray-700">{topic.notesMade}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4 text-green-500" />
                      <span className="text-gray-700">{topic.timesReferred}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-700">{topic.avgReferenceTime}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className={getPopularityColor(topic.popularityScore)}>{topic.popularityScore}</span>
                      <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-blue-500"
                          style={{ width: `${topic.popularityScore}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-gray-500">{topic.lastUpdated}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}