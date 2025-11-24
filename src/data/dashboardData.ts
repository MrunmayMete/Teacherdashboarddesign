// Comprehensive Biology Dashboard Data
import { BIOLOGY_TOPICS } from '../constants/biologyTopics';

export interface Student {
  id: string;
  name: string;
  grade: string;
  averageScore: number;
  engagement: number;
  queriesAsked: number;
  notesCreated: number;
  contentScanned: number;
  confusionLevel: 'Low' | 'Medium' | 'High';
  learningMode: 'Classroom' | 'Self-Learning' | 'Both';
  lastActive: string;
  strengths: string[];
  struggles: string[];
}

export interface BiologyTopic {
  id: string;
  name: string;
  category: 'Cell Biology' | 'Genetics' | 'Ecology' | 'Human Biology' | 'Evolution' | 'Molecular Biology';
  engagementRate: number;
  averageScore: number;
  totalQueries: number;
  confusionRate: number;
  completionRate: number;
  studentsEngaged: number;
}

export interface QueryData {
  id: string;
  studentId: string;
  studentName: string;
  topic: string;
  query: string;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  repetitionCount: number;
  relevanceScore: number;
  timestamp: string;
  isConfused: boolean;
  timeSpent: number; // seconds
  resolved: boolean;
  learningMode: 'Classroom' | 'Self-Learning';
}

export interface NoteData {
  id: string;
  studentId: string;
  studentName: string;
  topic: string;
  noteCount: number;
  quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
  timestamp: string;
  wordCount: number;
  learningMode: 'Classroom' | 'Self-Learning';
}

export interface ContentScanData {
  id: string;
  studentId: string;
  studentName: string;
  topic: string;
  pagesScanned: number;
  timeSpent: number; // minutes
  comprehensionScore: number;
  timestamp: string;
  learningMode: 'Classroom' | 'Self-Learning';
}

export interface EngagementData {
  studentId: string;
  studentName: string;
  topic: string;
  engagementScore: number;
  performanceScore: number;
  date: string;
}

