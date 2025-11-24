import { QuerySignature } from './QuerySignature';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, BarChart3, ListChecks } from 'lucide-react';
import { useState } from 'react';
import { EngagementScatterPlot } from './EngagementScatterPlot';

interface QueryAnalysisPageProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel?: 'low' | 'medium' | 'high' | null;
  };
}

// Bloom's Taxonomy data for query nature
const bloomsTaxonomyData = [
  { level: 'Recall', score: 68, description: 'Remembering facts' },
  { level: 'Understand', score: 82, description: 'Explaining concepts' },
  { level: 'Apply', score: 75, description: 'Using knowledge' },
  { level: 'Analyze', score: 58, description: 'Breaking down info' },
  { level: 'Evaluate', score: 45, description: 'Making judgments' },
  { level: 'Create', score: 38, description: 'Producing new work' },
];

// Topic Query Summary data
const topicQueryData = [
  {
    topic: 'Cell Biology',
    totalQueries: 127,
    students: ['Emma Johnson', 'Liam Smith', 'Olivia Brown', 'Noah Davis'],
    queryTypes: [
      { type: 'Concept Clarification', count: 45, color: 'bg-blue-500' },
      { type: 'Process Understanding', count: 38, color: 'bg-green-500' },
      { type: 'Application', count: 28, color: 'bg-purple-500' },
      { type: 'Comparison', count: 16, color: 'bg-orange-500' },
    ],
    commonQuestions: [
      'What is the difference between prokaryotic and eukaryotic cells?',
      'How does osmosis work in plant cells?',
      'What are the functions of mitochondria?'
    ]
  },
  {
    topic: 'Photosynthesis',
    totalQueries: 98,
    students: ['Ava Wilson', 'Ethan Martinez', 'Sophia Anderson'],
    queryTypes: [
      { type: 'Concept Clarification', count: 42, color: 'bg-blue-500' },
      { type: 'Process Understanding', count: 35, color: 'bg-green-500' },
      { type: 'Application', count: 15, color: 'bg-purple-500' },
      { type: 'Comparison', count: 6, color: 'bg-orange-500' },
    ],
    commonQuestions: [
      'What are the products of photosynthesis?',
      'How does light intensity affect photosynthesis?',
      'What is the role of chlorophyll?'
    ]
  },
  {
    topic: 'DNA Structure',
    totalQueries: 85,
    students: ['Mason Taylor', 'Emma Johnson', 'Noah Davis', 'Liam Smith'],
    queryTypes: [
      { type: 'Concept Clarification', count: 38, color: 'bg-blue-500' },
      { type: 'Process Understanding', count: 25, color: 'bg-green-500' },
      { type: 'Application', count: 14, color: 'bg-purple-500' },
      { type: 'Comparison', count: 8, color: 'bg-orange-500' },
    ],
    commonQuestions: [
      'What is the structure of DNA?',
      'How does DNA replication work?',
      'What is the difference between DNA and RNA?'
    ]
  },
  {
    topic: 'Genetics',
    totalQueries: 73,
    students: ['Olivia Brown', 'Sophia Anderson', 'Ava Wilson'],
    queryTypes: [
      { type: 'Concept Clarification', count: 30, color: 'bg-blue-500' },
      { type: 'Process Understanding', count: 22, color: 'bg-green-500' },
      { type: 'Application', count: 15, color: 'bg-purple-500' },
      { type: 'Comparison', count: 6, color: 'bg-orange-500' },
    ],
    commonQuestions: [
      'What is a Punnett square?',
      'How does inheritance work?',
      'What are dominant and recessive traits?'
    ]
  },
  {
    topic: 'Ecosystems',
    totalQueries: 64,
    students: ['Ethan Martinez', 'Mason Taylor', 'Liam Smith'],
    queryTypes: [
      { type: 'Concept Clarification', count: 28, color: 'bg-blue-500' },
      { type: 'Process Understanding', count: 20, color: 'bg-green-500' },
      { type: 'Application', count: 11, color: 'bg-purple-500' },
      { type: 'Comparison', count: 5, color: 'bg-orange-500' },
    ],
    commonQuestions: [
      'What is a food chain?',
      'How do producers and consumers interact?',
      'What is biodiversity?'
    ]
  },
  {
    topic: 'Mitosis & Meiosis',
    totalQueries: 56,
    students: ['Emma Johnson', 'Noah Davis', 'Olivia Brown'],
    queryTypes: [
      { type: 'Concept Clarification', count: 25, color: 'bg-blue-500' },
      { type: 'Process Understanding', count: 18, color: 'bg-green-500' },
      { type: 'Application', count: 8, color: 'bg-purple-500' },
      { type: 'Comparison', count: 5, color: 'bg-orange-500' },
    ],
    commonQuestions: [
      'What is the difference between mitosis and meiosis?',
      'What are the stages of mitosis?',
      'Why is meiosis important for reproduction?'
    ]
  },
];

