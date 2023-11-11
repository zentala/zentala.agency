export default {
  name: 'technology',
  title: 'Technology',
  type: 'document',
  fields: [
    {
      name: 'name',
      title: 'Name',
      type: 'string',
    },
    {
      name: 'summary',
      title: 'Short Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'desc',
      title: 'Long Description',
      type: 'array',
      of: [{type: 'block'}],
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'name',
        maxLength: 96,
      },
    },
  ],
}
