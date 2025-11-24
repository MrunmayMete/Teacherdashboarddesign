// Comprehensive Biology Topics for the Dashboard
export const BIOLOGY_TOPICS = [
  'Cell Structure',
  'Cell Division (Mitosis & Meiosis)',
  'DNA & Genetics',
  'Photosynthesis',
  'Cellular Respiration',
  'Protein Synthesis',
  'Evolution & Natural Selection',
  'Ecosystems & Biodiversity',
  'Human Body Systems',
  'Plant Biology',
  'Microbiology & Viruses',
  'Enzymes & Metabolism'
] as const;

export type BiologyTopic = typeof BIOLOGY_TOPICS[number];

// Student names for consistency
export const ALL_STUDENTS = [
  'Emma Johnson',
  'Liam Smith',
  'Olivia Brown',
  'Noah Davis',
  'Ava Wilson',
  'Ethan Martinez',
  'Sophia Anderson',
  'Mason Taylor'
] as const;

export type StudentName = typeof ALL_STUDENTS[number];

// Topic metadata for richer context
export interface TopicMetadata {
  topic: BiologyTopic;
  difficulty: 'Basic' | 'Intermediate' | 'Advanced';
  unit: string;
  prerequisites?: BiologyTopic[];
}

export const TOPIC_METADATA: TopicMetadata[] = [
  {
    topic: 'Cell Structure',
    difficulty: 'Basic',
    unit: 'Unit 1: Cell Biology'
  },
  {
    topic: 'Cell Division (Mitosis & Meiosis)',
    difficulty: 'Intermediate',
    unit: 'Unit 1: Cell Biology',
    prerequisites: ['Cell Structure']
  },
  {
    topic: 'DNA & Genetics',
    difficulty: 'Intermediate',
    unit: 'Unit 2: Genetics',
    prerequisites: ['Cell Structure']
  },
  {
    topic: 'Photosynthesis',
    difficulty: 'Intermediate',
    unit: 'Unit 3: Energy Transfer',
    prerequisites: ['Cell Structure']
  },
  {
    topic: 'Cellular Respiration',
    difficulty: 'Intermediate',
    unit: 'Unit 3: Energy Transfer',
    prerequisites: ['Cell Structure']
  },
  {
    topic: 'Protein Synthesis',
    difficulty: 'Advanced',
    unit: 'Unit 2: Genetics',
    prerequisites: ['DNA & Genetics', 'Cell Structure']
  },
  {
    topic: 'Evolution & Natural Selection',
    difficulty: 'Intermediate',
    unit: 'Unit 4: Evolution',
    prerequisites: ['DNA & Genetics']
  },
  {
    topic: 'Ecosystems & Biodiversity',
    difficulty: 'Basic',
    unit: 'Unit 5: Ecology'
  },
  {
    topic: 'Human Body Systems',
    difficulty: 'Intermediate',
    unit: 'Unit 6: Human Biology',
    prerequisites: ['Cell Structure']
  },
  {
    topic: 'Plant Biology',
    difficulty: 'Basic',
    unit: 'Unit 7: Plant Science',
    prerequisites: ['Cell Structure']
  },
  {
    topic: 'Microbiology & Viruses',
    difficulty: 'Advanced',
    unit: 'Unit 8: Microbiology',
    prerequisites: ['Cell Structure', 'DNA & Genetics']
  },
  {
    topic: 'Enzymes & Metabolism',
    difficulty: 'Advanced',
    unit: 'Unit 3: Energy Transfer',
    prerequisites: ['Protein Synthesis', 'Cell Structure']
  }
];
