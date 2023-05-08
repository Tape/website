<script setup lang="ts">
import { computed, defineProps } from 'vue';
import { Blog } from '../types/shared';
import VPDate from './VPDate.vue';

const props = defineProps<{
  blogs: Blog[],
  limit: number,
}>();

const blogsToDisplay = computed(() =>
  props.blogs.slice(0, props.limit)
);
</script>

<template>
  <div class="VPBlogItem vp-doc" v-for="blog in blogsToDisplay">
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
