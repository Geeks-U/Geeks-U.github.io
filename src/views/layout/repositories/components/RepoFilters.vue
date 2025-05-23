<template>
  <div class="repo-filters">
    <div class="filter-header">
      <h3>Topics</h3>
      <div class="filter-mode">
        <button 
          :class="{ active: mode === 'any' }"
          @click="mode = 'any'"
        >
          Any
        </button>
        <button 
          :class="{ active: mode === 'all' }"
          @click="mode = 'all'"
        >
          All
        </button>
      </div>
    </div>
    
    <div class="topics-list" v-if="!isLoading">
      <div 
        v-for="topic in topics" 
        :key="topic"
        class="topic-item"
      >
        <label>
          <input 
            type="checkbox"
            :value="topic"
            v-model="selectedTopics"
            @change="handleTopicChange"
          >
          {{ topic }}
        </label>
      </div>
    </div>
    <div v-else class="loading">
      Loading topics...
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  topics: string[]
  isLoading: boolean
}>()

const emit = defineEmits<{
  (e: 'filter', topics: string[], mode: 'any' | 'all'): void
}>()

const selectedTopics = ref<string[]>([])
const mode = ref<'any' | 'all'>('any')

const handleTopicChange = () => {
  emit('filter', selectedTopics.value, mode.value)
}

watch(mode, () => {
  emit('filter', selectedTopics.value, mode.value)
})
</script>

<style scoped>
.repo-filters {
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
}

.filter-mode {
  display: flex;
  gap: var(--spacing-sm);
}

.filter-mode button {
  padding: var(--spacing-xs) var(--spacing-sm);
  border: 1px solid var(--color-border);
  background: var(--color-bg);
  border-radius: var(--border-radius);
  cursor: pointer;
}

.filter-mode button.active {
  background: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}

.topics-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: var(--spacing-sm);
}

.topic-item {
  padding: var(--spacing-xs);
}

.topic-item label {
  display: flex;
  align-items: center;
  gap: var(--spacing-xs);
  cursor: pointer;
}

.loading {
  text-align: center;
  padding: var(--spacing-md);
  color: var(--color-text-secondary);
}
</style> 