// Generate 40 students
export const students: Student[] = [
  {
    id: 's001',
    name: 'Emma Johnson',
    grade: '10th',
    averageScore: 92,
    engagement: 95,
    queriesAsked: 45,
    notesCreated: 67,
    contentScanned: 234,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:30',
    strengths: ['Cell Structure', 'DNA & Genetics'],
    struggles: ['Ecology']
  },
  {
    id: 's002',
    name: 'Noah Davis',
    grade: '10th',
    averageScore: 67,
    engagement: 58,
    queriesAsked: 127,
    notesCreated: 34,
    contentScanned: 156,
    confusionLevel: 'High',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:45',
    strengths: ['Photosynthesis'],
    struggles: ['DNA & Genetics', 'Cell Structure', 'Protein Synthesis']
  },
  {
    id: 's003',
    name: 'Olivia Brown',
    grade: '10th',
    averageScore: 88,
    engagement: 87,
    queriesAsked: 52,
    notesCreated: 89,
    contentScanned: 298,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:20',
    strengths: ['Ecology', 'Evolution', 'Human Anatomy'],
    struggles: []
  },
  {
    id: 's004',
    name: 'Liam Smith',
    grade: '10th',
    averageScore: 85,
    engagement: 82,
    queriesAsked: 63,
    notesCreated: 71,
    contentScanned: 245,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:15',
    strengths: ['Photosynthesis', 'Cell Respiration'],
    struggles: ['Human Anatomy']
  },
  {
    id: 's005',
    name: 'Sophia Wilson',
    grade: '10th',
    averageScore: 94,
    engagement: 96,
    queriesAsked: 38,
    notesCreated: 95,
    contentScanned: 312,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 15:45',
    strengths: ['DNA & Genetics', 'Protein Synthesis', 'Cell Division'],
    struggles: []
  },
  {
    id: 's006',
    name: 'Jackson Martinez',
    grade: '10th',
    averageScore: 71,
    engagement: 64,
    queriesAsked: 98,
    notesCreated: 42,
    contentScanned: 178,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:20',
    strengths: ['Ecology'],
    struggles: ['DNA & Genetics', 'Protein Synthesis']
  },
  {
    id: 's007',
    name: 'Ava Garcia',
    grade: '10th',
    averageScore: 90,
    engagement: 91,
    queriesAsked: 47,
    notesCreated: 83,
    contentScanned: 267,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:55',
    strengths: ['Cell Structure', 'Human Anatomy', 'Immune System'],
    struggles: []
  },
  {
    id: 's008',
    name: 'Lucas Anderson',
    grade: '10th',
    averageScore: 78,
    engagement: 73,
    queriesAsked: 76,
    notesCreated: 54,
    contentScanned: 201,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:05',
    strengths: ['Photosynthesis', 'Ecology'],
    struggles: ['Cell Division', 'DNA & Genetics']
  },
  {
    id: 's009',
    name: 'Isabella Taylor',
    grade: '10th',
    averageScore: 96,
    engagement: 98,
    queriesAsked: 34,
    notesCreated: 102,
    contentScanned: 334,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:50',
    strengths: ['All topics'],
    struggles: []
  },
  {
    id: 's010',
    name: 'Mason Thomas',
    grade: '10th',
    averageScore: 64,
    engagement: 55,
    queriesAsked: 134,
    notesCreated: 28,
    contentScanned: 142,
    confusionLevel: 'High',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:10',
    strengths: [],
    struggles: ['Cell Structure', 'DNA & Genetics', 'Protein Synthesis', 'Cell Division']
  },
  {
    id: 's011',
    name: 'Mia Moore',
    grade: '10th',
    averageScore: 87,
    engagement: 84,
    queriesAsked: 56,
    notesCreated: 76,
    contentScanned: 253,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:40',
    strengths: ['Human Anatomy', 'Immune System'],
    struggles: ['Ecology']
  },
  {
    id: 's012',
    name: 'Ethan Jackson',
    grade: '10th',
    averageScore: 82,
    engagement: 79,
    queriesAsked: 68,
    notesCreated: 63,
    contentScanned: 223,
    confusionLevel: 'Low',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:25',
    strengths: ['Evolution', 'Ecology'],
    struggles: ['Protein Synthesis']
  },
  {
    id: 's013',
    name: 'Charlotte White',
    grade: '10th',
    averageScore: 91,
    engagement: 93,
    queriesAsked: 41,
    notesCreated: 87,
    contentScanned: 289,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:30',
    strengths: ['DNA & Genetics', 'Cell Division', 'Evolution'],
    struggles: []
  },
  {
    id: 's014',
    name: 'Aiden Harris',
    grade: '10th',
    averageScore: 75,
    engagement: 69,
    queriesAsked: 89,
    notesCreated: 48,
    contentScanned: 187,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:55',
    strengths: ['Photosynthesis'],
    struggles: ['DNA & Genetics', 'Human Anatomy']
  },
  {
    id: 's015',
    name: 'Amelia Martin',
    grade: '10th',
    averageScore: 93,
    engagement: 94,
    queriesAsked: 39,
    notesCreated: 91,
    contentScanned: 301,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 15:15',
    strengths: ['Cell Structure', 'Protein Synthesis', 'Cell Division'],
    struggles: []
  },
  {
    id: 's016',
    name: 'Benjamin Lee',
    grade: '10th',
    averageScore: 69,
    engagement: 61,
    queriesAsked: 112,
    notesCreated: 36,
    contentScanned: 165,
    confusionLevel: 'High',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:30',
    strengths: ['Ecology'],
    struggles: ['Cell Structure', 'DNA & Genetics', 'Protein Synthesis']
  },
  {
    id: 's017',
    name: 'Harper Lewis',
    grade: '10th',
    averageScore: 89,
    engagement: 88,
    queriesAsked: 49,
    notesCreated: 81,
    contentScanned: 271,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:25',
    strengths: ['Human Anatomy', 'Immune System', 'Cell Respiration'],
    struggles: []
  },
  {
    id: 's018',
    name: 'James Walker',
    grade: '10th',
    averageScore: 80,
    engagement: 76,
    queriesAsked: 72,
    notesCreated: 58,
    contentScanned: 212,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:10',
    strengths: ['Photosynthesis', 'Cell Respiration'],
    struggles: ['DNA & Genetics']
  },
  {
    id: 's019',
    name: 'Evelyn Hall',
    grade: '10th',
    averageScore: 95,
    engagement: 97,
    queriesAsked: 36,
    notesCreated: 98,
    contentScanned: 323,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 15:40',
    strengths: ['All topics'],
    struggles: []
  },
  {
    id: 's020',
    name: 'Alexander Allen',
    grade: '10th',
    averageScore: 73,
    engagement: 67,
    queriesAsked: 94,
    notesCreated: 45,
    contentScanned: 182,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:50',
    strengths: ['Ecology'],
    struggles: ['Protein Synthesis', 'Cell Division']
  },
  {
    id: 's021',
    name: 'Abigail Young',
    grade: '10th',
    averageScore: 86,
    engagement: 83,
    queriesAsked: 59,
    notesCreated: 73,
    contentScanned: 248,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:50',
    strengths: ['Cell Structure', 'Human Anatomy'],
    struggles: ['Evolution']
  },
  {
    id: 's022',
    name: 'Daniel King',
    grade: '10th',
    averageScore: 77,
    engagement: 71,
    queriesAsked: 81,
    notesCreated: 51,
    contentScanned: 195,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:00',
    strengths: ['Photosynthesis'],
    struggles: ['DNA & Genetics', 'Immune System']
  },
  {
    id: 's023',
    name: 'Emily Wright',
    grade: '10th',
    averageScore: 92,
    engagement: 92,
    queriesAsked: 43,
    notesCreated: 85,
    contentScanned: 279,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:35',
    strengths: ['DNA & Genetics', 'Evolution', 'Cell Division'],
    struggles: []
  },
  {
    id: 's024',
    name: 'Matthew Scott',
    grade: '10th',
    averageScore: 70,
    engagement: 63,
    queriesAsked: 105,
    notesCreated: 39,
    contentScanned: 169,
    confusionLevel: 'High',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:25',
    strengths: [],
    struggles: ['Cell Structure', 'DNA & Genetics', 'Protein Synthesis', 'Human Anatomy']
  },
  {
    id: 's025',
    name: 'Elizabeth Green',
    grade: '10th',
    averageScore: 88,
    engagement: 86,
    queriesAsked: 53,
    notesCreated: 78,
    contentScanned: 261,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:45',
    strengths: ['Cell Respiration', 'Photosynthesis', 'Ecology'],
    struggles: []
  },
  {
    id: 's026',
    name: 'Joseph Baker',
    grade: '10th',
    averageScore: 84,
    engagement: 81,
    queriesAsked: 65,
    notesCreated: 67,
    contentScanned: 238,
    confusionLevel: 'Low',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:20',
    strengths: ['Human Anatomy', 'Immune System'],
    struggles: ['Protein Synthesis']
  },
  {
    id: 's027',
    name: 'Sofia Adams',
    grade: '10th',
    averageScore: 90,
    engagement: 90,
    queriesAsked: 46,
    notesCreated: 84,
    contentScanned: 274,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:28',
    strengths: ['Cell Structure', 'DNA & Genetics', 'Cell Division'],
    struggles: []
  },
  {
    id: 's028',
    name: 'David Nelson',
    grade: '10th',
    averageScore: 76,
    engagement: 70,
    queriesAsked: 85,
    notesCreated: 49,
    contentScanned: 190,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:58',
    strengths: ['Photosynthesis', 'Ecology'],
    struggles: ['DNA & Genetics', 'Cell Division']
  },
  {
    id: 's029',
    name: 'Avery Carter',
    grade: '10th',
    averageScore: 94,
    engagement: 95,
    queriesAsked: 37,
    notesCreated: 93,
    contentScanned: 306,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 15:42',
    strengths: ['All topics'],
    struggles: []
  },
  {
    id: 's030',
    name: 'Henry Mitchell',
    grade: '10th',
    averageScore: 68,
    engagement: 59,
    queriesAsked: 119,
    notesCreated: 32,
    contentScanned: 152,
    confusionLevel: 'High',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:15',
    strengths: [],
    struggles: ['Cell Structure', 'DNA & Genetics', 'Protein Synthesis', 'Cell Division']
  },
  {
    id: 's031',
    name: 'Ella Perez',
    grade: '10th',
    averageScore: 87,
    engagement: 85,
    queriesAsked: 57,
    notesCreated: 75,
    contentScanned: 256,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:48',
    strengths: ['Human Anatomy', 'Evolution'],
    struggles: ['Protein Synthesis']
  },
  {
    id: 's032',
    name: 'Sebastian Roberts',
    grade: '10th',
    averageScore: 81,
    engagement: 77,
    queriesAsked: 70,
    notesCreated: 60,
    contentScanned: 218,
    confusionLevel: 'Low',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:12',
    strengths: ['Ecology', 'Evolution'],
    struggles: ['DNA & Genetics']
  },
  {
    id: 's033',
    name: 'Scarlett Turner',
    grade: '10th',
    averageScore: 91,
    engagement: 92,
    queriesAsked: 42,
    notesCreated: 86,
    contentScanned: 283,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:33',
    strengths: ['DNA & Genetics', 'Protein Synthesis', 'Cell Division'],
    struggles: []
  },
  {
    id: 's034',
    name: 'Jack Phillips',
    grade: '10th',
    averageScore: 74,
    engagement: 68,
    queriesAsked: 91,
    notesCreated: 46,
    contentScanned: 184,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:52',
    strengths: ['Photosynthesis'],
    struggles: ['DNA & Genetics', 'Human Anatomy', 'Immune System']
  },
  {
    id: 's035',
    name: 'Luna Campbell',
    grade: '10th',
    averageScore: 89,
    engagement: 88,
    queriesAsked: 50,
    notesCreated: 80,
    contentScanned: 269,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:52',
    strengths: ['Cell Structure', 'Human Anatomy', 'Cell Respiration'],
    struggles: []
  },
  {
    id: 's036',
    name: 'Owen Parker',
    grade: '10th',
    averageScore: 79,
    engagement: 74,
    queriesAsked: 77,
    notesCreated: 55,
    contentScanned: 206,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:08',
    strengths: ['Ecology', 'Photosynthesis'],
    struggles: ['Protein Synthesis', 'Cell Division']
  },
  {
    id: 's037',
    name: 'Grace Evans',
    grade: '10th',
    averageScore: 93,
    engagement: 94,
    queriesAsked: 40,
    notesCreated: 90,
    contentScanned: 295,
    confusionLevel: 'Low',
    learningMode: 'Self-Learning',
    lastActive: '2024-01-15 15:38',
    strengths: ['All topics'],
    struggles: []
  },
  {
    id: 's038',
    name: 'Carter Edwards',
    grade: '10th',
    averageScore: 72,
    engagement: 65,
    queriesAsked: 101,
    notesCreated: 40,
    contentScanned: 173,
    confusionLevel: 'Medium',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 13:40',
    strengths: ['Ecology'],
    struggles: ['Cell Structure', 'DNA & Genetics', 'Protein Synthesis']
  },
  {
    id: 's039',
    name: 'Chloe Collins',
    grade: '10th',
    averageScore: 85,
    engagement: 82,
    queriesAsked: 61,
    notesCreated: 72,
    contentScanned: 242,
    confusionLevel: 'Low',
    learningMode: 'Both',
    lastActive: '2024-01-15 14:43',
    strengths: ['Human Anatomy', 'Immune System', 'Evolution'],
    struggles: []
  },
  {
    id: 's040',
    name: 'Wyatt Stewart',
    grade: '10th',
    averageScore: 83,
    engagement: 80,
    queriesAsked: 66,
    notesCreated: 65,
    contentScanned: 230,
    confusionLevel: 'Low',
    learningMode: 'Classroom',
    lastActive: '2024-01-15 14:18',
    strengths: ['Cell Respiration', 'Photosynthesis'],
    struggles: ['DNA & Genetics']
  }
];

