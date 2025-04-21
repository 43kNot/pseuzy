// Curriculum Data Structure
// This file contains all the curriculum content for the Pseuzy learning platform

export type LessonStep = {
  id: number
  type: "content" | "interactive" | "quiz" | "practice"
  title: string
  content: string
  interaction?: {
    type: string
    prompt: string
    expectedElements?: string[]
    steps?: string[]
    correctOrder?: number[]
    feedback: {
      success: string
      partial: string
      failure: string
    }
  }
  questions?: {
    id: number
    question: string
    options: string[]
    correctAnswer: number
    explanation: string
  }[]
}

export type Lesson = {
  id: number
  title: string
  description: string
  level: number
  module?: number
  moduleId: string
  totalSteps?: number
  steps?: LessonStep[]
  content?: string
  prerequisites?: number[]
  isEnrichment?: boolean
  isReview?: boolean
  exercises?: any[]
  assessment?: any
}

export type Module = {
  id: string
  title: string
  description: string
  completed: boolean
  isEnrichment?: boolean
  isReview?: boolean
  lessons: number[] // IDs of lessons in this module
}

export type Level = {
  id: number
  title: string
  description: string
  overview: string
  objectives: string[]
  prerequisites: string[]
  modules: Module[]
}

export type Curriculum = {
  levels: Level[]
  lessons: Record<number, Lesson>
}

// Helper function to create HTML content
const createContent = (content: string): string => {
  return content
}

// Level 1: Computational Thinking Fundamentals
const level1: Level = {
  id: 1,
  title: "Level 1: Computational Thinking Fundamentals",
  description: "Learn the core principles of computational thinking and problem-solving",
  overview: `
    Computational thinking is a problem-solving approach that involves breaking down complex problems into smaller, 
    more manageable parts. This level introduces the fundamental concepts of computational thinking and how they 
    apply to problem-solving in computer science and everyday life.
  `,
  objectives: [
    "Understand the core principles of computational thinking",
    "Learn to break down complex problems (decomposition)",
    "Identify patterns in problems and solutions",
    "Create abstractions to manage complexity",
    "Develop step-by-step solutions (algorithms)",
  ],
  prerequisites: [],
  modules: [
    {
      id: "1.1",
      title: "Introduction to Computational Thinking",
      description: "Understanding the fundamentals of computational thinking",
      completed: true,
      lessons: [101, 102, 103],
    },
    {
      id: "1.2",
      title: "Decomposition",
      description: "Breaking down complex problems into manageable parts",
      completed: false,
      lessons: [104, 105, 106],
    },
    {
      id: "1.3",
      title: "Pattern Recognition",
      description: "Identifying similarities and patterns in problems",
      completed: false,
      lessons: [107, 108, 109],
    },
  ],
}

// Level 2: Pseudocode Basics
const level2: Level = {
  id: 2,
  title: "Level 2: Pseudocode Basics",
  description: "Learn to express algorithms in clear, language-independent pseudocode",
  overview: `
    Pseudocode is a method of describing algorithms in a human-readable format that is independent of any specific 
    programming language. This level introduces the basics of pseudocode and how to use it to express computational 
    solutions clearly and precisely.
  `,
  objectives: [
    "Understand the purpose and benefits of pseudocode",
    "Learn pseudocode syntax and conventions",
    "Express algorithms in pseudocode",
    "Translate between natural language, pseudocode, and code",
    "Document solutions effectively using pseudocode",
  ],
  prerequisites: ["Level 1: Computational Thinking Fundamentals"],
  modules: [
    {
      id: "2.1",
      title: "Introduction to Pseudocode",
      description: "Understanding the purpose and benefits of pseudocode",
      completed: false,
      lessons: [201, 202, 203],
    },
    {
      id: "2.2",
      title: "Pseudocode Syntax",
      description: "Learning the conventions and syntax of pseudocode",
      completed: false,
      lessons: [204, 205, 206],
    },
    {
      id: "2.3",
      title: "Expressing Algorithms",
      description: "Using pseudocode to express computational solutions",
      completed: false,
      lessons: [207, 208, 209],
    },
  ],
}

