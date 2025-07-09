<script setup lang="ts">
import { ref } from 'vue'
import SidebarSection from './components/Sidebar/SidebarSection.vue'

interface SidebarSectionData {
  id: string
  title: string
  content?: string
}

const sections = ref<SidebarSectionData[]>([
  { id: '1', title: 'Home', content: 'Welcome to your custom sidebar!' }
])

const addSection = () => {
  const newId = (sections.value.length + 1).toString()
  sections.value.push({
    id: newId,
    title: `Section ${newId}`,
    content: `This is section ${newId}. You can customize this content.`
  })
}

const removeSection = (id: string) => {
  // Don't remove if it's the last section
  if (sections.value.length > 1) {
    sections.value = sections.value.filter(section => section.id !== id)
  }
}

// Expose functions to be called from main.ts
defineExpose({
  addSection,
  removeSection
})
</script>

<template>
  <div class="app-container">
    <SidebarSection
      v-for="section in sections"
      :key="section.id"
      :title="section.title"
      :section-id="section.id"
      :can-remove="sections.length > 1"
      @remove="removeSection"
    >
      <div v-if="section.content" class="section-content">
        {{ section.content }}
      </div>
    </SidebarSection>
  </div>
</template>

<style scoped>
.app-container {
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
}

.section-content {
  padding: 8px;
  color: var(--b3-theme-on-background);
  font-size: 14px;
}
</style>
