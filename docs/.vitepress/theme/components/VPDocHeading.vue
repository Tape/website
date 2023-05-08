<script setup lang="ts">
import { useData } from 'vitepress';
import VPDate from './VPDate.vue';

const { frontmatter: data } = useData();
</script>

<template>
  <div class="vp-doc">
    <div class="VPDocDate" v-if="data.date">
      <VPDate :date="new Date(data.date)" />
    </div>
    <h1 v-if="data.title">{{ data.title }}</h1>
  </div>
</template>
