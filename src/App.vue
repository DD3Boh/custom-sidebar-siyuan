<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { openDoc, usePlugin } from './main'
import SidebarSection from './components/Sidebar/SidebarSection.vue'
import DockContainer from './components/Sidebar/DockContainer.vue'
import { getDocInfo, getPathByID, listDocsByPath } from './api'
import { VueDraggable } from 'vue-draggable-plus'
import { loadSectionsFromDisk, saveSectionsToDisk } from './utils/storage-helper'
import { decodeHtmlEntities } from './utils'
import { useI18n } from './utils/i18n'

const { i18n } = useI18n()

const plugin = usePlugin();
const sections = ref<SidebarSectionData[]>([]);

const addSection = async () => {
  const clipboard = await addFromClipboard();
  if (!clipboard) {
    return;
  }

  await addSectionById(clipboard);
}

const addSectionById = async (id: string) => {
  if (!id) {
    console.warn('No ID provided to addSectionById');
    return;
  }

  try {
    // Get doc info from provided ID
    const docInfo = await getDocInfo(id);
    const path = await getPathByID(id);
    const subDirs = await listDocsByPath(path.notebook, path.path);

    sections.value.push({
      id: id,
      title: decodeHtmlEntities(docInfo.name || i18n('sectionFallback', { number: sections.value.length + 1 })),
      icon: docInfo.icon,
      expanded: true,
      items: subDirs.files.map(doc => ({
        id: doc.id,
        title: decodeHtmlEntities(doc.name.replace(/\.sy$/, '')),
        icon: doc.icon
      }))
    })

    await saveSectionsToDisk(sections.value);
    console.log(`Section added with ID: ${id}`);
  } catch (error) {
    console.error('Error adding section by ID:', error);
  }
}

const removeSection = (id: string) => {
  // Don't remove if it's the last section
  if (sections.value.length > 1) {
    sections.value = sections.value.filter(section => section.id !== id)
  }

  saveSectionsToDisk(sections.value);
}

const onSectionClick = (id: string) => {
  console.log(`Section clicked: ${id}`);

  openDoc(id, plugin.app);
}

const addFromClipboard = async (): Promise<string | undefined> => {
  const id = await navigator.clipboard.readText();
  if (!id) {
    return;
  }
  console.log(`Adding section with ID: ${id}`);
  return id;
};

onMounted(async () => {
  sections.value = await loadSectionsFromDisk();
});

const onSectionReorder = () => {
  console.log("Sections reordered:", sections.value.map(s => s.title));
  saveSectionsToDisk(sections.value);
}

const toggleSectionExpanded = (sectionId: string) => {
  const section = sections.value.find(s => s.id === sectionId);
  if (section) section.expanded = !section.expanded;

  saveSectionsToDisk(sections.value);
}

// Expose functions to be called from main.ts
defineExpose({
  addSection,
  addSectionById,
  removeSection,
  addFromClipboard,
  onSectionClick
})

const handleMinimize = () => {
  console.log('Dock minimize requested')
}

</script>

<template>
  <DockContainer
    :title="i18n('sidebar')"
    @add-section="addSection"
    @minimize="handleMinimize"
  >
    <div class="app-container">
      <VueDraggable
        v-model="sections"
        :animation="200"
        handle=".section-header"
        ghost-class="ghost"
        chosen-class="chosen"
        drag-class="drag"
        :delay-on-touch-start="true"
        :delay-on-touch-only="true"
        :delay="300"
        :touch-start-threshold="50"
        :fallback-tolerance="15"
        :scroll-sensitivity="100"
        :scroll-speed="20"
        @end="onSectionReorder"
      >
        <SidebarSection
          v-for="section in sections"
          :key="section.id"
          :title="section.title"
          :section-id="section.id"
          :can-remove="sections.length > 1"
          :icon="section.icon"
          :items="section.items"
          :expanded="section.expanded"
          @remove="removeSection"
          @click="onSectionClick"
          @toggle-expanded="toggleSectionExpanded"
        >
        </SidebarSection>
      </VueDraggable>
    </div>
  </DockContainer>
</template>

<style scoped>
.app-container {
  padding: 16px;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  touch-action: manipulation;
}

.section-content {
  padding: 8px;
  color: var(--b3-theme-on-background);
  font-size: 14px;
}

/* Drag and drop styles */
.ghost {
  opacity: 0.5;
  background: var(--b3-theme-surface-lighter);
  border: 2px dashed var(--b3-border-color);
}
</style>
