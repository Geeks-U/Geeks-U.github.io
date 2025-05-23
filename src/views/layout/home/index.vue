<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchUserInfo, type UserInfo } from '@/services/user'
import { fetchAllRepos, fetchRepoTopics } from '@/services/repositories'
import ProfileCard from './components/ProfileCard.vue'
import SkillsSection from './components/SkillsSection.vue'
import TopicsSection from './components/TopicsSection.vue'
import ContactSection from './components/ContactSection.vue'

interface TopicStats {
  name: string
  count: number
  percentage: number
}

interface ContactInfo {
  name: string
  icon: string
  url: string
}

const loading = ref(true)
const error = ref('')

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

// 技能列表
const skills = ref([
  { name: 'Vue.js', level: 90, icon: '🎯' },
  { name: 'TypeScript', level: 85, icon: '📘' },
  { name: 'JavaScript', level: 95, icon: '⚡' },
  { name: 'CSS/SCSS', level: 88, icon: '🎨' },
  { name: 'Node.js', level: 85, icon: '🟢' },
  { name: 'Git', level: 90, icon: '📦' }
])

const topicStats = ref<TopicStats[]>([])

// 联系方式
const contactInfo = ref<ContactInfo[]>([
  { name: 'Email', icon: '📧', url: 'mailto:cncdre11@outlook.com' }
])

// 获取用户基本信息
const fetchProfileData = async () => {
  try {
    const data = await fetchUserInfo()
    userInfo.value = data
  } catch (err) {
    throw new Error('Failed to fetch profile data')
  }
}

// 获取仓库 topics 统计
const fetchTopicsData = async () => {
  try {
    const repos = await fetchAllRepos()
    const topicCount: Record<string, number> = {}
    let totalTopics = 0
    
    // 获取每个仓库的 topics
    const reposWithTopics = await Promise.all(
      repos.map(async (repo) => {
        const topics = await fetchRepoTopics(repo.name)
        return { ...repo, topics }
      })
    )
    
    reposWithTopics.forEach((repo) => {
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
  } catch (err) {
    throw new Error('Failed to fetch topics data')
  }
}

// 初始化所有数据
const initializeData = async () => {
  loading.value = true
  error.value = ''
  
  try {
    await Promise.all([
      fetchProfileData(),
      fetchTopicsData()
    ])
  } catch (err) {
    error.value = err instanceof Error ? err.message : 'Failed to fetch data'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  initializeData()
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
      <ProfileCard :user-info="userInfo" />
      <SkillsSection :skills="skills" />
      <TopicsSection :topic-stats="topicStats" />
      <ContactSection :contact-info="contactInfo" />
    </div>
  </div>
</template>

<style scoped>
.github-home {
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

@media (max-width: 768px) {
  .github-home {
    padding: 1rem;
  }
}
</style>