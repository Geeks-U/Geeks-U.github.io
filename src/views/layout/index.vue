<script lang="ts" setup>

</script>

<template>
  <div class="layout">
    <header class="header">
      <div class="header-content container">
        <nav class="nav">
          <router-link to="/layout" class="nav-link">首页</router-link>
          <router-link to="/layout/repos" class="nav-link">仓库</router-link>
          <router-link to="/layout/about" class="nav-link">关于</router-link>
        </nav>
      </div>
    </header>
    <main class="main container">
      <router-view></router-view>
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

.header {
  background-color: #fff;
  border-bottom: 1px solid #e5e7eb;
  padding: 1rem 0;
  position: sticky;
  top: 0;
  z-index: 100;
}

.header-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav {
  display: flex;
  gap: 1rem;
}

.nav-link {
  color: #1f2937;
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 0.75rem;
  border-radius: 0.25rem;
  transition: all 0.2s ease;
}

.nav-link:hover {
  color: #2563eb;
  background-color: rgba(37, 99, 235, 0.1);
}

.nav-link.active {
  color: #2563eb;
  background-color: rgba(37, 99, 235, 0.1);
}

.main {
  flex: 1;
  padding: 2rem 0;
}

.footer {
  background-color: #fff;
  border-top: 1px solid #e5e7eb;
  padding: 1.5rem 0;
  margin-top: auto;
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

  .nav {
    flex-wrap: wrap;
    justify-content: center;
  }

  .footer-content {
    flex-direction: column;
    gap: 1rem;
    text-align: center;
  }
}
</style>