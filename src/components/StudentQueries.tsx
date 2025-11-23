import { MessageSquare } from 'lucide-react';

interface StudentQueriesProps {
  filters: {
    class: string;
    subject: string;
    students: string[];
    topic: string | null;
  };
}

interface QueryData {
  summary: string[];
}

const queriesData: { [key: string]: QueryData } = {
  // Topic-specific queries
  'Algebra': {
    summary: [
      'How do you solve quadratic equations with two variables?',
      'What is the difference between an equation and an expression?',
      'Can you explain how to factor trinomials step by step?',
      'When do we use the quadratic formula in real life?',
      'Why do some equations have two solutions?'
    ]
  },
  'Geometry': {
    summary: [
      'How do you calculate the area of irregular shapes?',
      'What is the Pythagorean theorem and when do we use it?',
      'Can you explain the difference between congruent and similar triangles?',
      'How do you find angles in a triangle if you only know two sides?',
      'What are complementary and supplementary angles?'
    ]
  },
  'Fractions': {
    summary: [
      'How do you add fractions with different denominators?',
      'What is the easiest way to convert mixed numbers to improper fractions?',
      'Can you explain why we flip the second fraction when dividing?',
      'How do you simplify complex fractions?',
      'What are equivalent fractions and how do you find them?'
    ]
  },
  'Statistics': {
    summary: [
      'What is the difference between mean, median, and mode?',
      'How do you calculate standard deviation?',
      'Can you explain what percentiles mean in test scores?',
      'What is probability and how is it different from statistics?',
      'How do you create and interpret a box plot?'
    ]
  },
  'Photosynthesis': {
    summary: [
      'What is the role of chlorophyll in photosynthesis?',
      'Can you explain the difference between light-dependent and light-independent reactions?',
      'Why do plants need carbon dioxide for photosynthesis?',
      'What happens to photosynthesis at night?',
      'How does temperature affect the rate of photosynthesis?'
    ]
  },
  'Cell Biology': {
    summary: [
      'What is the difference between plant cells and animal cells?',
      'Can you explain what mitochondria do in simple terms?',
      'What is the function of the cell membrane?',
      'How does cell division work?',
      'What is DNA and where is it located in the cell?'
    ]
  },
  'Chemistry Basics': {
    summary: [
      'What is an atom and how is it structured?',
      'Can you explain the difference between elements and compounds?',
      'How do you balance chemical equations?',
      'What is the periodic table organized by?',
      'What are ionic and covalent bonds?'
    ]
  },
  'Physics Forces': {
    summary: [
      'Can you explain Newton\'s three laws of motion with examples?',
      'What is the difference between mass and weight?',
      'How do you calculate acceleration from force and mass?',
      'What is friction and why does it slow things down?',
      'Why do objects fall at the same rate regardless of weight?'
    ]
  },
  'Grammar': {
    summary: [
      'When should I use a comma before "and"?',
      'What is the difference between "your" and "you\'re"?',
      'Can you explain subject-verb agreement with examples?',
      'How do you know when to use "who" vs "whom"?',
      'What are the rules for using semicolons?'
    ]
  },
  'Literature': {
    summary: [
      'How do you identify the theme of a story?',
      'What is the difference between metaphor and simile?',
      'Can you explain what a protagonist and antagonist are?',
      'How do you analyze character development in a novel?',
      'What are literary devices and why do authors use them?'
    ]
  },
  'Writing Skills': {
    summary: [
      'How do you write a strong thesis statement?',
      'What is the best way to organize a persuasive essay?',
      'Can you explain how to use transitions between paragraphs?',
      'How do you write an engaging introduction?',
      'What is the difference between showing and telling in writing?'
    ]
  },
  'Vocabulary': {
    summary: [
      'What are context clues and how do they help understand new words?',
      'Can you explain what prefixes and suffixes are?',
      'How do you use a word correctly after learning its definition?',
      'What is the difference between denotation and connotation?',
      'How can I remember new vocabulary words better?'
    ]
  },
  
  // Subject-specific queries
  'Mathematics': {
    summary: [
      'What is the order of operations and why is it important?',
      'How do you convert percentages to decimals and fractions?',
      'Can you explain negative numbers and how to work with them?',
      'What strategies help solve word problems effectively?',
      'How do you check if your answer to a math problem is correct?'
    ]
  },
  'Science': {
    summary: [
      'What is the scientific method and how do you use it?',
      'Can you explain the difference between hypothesis and theory?',
      'How do you write a proper lab report?',
      'What are independent and dependent variables in experiments?',
      'Why is it important to have a control group in an experiment?'
    ]
  },
  'English': {
    summary: [
      'How do you analyze a poem for deeper meaning?',
      'What are the main components of a five-paragraph essay?',
      'Can you explain how to properly cite sources in an essay?',
      'How do you improve reading comprehension skills?',
      'What is the difference between first-person and third-person narration?'
    ]
  },
  'History': {
    summary: [
      'How do you remember important historical dates and events?',
      'What is the difference between primary and secondary sources?',
      'Can you explain cause and effect in historical events?',
      'How do you analyze historical documents?',
      'Why is it important to study different perspectives in history?'
    ]
  },
  'Geography': {
    summary: [
      'How do you read latitude and longitude on a map?',
      'What causes different climate zones around the world?',
      'Can you explain the difference between weather and climate?',
      'How do mountains and oceans affect climate patterns?',
      'What are the major types of landforms and how are they formed?'
    ]
  },
  'Physics': {
    summary: [
      'What is energy and what are the different types?',
      'Can you explain how electricity works?',
      'What is the relationship between speed, velocity, and acceleration?',
      'How do simple machines make work easier?',
      'What is the difference between potential and kinetic energy?'
    ]
  },
  'Chemistry': {
    summary: [
      'What happens during a chemical reaction?',
      'Can you explain the pH scale and acids vs bases?',
      'How do you determine the number of protons, neutrons, and electrons?',
      'What is the difference between physical and chemical changes?',
      'How do you calculate molar mass?'
    ]
  },
  
  // Student-specific queries
  'Emma Johnson': {
    summary: [
      'Can you recommend advanced calculus resources?',
      'How do I prepare for math competitions?',
      'What are some challenging problems on quadratic equations?',
      'Can you explain concepts beyond the current curriculum?'
    ]
  },
  'Liam Smith': {
    summary: [
      'What safety precautions are needed for the chemistry lab?',
      'Can you explain the assignment deadline for the science project?',
      'How do Newton\'s laws apply to rocket science?',
      'What resources are available for physics help?'
    ]
  },
  'Olivia Brown': {
    summary: [
      'How do you structure a literary analysis essay?',
      'Can you recommend classic novels for advanced readers?',
      'What are the rules for MLA citation format?',
      'How do you develop a strong argumentative thesis?'
    ]
  },
  'Noah Davis': {
    summary: [
      'Can I get more practice problems on fractions?',
      'What study techniques work best for math tests?',
      'How should I organize my homework schedule?',
      'Are there any peer tutoring sessions available?'
    ]
  },
  'Ava Wilson': {
    summary: [
      'What are the safety guidelines for handling chemicals?',
      'Can you explain the lab report format requirements?',
      'What STEM careers involve chemistry and biology?',
      'How do you prepare solutions with specific concentrations?'
    ]
  },
  'Ethan Martinez': {
    summary: [
      'How do you read topographic maps?',
      'Can you explain the historical context of the Civil War?',
      'What are good resources for geography research projects?',
      'How do you write a strong research paper?'
    ]
  },
  'Sophia Anderson': {
    summary: [
      'Can you explain quantum physics at a basic level?',
      'What opportunities exist for independent science research?',
      'How do I prepare for science olympiad competitions?',
      'What advanced physics concepts should I study?'
    ]
  },
  'Mason Taylor': {
    summary: [
      'What techniques work best for studying biology?',
      'Can you recommend environmental science documentaries?',
      'How do you balance school work and extracurriculars?',
      'What are the key concepts in ecology?'
    ]
  },
  
  // Class-specific queries
  'Grade 6A': {
    summary: [
      'When is the next field trip and what should we bring?',
      'Can we have more group project opportunities?',
      'What are the homework expectations for this week?',
      'How do we join the class book club?',
      'Can we use more videos and interactive tools in class?'
    ]
  },
  'Grade 6B': {
    summary: [
      'What are the requirements for the science fair project?',
      'Can we work in pairs for the next assignment?',
      'When will guest speakers visit our class?',
      'How can we better manage our time on projects?',
      'Are there any apps that can help with homework?'
    ]
  },
  'Grade 7A': {
    summary: [
      'How can we participate in debate club activities?',
      'What topics will be on the standardized test?',
      'Can we choose our own topics for the next project?',
      'How are projects and tests weighted in our grades?',
      'Is there a peer mentoring program we can join?'
    ]
  },
  'Grade 7B': {
    summary: [
      'What elective courses will be available next semester?',
      'Can we do more hands-on science experiments?',
      'How can we help organize the charity fundraiser?',
      'What are good note-taking strategies for lectures?',
      'Can we form study groups for exam preparation?'
    ]
  },
  'Grade 8A': {
    summary: [
      'What AP courses should we consider for high school?',
      'How do we transition from middle school to high school?',
      'Are there college prep workshops available?',
      'What career paths can we explore now?',
      'How can we take on more leadership roles?'
    ]
  },
  'Grade 8B': {
    summary: [
      'What are the graduation requirements we need to complete?',
      'Can you explain the capstone project guidelines?',
      'Is there an alumni mentorship program?',
      'How do we apply for scholarships?',
      'When can we visit local college campuses?'
    ]
  },
  
  // Default queries
  'default': {
    summary: [
      'How can I access additional learning resources online?',
      'When are the assignment deadlines for this week?',
      'Can you explain the grading criteria for projects?',
      'Are there tutoring sessions available after school?',
      'How do I submit homework through the app?'
    ]
  }
};