// Biology Topics with comprehensive data
export const biologyTopics: BiologyTopic[] = [
  {
    id: 't001',
    name: 'Cell Structure',
    category: 'Cell Biology',
    engagementRate: 87,
    averageScore: 82,
    totalQueries: 456,
    confusionRate: 22,
    completionRate: 91,
    studentsEngaged: 38
  },
  {
    id: 't002',
    name: 'Cell Division (Mitosis & Meiosis)',
    category: 'Cell Biology',
    engagementRate: 88,
    averageScore: 76,
    totalQueries: 534,
    confusionRate: 38,
    completionRate: 85,
    studentsEngaged: 39
  },
  {
    id: 't003',
    name: 'DNA & Genetics',
    category: 'Genetics',
    engagementRate: 92,
    averageScore: 78,
    totalQueries: 623,
    confusionRate: 35,
    completionRate: 88,
    studentsEngaged: 40
  },
  {
    id: 't004',
    name: 'Photosynthesis',
    category: 'Cell Biology',
    engagementRate: 85,
    averageScore: 84,
    totalQueries: 387,
    confusionRate: 18,
    completionRate: 93,
    studentsEngaged: 37
  },
  {
    id: 't005',
    name: 'Cellular Respiration',
    category: 'Cell Biology',
    engagementRate: 86,
    averageScore: 80,
    totalQueries: 423,
    confusionRate: 28,
    completionRate: 87,
    studentsEngaged: 37
  },
  {
    id: 't006',
    name: 'Protein Synthesis',
    category: 'Molecular Biology',
    engagementRate: 83,
    averageScore: 74,
    totalQueries: 671,
    confusionRate: 42,
    completionRate: 82,
    studentsEngaged: 36
  },
  {
    id: 't007',
    name: 'Evolution & Natural Selection',
    category: 'Evolution',
    engagementRate: 81,
    averageScore: 85,
    totalQueries: 289,
    confusionRate: 16,
    completionRate: 91,
    studentsEngaged: 34
  },
  {
    id: 't008',
    name: 'Ecosystems & Biodiversity',
    category: 'Ecology',
    engagementRate: 79,
    averageScore: 86,
    totalQueries: 312,
    confusionRate: 15,
    completionRate: 89,
    studentsEngaged: 35
  },
  {
    id: 't009',
    name: 'Human Body Systems',
    category: 'Human Biology',
    engagementRate: 90,
    averageScore: 81,
    totalQueries: 498,
    confusionRate: 25,
    completionRate: 90,
    studentsEngaged: 38
  },
  {
    id: 't010',
    name: 'Plant Biology',
    category: 'Cell Biology',
    engagementRate: 82,
    averageScore: 83,
    totalQueries: 345,
    confusionRate: 20,
    completionRate: 88,
    studentsEngaged: 36
  },
  {
    id: 't011',
    name: 'Microbiology & Viruses',
    category: 'Molecular Biology',
    engagementRate: 84,
    averageScore: 77,
    totalQueries: 412,
    confusionRate: 30,
    completionRate: 84,
    studentsEngaged: 35
  },
  {
    id: 't012',
    name: 'Enzymes & Metabolism',
    category: 'Molecular Biology',
    engagementRate: 80,
    averageScore: 77,
    totalQueries: 378,
    confusionRate: 32,
    completionRate: 84,
    studentsEngaged: 33
  }
];

