<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { openDoc, usePlugin } from './main'
import SidebarSection from './components/Sidebar/SidebarSection.vue'
import { getDocInfo, getFileBlob, getPathByID, listDocsByPath, putFile } from './api'
import { VueDraggable } from 'vue-draggable-plus'

interface SidebarSectionData {
  id: string
  title: string
  icon?: string,
  items?: SidebarItem[]
  expanded?: boolean
}

interface SidebarItem {
  id: string
  title: string
  icon?: string
}

interface SidebarSectionSave {
  id: string
  expanded?: boolean
}

const plugin = usePlugin();
const sections = ref<SidebarSectionData[]>([]);
const sectionsFileName = 'sections.json';

const addSection = async () => {
  const clipboard = await addFromClipboard();
  if (!clipboard) {
    return;
  }

  // Get doc info from clipboard ID
  const docInfo = await getDocInfo(clipboard);
  const path = await getPathByID(clipboard);
  const subDirs = await listDocsByPath(path.notebook, path.path);

  sections.value.push({
    id: clipboard,
    title: docInfo.name || `Section ${sections.value.length + 1}`,
    icon: docInfo.icon,
    expanded: true,
    items: subDirs.files.map(doc => ({
      id: doc.id,
      title: doc.name.replace(/\.sy$/, ''),
      icon: doc.icon
    }))
  })

  saveSectionIds();
}

const removeSection = (id: string) => {
  // Don't remove if it's the last section
  if (sections.value.length > 1) {
    sections.value = sections.value.filter(section => section.id !== id)
  }

  saveSectionIds();
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
  const savedSections = await getFileBlob(`data/storage/petal/custom-sidebar/${sectionsFileName}`);

  console.log("Loading saved sections from:", savedSections);
  let parsed: SidebarSectionSave[] = [];
  if (savedSections) {
    const text = await savedSections.text();
    parsed = JSON.parse(text) as SidebarSectionSave[];
  }

  const loadedSections = await Promise.all(parsed.map(async section => {
    const info = await getDocInfo(section.id);
    const path = await getPathByID(section.id);
    const subDirs = await listDocsByPath(path.notebook, path.path);
    const items = subDirs.files.map(doc => ({
      id: doc.id,
      title: doc.name.replace(/\.sy$/, ''),
      icon: doc.icon
    }));

    return {
      id: section.id,
      title: info.name || `Section ${sections.value.length + 1}`,
      icon: info.icon,
      expanded: section.expanded !== undefined ? section.expanded : true,
      items: items
    };
  }));

  sections.value = loadedSections;
});

const saveSectionIds = async () => {
  const sectionsData = sections.value.map(section => ({
    id: section.id,
    expanded: section.expanded,
  }));
  const jsonData = JSON.stringify(sectionsData, null, 2);
  console.log("Saving section IDs:", jsonData);

  const file = new File([jsonData], sectionsFileName, { type: 'application/json' });
  await putFile(`data/storage/petal/custom-sidebar/${sectionsFileName}`, false, file);
}

const onSectionReorder = () => {
  console.log("Sections reordered:", sections.value.map(s => s.title));
  saveSectionIds();
}

const toggleSectionExpanded = (sectionId: string) => {
  const section = sections.value.find(s => s.id === sectionId);
  if (section) {
    section.expanded = !section.expanded;
  }

  saveSectionIds();
}

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
    <VueDraggable
      v-model="sections"
      :animation="200"
      handle=".section-header"
      ghost-class="ghost"
      chosen-class="chosen"
      drag-class="drag"
      :delay-on-touch-start="true"
      :touch-start-threshold="10"
      :fallback-tolerance="5"
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
