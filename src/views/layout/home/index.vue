<script lang="ts" setup>
import { ref, onMounted } from 'vue'
import { fetchUserInfo, type UserInfo } from '@/services/user'

interface ContactInfo {
  name: string
  icon: string
  url: string
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
  { name: 'Email', icon: '📧', url: 'mailto:cncdre11@outlook.com' },
  { name: 'GitHub', icon: '🐙', url: 'https://github.com/Geeks-U' }
])

const fetchUserData = async () => {
  try {
    const data = await fetchUserInfo()
    console.log(data)
    userInfo.value = data
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
  background: #f8f9fa;
}

.loading, .error {
  text-align: center;
  padding: 3rem;
  font-size: 1.2rem;
  color: #6c757d;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
}

.error {
  color: #dc3545;
}

.profile-card {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.profile-card:hover {
  transform: translateY(-5px);
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
  border: 5px solid #fff;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
}

.profile-info h1 {
  margin: 0;
  font-size: 2.5rem;
  color: #1a1a1a;
  font-weight: 700;
  letter-spacing: -0.5px;
}

.bio {
  color: #4a4a4a;
  margin: 1rem 0;
  font-size: 1.2rem;
  line-height: 1.6;
  max-width: 600px;
}

.location {
  color: #666;
  margin: 0.8rem 0;
  font-size: 1.1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stats {
  display: flex;
  gap: 2rem;
  margin-top: 1.5rem;
}

.stats span {
  color: #666;
  font-size: 1.1rem;
  font-weight: 500;
  padding: 0.5rem 1rem;
  background: #f8f9fa;
  border-radius: 8px;
}

.skills-section, .contact-section {
  background: #fff;
  border-radius: 16px;
  padding: 2.5rem;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  margin-bottom: 2rem;
  transition: transform 0.3s ease;
}

.skills-section:hover, .contact-section:hover {
  transform: translateY(-5px);
}

h2 {
  color: #1a1a1a;
  margin-bottom: 2rem;
  font-size: 1.8rem;
  font-weight: 700;
  position: relative;
  padding-bottom: 0.8rem;
}

h2::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 60px;
  height: 4px;
  background: #2ea44f;
  border-radius: 2px;
}

.skills-grid {
  display: grid;
  gap: 2rem;
}

.skill-item {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
}

.skill-header {
  display: flex;
  align-items: center;
  gap: 1rem;
}

.skill-icon {
  font-size: 1.4rem;
}

.skill-name {
  font-weight: 600;
  color: #1a1a1a;
  font-size: 1.1rem;
}

.skill-bar {
  height: 10px;
  background: #f0f0f0;
  border-radius: 5px;
  overflow: hidden;
}

.skill-level {
  height: 100%;
  background: linear-gradient(90deg, #2ea44f, #3fb950);
  border-radius: 5px;
  transition: width 0.6s ease;
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
}

.contact-item {
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1.2rem;
  background: #f8f9fa;
  border-radius: 12px;
  text-decoration: none;
  color: #1a1a1a;
  transition: all 0.3s ease;
  border: 1px solid #eee;
}

.contact-item:hover {
  background: #fff;
  transform: translateY(-3px);
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
  border-color: #2ea44f;
}

.contact-icon {
  font-size: 1.4rem;
}

.contact-name {
  font-weight: 600;
  font-size: 1.1rem;
}

@media (max-width: 768px) {
  .github-home {
    padding: 1rem;
  }

  .profile-header {
    flex-direction: column;
    text-align: center;
    gap: 2rem;
  }

  .profile-info h1 {
    font-size: 2rem;
  }

  .stats {
    justify-content: center;
    flex-wrap: wrap;
  }

  .contact-grid {
    grid-template-columns: 1fr;
  }

  .skills-section, .contact-section {
    padding: 1.5rem;
  }
}
</style>