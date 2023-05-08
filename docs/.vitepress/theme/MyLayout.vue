<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import VPAsideBlogs from './components/VPAsideBlog.vue';
import VPBlog from './components/VPBlog.vue';
import VPDocHeading from './components/VPDocHeading.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <VPAsideBlogs />
    </template>
    <template #doc-before>
      <VPDocHeading />
    </template>
    <template #doc-after>
      <VPBlog />
    </template>
  </Layout>
</template>