// Level 3: Control Structures
const level3: Level = {
  id: 3,
  title: "Level 3: Control Structures",
  description: "Master decision-making and repetition in algorithms",
  overview: `
    Control structures are the backbone of algorithmic thinking, allowing for dynamic execution paths and repeated operations.
    This level introduces conditionals (if-then-else) and loops (for, while) in pseudocode and examines how they control
    the flow of algorithm execution. You'll learn how to make decisions, handle different cases, and efficiently repeat
    operations in your algorithms.
  `,
  objectives: [
    "Understand how control structures direct program flow",
    "Master if-then-else statements for decision-making",
    "Implement for loops for counted repetition",
    "Use while loops for condition-based repetition",
    "Combine loops and conditionals to solve complex problems",
  ],
  prerequisites: ["Level 1: Computational Thinking Fundamentals", "Level 2: Pseudocode Basics"],
  modules: [
    {
      id: "3.1",
      title: "Control Flow Foundations",
      description: "Understanding execution paths in algorithms",
      completed: true,
      lessons: [301, 302, 303],
    },
    {
      id: "3.2",
      title: "Conditional Statements",
      description: "Using if-then-else for decision-making",
      completed: false,
      lessons: [304, 305, 306],
    },
    {
      id: "3.3",
      title: "Loops and Iteration",
      description: "Using loops for repetition in algorithms",
      completed: false,
      lessons: [307, 308, 309],
    },
  ],
}

// Level 4: Programming Language Basics
const level4: Level = {
  id: 4,
  title: "Level 4: Programming Language Basics",
  description: "Apply pseudocode concepts in Python and JavaScript",
  overview: `
    Level 4 bridges the gap between pseudocode and actual programming languages. You'll learn how to translate your
    algorithmic thinking and pseudocode into working code in both Python and JavaScript. The focus is on translating
    concepts you've already mastered - not on learning language-specific features or syntax. This approach enables
    you to see how the same computational thinking principles apply across different languages.
  `,
  objectives: [
    "Translate pseudocode into Python code",
    "Translate pseudocode into JavaScript code",
    "Understand key similarities and differences between languages",
    "Execute and test basic programs in both languages",
    "Apply computational thinking to real code",
  ],
  prerequisites: [
    "Level 1: Computational Thinking Fundamentals",
    "Level 2: Pseudocode Basics",
    "Level 3: Control Structures",
  ],
  modules: [
    {
      id: "4.1",
      title: "From Pseudocode to Real Code",
      description: "The translation process explained",
      completed: false,
      lessons: [401, 402, 403],
    },
    {
      id: "4.2",
      title: "Python Basics",
      description: "Implementing algorithms in Python",
      completed: false,
      lessons: [404, 405, 406],
    },
    {
      id: "4.3",
      title: "JavaScript Basics",
      description: "Implementing algorithms in JavaScript",
      completed: false,
      lessons: [407, 408, 409],
    },
  ],
}

// Level 5: Algorithm Implementation
const level5: Level = {
  id: 5,
  title: "Level 5: Algorithm Implementation",
  description: "Apply all your skills to implement complete algorithms",
  overview: `
    Level 5 represents the culmination of your learning journey, combining computational thinking, pseudocode,
    control structures, and programming language knowledge. You'll implement complete algorithms from scratch,
    starting with pseudocode design and ending with working code in both Python and JavaScript. The focus is on
    the end-to-end process of algorithmic problem-solving across different languages.
  `,
  objectives: [
    "Design algorithms for complex problems",
    "Implement full solutions in pseudocode",
    "Translate complete algorithms to Python",
    "Translate complete algorithms to JavaScript",
    "Analyze and optimize algorithm performance",
  ],
  prerequisites: [
    "Level 1: Computational Thinking Fundamentals",
    "Level 2: Pseudocode Basics",
    "Level 3: Control Structures",
    "Level 4: Programming Language Basics",
  ],
  modules: [
    {
      id: "5.1",
      title: "Complete Algorithm Development Process",
      description: "End-to-end workflow for algorithm creation",
      completed: false,
      lessons: [501, 502, 503],
    },
    {
      id: "5.2",
      title: "Search Algorithms",
      description: "Implementing search algorithms in pseudocode and code",
      completed: false,
      lessons: [504, 505, 506],
    },
    {
      id: "5.3",
      title: "Sorting Algorithms",
      description: "Implementing sorting algorithms in pseudocode and code",
      completed: false,
      lessons: [507, 508, 509],
    },
  ],
}

