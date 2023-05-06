<script setup lang="ts">
import DefaultTheme from 'vitepress/theme';
import VPAsideBlogs from './components/VPAsideBlog.vue';
import VPDocDate from './components/VPDocDate.vue';

const { Layout } = DefaultTheme;
</script>

<template>
  <Layout>
    <template #aside-outline-after>
      <VPAsideBlogs />
    </template>
    <template #doc-before>
      <VPDocDate />
    </template>
  </Layout>
</template>
