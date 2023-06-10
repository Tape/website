<script setup lang="ts">
defineProps<{
  date: Date,
}>();
</script>

<template>
  <div class="VPDate">
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
