---
date: 2023-05-13
title: VitePress Slots
---

VitePress has an awesome framework that allows you to customize the look and feel of your statically generated website.
The default template provides some pre-defined slots that allow you to insert custom content which can leverage
frontmatter to toggle the display of features and/or render content.

---

## Getting Started

Assuming you've already followed the setup steps in the [VitePress Primer](/blog/2023-05-06-vitepress-primer), you
should already be set up with a decent boilerplate site. Let's do a simple example, which would be to extend the default
template to add a banner to `doc` pages using slots.

## Custom Banner Exercise

The template `index.ts` file will be loaded by the dev server or build process. By default, it will use the default
template. Since we want to extend it we expand the default theme and provide our own layout.

Let's start by creating `.vitepress/theme/index.ts`:
```ts
import DefaultTheme from 'vitepress/theme';
import MyLayout from './MyLayout.vue';

export default {
  ...DefaultTheme,
  Layout: MyLayout,
};
```

Our goal is to continue using functionality provided by the default template, just with our own extensions. To do so, we
use the default template's `Layout` component and use slots to inject our own content in pre-allocated spaces in the
layout. In this case we'll do it before the `doc` content starts.

We'll create a layout at `.vitepress/theme/MyLayout.vue`:
```vue
<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import VPDocHeading from './components/VPDocHeading.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #doc-before>
      <VPDocHeading />
    </template>
  </Layout>
</template>
```

Next, we want to make our component that contains the heading logic. We can utilize frontmatter in order to add
some conditional logic or just render content on the page. Below is an example where we render an `h1` containing the
`title` from the frontmatter yml if `title` is truthy.

We'll create our heading at `.vitepress/theme/components/VpDocHeading.vue`:
```vue
<script setup lang="ts">
import { useData } from 'vitepress';
const { frontmatter: data } = useData();
</script>

<template>
  <div class="vp-doc" v-if="data.title">
    <h1>{{ data.title }}</h1>
  </div>
</template>
```

Now that we've defined our custom banner, let's give it a test drive. Create a new markdown page with the below contents
and navigate to the page using the dev server:

```md
Test post; please ignore
```

Oh no, our banner doesn't show up! Well all we need to do now is add the frontmatter section to our page with `title`
and a value.

```md
--- // [!code focus:3]
title: Testing
---
Test post; please ignore
```

## Final Notes

Voilà! The banner should now show! There's no specific naming scheme that needs to be followed for anything outside the
`theme/index.ts`, so feel free to name things however you see fit.

Below are some helpful links to the VitePress documentation that cover the slot functionality.
* [Default theme slots](https://vitepress.dev/guide/extending-default-theme#layout-slots)
* [Frontmatter](https://vitepress.dev/guide/frontmatter)
