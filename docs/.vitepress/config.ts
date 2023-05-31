import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'David Kosub',
  description: 'Website and blog of the developer David Kosub located in San Antonio, Texas',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      {
        text: 'Projects',
        items: [
          { text: 'FFXIV Tools', link: '/projects/ffxiv-tools' },
          { text: 'OpenPSN', link: '/projects/openpsn' },
          { text: 'This Website', link: '/projects/this-website' },
        ],
      },
      { text: 'Resume', link: '/resume' },
      { text: 'Blog', link: '/blog/' },
    ],

    sidebar: [],

    footer: {
      copyright: 'Copyright &copy; 2023-Present David Kosub',
    },

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/davidkosub/' },
      { icon: 'github', link: 'https://github.com/Tape' },
    ]
  },

  markdown: {
    lineNumbers: true,
  },
});
