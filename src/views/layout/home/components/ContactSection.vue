<script lang="ts" setup>
interface ContactInfo {
  name: string
  icon: string
  url: string
}

defineProps<{
  contactInfo: ContactInfo[]
}>()
</script>

<template>
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
</template>

<style scoped>
.contact-section {
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
  text-decoration: none;
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
  .contact-grid {
    grid-template-columns: 1fr;
  }

  .contact-section {
    padding: 1.5rem;
  }
}
</style> 