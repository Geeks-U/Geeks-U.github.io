<script lang="ts" setup>
interface Skill {
  name: string
  level: number
  icon: string
}

defineProps<{
  skills: Skill[]
}>()
</script>

<template>
  <div class="skills-section">
    <h2>Skills & Expertise</h2>
    <div class="skills-grid">
      <div v-for="skill in skills" :key="skill.name" class="skill-item">
        <div class="skill-header">
          <span class="skill-icon">{{ skill.icon }}</span>
          <span class="skill-name">{{ skill.name }}</span>
        </div>
        <div class="skill-bar">
          <div class="skill-level" :style="{ width: `${skill.level}%` }"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.skills-section {
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

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 1.5rem;
}

.skill-item {
  background: #f1f5f9;
  padding: 1.2rem;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  margin-bottom: 1rem;
}

.skill-icon {
  font-size: 1.5rem;
}

.skill-name {
  font-size: 1.1rem;
  color: #334155;
  font-weight: 500;
}

.skill-bar {
  height: 8px;
  background: #e2e8f0;
  border-radius: 4px;
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background: #3b82f6;
  border-radius: 4px;
  transition: width 0.3s ease;
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }

  .skills-section {
    padding: 1.5rem;
  }
}
</style> 