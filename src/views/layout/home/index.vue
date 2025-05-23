<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchUserInfo, type UserInfo } from '@/services/user'

interface ContactInfo {
  name: string
  icon: string
  url: string
}

interface TopicStats {
  name: string
  count: number
  percentage: number
}

const userInfo = ref<UserInfo>({
  login: '',
  avatar_url: '',
  bio: '',
  location: '',
  followers: 0,
  following: 0,
  html_url: '',
  blog: '',
  email: '',
  twitter_username: ''
})

const loading = ref(true)
const error = ref('')
const topicStats = ref<TopicStats[]>([])

// 技能列表
const skills = ref([
  { name: 'Vue.js', level: 90, icon: '🎯' },
  { name: 'TypeScript', level: 85, icon: '📘' },
  { name: 'JavaScript', level: 95, icon: '⚡' },
  { name: 'CSS/SCSS', level: 88, icon: '🎨' },
  { name: 'Node.js', level: 85, icon: '🟢' },
  { name: 'Git', level: 90, icon: '📦' }
])

// 联系方式
const contactInfo = ref<ContactInfo[]>([
  { name: 'Email', icon: '📧', url: 'mailto:cncdre11@outlook.com' }
])

const fetchUserData = async () => {
  try {
    const data = await fetchUserInfo()
    userInfo.value = data
    // 获取用户的仓库数据
    const response = await fetch(`https://api.github.com/users/${data.login}/repos`)
    const repos = await response.json()
    
    // 统计 topics
    const topicCount: Record<string, number> = {}
    let totalTopics = 0
    
    repos.forEach((repo: any) => {
      if (repo.topics) {
        repo.topics.forEach((topic: string) => {
          topicCount[topic] = (topicCount[topic] || 0) + 1
          totalTopics++
        })
      }
    })
    
    // 转换为数组并计算百分比
    topicStats.value = Object.entries(topicCount)
      .map(([name, count]) => ({
        name,
        count,
        percentage: Math.round((count / totalTopics) * 100)
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10) // 只显示前10个最常用的topics
    
    loading.value = false
  } catch (err) {
    error.value = 'Failed to fetch user data'
    loading.value = false
  }
}

onMounted(() => {
  fetchUserData()
})
</script>

<template>
  <div class="github-home">
    <div v-if="loading" class="loading">
      Loading...
    </div>
    
    <div v-else-if="error" class="error">
      {{ error }}
    </div>
    
    <div v-else class="content">
      <!-- 个人信息卡片 -->
      <div class="profile-card">
        <div class="profile-header">
          <a :href="userInfo.html_url" target="_blank" class="avatar-link">
            <img :src="userInfo.avatar_url" :alt="userInfo.login" class="avatar">
          </a>
          <div class="profile-info">
            <h1>{{ userInfo.login }}</h1>
            <p class="bio">{{ userInfo.bio }}</p>
            <p class="location">📍 {{ userInfo.location }}</p>
            <div class="stats">
              <span>{{ userInfo.followers }} followers</span>
              <span>{{ userInfo.following }} following</span>
            </div>
          </div>
        </div>
      </div>

      <!-- 技能展示 -->
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

      <!-- Topics Statistics -->
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

      <!-- 联系方式 -->
      <div class="contact-section">
        <h2>Contact Me</h2>
        <div class="contact-grid">
          <a v-for="contact in contactInfo" 
             :key="contact.name" 
             :href="contact.url"
             target="_blank"
             class="contact-item">
            <span class="contact-icon">{{ contact.icon }}</span>
            <span class="contact-name">{{ contact.name }}</span>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.github-home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  min-height: 100vh;
  background: #f1f5f9;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #64748b;
  background: #f8fafc;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.error {
  color: #ef4444;
}

.profile-card {
  background: #f8fafc;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.05);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
  border: 1px solid #e2e8f0;
}

.profile-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 24px rgba(0, 0, 0, 0.08);
}

.profile-header {
  display: flex;
  gap: 3rem;
  align-items: center;
}

.avatar-link {
  display: block;
  transition: all 0.3s ease;
}

.avatar-link:hover {
  transform: scale(1.05);
}

.avatar {
  width: 180px;
  height: 180px;
  border-radius: 50%;
  object-fit: cover;
  border: 5px solid #f8fafc;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.08);
}

.profile-info h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #334155;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.bio {
  color: #475569;
  margin: 1rem 0;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
}

.location {
  color: #64748b;
  margin: 0.8rem 0;
  font-size: 1.1rem;
}

.stats {
  display: flex;
  gap: 1.5rem;
  margin-top: 1rem;
}

.stats span {
  color: #475569;
  font-size: 1.1rem;
}

.skills-section, .topics-section, .contact-section {
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

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 1rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 1rem;
  background: #f1f5f9;
  border-radius: 12px;
  border: 1px solid #e2e8f0;
  transition: all 0.2s ease;
}

.contact-item:hover {
  background: #e2e8f0;
  transform: translateY(-2px);
}

.contact-icon {
  font-size: 1.5rem;
}

.contact-name {
  color: #334155;
  font-weight: 500;
}

@media (max-width: 768px) {
  .github-home {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 1.5rem;
  }

  .avatar {
    width: 150px;
    height: 150px;
  }

  .profile-info h1 {
    font-size: 2rem;
  }

  .skills-grid, .topics-grid {
    grid-template-columns: 1fr;
  }

  .stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .skills-section, .contact-section, .topics-section {
    padding: 1.5rem;
  }
}
</style>