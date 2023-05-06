<script setup lang="ts">
import { useData } from 'vitepress';
import { computed } from 'vue';

const { frontmatter } = useData();

const date = computed(() =>
  frontmatter.value?.date && new Date(frontmatter.value.date)
);
</script>

<template>
  <div class="VPDocDate" v-if="date">
    <time :datetime="date.toISOString()">
      {{
        date.toLocaleDateString('en-US', {
          timeZone: 'UTC',
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      }}
    </time>
  </div>
</template>