export function QueryAnalysisPage({ filters }: QueryAnalysisPageProps) {
  const [activeTab, setActiveTab] = useState<'signature' | 'blooms' | 'summary'>('signature');
  
  // Calculate insights based on the data
  const highestLevel = bloomsTaxonomyData.reduce((max, item) => item.score > max.score ? item : max);
  const lowestLevel = bloomsTaxonomyData.reduce((min, item) => item.score < min.score ? item : min);
  const lowerOrderThinking = bloomsTaxonomyData.slice(0, 3).reduce((sum, item) => sum + item.score, 0) / 3;
  const higherOrderThinking = bloomsTaxonomyData.slice(3, 6).reduce((sum, item) => sum + item.score, 0) / 3;

  return (
    <div className="flex-1 p-8">
      <div className="mb-6">
        <h2 className="text-gray-800 mb-2">Query Analysis</h2>
        <p className="text-gray-600">Comprehensive view of student query patterns and learning engagement</p>
      </div>
      
      {/* Tabs */}
      <div className="flex gap-2 mb-6 border-b border-gray-200">
        <button
          onClick={() => setActiveTab('signature')}
          className={`flex items-center gap-2 px-6 py-3 transition-colors relative ${
            activeTab === 'signature'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <BarChart3 className="w-4 h-4" />
          Query Signature Analysis
        </button>
        <button
          onClick={() => setActiveTab('blooms')}
          className={`flex items-center gap-2 px-6 py-3 transition-colors relative ${
            activeTab === 'blooms'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <Brain className="w-4 h-4" />
          Query Nature - Bloom's Taxonomy Levels
        </button>
        <button
          onClick={() => setActiveTab('summary')}
          className={`flex items-center gap-2 px-6 py-3 transition-colors relative ${
            activeTab === 'summary'
              ? 'text-blue-600 border-b-2 border-blue-600'
              : 'text-gray-600 hover:text-gray-800'
          }`}
        >
          <ListChecks className="w-4 h-4" />
          Topic Query Summary
        </button>
      </div>

      {/* Tab Content */}
      {activeTab === 'blooms' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Bloom's Taxonomy - Cognitive Complexity</h3>
          <p className="text-gray-600 mb-6">Distribution of student queries across Bloom's six cognitive levels</p>
          
          {/* AI Insights - Moved above the visual */}
          <div className="mb-6 p-4 bg-purple-50 border border-purple-200 rounded-lg">
            <div className="flex items-start gap-3">
              <Brain className="w-5 h-5 text-purple-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-purple-900 mb-2">Cognitive Complexity Insights</div>
                <ul className="space-y-2 text-purple-800">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>
                      <strong>Lower-Order Thinking Skills (LOT):</strong> Average {lowerOrderThinking.toFixed(1)}% across Recall, Understand, and Apply levels. 
                      Students show strong foundational understanding with <strong>{highestLevel.level}</strong> queries leading at {highestLevel.score}%.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>
                      <strong>Higher-Order Thinking Skills (HOT):</strong> Average {higherOrderThinking.toFixed(1)}% across Analyze, Evaluate, and Create levels. 
                      <strong> {lowestLevel.level}</strong> queries are notably low at {lowestLevel.score}%, indicating students need more prompting for creative thinking.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>
                      <strong>Recommendation:</strong> The gap between LOT ({lowerOrderThinking.toFixed(1)}%) and HOT ({higherOrderThinking.toFixed(1)}%) suggests 
                      students are comfortable with basic comprehension but struggle with critical thinking. Consider introducing more analysis-based 
                      assignments and open-ended projects to develop higher-order cognitive skills.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600 mt-1">•</span>
                    <span>
                      <strong>Action Items:</strong> Encourage evaluation and creation activities through project-based learning, peer reviews, 
                      and synthesis tasks. Provide scaffolding to help students transition from understanding to analyzing and creating.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-6">
            {/* Radar Chart - MADE INTERACTIVE */}
            <div className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={bloomsTaxonomyData}>
                  <PolarGrid stroke="#e5e7eb" />
                  <PolarAngleAxis 
                    dataKey="level" 
                    tick={{ fill: '#6b7280', fontSize: 12 }}
                  />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: '#6b7280' }} />
                  <Radar 
                    name="Query Distribution" 
                    dataKey="score" 
                    stroke="#8b5cf6" 
                    fill="#8b5cf6" 
                    fillOpacity={0.6}
                    cursor="pointer"
                  />
                  <Tooltip 
                    contentStyle={{ backgroundColor: '#fff', border: '1px solid #e5e7eb', borderRadius: '8px' }}
                  />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            {/* Legend in Two Columns */}
            <div>
              <h4 className="text-gray-700 mb-3">Bloom's Levels</h4>
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {bloomsTaxonomyData.map((item, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${
                      index < 3 ? 'bg-blue-400' : 'bg-purple-600'
                    }`} />
                    <div className="flex-1 min-w-0">
                      <div className="text-gray-800">{item.level}</div>
                      <div className="text-gray-500 text-sm">{item.description}</div>
                      <div className="text-gray-700 mt-1">{item.score}%</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'signature' && (
        <QuerySignature filters={filters} />
      )}

      {activeTab === 'summary' && (
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <h3 className="text-gray-800 mb-4">Topic Query Summary</h3>
          <p className="text-gray-600 mb-6">Overview of student queries organized by Biology topics</p>
          
          {/* AI Insights */}
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <div className="flex items-start gap-3">
              <ListChecks className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
              <div>
                <div className="text-green-900 mb-2">Topic Query Insights</div>
                <ul className="space-y-2 text-green-800">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>
                      <strong>Most Queried Topic:</strong> {topicQueryData[0].topic} with {topicQueryData[0].totalQueries} queries. 
                      Students are actively seeking clarification, indicating high engagement but possible conceptual gaps.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>
                      <strong>Least Queried Topic:</strong> {topicQueryData[topicQueryData.length - 1].topic} with {topicQueryData[topicQueryData.length - 1].totalQueries} queries. 
                      Either students have strong understanding or are disengaged with this topic.
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 mt-1">•</span>
                    <span>
                      <strong>Query Pattern:</strong> Concept Clarification queries dominate across all topics, suggesting students need more foundational explanation before moving to application.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Topic Cards */}
          <div className="space-y-4">
            {topicQueryData.map((topicData, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h4 className="text-gray-800 mb-1">{topicData.topic}</h4>
                    <p className="text-gray-500">Total Queries: {topicData.totalQueries}</p>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {topicData.students.map((student, studentIndex) => (
                      <span key={studentIndex} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {student}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Query Types Distribution */}
                <div className="mb-4">
                  <div className="text-gray-600 mb-2">Query Type Distribution</div>
                  <div className="grid grid-cols-4 gap-3">
                    {topicData.queryTypes.map((queryType, typeIndex) => (
                      <div key={typeIndex} className="flex flex-col items-center p-3 bg-gray-50 rounded-lg">
                        <div className={`w-12 h-12 rounded-full ${queryType.color} flex items-center justify-center text-white mb-2`}>
                          {queryType.count}
                        </div>
                        <div className="text-gray-700 text-center">{queryType.type}</div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Common Questions */}
                <div>
                  <div className="text-gray-600 mb-2">Most Common Questions</div>
                  <ul className="space-y-1">
                    {topicData.commonQuestions.map((question, qIndex) => (
                      <li key={qIndex} className="flex items-start gap-2 text-gray-700">
                        <span className="text-blue-600 mt-1">•</span>
                        <span className="italic">{question}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}