// Now let's define some sample lessons for each level
// For brevity, I'll include a few detailed lessons and then provide a template for the rest

// Level 1 Lessons
const lesson101: Lesson = {
  id: 101,
  title: "What is Computational Thinking?",
  description: "An introduction to computational thinking and its importance in problem-solving",
  level: 1,
  module: 1,
  moduleId: "1.1",
  content: `
    <h2>What is Computational Thinking?</h2>
    <p>Computational thinking is a problem-solving approach that involves breaking down complex problems into smaller, more manageable parts. It's a way of thinking that allows us to formulate problems and their solutions in a way that can be effectively carried out by an information-processing agent, whether that's a computer, a human, or a combination of both.</p>
    
    <p>Computational thinking is not just for computer scientists or programmers. It's a valuable skill for everyone, as it helps us approach problems in a systematic and logical way.</p>
    
    <h3>The Four Pillars of Computational Thinking</h3>
    <ul>
      <li><strong>Decomposition</strong>: Breaking down complex problems into smaller, more manageable parts</li>
      <li><strong>Pattern Recognition</strong>: Looking for similarities among and within problems</li>
      <li><strong>Abstraction</strong>: Focusing on the important information only, ignoring irrelevant details</li>
      <li><strong>Algorithms</strong>: Developing a step-by-step solution to the problem</li>
    </ul>
    
    <h3>Why Computational Thinking Matters</h3>
    <p>Computational thinking is increasingly recognized as a fundamental skill for everyone, not just computer scientists. It helps us:</p>
    <ul>
      <li>Solve complex problems more effectively</li>
      <li>Think logically and systematically</li>
      <li>Break down large tasks into manageable chunks</li>
      <li>Identify patterns and create reusable solutions</li>
      <li>Communicate and collaborate on problem-solving</li>
    </ul>
    
    <p>In today's digital world, computational thinking is becoming as essential as reading, writing, and arithmetic. It's a skill that can be applied to virtually any field, from science and engineering to business and the arts.</p>
  `,
  exercises: [],
  assessment: { questions: [] },
}

