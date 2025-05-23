<script lang="ts" setup>
interface TopicStats {
  name: string
  count: number
  percentage: number
}

defineProps<{
  topicStats: TopicStats[]
}>()
</script>

<template>
  <div class="topics-section">
    <h2>Repository Topics</h2>
    <div class="topics-grid">
      <div v-for="topic in topicStats" :key="topic.name" class="topic-item">
        <div class="topic-header">
          <span class="topic-name">{{ topic.name }}</span>
          <span class="topic-count">{{ topic.count }} repos</span>
        </div>
        <div class="topic-bar">
          <div class="topic-level" :style="{ width: `${topic.percentage}%` }"></div>
        </div>
        <div class="topic-percentage">{{ topic.percentage }}%</div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.topics-section {
  background: #f8fafc;
  border-radius: 16px;
  padding: 2rem;
  margin-bottom: 2rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  border: 1px solid #e2e8f0;
}

h2 {
  color: #334155;
  font-size: 1.8rem;
  margin-bottom: 1.5rem;
  font-weight: 600;
}

.topics-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.topic-item {
  background: #f1f5f9;
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.topic-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.8rem;
}

.topic-name {
  color: #334155;
  font-weight: 500;
}

.topic-count {
  color: #64748b;
  font-size: 0.9rem;
}

.topic-bar {
  height: 6px;
  background: #e2e8f0;
  border-radius: 3px;
  overflow: hidden;
  margin-bottom: 0.5rem;
}

.topic-level {
  height: 100%;
  background: #3b82f6;
  border-radius: 3px;
  transition: width 0.3s ease;
}

.topic-percentage {
  color: #64748b;
  font-size: 0.9rem;
  text-align: right;
}

@media (max-width: 768px) {
  .topics-grid {
    grid-template-columns: 1fr;
  }

  .topics-section {
    padding: 1.5rem;
  }
}
</style> 