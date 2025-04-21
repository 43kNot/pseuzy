export default {
  name: "module",
  title: "Module",
  type: "document",
  fields: [
    {
      name: "id",
      title: "ID",
      type: "string",
      validation: (Rule) => Rule.required(),
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
      name: "lessons",
      title: "Lessons",
      type: "array",
      of: [{ type: "number" }],
      description: "Lesson IDs included in this module",
    },
    {
      name: "isEnrichment",
      title: "Is Enrichment Module",
      type: "boolean",
      initialValue: false,
    },
    {
      name: "isReview",
      title: "Is Review Module",
      type: "boolean",
      initialValue: false,
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "id",
    },
  },
}
