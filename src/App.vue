<template>
  <Sidebar>
    <SidebarSection title="Home">
      <ListItem
        v-for="item in homeItems"
        :key="item.label"
        :label="item.label"
        :icon="item.icon"
        :collapsible="item.collapsible"
      />
    </SidebarSection>

    <SimpleButton label="Notes" />

    <SidebarSection title="Bookmarks">
      <template #header>
        <span>To read v</span>
      </template>
      <BookmarkItem
        v-for="bookmark in bookmarks"
        :key="bookmark.title"
        :title="bookmark.title"
        :description="bookmark.description"
        :image-url="bookmark.imageUrl"
      />
    </SidebarSection>

    <SimpleButton label="Library" icon="🎛️" />
    <SimpleButton label="Bin" icon="🗑️" />
  </Sidebar>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Sidebar from './components/Sidebar/Sidebar.vue';
import SidebarSection from './components/Sidebar/SidebarSection.vue';
import ListItem from './components/Sidebar/ListItem.vue';
import BookmarkItem from './components/Sidebar/BookmarkItem.vue';
import SimpleButton from './components/Sidebar/SimpleButton.vue';

const homeItems = ref([
  { label: 'Daily journal', icon: '✍️' },
  { label: 'Experimental Me', icon: '🐭', collapsible: true },
  { label: 'Movie database', icon: '🍿' },
  { label: 'Recipe book', icon: '📖' },
  { label: 'Course list', icon: '🎒', collapsible: true },
  { label: 'My Important Documents', icon: '🔒', collapsible: true },
  { label: 'Travel planner', icon: '✈️', collapsible: true },
  { label: 'Strategic thinking', icon: '🧭' },
]);

const bookmarks = ref([
  {
    title: "'The Internet Is Broken': @ev Is ...",
    description: 'The trouble with the internet, Mr. Will...',
    imageUrl: 'https://via.placeholder.com/48',
  },
  {
    title: 'A Brutally Honest Review of My ...',
    description: 'My slow spiral into insanity and inner...',
    imageUrl: 'https://via.placeholder.com/48',
  },
  {
    title: 'Can Biology Class Reduce Racis...',
    description: 'Donovan has argued that grade-sch...',
    imageUrl: 'https://via.placeholder.com/48',
  },
]);
</script>

<style>
#app {
  height: 100vh;
}
</style>