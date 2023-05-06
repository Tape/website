import { createContentLoader } from 'vitepress';

export default createContentLoader('blog/*.md', {
  excerpt: false,
  includeSrc: false,
  render: false,
  transform(rawData) {
    return rawData
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map(data => ({
        date: new Date(data.frontmatter.date),
        title: data.frontmatter.title,
        url: data.url,
      }));
  }
});
