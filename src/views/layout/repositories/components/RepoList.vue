<template>
  <div class="repo-list">
    <div v-if="isLoading" class="loading">
      Loading repositories...
    </div>
    <div v-else-if="repos.length === 0" class="empty">
      No repositories found
    </div>
    <div v-else class="repos-grid">
      <div 
        v-for="repo in repos" 
        :key="repo.id"
        class="repo-card"
      >
        <h3 class="repo-name">
          <a :href="repo.html_url" target="_blank" rel="noopener">
            {{ repo.name }}
          </a>
        </h3>
        <p class="repo-description">{{ repo.description || 'No description' }}</p>
        <div class="repo-topics">
          <span 
            v-for="topic in repo.topics" 
            :key="topic"
            class="topic-tag"
          >
            {{ topic }}
          </span>
        </div>
        <div class="repo-stats">
          <span class="stat">
            <i class="fas fa-star"></i>
            {{ repo.stargazers_count }}
          </span>
          <span class="stat">
            <i class="fas fa-code-branch"></i>
            {{ repo.forks_count }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import type { RepoWithTopics } from '@/services/repositories'

defineProps<{
  repos: RepoWithTopics[]
  isLoading: boolean
}>()
</script>

<style scoped>
.repo-list {
  min-height: 200px;
}

.loading, .empty {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--color-text-secondary);
}

.repos-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: var(--spacing-md);
}

.repo-card {
  background: var(--color-bg-secondary);
  border-radius: var(--border-radius);
  padding: var(--spacing-md);
  transition: transform 0.2s;
}

.repo-card:hover {
  transform: translateY(-2px);
}

.repo-name {
  margin: 0 0 var(--spacing-sm);
}

.repo-name a {
  color: var(--color-primary);
  text-decoration: none;
}

.repo-name a:hover {
  text-decoration: underline;
}

.repo-description {
  color: var(--color-text-secondary);
  margin-bottom: var(--spacing-md);
  font-size: 0.9em;
  line-height: 1.4;
}

.repo-topics {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.topic-tag {
  background: var(--color-bg);
  color: var(--color-text-secondary);
  padding: 2px 8px;
  border-radius: 12px;
  font-size: 0.8em;
}

.repo-stats {
  display: flex;
  gap: var(--spacing-md);
  color: var(--color-text-secondary);
  font-size: 0.9em;
}

.stat {
  display: flex;
  align-items: center;
  gap: 4px;
}

@media (max-width: 768px) {
  .repos-grid {
    grid-template-columns: 1fr;
  }
}
</style> 