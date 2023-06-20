<script setup lang="ts">
import { Blog } from '../types/shared';
import VPDate from './VPDate.vue';

const props = defineProps<{
  blogs: Blog[],
}>();
</script>

<template>
  <div class="VPBlogItem" v-for="blog in blogs">
    <h2>{{ blog.title }} - <VPDate class="date" :date="new Date(blog.date)" /></h2>
    <div v-html="blog.excerpt" />
    <p>
      <a :href="blog.url">Read more</a>
    </p>
  </div>
</template>

<style scoped>
.date {
  display: inline;
}
</style>
