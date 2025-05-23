<template>
  <div class="repo-filters">
    <div class="filter-mode">
      <label class="filter-label">
        <input type="radio" value="any" v-model="filterMode" />
        任意-匹配 (any)
      </label>
      <label class="filter-label">
        <input type="radio" value="all" v-model="filterMode" />
        全部-匹配 (all)
      </label>
    </div>

    <div class="topics-grid">
      <template v-if="isLoading">
        <div class="loading-placeholder">
          <div class="loading-spinner"></div>
          <span>正在加载标签...</span>
        </div>
      </template>
      <template v-else>
        <label v-for="topic in topics" :key="topic" class="topic-label">
          <input
            type="checkbox"
            :value="topic"
            v-model="selectedTopics"
          />
          {{ topic }}
        </label>
      </template>
    </div>

    <div class="button-group">
      <button @click="clearSelection" class="repo-button repo-button-secondary">
        清空选择
      </button>
      <button @click="handleFilter" class="repo-button repo-button-primary">
        筛选仓库
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'

const props = defineProps<{
  topics: string[]
  isLoading?: boolean
}>()

const emit = defineEmits<{
  (e: 'filter', topics: string[], mode: 'any' | 'all'): void
}>()

const selectedTopics = ref<string[]>([])
const filterMode = ref<'any' | 'all'>('any')

const handleFilter = () => {
  if (selectedTopics.value.length === 0) return
  emit('filter', selectedTopics.value, filterMode.value)
}

const clearSelection = () => {
  selectedTopics.value = []
}

// Reset selected topics when topics prop changes
watch(() => props.topics, () => {
  selectedTopics.value = []
})
</script>

<style scoped>
.repo-filters {
  margin-top: var(--spacing-lg);
  padding: 24px;
  background-color: white;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06);
}

.filter-mode {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e5e7eb;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: #4b5563;
}

.filter-label:hover {
  background-color: #f3f4f6;
}

.filter-label input[type="radio"] {
  width: 16px;
  height: 16px;
  accent-color: #2563eb;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 24px;
}

.topic-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: #4b5563;
  background-color: #f9fafb;
  border: 1px solid #e5e7eb;
  height: 36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topic-label:hover {
  background-color: #f3f4f6;
  border-color: #d1d5db;
}

.topic-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #2563eb;
}

.button-group {
  display: flex;
  gap: 12px;
  margin-top: 16px;
}

.repo-button {
  flex: 1;
  padding: 10px 20px;
  border-radius: 8px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
  text-align: center;
}

.repo-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

.repo-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.repo-button-primary {
  background-color: #2563eb;
  color: white;
  border: none;
}

.repo-button-primary:hover {
  background-color: #1d4ed8;
}

.repo-button-secondary {
  background-color: #f3f4f6;
  color: #4b5563;
  border: 1px solid #e5e7eb;
}

.repo-button-secondary:hover {
  background-color: #e5e7eb;
}

@media (max-width: 768px) {
  .repo-filters {
    padding: 16px;
  }

  .filter-mode {
    flex-direction: column;
    gap: 12px;
  }

  .topics-grid {
    grid-template-columns: repeat(auto-fill, minmax(140px, 1fr));
  }

  .button-group {
    flex-direction: column;
  }
}

.loading-placeholder {
  grid-column: 1 / -1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #6b7280;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e5e7eb;
  border-top-color: #2563eb;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 