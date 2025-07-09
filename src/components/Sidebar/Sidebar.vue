<template>
  <div class="sidebar">
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
</script>

<style scoped>
.sidebar {
  background-color: #2d2d2d;
  color: #fff;
  padding: 16px;
  height: 100%;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
</style>
