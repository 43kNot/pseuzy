export default {
  name: "lesson",
  title: "Lesson",
  type: "document",
  fields: [
    {
      name: "id",
      title: "ID",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    },
    {
      name: "title",
      title: "Title",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "description",
      title: "Description",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "level",
      title: "Level",
      type: "number",
      validation: (Rule) => Rule.required().positive().integer(),
    },
    {
      name: "moduleId",
      title: "Module ID",
      type: "string",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "content",
      title: "Content",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H1", value: "h1" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "H4", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Number", value: "number" },
          ],
        },
        {
          type: "code",
          options: {
            withFilename: true,
          },
        },
      ],
    },
    {
      name: "steps",
      title: "Lesson Steps",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            {
              name: "id",
              title: "Step ID",
              type: "number",
              validation: (Rule) => Rule.required().positive().integer(),
            },
            {
              name: "type",
              title: "Step Type",
              type: "string",
              options: {
                list: [
                  { title: "Content", value: "content" },
                  { title: "Interactive", value: "interactive" },
                  { title: "Quiz", value: "quiz" },
                  { title: "Practice", value: "practice" },
                ],
              },
              validation: (Rule) => Rule.required(),
            },
            {
              name: "title",
              title: "Step Title",
              type: "string",
              validation: (Rule) => Rule.required(),
            },
            {
              name: "content",
              title: "Step Content",
              type: "array",
              of: [
                {
                  type: "block",
                  styles: [
                    { title: "Normal", value: "normal" },
                    { title: "H1", value: "h1" },
                    { title: "H2", value: "h2" },
                    { title: "H3", value: "h3" },
                    { title: "H4", value: "h4" },
                    { title: "Quote", value: "blockquote" },
                  ],
                  lists: [
                    { title: "Bullet", value: "bullet" },
                    { title: "Number", value: "number" },
                  ],
                },
                {
                  type: "code",
                  options: {
                    withFilename: true,
                  },
                },
              ],
            },
            {
              name: "interaction",
              title: "Interactive Component",
              type: "object",
              fields: [
                {
                  name: "type",
                  title: "Interaction Type",
                  type: "string",
                  options: {
                    list: [
                      { title: "Matching", value: "matching" },
                      { title: "Text Input", value: "text-input" },
                      { title: "Algorithm Builder", value: "algorithm-builder" },
                    ],
                  },
                },
                {
                  name: "prompt",
                  title: "Prompt",
                  type: "text",
                },
                {
                  name: "expectedElements",
                  title: "Expected Elements",
                  type: "array",
                  of: [{ type: "string" }],
                },
                {
                  name: "correctOrder",
                  title: "Correct Order",
                  type: "array",
                  of: [{ type: "number" }],
                },
                {
                  name: "feedback",
                  title: "Feedback",
                  type: "object",
                  fields: [
                    { name: "success", title: "Success Message", type: "text" },
                    { name: "partial", title: "Partial Success Message", type: "text" },
                    { name: "failure", title: "Failure Message", type: "text" },
                  ],
                },
              ],
            },
            {
              name: "questions",
              title: "Quiz Questions",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    { name: "id", title: "Question ID", type: "number" },
                    { name: "question", title: "Question", type: "text" },
                    { name: "options", title: "Options", type: "array", of: [{ type: "string" }] },
                    { name: "correctAnswer", title: "Correct Answer Index", type: "number" },
                    { name: "explanation", title: "Explanation", type: "text" },
                  ],
                },
              ],
            },
          ],
        },
      ],
    },
    {
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      of: [{ type: "number" }],
      description: "IDs of lessons that must be completed before this one",
    },
    {
      name: "isEnrichment",
      title: "Is Enrichment Lesson",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isReview",
      title: "Is Review Lesson",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
}
