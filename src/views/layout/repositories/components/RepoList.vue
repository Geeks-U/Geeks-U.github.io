<template>
  <div class="repo-container">
    <template v-if="isLoading">
      <div class="loading-placeholder">
        <div class="loading-spinner"></div>
        <span>正在加载仓库...</span>
      </div>
    </template>
    <template v-else-if="repos.length">
      <div v-for="repo in repos" :key="repo.name" class="repo-card">
        <header class="repo-header">
          <h3 class="repo-title" @click="openRepo(repo.html_url)" role="button">
            {{ repo.name }}
            <span class="external-link-icon">↗</span>
          </h3>
          <p class="repo-description">{{ repo.description || '无描述' }}</p>
        </header>
        <div class="repo-stats">
          <div class="repo-stat">
            <span class="stat-icon">⭐</span>
            <span>{{ repo.stargazers_count || 0 }}</span>
          </div>
          <div class="repo-stat">
            <span class="stat-icon">👁️</span>
            <span>{{ repo.watchers_count || 0 }}</span>
          </div>
          <div class="repo-stat">
            <span class="stat-icon">🍴</span>
            <span>{{ repo.forks_count || 0 }}</span>
          </div>
        </div>
        <footer class="repo-footer">
          <div class="repo-language">
            <span class="language-dot"></span>
            <span>{{ repo.language || 'Unknown' }}</span>
          </div>
          <div class="repo-topics">
            <span v-for="topic in repo.topics" :key="topic" class="repo-topic">
              {{ topic }}
            </span>
          </div>
        </footer>
      </div>
    </template>
    <template v-else>
      <div class="empty-placeholder">
        <span>请选择标签进行筛选</span>
      </div>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { RepoWithTopics } from '@/services/repositories'

defineProps<{
  repos: RepoWithTopics[]
  isLoading?: boolean
}>()

const openRepo = (url: string | null | undefined) => {
  if (url) {
    window.open(url, '_blank')
  }
}
</script>

<style scoped>
.repo-container {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: 1.5rem;
  padding: 1rem;
}

.repo-card {
  background-color: #f8fafc;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: 1px solid #e2e8f0;
}

.repo-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
}

.repo-header {
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
}

.repo-title {
  font-size: 1.25rem;
  font-weight: 600;
  color: #334155;
  margin-bottom: 0.75rem;
  line-height: 1.4;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: color 0.2s ease;
}

.repo-title:hover {
  color: #3b82f6;
}

.external-link-icon {
  font-size: 0.875rem;
  opacity: 0;
  transition: opacity 0.2s ease;
}

.repo-title:hover .external-link-icon {
  opacity: 1;
}

.repo-description {
  color: #64748b;
  font-size: 0.875rem;
  line-height: 1.6;
  margin-bottom: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.repo-stats {
  padding: 1rem 1.5rem;
  display: flex;
  gap: 1.25rem;
  color: #64748b;
  font-size: 0.875rem;
  border-bottom: 1px solid #e2e8f0;
  background-color: #f1f5f9;
}

.repo-stat {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  transition: transform 0.2s ease;
}

.repo-stat:hover {
  transform: scale(1.05);
}

.stat-icon {
  font-size: 1rem;
  opacity: 0.8;
}

.repo-footer {
  padding: 1.25rem 1.5rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
}

.repo-language {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #64748b;
  font-size: 0.875rem;
}

.language-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
}

.repo-topics {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
}

.repo-topic {
  background-color: rgba(59, 130, 246, 0.08);
  color: #3b82f6;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
  transition: all 0.2s ease;
}

.repo-topic:hover {
  background-color: rgba(59, 130, 246, 0.12);
  transform: translateY(-1px);
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

.empty-placeholder {
  grid-column: 1 / -1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
  color: #64748b;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .repo-container {
    grid-template-columns: 1fr;
    padding: 0.75rem;
  }

  .repo-footer {
    flex-direction: column;
    gap: 1rem;
    align-items: flex-start;
  }

  .repo-stats {
    flex-wrap: wrap;
    gap: 1rem;
  }
}
</style> 