// Generate comprehensive query data (1000+ queries)
export const generateQueryData = (): QueryData[] => {
  const queries: QueryData[] = [];
  const topicQueries: { [key: string]: string[] } = {
    'Cell Structure': [
      'What is the function of mitochondria?',
      'How do cell membranes control what enters the cell?',
      'What is the difference between rough and smooth ER?',
      'Why do plant cells have cell walls?',
      'What does the nucleus do?',
      'How do ribosomes make proteins?',
      'What is the Golgi apparatus?',
      'What are lysosomes?',
      'What is cytoplasm?',
      'How do vacuoles work?'
    ],
    'DNA & Genetics': [
      'What is DNA replication?',
      'How do genes determine traits?',
      'What is the difference between genotype and phenotype?',
      'What are Punnett squares used for?',
      'How does mRNA differ from DNA?',
      'What are mutations?',
      'What is crossing over in meiosis?',
      'How do dominant and recessive alleles work?',
      'What is genetic variation?',
      'How does DNA code for proteins?'
    ],
    'Photosynthesis': [
      'What is the equation for photosynthesis?',
      'Why do plants need chlorophyll?',
      'What happens in the light-dependent reactions?',
      'What is the Calvin cycle?',
      'Where does photosynthesis occur?',
      'Why is photosynthesis important?',
      'What factors affect photosynthesis rate?',
      'How do stomata control gas exchange?',
      'What is the role of ATP in photosynthesis?',
      'How do plants use glucose?'
    ],
    'Ecology': [
      'What is a food web?',
      'What is the difference between a habitat and a niche?',
      'How does energy flow through an ecosystem?',
      'What are producers, consumers, and decomposers?',
      'What is biodiversity?',
      'How do populations grow?',
      'What is carrying capacity?',
      'What are biotic and abiotic factors?',
      'What is succession?',
      'How do humans impact ecosystems?'
    ],
    'Cell Division': [
      'What is the difference between mitosis and meiosis?',
      'What happens during prophase?',
      'Why is cell division important?',
      'What is cytokinesis?',
      'How many chromosomes are in human cells?',
      'What is the cell cycle?',
      'What happens during metaphase?',
      'What are homologous chromosomes?',
      'Why does meiosis produce four cells?',
      'What is interphase?'
    ],
    'Human Anatomy': [
      'How does the heart pump blood?',
      'What is the function of red blood cells?',
      'How do lungs exchange oxygen and carbon dioxide?',
      'What is the digestive system?',
      'How do kidneys filter blood?',
      'What is the skeletal system?',
      'How do muscles contract?',
      'What is homeostasis?',
      'How does the endocrine system work?',
      'What are organs and organ systems?'
    ],
    'Protein Synthesis': [
      'What is transcription?',
      'What is translation?',
      'How do codons work?',
      'What is the role of tRNA?',
      'Where does protein synthesis occur?',
      'What are amino acids?',
      'How do ribosomes read mRNA?',
      'What is a start codon?',
      'What is a stop codon?',
      'How are proteins folded?'
    ],
    'Evolution': [
      'What is natural selection?',
      'What is adaptation?',
      'How does evolution occur?',
      'What is evidence for evolution?',
      'What is speciation?',
      'What are homologous structures?',
      'What is the fossil record?',
      'How do mutations drive evolution?',
      'What is genetic drift?',
      'What is convergent evolution?'
    ],
    'Cell Respiration': [
      'What is cellular respiration?',
      'What is the equation for cellular respiration?',
      'What is glycolysis?',
      'What is the Krebs cycle?',
      'What is the electron transport chain?',
      'How much ATP is produced?',
      'What is aerobic vs anaerobic respiration?',
      'Where does cellular respiration occur?',
      'What is the role of oxygen?',
      'How is ATP used in cells?'
    ],
    'Immune System': [
      'How does the immune system work?',
      'What are antibodies?',
      'What is the difference between innate and adaptive immunity?',
      'What are white blood cells?',
      'How do vaccines work?',
      'What is inflammation?',
      'What are antigens?',
      'How do T cells and B cells differ?',
      'What is the lymphatic system?',
      'What are pathogens?'
    ]
  };

  let queryId = 1;
  
  students.forEach(student => {
    const queriesForStudent = Math.floor(student.queriesAsked * 1.5); // Generate more queries
    
    for (let i = 0; i < queriesForStudent; i++) {
      const topicKeys = Object.keys(topicQueries);
      const topic = topicKeys[Math.floor(Math.random() * topicKeys.length)];
      const topicQueryList = topicQueries[topic];
      const query = topicQueryList[Math.floor(Math.random() * topicQueryList.length)];
      
      // Determine difficulty based on student's confusion level and topic
      let difficulty: 'Easy' | 'Medium' | 'Hard';
      const rand = Math.random();
      if (student.confusionLevel === 'High') {
        difficulty = rand < 0.6 ? 'Hard' : rand < 0.9 ? 'Medium' : 'Easy';
      } else if (student.confusionLevel === 'Medium') {
        difficulty = rand < 0.3 ? 'Hard' : rand < 0.7 ? 'Medium' : 'Easy';
      } else {
        difficulty = rand < 0.1 ? 'Hard' : rand < 0.4 ? 'Medium' : 'Easy';
      }
      
      const repetitionCount = student.confusionLevel === 'High' ? 
        Math.floor(Math.random() * 5) + 1 : 
        student.confusionLevel === 'Medium' ?
        Math.floor(Math.random() * 3) + 1 :
        Math.floor(Math.random() * 2) + 1;
      
      const relevanceScore = Math.floor(Math.random() * 30) + 70; // 70-100
      const isConfused = student.confusionLevel === 'High' ? Math.random() < 0.6 : 
                        student.confusionLevel === 'Medium' ? Math.random() < 0.3 :
                        Math.random() < 0.1;
      
      const timeSpent = Math.floor(Math.random() * 300) + 60; // 60-360 seconds
      const resolved = Math.random() < 0.85; // 85% resolved
      
      queries.push({
        id: `q${String(queryId).padStart(4, '0')}`,
        studentId: student.id,
        studentName: student.name,
        topic,
        query,
        difficulty,
        repetitionCount,
        relevanceScore,
        timestamp: generateRandomTimestamp(),
        isConfused,
        timeSpent,
        resolved,
        learningMode: student.learningMode === 'Both' ? 
          (Math.random() < 0.5 ? 'Classroom' : 'Self-Learning') : 
          student.learningMode as 'Classroom' | 'Self-Learning'
      });
      
      queryId++;
    }
  });
  
  return queries;
};

