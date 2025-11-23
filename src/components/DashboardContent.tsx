import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { TrendingUp, Users, BookOpen, Award, FileText, FileBarChart, MessageSquare } from 'lucide-react';
import { ClassInsights } from './ClassInsights';
import { Brain } from 'lucide-react';
import { EngagementScatterPlot } from './EngagementScatterPlot';

interface DashboardContentProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel: 'low' | 'medium' | 'high' | null;
  };
  setFilters: (filters: any) => void;
}

const attendanceData = [
  { day: 'Mon', present: 28, absent: 2 },
  { day: 'Tue', present: 27, absent: 3 },
  { day: 'Wed', present: 29, absent: 1 },
  { day: 'Thu', present: 26, absent: 4 },
  { day: 'Fri', present: 30, absent: 0 },
];

const performanceData = [
  { week: 'Week 1', score: 75 },
  { week: 'Week 2', score: 78 },
  { week: 'Week 3', score: 82 },
  { week: 'Week 4', score: 85 },
  { week: 'Week 5', score: 88 },
];

// Comprehensive activities data organized by filters
const activitiesData: { [key: string]: any[] } = {
  // Student-specific activities
  'Emma Johnson': [
    { student: 'Emma Johnson', activity: 'Completed Algebra Quiz', score: '92%', time: '2 hours ago', subject: 'Mathematics' },
    { student: 'Emma Johnson', activity: 'Submitted Geometry Homework', score: '88%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Emma Johnson', activity: 'Finished English Essay', score: '95%', time: '2 days ago', subject: 'English' },
    { student: 'Emma Johnson', activity: 'Completed Science Lab Report', score: '90%', time: '3 days ago', subject: 'Science' },
  ],
  'Liam Smith': [
    { student: 'Liam Smith', activity: 'Submitted Science Project', score: '88%', time: '3 hours ago', subject: 'Science' },
    { student: 'Liam Smith', activity: 'Completed Physics Problem Set', score: '85%', time: '1 day ago', subject: 'Physics' },
    { student: 'Liam Smith', activity: 'Finished History Assignment', score: '82%', time: '2 days ago', subject: 'History' },
    { student: 'Liam Smith', activity: 'Submitted Math Quiz', score: '87%', time: '4 days ago', subject: 'Mathematics' },
  ],
  'Olivia Brown': [
    { student: 'Olivia Brown', activity: 'Finished Reading Assignment', score: '95%', time: '5 hours ago', subject: 'English' },
    { student: 'Olivia Brown', activity: 'Completed Literature Analysis', score: '93%', time: '1 day ago', subject: 'English' },
    { student: 'Olivia Brown', activity: 'Submitted Geography Project', score: '91%', time: '2 days ago', subject: 'Geography' },
    { student: 'Olivia Brown', activity: 'Finished Chemistry Lab', score: '89%', time: '3 days ago', subject: 'Chemistry' },
  ],
  'Noah Davis': [
    { student: 'Noah Davis', activity: 'Completed Math Homework', score: '85%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Noah Davis', activity: 'Submitted Algebra Test', score: '83%', time: '2 days ago', subject: 'Mathematics' },
    { student: 'Noah Davis', activity: 'Finished Science Quiz', score: '87%', time: '3 days ago', subject: 'Science' },
    { student: 'Noah Davis', activity: 'Completed History Essay', score: '80%', time: '4 days ago', subject: 'History' },
  ],
  'Ava Wilson': [
    { student: 'Ava Wilson', activity: 'Submitted Chemistry Experiment', score: '91%', time: '4 hours ago', subject: 'Chemistry' },
    { student: 'Ava Wilson', activity: 'Completed Biology Assignment', score: '89%', time: '1 day ago', subject: 'Science' },
    { student: 'Ava Wilson', activity: 'Finished Math Problem Set', score: '86%', time: '2 days ago', subject: 'Mathematics' },
    { student: 'Ava Wilson', activity: 'Submitted English Presentation', score: '92%', time: '5 days ago', subject: 'English' },
  ],
  'Ethan Martinez': [
    { student: 'Ethan Martinez', activity: 'Completed Geography Quiz', score: '84%', time: '6 hours ago', subject: 'Geography' },
    { student: 'Ethan Martinez', activity: 'Submitted History Project', score: '88%', time: '1 day ago', subject: 'History' },
    { student: 'Ethan Martinez', activity: 'Finished Science Lab', score: '86%', time: '3 days ago', subject: 'Science' },
    { student: 'Ethan Martinez', activity: 'Completed Math Test', score: '81%', time: '4 days ago', subject: 'Mathematics' },
  ],
  'Sophia Anderson': [
    { student: 'Sophia Anderson', activity: 'Finished Physics Experiment', score: '93%', time: '2 hours ago', subject: 'Physics' },
    { student: 'Sophia Anderson', activity: 'Submitted Math Assignment', score: '90%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Sophia Anderson', activity: 'Completed Chemistry Quiz', score: '88%', time: '2 days ago', subject: 'Chemistry' },
    { student: 'Sophia Anderson', activity: 'Finished English Essay', score: '94%', time: '3 days ago', subject: 'English' },
  ],
  'Mason Taylor': [
    { student: 'Mason Taylor', activity: 'Submitted Biology Report', score: '87%', time: '3 hours ago', subject: 'Science' },
    { student: 'Mason Taylor', activity: 'Completed English Reading', score: '85%', time: '1 day ago', subject: 'English' },
    { student: 'Mason Taylor', activity: 'Finished Geography Homework', score: '83%', time: '2 days ago', subject: 'Geography' },
    { student: 'Mason Taylor', activity: 'Submitted Math Quiz', score: '86%', time: '4 days ago', subject: 'Mathematics' },
  ],
  
  // Subject-specific activities
  'Mathematics': [
    { student: 'Emma Johnson', activity: 'Completed Algebra Quiz', score: '92%', time: '2 hours ago', subject: 'Mathematics' },
    { student: 'Noah Davis', activity: 'Completed Math Homework', score: '85%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Sophia Anderson', activity: 'Submitted Math Assignment', score: '90%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Ava Wilson', activity: 'Finished Math Problem Set', score: '86%', time: '2 days ago', subject: 'Mathematics' },
  ],
  'Science': [
    { student: 'Liam Smith', activity: 'Submitted Science Project', score: '88%', time: '3 hours ago', subject: 'Science' },
    { student: 'Mason Taylor', activity: 'Submitted Biology Report', score: '87%', time: '3 hours ago', subject: 'Science' },
    { student: 'Emma Johnson', activity: 'Completed Science Lab Report', score: '90%', time: '3 days ago', subject: 'Science' },
    { student: 'Ava Wilson', activity: 'Completed Biology Assignment', score: '89%', time: '1 day ago', subject: 'Science' },
  ],
  'English': [
    { student: 'Olivia Brown', activity: 'Finished Reading Assignment', score: '95%', time: '5 hours ago', subject: 'English' },
    { student: 'Emma Johnson', activity: 'Finished English Essay', score: '95%', time: '2 days ago', subject: 'English' },
    { student: 'Sophia Anderson', activity: 'Finished English Essay', score: '94%', time: '3 days ago', subject: 'English' },
    { student: 'Mason Taylor', activity: 'Completed English Reading', score: '85%', time: '1 day ago', subject: 'English' },
  ],
  'History': [
    { student: 'Ethan Martinez', activity: 'Submitted History Project', score: '88%', time: '1 day ago', subject: 'History' },
    { student: 'Liam Smith', activity: 'Finished History Assignment', score: '82%', time: '2 days ago', subject: 'History' },
    { student: 'Noah Davis', activity: 'Completed History Essay', score: '80%', time: '4 days ago', subject: 'History' },
    { student: 'Emma Johnson', activity: 'Submitted History Research', score: '89%', time: '5 days ago', subject: 'History' },
  ],
  'Geography': [
    { student: 'Ethan Martinez', activity: 'Completed Geography Quiz', score: '84%', time: '6 hours ago', subject: 'Geography' },
    { student: 'Olivia Brown', activity: 'Submitted Geography Project', score: '91%', time: '2 days ago', subject: 'Geography' },
    { student: 'Mason Taylor', activity: 'Finished Geography Homework', score: '83%', time: '2 days ago', subject: 'Geography' },
    { student: 'Ava Wilson', activity: 'Completed Geography Test', score: '87%', time: '3 days ago', subject: 'Geography' },
  ],
  'Physics': [
    { student: 'Sophia Anderson', activity: 'Finished Physics Experiment', score: '93%', time: '2 hours ago', subject: 'Physics' },
    { student: 'Liam Smith', activity: 'Completed Physics Problem Set', score: '85%', time: '1 day ago', subject: 'Physics' },
    { student: 'Noah Davis', activity: 'Submitted Physics Lab Report', score: '88%', time: '2 days ago', subject: 'Physics' },
    { student: 'Emma Johnson', activity: 'Finished Physics Quiz', score: '91%', time: '4 days ago', subject: 'Physics' },
  ],
  'Chemistry': [
    { student: 'Ava Wilson', activity: 'Submitted Chemistry Experiment', score: '91%', time: '4 hours ago', subject: 'Chemistry' },
    { student: 'Sophia Anderson', activity: 'Completed Chemistry Quiz', score: '88%', time: '2 days ago', subject: 'Chemistry' },
    { student: 'Olivia Brown', activity: 'Finished Chemistry Lab', score: '89%', time: '3 days ago', subject: 'Chemistry' },
    { student: 'Ethan Martinez', activity: 'Submitted Chemistry Report', score: '85%', time: '5 days ago', subject: 'Chemistry' },
  ],
  
  // Class-specific activities
  'Grade 6A': [
    { student: 'Emma Johnson', activity: 'Completed Algebra Quiz', score: '92%', time: '2 hours ago', subject: 'Mathematics' },
    { student: 'Liam Smith', activity: 'Submitted Science Project', score: '88%', time: '3 hours ago', subject: 'Science' },
    { student: 'Olivia Brown', activity: 'Finished Reading Assignment', score: '95%', time: '5 hours ago', subject: 'English' },
    { student: 'Noah Davis', activity: 'Completed Math Homework', score: '85%', time: '1 day ago', subject: 'Mathematics' },
  ],
  'Grade 6B': [
    { student: 'Ava Wilson', activity: 'Submitted Chemistry Experiment', score: '91%', time: '4 hours ago', subject: 'Chemistry' },
    { student: 'Ethan Martinez', activity: 'Completed Geography Quiz', score: '84%', time: '6 hours ago', subject: 'Geography' },
    { student: 'Sophia Anderson', activity: 'Finished Physics Experiment', score: '93%', time: '2 hours ago', subject: 'Physics' },
    { student: 'Mason Taylor', activity: 'Submitted Biology Report', score: '87%', time: '3 hours ago', subject: 'Science' },
  ],
  'Grade 7A': [
    { student: 'James Wilson', activity: 'Completed Advanced Math', score: '89%', time: '1 hour ago', subject: 'Mathematics' },
    { student: 'Isabella Garcia', activity: 'Submitted English Essay', score: '92%', time: '4 hours ago', subject: 'English' },
    { student: 'William Jones', activity: 'Finished Science Project', score: '86%', time: '1 day ago', subject: 'Science' },
    { student: 'Mia Rodriguez', activity: 'Completed History Test', score: '88%', time: '2 days ago', subject: 'History' },
  ],
  'Grade 7B': [
    { student: 'Benjamin Lee', activity: 'Submitted Physics Lab', score: '90%', time: '2 hours ago', subject: 'Physics' },
    { student: 'Charlotte Kim', activity: 'Completed Chemistry Quiz', score: '87%', time: '5 hours ago', subject: 'Chemistry' },
    { student: 'Alexander Chen', activity: 'Finished Math Problem Set', score: '84%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Amelia Park', activity: 'Submitted Geography Project', score: '91%', time: '3 days ago', subject: 'Geography' },
  ],
  'Grade 8A': [
    { student: 'Lucas Brown', activity: 'Completed Advanced Physics', score: '94%', time: '3 hours ago', subject: 'Physics' },
    { student: 'Harper Miller', activity: 'Submitted Literature Analysis', score: '93%', time: '6 hours ago', subject: 'English' },
    { student: 'Henry Davis', activity: 'Finished Calculus Assignment', score: '91%', time: '1 day ago', subject: 'Mathematics' },
    { student: 'Evelyn Martinez', activity: 'Completed Biology Lab', score: '89%', time: '2 days ago', subject: 'Science' },
  ],
  'Grade 8B': [
    { student: 'Sebastian Johnson', activity: 'Submitted Chemistry Report', score: '88%', time: '1 hour ago', subject: 'Chemistry' },
    { student: 'Abigail Taylor', activity: 'Completed History Essay', score: '90%', time: '4 hours ago', subject: 'History' },
    { student: 'Jack Anderson', activity: 'Finished Physics Experiment', score: '86%', time: '1 day ago', subject: 'Physics' },
    { student: 'Emily Thomas', activity: 'Submitted English Presentation', score: '92%', time: '3 days ago', subject: 'English' },
  ],
  
  // Default activities for "All" filters
  'default': [
    { student: 'Emma Johnson', activity: 'Completed Algebra Quiz', score: '92%', time: '2 hours ago', subject: 'Mathematics' },
    { student: 'Liam Smith', activity: 'Submitted Science Project', score: '88%', time: '3 hours ago', subject: 'Science' },
    { student: 'Olivia Brown', activity: 'Finished Reading Assignment', score: '95%', time: '5 hours ago', subject: 'English' },
    { student: 'Noah Davis', activity: 'Completed Math Homework', score: '85%', time: '1 day ago', subject: 'Mathematics' },
  ],
};