const lesson102: Lesson = {
  id: 102,
  title: "Computational Thinking in Action",
  description: "Explore real-world applications of computational thinking",
  level: 1,
  module: 1,
  moduleId: "1.1",
  totalSteps: 4,
  steps: [
    {
      id: 1,
      type: "content",
      title: "Computational Thinking in Everyday Life",
      content: `
        <h2>Computational Thinking in Everyday Life</h2>
        <p>Computational thinking isn't just for solving computer problems—it's a valuable approach for tackling challenges in everyday life. Let's explore some common scenarios where computational thinking can be applied:</p>
        
        <h3>Planning a Trip</h3>
        <ul>
          <li><strong>Decomposition:</strong> Breaking down the trip into components like transportation, accommodation, activities, and budget</li>
          <li><strong>Pattern Recognition:</strong> Identifying common travel patterns or using past trip experiences to inform decisions</li>
          <li><strong>Abstraction:</strong> Focusing on the most important details (must-see attractions) while ignoring less relevant ones</li>
          <li><strong>Algorithms:</strong> Creating a day-by-day itinerary with logical ordering of activities</li>
        </ul>
        
        <h3>Cooking a Meal</h3>
        <ul>
          <li><strong>Decomposition:</strong> Breaking down the cooking process into preparation, cooking, and serving steps</li>
          <li><strong>Pattern Recognition:</strong> Recognizing similar cooking techniques across different recipes</li>
          <li><strong>Abstraction:</strong> Focusing on essential ingredients and steps while ignoring minor variations</li>
          <li><strong>Algorithms:</strong> Following a recipe's step-by-step instructions to achieve the desired result</li>
        </ul>
      `,
    },
    {
      id: 2,
      type: "content",
      title: "Computational Thinking in Professional Fields",
      content: `
        <h2>Computational Thinking Across Disciplines</h2>
        <p>Computational thinking extends far beyond computer science and is valuable in numerous professional fields:</p>
        
        <h3>Medicine</h3>
        <ul>
          <li><strong>Decomposition:</strong> Breaking down symptoms to diagnose complex conditions</li>
          <li><strong>Pattern Recognition:</strong> Identifying disease patterns across patient populations</li>
          <li><strong>Abstraction:</strong> Focusing on relevant symptoms while filtering out unrelated factors</li>
          <li><strong>Algorithms:</strong> Following diagnostic protocols and treatment plans</li>
        </ul>
        
        <h3>Business</h3>
        <ul>
          <li><strong>Decomposition:</strong> Breaking down complex business problems into manageable components</li>
          <li><strong>Pattern Recognition:</strong> Identifying market trends and consumer behavior patterns</li>
          <li><strong>Abstraction:</strong> Creating business models that capture essential operations</li>
          <li><strong>Algorithms:</strong> Developing step-by-step processes for business operations</li>
        </ul>
        
        <h3>Education</h3>
        <ul>
          <li><strong>Decomposition:</strong> Breaking down complex subjects into teachable units</li>
          <li><strong>Pattern Recognition:</strong> Identifying common learning patterns among students</li>
          <li><strong>Abstraction:</strong> Creating curriculum that focuses on core concepts</li>
          <li><strong>Algorithms:</strong> Developing structured lesson plans and teaching methodologies</li>
        </ul>
      `,
    },
    {
      id: 3,
      type: "interactive",
      title: "Identify Computational Thinking in Scenarios",
      content:
        "<p>Let's practice identifying computational thinking in various scenarios. Match each scenario with the computational thinking pillar it best demonstrates.</p>",
      interaction: {
        type: "matching",
        prompt: "Match each scenario with the computational thinking pillar it best demonstrates:",
        expectedElements: [
          "A chef breaking down a complex recipe into preparation, cooking, and plating steps",
          "A teacher noticing that students who struggle with fractions often struggle with percentages",
          "A doctor focusing only on symptoms relevant to a particular diagnosis",
          "A project manager creating a step-by-step plan to complete a project by the deadline",
        ],
        correctOrder: [0, 1, 2, 3],
        feedback: {
          success: "Excellent! You've correctly identified the computational thinking pillars in each scenario.",
          partial: "You're getting there! Some of your matches are correct, but others need another look.",
          failure: "Let's review the pillars of computational thinking again and try once more.",
        },
      },
    },
    {
      id: 4,
      type: "quiz",
      title: "Check Your Understanding",
      content: "Let's check your understanding of computational thinking in real-world contexts.",
      questions: [
        {
          id: 1,
          question: "Which of the following best demonstrates abstraction in computational thinking?",
          options: [
            "Breaking down a math problem into smaller steps",
            "Creating a map that shows only major highways and cities",
            "Following a recipe step by step",
            "Noticing that similar math problems have similar solutions",
          ],
          correctAnswer: 1,
          explanation:
            "Abstraction involves focusing on the important information while ignoring irrelevant details. A map that shows only major highways and cities is abstracting away less important details to focus on the most relevant information.",
        },
        {
          id: 2,
          question:
            "When a doctor diagnoses a patient by methodically eliminating possible conditions based on symptoms, which computational thinking skill is primarily being used?",
          options: ["Decomposition", "Pattern Recognition", "Abstraction", "Algorithmic Thinking"],
          correctAnswer: 3,
          explanation:
            "The doctor is following a systematic, step-by-step process of elimination to reach a diagnosis, which is an example of algorithmic thinking.",
        },
      ],
    },
  ],
  exercises: [],
  assessment: { questions: [] },
}

