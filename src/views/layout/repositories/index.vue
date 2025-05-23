<template>
  <div class="repo-page">
    <div class="repo-controls">
      <RepoFilters
        :topics="topics"
        :is-loading="!topics.length"
        @filter="handleFilter"
      />
    </div>

    <RepoList 
      :repos="repos" 
      :is-loading="isLoadingRepos"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import {
  fetchUserRepoTopics,
  fetchReposByAllTopics,
  fetchReposByAnyTopic,
} from '@/services/repositories'
import type { RepoWithTopics } from '@/services/repositories'
import RepoFilters from './components/RepoFilters.vue'
import RepoList from './components/RepoList.vue'

const topics = ref<string[]>([])
const repos = ref<RepoWithTopics[]>([])
const isLoadingRepos = ref(false)

// 此处加载标签事实上会加载所有仓库的信息，所以延迟会比较高
// 因为github没有直接获取所有仓库标签的接口，只能通过获取所有仓库然后遍历获取
onMounted(async () => {
  try {
    topics.value = await fetchUserRepoTopics()
  } catch (error) {
    console.error('Error fetching topics:', error)
  }
})

const handleFilter = async (selectedTopics: string[], mode: 'any' | 'all') => {
  isLoadingRepos.value = true
  try {
    const fetchFn = mode === 'all' ? fetchReposByAllTopics : fetchReposByAnyTopic
    repos.value = await fetchFn(selectedTopics)
  } catch (error) {
    console.error('Error fetching repos:', error)
  } finally {
    isLoadingRepos.value = false
  }
}
</script>

<style scoped>
.repo-page {
  padding: var(--spacing-lg);
}

.repo-controls {
  margin-bottom: var(--spacing-xl);
}

@media (max-width: 768px) {
  .repo-page {
    padding: var(--spacing-md);
  }
}
</style>