// Generate comprehensive note data
export const generateNoteData = (): NoteData[] => {
  const notes: NoteData[] = [];
  let noteId = 1;
  
  students.forEach(student => {
    const notesForStudent = student.notesCreated;
    const topics = biologyTopics.map(t => t.name);
    
    for (let i = 0; i < notesForStudent; i++) {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      
      // Determine quality based on student performance
      let quality: 'Excellent' | 'Good' | 'Fair' | 'Poor';
      if (student.averageScore >= 90) {
        quality = Math.random() < 0.7 ? 'Excellent' : 'Good';
      } else if (student.averageScore >= 80) {
        quality = Math.random() < 0.5 ? 'Good' : Math.random() < 0.8 ? 'Excellent' : 'Fair';
      } else if (student.averageScore >= 70) {
        quality = Math.random() < 0.6 ? 'Good' : 'Fair';
      } else {
        quality = Math.random() < 0.4 ? 'Fair' : Math.random() < 0.7 ? 'Good' : 'Poor';
      }
      
      const wordCount = quality === 'Excellent' ? Math.floor(Math.random() * 400) + 300 :
                       quality === 'Good' ? Math.floor(Math.random() * 300) + 200 :
                       quality === 'Fair' ? Math.floor(Math.random() * 200) + 100 :
                       Math.floor(Math.random() * 100) + 50;
      
      notes.push({
        id: `n${String(noteId).padStart(4, '0')}`,
        studentId: student.id,
        studentName: student.name,
        topic,
        noteCount: Math.floor(Math.random() * 10) + 1,
        quality,
        timestamp: generateRandomTimestamp(),
        wordCount,
        learningMode: student.learningMode === 'Both' ? 
          (Math.random() < 0.5 ? 'Classroom' : 'Self-Learning') : 
          student.learningMode as 'Classroom' | 'Self-Learning'
      });
      
      noteId++;
    }
  });
  
  return notes;
};

