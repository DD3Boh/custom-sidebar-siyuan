<script setup lang="ts">
import { ref } from 'vue'
import { usePlugin } from './main'
import SidebarSection from './components/Sidebar/SidebarSection.vue'
import { openTab } from 'siyuan'

interface SidebarSectionData {
  id: string
  title: string
  content?: string
}

const plugin = usePlugin();

const sections = ref<SidebarSectionData[]>([
  { id: '1', title: 'Home', content: 'Welcome to your custom sidebar!' }
])

const addSection = async () => {
  const clipboard = await addFromClipboard();
  if (!clipboard) {
    return;
  }

  sections.value.push({
    id: clipboard,
    title: `Section ${clipboard}`,
    content: `This is section ${clipboard}. You can customize this content.`
  })
}

const removeSection = (id: string) => {
  // Don't remove if it's the last section
  if (sections.value.length > 1) {
    sections.value = sections.value.filter(section => section.id !== id)
  }
}

const onSectionClick = (id: string) => {
  console.log(`Section clicked: ${id}`);

  openTab({ app: plugin.app, doc: { id } });
}

const addFromClipboard = async (): Promise<string | undefined> => {
  const id = await navigator.clipboard.readText();
  if (!id) {
    return;
  }
  console.log(`Adding section with ID: ${id}`);
  return id;
};

// Expose functions to be called from main.ts
defineExpose({
  addSection,
  removeSection,
  addFromClipboard,
  onSectionClick
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
      @click="onSectionClick"
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
