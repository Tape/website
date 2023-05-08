<script setup lang="ts">
import { useData } from 'vitepress';
import VPBlogItem from './VPBlogItem.vue';
import { data as blogs } from '../../blogs.data';

const { frontmatter } = useData();
</script>

<template>
  <div class="VPBlog" v-if="frontmatter.blog">
    <VPBlogItem :blogs="blogs" :limit="frontmatter.blog.maxEntries" />
  </div>
</template>