// Generate comprehensive content scan data
export const generateContentScanData = (): ContentScanData[] => {
  const scans: ContentScanData[] = [];
  let scanId = 1;
  
  students.forEach(student => {
    const scansForStudent = Math.floor(student.contentScanned / 3); // Multiple pages per scan
    const topics = biologyTopics.map(t => t.name);
    
    for (let i = 0; i < scansForStudent; i++) {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const pagesScanned = Math.floor(Math.random() * 8) + 1; // 1-8 pages
      const timeSpent = pagesScanned * (Math.floor(Math.random() * 5) + 2); // 2-7 min per page
      
      // Comprehension correlates with student average score
      const comprehensionScore = Math.min(100, Math.max(0, 
        student.averageScore + Math.floor(Math.random() * 20) - 10
      ));
      
      scans.push({
        id: `c${String(scanId).padStart(4, '0')}`,
        studentId: student.id,
        studentName: student.name,
        topic,
        pagesScanned,
        timeSpent,
        comprehensionScore,
        timestamp: generateRandomTimestamp(),
        learningMode: student.learningMode === 'Both' ? 
          (Math.random() < 0.5 ? 'Classroom' : 'Self-Learning') : 
          student.learningMode as 'Classroom' | 'Self-Learning'
      });
      
      scanId++;
    }
  });
  
  return scans;
};

