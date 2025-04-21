export default {
  name: "level",
  title: "Level",
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
      name: "overview",
      title: "Overview",
      type: "text",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "objectives",
      title: "Learning Objectives",
      type: "array",
      of: [{ type: "string" }],
      validation: (Rule) => Rule.required(),
    },
    {
      name: "prerequisites",
      title: "Prerequisites",
      type: "array",
      of: [{ type: "string" }],
    },
    {
      name: "modules",
      title: "Modules",
      type: "array",
      of: [{ type: "reference", to: [{ type: "module" }] }],
    },
  ],
  preview: {
    select: {
      title: "title",
      subtitle: "description",
    },
  },
}
