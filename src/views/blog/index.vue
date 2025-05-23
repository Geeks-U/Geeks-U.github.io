<script lang="ts" setup>
// 示例数据
const posts = [
  {
    id: 1,
    title: '使用 Vue 3 构建现代化 Web 应用',
    date: '2024-03-20',
    author: 'John Doe',
    excerpt: '探索 Vue 3 的新特性和最佳实践，学习如何构建高性能的现代化 Web 应用...',
    tags: ['Vue 3', 'TypeScript', 'Web Development']
  },
  {
    id: 2,
    title: 'GitHub Actions 自动化部署指南',
    date: '2024-03-19',
    author: 'Jane Smith',
    excerpt: '学习如何使用 GitHub Actions 实现自动化部署，提高开发效率...',
    tags: ['GitHub', 'CI/CD', 'DevOps']
  }
]
</script>

<template>
  <div class="blog-container">
    <article v-for="post in posts" :key="post.id" class="blog-post">
      <header class="blog-post-header">
        <h2 class="blog-post-title">{{ post.title }}</h2>
        <div class="blog-post-meta">
          <span>{{ post.date }}</span>
          <span>By {{ post.author }}</span>
        </div>
      </header>
      <div class="blog-post-content">
        <p class="blog-post-excerpt">{{ post.excerpt }}</p>
      </div>
      <footer class="blog-post-footer">
        <div class="blog-tags">
          <span v-for="tag in post.tags" :key="tag" class="blog-tag">{{ tag }}</span>
        </div>
        <a href="#" class="blog-read-more">阅读更多 →</a>
      </footer>
    </article>
  </div>
</template>

<style scoped>
.blog-container {
  display: grid;
  gap: var(--spacing-xl);
}

.blog-post {
  background-color: var(--background-color);
  border-radius: var(--border-radius-lg);
  box-shadow: var(--shadow-md);
  overflow: hidden;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.blog-post:hover {
  transform: translateY(-2px);
  box-shadow: var(--shadow-lg);
}

.blog-post-header {
  padding: var(--spacing-lg);
  border-bottom: 1px solid var(--border-color);
}

.blog-post-title {
  font-size: var(--font-size-2xl);
  color: var(--text-color);
  margin-bottom: var(--spacing-sm);
}

.blog-post-meta {
  display: flex;
  gap: var(--spacing-md);
  color: var(--text-secondary);
  font-size: var(--font-size-sm);
}

.blog-post-content {
  padding: var(--spacing-lg);
}

.blog-post-excerpt {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
}

.blog-post-footer {
  padding: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.blog-tags {
  display: flex;
  gap: var(--spacing-xs);
  flex-wrap: wrap;
}

.blog-tag {
  background-color: rgba(37, 99, 235, 0.1);
  color: var(--primary-color);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: var(--border-radius-sm);
  font-size: var(--font-size-sm);
}

.blog-read-more {
  color: var(--primary-color);
  text-decoration: none;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
}

.blog-read-more:hover {
  color: var(--primary-hover);
}

@media (max-width: 768px) {
  .blog-post-header {
    padding: var(--spacing-md);
  }

  .blog-post-content {
    padding: var(--spacing-md);
  }

  .blog-post-footer {
    padding: var(--spacing-md);
    flex-direction: column;
    gap: var(--spacing-md);
    align-items: flex-start;
  }

  .blog-post-meta {
    flex-direction: column;
    gap: var(--spacing-xs);
  }
}
</style>