export function DashboardContent({ filters, setFilters }: DashboardContentProps) {
  const getSelectedActivities = () => {
    // If specific students are selected, use their data
    if (filters.students.length === 1 && activitiesData[filters.students[0]]) {
      return activitiesData[filters.students[0]];
    }
    
    return activitiesData['default'];
  };

  // Generate intelligent inferences based on selected students
  const generateTileInferences = () => {
    const hasStudentFilter = filters.students.length > 0;
    const studentNames = filters.students.join(', ');
    
    if (!hasStudentFilter) {
      return {
        show: false,
        insights: []
      };
    }

    // Single student selected
    if (filters.students.length === 1) {
      const studentName = filters.students[0];
      return {
        show: true,
        title: `Learning Insights for ${studentName}`,
        insights: [
          {
            icon: '📝',
            text: `<strong>Note-Taking Pattern:</strong> ${studentName} has created 52 notes on DNA & Genetics and 47 on Cell Structure, showing strong documentation habits. This indicates active learning and knowledge consolidation in molecular biology topics.`
          },
          {
            icon: '📊',
            text: `<strong>Content Engagement:</strong> High scanning activity on Diagrams & Charts (342 scans) suggests ${studentName} is a visual learner who benefits from graphical representations. Cell Biology and Genetics are the most accessed topics, aligning with note-taking patterns.`
          },
          {
            icon: '💬',
            text: `<strong>Query Behavior:</strong> With 45 queries on DNA & Genetics and 38 on Cell Structure, ${studentName} is actively seeking clarification on complex concepts. The query distribution shows 52% conceptual questions, indicating deep engagement with theoretical understanding.`
          },
          {
            icon: '✨',
            text: `<strong>Overall Assessment:</strong> ${studentName} demonstrates a balanced learning approach—taking comprehensive notes, engaging with visual content, and asking thoughtful questions. The correlation between notes (52), content scans, and queries (45) on DNA & Genetics suggests systematic topic mastery. Continue encouraging this multi-modal learning strategy.`
          }
        ]
      };
    }

    // Multiple students selected
    if (filters.students.length > 1) {
      return {
        show: true,
        title: `Comparative Learning Insights for ${studentNames}`,
        insights: [
          {
            icon: '📝',
            text: `<strong>Collaborative Note-Taking:</strong> The selected students collectively show strong engagement with notes across DNA & Genetics (52 notes) and Cell Structure (47 notes). This suggests these topics are challenging and require extensive documentation across the group.`
          },
          {
            icon: '📊',
            text: `<strong>Group Content Preferences:</strong> All selected students show preference for visual content (Diagrams & Charts with 342 scans) and focus on Cell Biology and Genetics topics. Consider providing more visual learning materials for these subjects to optimize group learning.`
          },
          {
            icon: '💬',
            text: `<strong>Query Patterns:</strong> The group shows concentrated query activity on DNA & Genetics (45 queries) and Cell Structure (38 queries), with 52% being conceptual questions. This indicates the group is grappling with theoretical foundations and would benefit from additional concept clarification sessions.`
          },
          {
            icon: '🎯',
            text: `<strong>Recommendation:</strong> The selected students display synchronized learning patterns—high notes, consistent content scanning, and similar query topics. Consider forming a study group for DNA & Genetics, as their aligned interests and complementary questions could facilitate peer learning and deeper understanding.`
          }
        ]
      };
    }

    return { show: false, insights: [] };
  };

  const selectedActivities = getSelectedActivities();
  const tileInferences = generateTileInferences();

  return (
    <div className="flex-1 px-8 py-4">
      {/* Class Insights - Individual Student Behavior on Top */}
      <div className="mb-8">
        <ClassInsights filters={filters} setFilters={setFilters} />
      </div>

      {/* Student-Specific Tile Inferences - Moved above Engagement Scatter Plot */}
      {tileInferences.show && (
        <div className="mb-8 bg-gradient-to-br from-indigo-50 to-purple-50 p-6 rounded-lg border border-indigo-200">
          <div className="flex items-start gap-3 mb-4">
            <Brain className="w-6 h-6 text-indigo-600 mt-1 flex-shrink-0" />
            <div className="flex-1">
              <h3 className="text-indigo-900 mb-2">{tileInferences.title}</h3>
              <p className="text-indigo-700 mb-4">
                AI-powered analysis based on Notes, Content Scanning, and Query patterns from the dashboard tiles above
              </p>
              
              <div className="space-y-4">
                {tileInferences.insights.map((insight, index) => (
                  <div key={index} className="bg-white p-4 rounded-lg border border-indigo-100 shadow-sm">
                    <div className="flex items-start gap-3">
                      <span className="text-2xl flex-shrink-0">{insight.icon}</span>
                      <p 
                        className="text-gray-800 flex-1" 
                        dangerouslySetInnerHTML={{ __html: insight.text }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* New Dashboard Tiles */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Notes Summary Tile */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-purple-100 text-purple-600 p-3 rounded-lg">
              <FileText className="w-5 h-5" />
            </div>
            <h3 className="text-gray-800">Notes</h3>
          </div>
          
          <div className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Cell Structure</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">47</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">DNA & Genetics</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">52</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Photosynthesis</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">38</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span className="text-gray-700">Ecology</span>
              <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full">29</span>
            </div>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Total Notes</span>
              <span className="text-gray-900">166</span>
            </div>
          </div>
        </div>

        {/* Content Insights Tile */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-100 text-blue-600 p-3 rounded-lg">
              <FileBarChart className="w-5 h-5" />
            </div>
            <h3 className="text-gray-800">Content</h3>
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="text-gray-600 mb-2">Most Scanned Content</div>
              <div className="text-gray-900">Diagrams & Charts</div>
              <div className="text-gray-500">342 scans</div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <div className="text-gray-600 mb-2">Popular Topics</div>
              <div className="flex flex-wrap gap-2">
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Cell Biology</span>
                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">Genetics</span>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <div className="flex justify-between">
                <span className="text-gray-600">Scan Rate</span>
                <span className="text-green-600">↑ 12%</span>
              </div>
            </div>
          </div>
        </div>

        {/* Query Summary Tile */}
        <div className="bg-white p-6 rounded-lg border border-gray-200">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-teal-100 text-teal-600 p-3 rounded-lg">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="text-gray-800">Query Summary</h3>
          </div>
          
          <div className="space-y-3">
            <div>
              <div className="text-gray-600 mb-2">Top Query Topics</div>
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">DNA & Genetics</span>
                  <span className="text-gray-500">45 queries</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-700">Cell Structure</span>
                  <span className="text-gray-500">38 queries</span>
                </div>
              </div>
            </div>
            
            <div className="pt-3 border-t border-gray-200">
              <div className="text-gray-600 mb-2">Query Nature</div>
              <div className="space-y-1">
                <div className="flex justify-between text-gray-700">
                  <span>Conceptual</span>
                  <span>52%</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Application</span>
                  <span>31%</span>
                </div>
                <div className="flex justify-between text-gray-700">
                  <span>Analysis</span>
                  <span>17%</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Total Students"
          value="30"
          change="+2 from last week"
          iconBg="bg-blue-100"
          iconColor="text-blue-600"
        />
        <StatCard
          icon={<Users className="w-6 h-6" />}
          title="Active Users"
          value="24"
          change="Currently online"
          iconBg="bg-green-100"
          iconColor="text-green-600"
        />
        <StatCard
          icon={<Award className="w-6 h-6" />}
          title="Assignments Due"
          value="12"
          change="3 pending review"
          iconBg="bg-yellow-100"
          iconColor="text-yellow-600"
        />
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
  change: string;
  iconBg: string;
  iconColor: string;
}

function StatCard({ icon, title, value, change, iconBg, iconColor }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-start justify-between mb-4">
        <div className={`${iconBg} ${iconColor} p-3 rounded-lg`}>
          {icon}
        </div>
      </div>
      <div className="text-gray-500 mb-1">{title}</div>
      <div className="text-gray-900 mb-2">{value}</div>
      <div className="text-gray-400">{change}</div>
    </div>
  );
}