<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import VPBlogItem from './VPBlogItem.vue';
import { data as allBlogs } from '../../blogs.data';

const { frontmatter } = useData();
const blogs = computed(() => {
  const maxEntries = frontmatter.value.blog?.maxEntries || 5;
  console.log(maxEntries);
  return {
    latest: allBlogs.slice(0, maxEntries),
    old: allBlogs.slice(maxEntries),
  };
});
</script>

<template>
  <div class="VPBlog" v-if="frontmatter.blog">
    <VPBlogItem :blogs="blogs.latest" />
  </div>
  <div class="vp-doc">
    <h2>Past Blogs</h2>
    <ul v-if="blogs.old.length">
      <li v-for="{ date, title, url } in blogs.old">
        {{ new Date(date).toLocaleDateString() }} - <a :href="url">{{ title }}</a>
      </li>
    </ul>
  </div>
</template>
