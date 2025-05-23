<script lang="ts" setup>
import { useRoute } from 'vue-router'

const route = useRoute()
const isActive = (path: string) => route.path === path
</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-content container">
        <nav class="nav" aria-label="主导航">
          <ul class="nav-list">
            <li>
              <router-link :to="'/layout'" :class="['nav-link', isActive('/layout') && 'active']">
                首页
              </router-link>
            </li>
            <li>
              <router-link :to="'/layout/repos'" :class="['nav-link', isActive('/layout/repos') && 'active']">
                仓库
              </router-link>
            </li>
            <li>
              <router-link :to="'/layout/about'" :class="['nav-link', isActive('/layout/blog') && 'active']">
                博客
              </router-link>
            </li>
          </ul>
        </nav>
      </div>
    </header>

    <main class="main container" aria-label="主要内容区域">
      <router-view />
    </main>

    <footer class="footer">
      <div class="footer-content container">
        <p>© 2024 GitHub Home. All rights reserved.</p>
      </div>
    </footer>
  </div>
</template>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.container {
  width: 100%;
  margin: 0 auto;
  padding: 0 1rem;
}

.header {
  background-color: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  width: 100%;
  justify-content: center;
}

.nav-list {
  display: flex;
  gap: 2rem;
  list-style: none;
  padding: 0;
  margin: 0;
}

.nav-link {
  color: #4b5563;
  text-decoration: none;
  font-weight: 500;
  font-size: 1.1rem;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  transition: all 0.3s ease;
  position: relative;
}

.nav-link:hover {
  color: #2563eb;
}

.nav-link.active {
  color: #2563eb;
}

.nav-link.active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 100%;
  height: 2px;
  background-color: #2563eb;
  border-radius: 2px;
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: #ffffff;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  margin-top: auto;
  transition: background-color 0.3s ease, border-color 0.3s ease;
}

.footer-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: #6b7280;
}

@media (max-width: 768px) {
  .header-content {
    flex-direction: column;
    gap: 1rem;
  }

  .nav-list {
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
  }

  .nav-link {
    font-size: 1rem;
    padding: 0.4rem 0.8rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>
