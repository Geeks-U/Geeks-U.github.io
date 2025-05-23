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
  emit('filter', [], filterMode.value)
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
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05), 0 1px 2px rgba(0, 0, 0, 0.03);
  border: 1px solid #e2e8f0;
}

.filter-mode {
  display: flex;
  gap: 24px;
  margin-bottom: 20px;
  padding-bottom: 16px;
  border-bottom: 1px solid #e2e8f0;
}

.filter-label {
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  padding: 8px 12px;
  border-radius: 6px;
  transition: all 0.2s ease;
  color: #475569;
}

.filter-label:hover {
  background-color: #f1f5f9;
}

.filter-label input[type="radio"] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
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
  color: #475569;
  background-color: #f1f5f9;
  border: 1px solid #e2e8f0;
  height: 36px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.topic-label:hover {
  background-color: #e2e8f0;
  border-color: #cbd5e1;
}

.topic-label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: #3b82f6;
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
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.08);
}

.repo-button:active {
  transform: translateY(0);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
}

.repo-button-primary {
  background-color: #3b82f6;
  color: white;
  border: none;
}

.repo-button-primary:hover {
  background-color: #2563eb;
}

.repo-button-secondary {
  background-color: #f1f5f9;
  color: #475569;
  border: 1px solid #e2e8f0;
}

.repo-button-secondary:hover {
  background-color: #e2e8f0;
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
  color: #64748b;
  gap: 16px;
}

.loading-spinner {
  width: 40px;
  height: 40px;
  border: 3px solid #e2e8f0;
  border-top-color: #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}
</style> 