export function StudentQueries({ filters }: StudentQueriesProps) {
  const getQueriesSummary = (): string[] => {
    // Priority: Topic > Student > Subject > Class > Default
    if (filters.topic && queriesData[filters.topic]) {
      return queriesData[filters.topic].summary;
    }
    
    if (filters.students.length > 0 && queriesData[filters.students[0]]) {
      return queriesData[filters.students[0]].summary;
    }
    
    if (filters.subject !== 'All Subjects' && queriesData[filters.subject]) {
      return queriesData[filters.subject].summary;
    }
    
    if (filters.class !== 'All Classes' && queriesData[filters.class]) {
      return queriesData[filters.class].summary;
    }
    
    return queriesData['default'].summary;
  };

  const queriesSummary = getQueriesSummary();

  const getTitle = () => {
    if (filters.topic) return `Student Questions: ${filters.topic}`;
    if (filters.students.length > 0) return `Questions from ${filters.students[0]}`;
    if (filters.subject !== 'All Subjects') return `Student Questions: ${filters.subject}`;
    if (filters.class !== 'All Classes') return `Questions from ${filters.class}`;
    return 'Recent Student Questions';
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <MessageSquare className="w-5 h-5 text-blue-600" />
        <h3 className="text-gray-800">{getTitle()}</h3>
      </div>
      
      <div className="space-y-3">
        {queriesSummary.map((query, index) => (
          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors">
            <div className="flex-shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mt-0.5">
              <MessageSquare className="w-3 h-3" />
            </div>
            <p className="text-gray-700 flex-1">{query}</p>
          </div>
        ))}
      </div>

      {queriesSummary.length === 0 && (
        <div className="text-center text-gray-400 py-8">
          No questions recorded for this selection
        </div>
      )}
    </div>
  );
}