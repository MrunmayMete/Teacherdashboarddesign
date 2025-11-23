import { QuerySignature } from './QuerySignature';
import { RadarChart, Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer, Tooltip } from 'recharts';
import { Brain, BarChart3 } from 'lucide-react';
import { useState } from 'react';
import { EngagementScatterPlot } from './EngagementScatterPlot';

interface QueryAnalysisPageProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
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

export function QueryAnalysisPage({ filters }: QueryAnalysisPageProps) {
  const [activeTab, setActiveTab] = useState<'signature' | 'blooms'>('signature');
  
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
            {/* Radar Chart */}
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
                  />
                  <Tooltip />
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
    </div>
  );
}