const lesson103: Lesson = {
  id: 103,
  title: "Problem-Solving with Computational Thinking",
  description: "Learn to apply computational thinking to solve various problems",
  level: 1,
  module: 1,
  moduleId: "1.1",
  content: `
    <h2>Problem-Solving with Computational Thinking</h2>
    <p>Computational thinking provides a powerful framework for solving problems systematically. By applying the four pillars of computational thinking—decomposition, pattern recognition, abstraction, and algorithms—we can tackle complex problems more effectively.</p>
    
    <h3>The Problem-Solving Process</h3>
    <ol>
      <li><strong>Understand the Problem</strong>: Clearly define what you're trying to solve</li>
      <li><strong>Break It Down</strong>: Use decomposition to divide the problem into smaller, manageable parts</li>
      <li><strong>Look for Patterns</strong>: Identify similarities with problems you've solved before</li>
      <li><strong>Focus on What Matters</strong>: Use abstraction to filter out unnecessary details</li>
      <li><strong>Develop a Solution</strong>: Create a step-by-step algorithm to solve the problem</li>
      <li><strong>Test and Refine</strong>: Evaluate your solution and make improvements</li>
    </ol>
    
    <h3>Example: Planning a Birthday Party</h3>
    <p>Let's apply computational thinking to planning a birthday party:</p>
    
    <h4>1. Decomposition</h4>
    <p>Break down the party planning into smaller tasks:</p>
    <ul>
      <li>Guest list</li>
      <li>Invitations</li>
      <li>Venue</li>
      <li>Food and drinks</li>
      <li>Decorations</li>
      <li>Entertainment</li>
      <li>Schedule</li>
    </ul>
    
    <h4>2. Pattern Recognition</h4>
    <p>Identify patterns from previous parties or events:</p>
    <ul>
      <li>Which foods were popular?</li>
      <li>What activities were most enjoyed?</li>
      <li>What timing worked well?</li>
    </ul>
    
    <h4>3. Abstraction</h4>
    <p>Focus on the most important elements:</p>
    <ul>
      <li>The birthday person's preferences</li>
      <li>Budget constraints</li>
      <li>Key guests who must be included</li>
    </ul>
    
    <h4>4. Algorithm</h4>
    <p>Create a step-by-step plan:</p>
    <ol>
      <li>Set date and budget</li>
      <li>Create guest list</li>
      <li>Book venue</li>
      <li>Send invitations</li>
      <li>Plan menu</li>
      <li>Order/prepare food</li>
      <li>Purchase decorations</li>
      <li>Set up venue</li>
      <li>Host party</li>
      <li>Clean up</li>
    </ol>
    
    <p>By applying computational thinking to everyday problems like this, we can develop more organized, efficient solutions.</p>
  `,
  exercises: [],
  assessment: { questions: [] },
}

// Add more lessons for Level 1
const lesson104: Lesson = {
  id: 104,
  title: "Introduction to Decomposition",
  description: "Learn the fundamentals of breaking down complex problems",
  level: 1,
  module: 2,
  moduleId: "1.2",
  content: `
    <h2>Introduction to Decomposition</h2>
    <p>Decomposition is the process of breaking down a complex problem into smaller, more manageable parts. It's the first step in computational thinking and a crucial skill for problem-solving.</p>
    
    <h3>Why Decomposition Matters</h3>
    <p>Complex problems can be overwhelming when viewed as a whole. Decomposition allows us to:</p>
    <ul>
      <li>Make large problems more manageable</li>
      <li>Focus on solving one part at a time</li>
      <li>Divide work among team members</li>
      <li>Identify reusable components</li>
      <li>Test and debug individual parts</li>
    </ul>
    
    <h3>How to Decompose a Problem</h3>
    <ol>
      <li>Identify the main problem or task</li>
      <li>Break it down into major components or sub-problems</li>
      <li>Continue breaking down each component until you have simple, solvable parts</li>
      <li>Identify relationships between the parts</li>
      <li>Prioritize which parts to tackle first</li>
    </ol>
    
    <h3>Example: Writing a Research Paper</h3>
    <p>Let's decompose the task of writing a research paper:</p>
    
    <h4>Main Components:</h4>
    <ul>
      <li>Topic selection</li>
      <li>Research</li>
      <li>Outlining</li>
      <li>Writing</li>
      <li>Editing</li>
      <li>Formatting</li>
    </ul>
    
    <h4>Further Decomposition of "Research":</h4>
    <ul>
      <li>Identify key questions</li>
      <li>Find relevant sources</li>
      <li>Read and take notes</li>
      <li>Organize findings</li>
      <li>Evaluate source credibility</li>
    </ul>
    
    <p>By breaking down the paper-writing process this way, a seemingly overwhelming task becomes a series of manageable steps.</p>
  `,
  exercises: [],
  assessment: { questions: [] },
}

