<script setup lang="ts">
import { data as blogs } from '../../blogs.data';
</script>

<template>
  <div class="VPAsideBlog" :class="{ 'has-blogs': blogs.length > 0 }">
    <div class="content">
      <div class="blog-title">Latest Blogs</div>
      <ul>
        <li v-for="{ title, url } in blogs">
          <a class="blog-link" :href="url" :title="title">{{ title }}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.VPAsideBlog {
  display: none;
  margin-top: 1rem;
}

.VPAsideBlog.has-blogs {
  display: block;
}

.content {
  border-left: 1px solid var(--vp-c-divider);
  padding-left: 16px;
  font-size: 13px;
  font-weight: 500;
}

.blog-title {
  letter-spacing: 0.4px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 600;
}

.blog-link {
  display: block;
  line-height: 28px;
  color: var(--vp-c-text-2);
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  transition: color 0.5s;
  font-weight: 500;
}

.blog-link:hover {
  color: var(--vp-c-text-1);
  transition: color 0.25s;
}
</style>
