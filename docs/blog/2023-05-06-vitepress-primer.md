---
date: 2023-05-06
title: VitePress Primer
---

# VitePress Primer

I figured I'd check out what the cool kids are doing these days for static site generation and began my search. Turns
out a JavaScript tooling framework I had previously played around with had a solution available, so I took this as an
opportunity to give it a try.

## Getting Started

Setup of VitePress is actually extremely simple. As long as you have node installed it's straightforward. Feel free to
substitute `yarn` with a package manager of your choice:

```bash
mkdir website && cd website
yarn init
yarn add -D vitepress
# this will trigger a setup wizard
yarn vitepress init
```

The configuration wizard can pretty much all be left default, but I do recommend setting the configuration directory to
`./docs` in order to provide an isolated directory for your markdown pages. Now all that's left is to run the dev server
and see your boilerplate site:

```bash
yarn run docs:dev
```

Open the link provided in the terminal, and you're pretty much done!

## Deployment

Deploying a VitePress site is also incredibly painless. The generated output can be simply dumped behind NGINX, uploaded
to a CDN, or many other options. It is just a static site after all. Simply run the below command:

```bash
yarn run docs:build
```

Inside your `.vuepress` directory (if you use `docs` from above it will be inside there) a directory named `dist` will
have been generated. This contains your static assets that can be uploaded to your remote hosting of choice. In my case
I opted for a GitHub action that runs the above build command and uses `scp` to copy files to my remote hosting.

## Final Thoughts

VitePress is definitely a simple option for getting a site quickly started up in an age where it's not necessarily worth
the investment to start a site from scratch to prove your technical prowess. Sometimes showing you know how to work with
out-of-the-box solutions is plenty.

See the [VitePress](https://vitepress.dev/) website for more information on how to further configure and extend your
installation. You can also check out the [source for my website](https://github.com/Tape/website) as it is also powered
by VitePress.