const lesson105: Lesson = {
  id: 105,
  title: "Decomposition Techniques",
  description: "Explore different methods for problem decomposition",
  level: 1,
  module: 2,
  moduleId: "1.2",
  content: `
    <h2>Decomposition Techniques</h2>
    <p>There are several approaches to breaking down problems effectively. Let's explore some key decomposition techniques:</p>
    
    <h3>1. Functional Decomposition</h3>
    <p>Breaking down a problem based on different functions or operations that need to be performed.</p>
    <p><strong>Example:</strong> For a banking application, functions might include: account creation, deposits, withdrawals, transfers, and balance inquiries.</p>
    
    <h3>2. Object-Oriented Decomposition</h3>
    <p>Breaking down a problem by identifying the objects involved and their interactions.</p>
    <p><strong>Example:</strong> For a library system, objects might include: books, members, librarians, shelves, and loan records.</p>
    
    <h3>3. Sequential Decomposition</h3>
    <p>Breaking down a problem into a sequence of steps that need to be performed in order.</p>
    <p><strong>Example:</strong> For baking a cake: gather ingredients, mix dry ingredients, mix wet ingredients, combine mixtures, pour into pan, bake, cool, frost.</p>
    
    <h3>4. Parallel Decomposition</h3>
    <p>Breaking down a problem into parts that can be worked on simultaneously.</p>
    <p><strong>Example:</strong> For organizing a conference: one team handles registration, another handles venue logistics, and a third handles speaker coordination.</p>
    
    <h3>5. Data Decomposition</h3>
    <p>Breaking down a problem based on different data sets or data structures needed.</p>
    <p><strong>Example:</strong> For analyzing customer behavior: separate data into demographics, purchase history, browsing patterns, and customer service interactions.</p>
    
    <h3>Choosing the Right Approach</h3>
    <p>The best decomposition technique depends on the nature of the problem:</p>
    <ul>
      <li>For process-oriented problems, sequential decomposition often works well</li>
      <li>For system design, object-oriented decomposition is frequently used</li>
      <li>For data-heavy problems, data decomposition is appropriate</li>
      <li>For team projects, parallel decomposition can improve efficiency</li>
    </ul>
    
    <p>Often, a combination of techniques provides the most effective approach to complex problems.</p>
  `,
  exercises: [],
  assessment: { questions: [] },
}

const lesson106: Lesson = {
  id: 106,
  title: "Practicing Decomposition",
  description: "Apply decomposition to various problem scenarios",
  level: 1,
  module: 2,
  moduleId: "1.2",
  content: `
    <h2>Practicing Decomposition</h2>
    <p>The best way to master decomposition is through practice. Let's apply decomposition to several different scenarios.</p>
    
    <h3>Scenario 1: Planning a Vacation</h3>
    <p>Break down the process of planning a vacation:</p>
    <ul>
      <li><strong>Destination Selection</strong>
        <ul>
          <li>Research potential destinations</li>
          <li>Consider budget constraints</li>
          <li>Check travel advisories</li>
          <li>Consider weather and season</li>
        </ul>
      </li>
      <li><strong>Transportation</strong>
        <ul>
          <li>Compare flight options</li>
          <li>Consider alternative transport (train, car)</li>
          <li>Plan local transportation</li>
        </ul>
      </li>
      <li><strong>Accommodation</strong>
        <ul>
          <li>Research hotels, rentals, etc.</li>
          <li>Read reviews</li>
          <li>Check availability</li>
          <li>Make reservations</li>
        </ul>
      </li>
      <li><strong>Activities</strong>
        <ul>
          <li>Research attractions</li>
          <li>Create itinerary</li>
          <li>Book tours or tickets</li>
        </ul>
      </li>
      <li><strong>Preparation</strong>
        <ul>
          <li>Pack appropriate clothing</li>
          <li>Arrange for pet/plant care</li>
          <li>Set up mail hold</li>
          <li>Exchange currency</li>
        </ul>
      </li>
    </ul>
    
    <h3>Scenario 2: Building a Website</h3>
    <p>Decompose the process of building a website:</p>
    <ul>
      <li><strong>Planning</strong>
        <ul>
          <li>Define purpose and goals</li>
          <li>Identify target audience</li>
          <li>Determine content needs</li>
          <li>Set budget and timeline</li>
        </ul>
      </li>
      <li><strong>Design</strong>
        <ul>
          <li>Create site map</li>
          <li>Design user interface</li>
          <li>Create wireframes</li>
          <li>Develop visual style</li>
        </ul>
      </li>
      <li><strong>Development</strong>
        <ul>
          <li>Set up hosting</li>
          <li>Build front-end</li>
          <li>Develop back-end functionality</li>
          <li>Integrate databases</li>
        </ul>
      </li>
      <li><strong>Content Creation</strong>
        <ul>
          <li>Write copy</li>
          <li>Create images</li>
          <li>Produce videos</li>
          <li>Optimize for SEO</li>
        </ul>
      </li>
      <li><strong>Testing and Launch</strong>
        <ul>
          <li>Test functionality</li>
          <li>Check for browser compatibility</li>
          <li>Perform security testing</li>
          <li>Launch site</li>
        </ul>
      </li>
    </ul>
    
    <h3>Practice Exercise</h3>
    <p>Choose one of the following problems and practice decomposition:</p>
    <ol>
      <li>Organizing a community fundraiser</li>
      <li>Learning a new language</li>
      <li>Renovating a room in your home</li>
      <li>Starting a small business</li>
    </ol>
    
    <p>For your chosen problem:</p>
    <ol>
      <li>Identify the main components</li>
      <li>Break each component down into smaller tasks</li>
      <li>Identify dependencies between tasks</li>
      <li>Determine which tasks could be done in parallel</li>
    </ol>
    
    <p>Remember, effective decomposition makes complex problems manageable and is the foundation for successful problem-solving.</p>
  `,
  exercises: [],
  assessment: { questions: [] },
}

