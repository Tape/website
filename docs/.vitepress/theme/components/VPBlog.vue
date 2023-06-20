<script setup lang="ts">
import { computed } from 'vue';
import { useData } from 'vitepress';
import VPBlogItem from './VPBlogItem.vue';
import { data as allBlogs } from '../../blogs.data';

const { frontmatter } = useData();
const blogs = computed(() => {
  const maxEntries = frontmatter.value.blog?.maxEntries || 5;

  const latestBlogs = allBlogs.slice(0, maxEntries);

  const oldBlogs = allBlogs.slice(maxEntries).reduce((yearMap, blog) => {
    const date = new Date(blog.date);
    const year = date.getFullYear();
    const month = date.toLocaleString('default', { month: 'long' });

    if (!yearMap.get(year)) {
      yearMap.set(year, new Map());
    }
    const monthMap = yearMap.get(year);
    if (!monthMap.get(month)) {
      monthMap.set(month, []);
    }
    monthMap.get(month).push(blog);

    return yearMap;
  }, new Map());

  return {
    latest: latestBlogs,
    old: oldBlogs,
  };
});
</script>

<template>
  <div class="vp-doc" v-if="frontmatter.blog">
    <div class="VPBlog">
      <VPBlogItem :blogs="blogs.latest" />
    </div>
    <h2>Past Blogs</h2>
    <section v-for="[year, months] in blogs.old">
      <h3>{{ year }}</h3>
      <ul>
        <li v-for="[month, blogs] in months">
          <strong>{{ month }}</strong>
          <ul>
            <li v-for="{ date, title, url } in blogs">
              {{ new Date(date).toLocaleDateString() }} - <a :href="url">{{ title }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </section>
  </div>
</template>
