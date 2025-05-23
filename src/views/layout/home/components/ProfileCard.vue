<script lang="ts" setup>
import { type UserInfo } from '@/services/user'

defineProps<{
  userInfo: UserInfo
}>()
</script>

<template>
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
</template>

<style scoped>
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

@media (max-width: 768px) {
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

  .stats {
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style> 