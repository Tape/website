import { defineConfig } from 'vitepress';

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: 'David Kosub',
  description: 'Website and blog of the developer David Kosub located in San Antonio, Texas',

  themeConfig: {
    nav: [
      { text: 'Home', link: '/' },
      { text: 'Resume', link: '/resume' },
    ],

    sidebar: [],

    footer: {
      copyright: 'Copyright &copy; 2023-Present David Kosub'
    },

    socialLinks: [
      { icon: 'linkedin', link: 'https://www.linkedin.com/in/davidkosub/' },
      { icon: 'github', link: 'https://github.com/Tape' },
    ]
  }
});
