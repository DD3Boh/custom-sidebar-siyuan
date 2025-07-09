<template>
  <div class="sidebar-section">
    <h2 v-if="title" class="section-title">{{ title }}</h2>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title?: string;
}>();
</script>

<style scoped>
.sidebar-section {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.section-title {
  font-size: 1.2em;
  font-weight: bold;
  margin-bottom: 8px;
}
</style>