// Generate engagement vs performance data for scatter plots
export const generateEngagementData = (): EngagementData[] => {
  const data: EngagementData[] = [];
  const topics = biologyTopics.map(t => t.name);
  const dates = generateDateRange(30); // Last 30 days
  
  students.forEach(student => {
    // Generate 5-15 data points per student across different topics and dates
    const dataPoints = Math.floor(Math.random() * 11) + 5;
    
    for (let i = 0; i < dataPoints; i++) {
      const topic = topics[Math.floor(Math.random() * topics.length)];
      const date = dates[Math.floor(Math.random() * dates.length)];
      
      // Engagement and performance correlate but with some variation
      const engagementScore = student.engagement + Math.floor(Math.random() * 20) - 10;
      const performanceScore = student.averageScore + Math.floor(Math.random() * 20) - 10;
      
      data.push({
        studentId: student.id,
        studentName: student.name,
        topic,
        engagementScore: Math.min(100, Math.max(0, engagementScore)),
        performanceScore: Math.min(100, Math.max(0, performanceScore)),
        date
      });
    }
  });
  
  return data;
};

// Helper function to generate random timestamp in the last 30 days
function generateRandomTimestamp(): string {
  const now = new Date();
  const daysAgo = Math.floor(Math.random() * 30);
  const date = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
  const hours = Math.floor(Math.random() * 12) + 8; // 8 AM to 8 PM
  const minutes = Math.floor(Math.random() * 60);
  
  return `${date.toISOString().split('T')[0]} ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

// Helper function to generate date range
function generateDateRange(days: number): string[] {
  const dates: string[] = [];
  const now = new Date();
  
  for (let i = 0; i < days; i++) {
    const date = new Date(now.getTime() - i * 24 * 60 * 60 * 1000);
    dates.push(date.toISOString().split('T')[0]);
  }
  
  return dates;
}

// Export generated data
export const queryData = generateQueryData();
export const noteData = generateNoteData();
export const contentScanData = generateContentScanData();
export const engagementData = generateEngagementData();

// Filter helper functions
export const filterByTopic = <T extends { topic: string }>(data: T[], topic: string): T[] => {
  if (topic === 'All Topics') return data;
  return data.filter(item => item.topic === topic);
};

export const filterByStudent = <T extends { studentName: string }>(data: T[], student: string): T[] => {
  if (student === 'All Students') return data;
  return data.filter(item => item.studentName === student);
};

export const filterByLearningMode = <T extends { learningMode: string }>(data: T[], mode: string): T[] => {
  if (mode === 'All Modes') return data;
  return data.filter(item => item.learningMode === mode);
};

// Calculate aggregated metrics
export const calculateMetrics = (
  queries: QueryData[],
  notes: NoteData[],
  scans: ContentScanData[]
) => {
  return {
    totalQueries: queries.length,
    totalNotes: notes.length,
    totalScans: scans.length,
    averageRelevance: queries.reduce((sum, q) => sum + q.relevanceScore, 0) / queries.length,
    confusionRate: (queries.filter(q => q.isConfused).length / queries.length) * 100,
    resolutionRate: (queries.filter(q => q.resolved).length / queries.length) * 100,
    averageComprehension: scans.reduce((sum, s) => sum + s.comprehensionScore, 0) / scans.length
  };
};