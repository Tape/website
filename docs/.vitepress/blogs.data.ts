import { createContentLoader } from 'vitepress';
import { Blog } from './theme/types/shared';

export default createContentLoader('blog/!(index).md', {
  excerpt: true,
  includeSrc: false,
  render: false,
  transform(raw) {
    return raw
      .sort((a, b) => {
        return +new Date(b.frontmatter.date) - +new Date(a.frontmatter.date)
      })
      .map((data): Blog => ({
        date: data.frontmatter.date,
        excerpt: data.excerpt,
        title: data.frontmatter.title,
        url: data.url,
      }));
  }
});
