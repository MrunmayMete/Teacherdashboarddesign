import { MessageSquare, X, ChevronDown, ChevronUp, Send } from 'lucide-react';
import { useState } from 'react';

interface StudentQuestionsPanelProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
    engagementLevel?: 'low' | 'medium' | 'high' | null;
  };
}

interface QueryData {
  summary: string[];
}

const queriesData: { [key: string]: QueryData } = {
  // Topic-specific queries
  'Cell Structure': {
    summary: [
      'What is the difference between prokaryotic and eukaryotic cells?',
      'How do organelles work together to keep a cell alive?',
      'Why do plant cells have cell walls but animal cells don\'t?',
      'What is the function of mitochondria in cellular respiration?',
      'Can you explain the structure and function of the cell membrane?'
    ]
  },
  'Photosynthesis': {
    summary: [
      'How does photosynthesis convert light energy into chemical energy?',
      'What are the light-dependent and light-independent reactions?',
      'Why do plants need both chlorophyll a and chlorophyll b?',
      'How does temperature affect the rate of photosynthesis?',
      'What is the role of stomata in the photosynthesis process?'
    ]
  },
  'Cell Division': {
    summary: [
      'What is the difference between mitosis and meiosis?',
      'Why do cells need to undergo the cell cycle?',
      'How do chromosomes duplicate and separate during division?',
      'What happens if cell division goes wrong?',
      'Can you explain the stages of mitosis in order?'
    ]
  },
  'DNA & Genetics': {
    summary: [
      'How does DNA store genetic information?',
      'What is the difference between genotype and phenotype?',
      'Can you explain how genes are inherited from parents?',
      'What are dominant and recessive alleles?',
      'How do mutations occur and what are their effects?'
    ]
  },
  'Human Anatomy': {
    summary: [
      'How do different organ systems work together?',
      'What is the pathway of blood through the circulatory system?',
      'How does the nervous system transmit signals?',
      'What is the role of hormones in the endocrine system?',
      'Can you explain the process of digestion from mouth to absorption?'
    ]
  },
  'Ecology': {
    summary: [
      'What is the difference between a food chain and a food web?',
      'How do energy and nutrients flow through an ecosystem?',
      'What are the different types of symbiotic relationships?',
      'How do human activities impact biodiversity?',
      'Can you explain the carbon cycle and its importance?'
    ]
  },
  'DNA Replication': {
    summary: [
      'How does DNA replicate itself before cell division?',
      'What enzymes are involved in DNA replication?',
      'Why is DNA replication called semi-conservative?',
      'What happens if errors occur during DNA replication?',
      'How do leading and lagging strands differ?'
    ]
  },
  'Protein Synthesis': {
    summary: [
      'How does transcription create mRNA from DNA?',
      'What is the role of ribosomes in translation?',
      'How do tRNA molecules deliver amino acids?',
      'What are codons and anticodons?',
      'Can you explain the entire process from DNA to protein?'
    ]
  },
  'Enzymes': {
    summary: [
      'How do enzymes speed up chemical reactions?',
      'What is meant by enzyme specificity?',
      'How do temperature and pH affect enzyme activity?',
      'What are competitive and non-competitive inhibitors?',
      'Why are enzymes important for metabolism?'
    ]
  },
  'default': {
    summary: [
      'What is the difference between prokaryotic and eukaryotic cells?',
      'How does photosynthesis convert light energy into chemical energy?',
      'What is the difference between mitosis and meiosis?',
      'How does DNA store genetic information?',
      'What is the difference between a food chain and a food web?'
    ]
  }
};

export function StudentQuestionsPanel({ filters }: StudentQuestionsPanelProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState<number | null>(null);
  const [replyText, setReplyText] = useState('');

  const getRecentQueries = (): string[] => {
    // Priority: Topic > Subject > Default
    if (filters.topic && queriesData[filters.topic]) {
      return queriesData[filters.topic].summary;
    }
    
    // If we have a subject filter, try to find topic-specific queries for that subject
    if (filters.subject !== 'All Subjects') {
      // Return default for now, could be expanded with subject-specific logic
      return queriesData['default'].summary;
    }
    
    return queriesData['default'].summary;
  };

  const recentQueries = getRecentQueries();

  const handleSendReply = () => {
    if (replyText.trim()) {
      // Here you would send the reply to the backend
      console.log('Reply sent:', replyText);
      setReplyText('');
      setSelectedQuestionIndex(null);
    }
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 left-6 bg-green-600 text-white p-4 rounded-full shadow-lg hover:bg-green-700 transition-all hover:scale-110 z-40"
        >
          <MessageSquare className="w-6 h-6" />
        </button>
      )}

      {/* Panel */}
      {isOpen && (
        <div className={`fixed left-6 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 transition-all ${
          isMinimized ? 'bottom-6 w-80' : 'bottom-6 w-96 h-[600px]'
        }`}>
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600 to-green-500 text-white p-4 rounded-t-lg flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              <h3>Recent Student Questions</h3>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsMinimized(!isMinimized)}
                className="hover:bg-green-700 p-1 rounded transition-colors"
              >
                {isMinimized ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="hover:bg-green-700 p-1 rounded transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Content */}
          {!isMinimized && (
            <div className="p-4 overflow-y-auto h-[calc(100%-64px)]">
              {/* Filter Info */}
              {filters.topic && (
                <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg">
                  <div className="text-green-900">
                    Showing questions for: <strong>{filters.topic}</strong>
                  </div>
                </div>
              )}

              {/* Questions List */}
              <div className="space-y-3">
                {recentQueries.map((query, index) => (
                  <div
                    key={index}
                    className="p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-green-300 transition-all cursor-pointer"
                    onClick={() => setSelectedQuestionIndex(selectedQuestionIndex === index ? null : index)}
                  >
                    <div className="flex items-start gap-3">
                      <div className="bg-green-100 text-green-600 w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <MessageSquare className="w-4 h-4" />
                      </div>
                      <div className="flex-1">
                        <div className="text-gray-700">{query}</div>
                        <div className="text-gray-400 mt-2">
                          {index === 0 ? '5 mins ago' : 
                           index === 1 ? '15 mins ago' : 
                           index === 2 ? '1 hour ago' : 
                           index === 3 ? '2 hours ago' : 
                           '3 hours ago'}
                        </div>
                        
                        {/* Reply Section */}
                        {selectedQuestionIndex === index && (
                          <div className="mt-3 pt-3 border-t border-gray-300" onClick={(e) => e.stopPropagation()}>
                            <div className="text-sm text-gray-600 mb-2">Reply to student:</div>
                            <div className="flex gap-2">
                              <input
                                type="text"
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
                                placeholder="Type your answer..."
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 text-sm"
                              />
                              <button
                                onClick={handleSendReply}
                                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors flex items-center gap-2"
                              >
                                <Send className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Info Footer */}
              <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="text-blue-800">
                  💡 <strong>Tip:</strong> Click on topics in the sidebar to filter questions by specific subjects.
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}