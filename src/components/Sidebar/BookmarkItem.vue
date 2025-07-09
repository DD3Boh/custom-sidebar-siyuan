<template>
  <div class="bookmark-item">
    <img v-if="imageUrl" :src="imageUrl" alt="Bookmark image" class="bookmark-image" />
    <div class="bookmark-content">
      <div class="bookmark-title">{{ title }}</div>
      <div class="bookmark-description">{{ description }}</div>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string;
  description: string;
  imageUrl?: string;
}>();
</script>

<style scoped>
.bookmark-item {
  display: flex;
  gap: 8px;
  padding: 8px 0;
}

.bookmark-image {
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 4px;
}

.bookmark-content {
  display: flex;
  flex-direction: column;
}

.bookmark-title {
  font-weight: bold;
}

.bookmark-description {
  font-size: 0.9em;
  color: #aaa;
}
</style>