// Create a template for other lessons
const createLessonTemplate = (
  id: number,
  title: string,
  description: string,
  level: number,
  module: number,
  moduleId: string,
): Lesson => {
  return {
    id,
    title,
    description,
    level,
    module,
    moduleId,
    content: `<h2>${title}</h2><p>${description}</p><p>This lesson content is under development.</p>`,
    exercises: [],
    assessment: { questions: [] },
  }
}

// Create all lessons
const lessons: Record<number, Lesson> = {
  // Level 1 lessons
  101: lesson101,
  102: lesson102,
  103: lesson103,
  104: lesson104,
  105: lesson105,
  106: lesson106,
  107: createLessonTemplate(
    107,
    "Introduction to Pattern Recognition",
    "Learn to identify patterns in problems and solutions",
    1,
    3,
    "1.3",
  ),
  108: createLessonTemplate(
    108,
    "Pattern Recognition Techniques",
    "Explore methods for identifying patterns",
    1,
    3,
    "1.3",
  ),
  109: createLessonTemplate(
    109,
    "Applying Pattern Recognition",
    "Practice applying pattern recognition to various problems",
    1,
    3,
    "1.3",
  ),

  // Level 3 lessons
  301: createLessonTemplate(
    301,
    "Introduction to Control Flow",
    "Learn how control structures direct the flow of execution in algorithms",
    3,
    1,
    "3.1",
  ),
  302: createLessonTemplate(
    302,
    "Sequential Flow in Algorithms",
    "Understand how sequential execution works in algorithms",
    3,
    1,
    "3.1",
  ),
  303: createLessonTemplate(
    303,
    "Introduction to Decision Making",
    "Learn the basics of conditional execution in algorithms",
    3,
    1,
    "3.1",
  ),
  304: createLessonTemplate(
    304,
    "Basic Conditional Statements",
    "Learn to use if-then-else statements for decision making",
    3,
    2,
    "3.2",
  ),
  305: createLessonTemplate(305, "Complex Conditionals", "Explore nested and multi-way conditionals", 3, 2, "3.2"),
  306: createLessonTemplate(306, "Conditional Exercises", "Practice using conditionals to solve problems", 3, 2, "3.2"),
  307: createLessonTemplate(307, "Introduction to Loops", "Learn the basics of repetition in algorithms", 3, 3, "3.3"),
  308: createLessonTemplate(308, "For Loops", "Master counted repetition with for loops", 3, 3, "3.3"),
  309: createLessonTemplate(309, "While Loops", "Understand condition-based repetition with while loops", 3, 3, "3.3"),

  // Level 5 lessons
  501: createLessonTemplate(
    501,
    "The Algorithm Development Process",
    "Learn the end-to-end process of developing algorithms from problem to implementation",
    5,
    1,
    "5.1",
  ),
  502: createLessonTemplate(502, "Algorithm Analysis Basics", "Learn to analyze algorithm efficiency", 5, 1, "5.1"),
  503: createLessonTemplate(
    503,
    "Algorithm Optimization Techniques",
    "Explore methods for improving algorithm performance",
    5,
    1,
    "5.1",
  ),
  504: createLessonTemplate(
    504,
    "Introduction to Search Algorithms",
    "Understand the principles of search algorithms",
    5,
    2,
    "5.2",
  ),
  505: createLessonTemplate(505, "Linear Search Implementation", "Implement and analyze linear search", 5, 2, "5.2"),
  506: createLessonTemplate(506, "Binary Search Implementation", "Implement and analyze binary search", 5, 2, "5.2"),
  507: createLessonTemplate(
    507,
    "Introduction to Sorting Algorithms",
    "Understand the principles of sorting algorithms",
    5,
    3,
    "5.3",
  ),
  508: createLessonTemplate(
    508,
    "Simple Sorting Algorithms",
    "Implement bubble, insertion, and selection sort",
    5,
    3,
    "5.3",
  ),
  509: createLessonTemplate(509, "Advanced Sorting Algorithms", "Explore merge sort and quicksort", 5, 3, "5.3"),
}

