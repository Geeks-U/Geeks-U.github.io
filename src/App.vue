<template>
  <div class="p-4 space-y-4">
    <!-- 去掉用户名输入框 -->

    <button @click="loadTopics" class="bg-blue-500 text-white px-4 py-2 rounded">加载主题</button>

    <div v-if="topics.length">
      <div>
        <label>
          <input type="radio" value="any" v-model="filterMode" />
          任意匹配 (any)
        </label>
        <label class="ml-4">
          <input type="radio" value="all" v-model="filterMode" />
          全部匹配 (all)
        </label>
      </div>

      <div class="flex flex-wrap gap-2 mt-2">
        <label v-for="topic in topics" :key="topic">
          <input
            type="checkbox"
            :value="topic"
            v-model="selectedTopics"
          />
          {{ topic }}
        </label>
      </div>

      <button @click="filterRepos" class="mt-2 bg-green-500 text-white px-4 py-2 rounded">
        筛选仓库
      </button>
    </div>

    <div v-if="repos.length" class="mt-4 space-y-2">
      <div v-for="repo in repos" :key="repo.name" class="border p-2 rounded">
        <h3 class="font-bold">{{ repo.name }}</h3>
        <p>{{ repo.description || '无描述' }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  fetchUserRepoTopics,
  fetchReposByAllTopics,
  fetchReposByAnyTopic,
} from './services/github'
import type { RepoWithTopics } from './services/github'

const topics = ref<string[]>([])
const selectedTopics = ref<string[]>([])
const filterMode = ref<'any' | 'all'>('any')
const repos = ref<RepoWithTopics[]>([])

const loadTopics = async () => {
  topics.value = await fetchUserRepoTopics()
  selectedTopics.value = []
  repos.value = []
}

const filterRepos = async () => {
  if (selectedTopics.value.length === 0) return

  const fetchFn =
    filterMode.value === 'all' ? fetchReposByAllTopics : fetchReposByAnyTopic

  repos.value = await fetchFn(selectedTopics.value)
}
</script>

<style scoped>
input[type='radio'],
input[type='checkbox'] {
  margin-right: 4px;
}
</style>
