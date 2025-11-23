import { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Sparkles } from 'lucide-react';

interface ChatBotProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel?: 'low' | 'medium' | 'high' | null;
  };
}

interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function ChatBot({ filters }: ChatBotProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      // Welcome message when first opened
      const welcomeMessage: Message = {
        id: Date.now().toString(),
        text: `Hello! I'm your AI teaching assistant. I can provide insights about your classroom data. Currently viewing: ${filters.class}, ${filters.subject}, ${filters.students.join(', ')}. How can I help you today?`,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages([welcomeMessage]);
    }
  }, [isOpen]);

  const generateBotResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase();

    // Context-aware responses based on filters
    const filterContext = `Based on your current selection (${filters.class}, ${filters.subject}, ${filters.students.join(', ')}${filters.topic ? ', Topic: ' + filters.topic : ''})`;

    // Performance-related queries
    if (lowerMessage.includes('performance') || lowerMessage.includes('how are') || lowerMessage.includes('doing')) {
      if (filters.students.length === 1) {
        return `${filterContext}, ${filters.students[0]} is showing strong performance with an average score of 87%. They excel particularly in recent assignments with a 5% improvement over the last two weeks. Their engagement in ${filters.subject !== 'All Subjects' ? filters.subject : 'current subjects'} is at 85%.`;
      } else if (filters.class !== 'All Classes') {
        return `${filterContext}, the class is performing well with an average of 85%. The performance trend shows consistent improvement with a 5% increase over the past month. Attendance is strong at 93%, and topic engagement is healthy across all subjects.`;
      }
      return `Overall performance across all classes is at 85% with an upward trend. Weekly attendance averages 93%, and student engagement has increased by 5% this month.`;
    }

    // Attendance queries
    if (lowerMessage.includes('attendance') || lowerMessage.includes('absent') || lowerMessage.includes('present')) {
      if (filters.class !== 'All Classes') {
        return `${filterContext}, attendance is excellent with 93% average this week. Monday had 28/30 students present, with perfect attendance on Friday. Only 2-4 absences throughout the week, which is below the school average.`;
      }
      return `Attendance across all classes averages 93% this week. The trend shows Friday has the best attendance (100%), while Thursday typically sees more absences (4 students). Consider scheduling important lessons early in the week.`;
    }

    // Engagement queries
    if (lowerMessage.includes('engagement') || lowerMessage.includes('topic') || lowerMessage.includes('interest')) {
      if (filters.topic) {
        return `${filterContext}, the engagement for ${filters.topic} shows ${filters.topic === 'Statistics' ? '91%' : filters.topic === 'Algebra' ? '85%' : '75%'} participation. Students are actively engaging with the material. Consider incorporating more interactive activities to maintain this momentum.`;
      }
      if (filters.subject !== 'All Subjects') {
        return `${filterContext}, engagement in ${filters.subject} topics is strong. Statistics shows the highest engagement at 91%, while Fractions needs attention at 68%. Consider incorporating more interactive activities for lower-engagement topics.`;
      }
      return `Topic engagement varies by subject. Science's Photosynthesis topic leads at 88%, while some math topics like Fractions are at 68%. Interactive and visual learning methods tend to show 15-20% higher engagement rates.`;
    }

    // Improvement suggestions
    if (lowerMessage.includes('improve') || lowerMessage.includes('suggestion') || lowerMessage.includes('recommend')) {
      const suggestions = [];
      if (filters.topic) {
        suggestions.push(`For ${filters.topic}, review the student queries to identify common confusion points.`);
        suggestions.push(`Consider creating supplementary materials specifically for ${filters.topic}.`);
      }
      if (filters.subject !== 'All Subjects') {
        suggestions.push(`For ${filters.subject}, consider adding more hands-on activities for topics with <75% engagement.`);
      }
      if (filters.class !== 'All Classes') {
        suggestions.push(`In ${filters.class}, implement peer tutoring for students scoring below 80%.`);
      }
      suggestions.push('Schedule review sessions on Thursdays when attendance dips.');
      suggestions.push('Use the high-performing topics as models for teaching lower-engagement subjects.');
      return `Here are my recommendations ${filterContext}:\n\n${suggestions.map((s, i) => `${i + 1}. ${s}`).join('\n')}`;
    }

    // Student-specific queries
    if (lowerMessage.includes('student') || lowerMessage.includes('individual')) {
      if (filters.students.length === 1) {
        return `${filters.students[0]} has completed 12 assignments this month with an average score of 87%. Recent activity shows they submitted a Science Project (88%) 3 hours ago. Engagement is strong, particularly in analytical subjects. Recommend challenging them with advanced materials.`;
      }
      return `You have 30 active students. Top performers include Emma Johnson (92% avg), Olivia Brown (95% recent), and Liam Smith (88%). 4 students would benefit from additional support in subjects with <75% scores.`;
    }

    // Activities and assignments
    if (lowerMessage.includes('assignment') || lowerMessage.includes('activity') || lowerMessage.includes('homework')) {
      return `${filterContext}, there are currently 12 assignments due with 3 pending your review. Recent submissions show strong performance (85-95% range). Emma Johnson's Algebra Quiz scored highest at 92%. Consider reviewing pending assignments to maintain student momentum.`;
    }

    // Trends
    if (lowerMessage.includes('trend') || lowerMessage.includes('over time') || lowerMessage.includes('progress')) {
      return `${filterContext}, the trend is positive! Performance has improved from 75% (Week 1) to 88% (Week 5), showing consistent 3-4% weekly growth. This indicates effective teaching methods and strong student dedication. Maintain current strategies while monitoring individual progress.`;
    }

    // Topic-specific
    if (lowerMessage.includes('query') || lowerMessage.includes('queries') || lowerMessage.includes('question')) {
      if (filters.topic) {
        return `${filterContext}, students have submitted several queries about ${filters.topic}. Common themes include requests for additional examples and clarification on core concepts. Review the Student Queries section for detailed insights. Consider scheduling a Q&A session.`;
      }
      return `Student queries vary by topic and subject. The most common requests are for additional practice problems, more visual examples, and real-world applications. Check the Student Queries tile for specific concerns by topic.`;
    }

    // General summary
    if (lowerMessage.includes('summary') || lowerMessage.includes('overview') || lowerMessage.includes('overall')) {
      return `${filterContext}:\n\n📊 Performance: 85% average (+5% improvement)\n👥 Attendance: 93% weekly average\n📚 Engagement: 82% average across topics\n✅ Assignments: 12 due, 3 pending review\n📈 Trend: Positive upward trajectory\n\nYour classroom is performing well above benchmarks. Focus on maintaining engagement in lower-performing topics and providing additional support to students scoring below 75%.`;
    }

    // Help/capabilities
    if (lowerMessage.includes('help') || lowerMessage.includes('what can you') || lowerMessage.includes('capabilities')) {
      return `I can help you with:\n\n• Performance analysis and trends\n• Attendance insights and patterns\n• Topic engagement evaluation\n• Student-specific recommendations\n• Assignment status and reviews\n• Improvement suggestions\n• Data summaries and overviews\n\nJust ask me about any aspect of your classroom data, and I'll provide detailed insights based on your current filters!`;
    }

    // Default response
    return `${filterContext}, I can provide insights about performance, attendance, engagement, student progress, and assignments. Could you please be more specific about what aspect of the classroom data you'd like to explore?`;
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const botResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: generateBotResponse(inputValue),
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const quickQuestions = [
    "How is performance trending?",
    "Summarize attendance patterns",
    "Which topics need attention?",
    "Give me improvement suggestions"
  ];

  const handleQuickQuestion = (question: string) => {
    setInputValue(question);
  };

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all hover:scale-110 z-50 flex items-center gap-2"
        >
          <Sparkles className="w-6 h-6" />
          <span className="pr-2">AI Assistant</span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-96 h-[600px] bg-white rounded-lg shadow-2xl flex flex-col z-50 border border-gray-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5" />
              <div>
                <h3>AI Teaching Assistant</h3>
                <p className="text-blue-100">Ask me anything about your classroom</p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-white hover:bg-blue-800 p-1 rounded transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
            {messages.length === 1 && (
              <div className="mb-4">
                <p className="text-gray-600 mb-3">Quick questions:</p>
                <div className="grid grid-cols-1 gap-2">
                  {quickQuestions.map((question, index) => (
                    <button
                      key={index}
                      onClick={() => handleQuickQuestion(question)}
                      className="text-left px-3 py-2 bg-white border border-gray-200 rounded-lg hover:bg-blue-50 hover:border-blue-300 transition-colors text-gray-700"
                    >
                      {question}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.sender === 'user'
                      ? 'bg-blue-600 text-white rounded-br-none'
                      : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                  }`}
                >
                  {message.sender === 'bot' && (
                    <div className="flex items-center gap-1 mb-1">
                      <Sparkles className="w-3 h-3 text-blue-600" />
                      <span className="text-blue-600">AI Assistant</span>
                    </div>
                  )}
                  <div className="whitespace-pre-wrap">{message.text}</div>
                  <div
                    className={`text-right mt-1 ${
                      message.sender === 'user' ? 'text-blue-200' : 'text-gray-400'
                    }`}
                  >
                    {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white text-gray-800 border border-gray-200 p-3 rounded-lg rounded-bl-none">
                  <div className="flex items-center gap-1 mb-1">
                    <Sparkles className="w-3 h-3 text-blue-600" />
                    <span className="text-blue-600">AI Assistant</span>
                  </div>
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200 bg-white rounded-b-lg">
            <div className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about your classroom data..."
                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputValue.trim()}
                className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}