// Add Level 2 and Level 4 lessons
for (let i = 201; i <= 209; i++) {
  const module = Math.floor((i - 201) / 3) + 1
  const moduleId = `2.${module}`
  let title, description

  if (i <= 203) {
    title = `Lesson ${i - 200}: Pseudocode Basics`
    description = `Learn the fundamentals of pseudocode - Part ${i - 200}`
  } else if (i <= 206) {
    title = `Lesson ${i - 203}: Pseudocode Syntax`
    description = `Master pseudocode syntax and conventions - Part ${i - 203}`
  } else {
    title = `Lesson ${i - 206}: Expressing Algorithms`
    description = `Practice expressing algorithms in pseudocode - Part ${i - 206}`
  }

  lessons[i] = createLessonTemplate(i, title, description, 2, module, moduleId)
}

for (let i = 401; i <= 409; i++) {
  const module = Math.floor((i - 401) / 3) + 1
  const moduleId = `4.${module}`
  let title, description

  if (i <= 403) {
    title = `Lesson ${i - 400}: Pseudocode to Code`
    description = `Learn to translate pseudocode to real code - Part ${i - 400}`
  } else if (i <= 406) {
    title = `Lesson ${i - 403}: Python Implementation`
    description = `Implement algorithms in Python - Part ${i - 403}`
  } else {
    title = `Lesson ${i - 406}: JavaScript Implementation`
    description = `Implement algorithms in JavaScript - Part ${i - 406}`
  }

  lessons[i] = createLessonTemplate(i, title, description, 4, module, moduleId)
}

// Assemble the complete curriculum
export const curriculum: Curriculum = {
  levels: [level1, level2, level3, level4, level5],
  lessons: lessons,
}

// Helper function to get a lesson by ID
export const getLessonById = (id: number): Lesson | undefined => {
  return curriculum.lessons[id]
}

// Helper function to get a level by ID
export const getLevelById = (id: number): Level | undefined => {
  return curriculum.levels.find((level) => level.id === id)
}

// Helper function to get modules for a level
export const getModulesByLevel = (levelId: string): Module[] => {
  const level = curriculum.levels.find((level) => level.id === Number.parseInt(levelId))
  return level ? level.modules : []
}

// Helper function to get lessons for a specific module
export const getLessonsForModule = (levelId: number, moduleId: string): Lesson[] => {
  const level = getLevelById(levelId)
  if (!level) return []

  const module = level.modules.find((m) => m.id === moduleId)
  if (!module) return []

  return module.lessons.map((lessonId) => curriculum.lessons[lessonId]).filter(Boolean)
}

// Helper function to check if prerequisites are met
export const arePrerequisitesMet = (lessonId: number, completedLessons: number[]): boolean => {
  const lesson = getLessonById(lessonId)
  if (!lesson || !lesson.prerequisites) return true

  return lesson.prerequisites.every((prereqId) => completedLessons.includes(prereqId))
}

// Export the curriculum data
export default curriculum
