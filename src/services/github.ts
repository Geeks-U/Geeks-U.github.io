import githubAxios from "@/utils/request";

type Repo = { name: string };

const USERNAME = "Geeks-U"; // 你的 GitHub 用户名
const CACHE_DURATION = 600 * 1000; // 缓存时间 10 分钟

// 使用了内存缓存则须注意多进程内存隔离问题

// 仓库缓存，key = username_page_页码
const fetchAllReposCache = new Map<string, { timestamp: number; data: Repo[] }>();

// 获取所有仓库，带分页和缓存，不接受参数，内部用 USERNAME
const fetchAllRepos = (page = 1, acc: Repo[] = []): Promise<Repo[]> => {
  const cacheKey = `${USERNAME}_page_${page}`;
  const now = Date.now();
  const cache = fetchAllReposCache.get(cacheKey);
  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return Promise.resolve(acc.concat(cache.data));
  }

  return githubAxios
    .get<Repo[]>(`users/${USERNAME}/repos`, {
      params: { per_page: 100, page },
    })
    .then(({ data }) => {
      fetchAllReposCache.set(cacheKey, { timestamp: now, data });
      const allRepos = acc.concat(data);
      if (data.length < 100) {
        return allRepos;
      }
      return fetchAllRepos(page + 1, allRepos);
    });
};

// topics 缓存，key = username_repoName
const fetchRepoTopicsCache = new Map<string, { timestamp: number; data: string[] }>();

// 获取单个仓库topics，带缓存，不接受参数，内部用 USERNAME
const fetchRepoTopics = (repoName: string): Promise<string[]> => {
  const cacheKey = `${USERNAME}_${repoName}`;
  const now = Date.now();
  const cache = fetchRepoTopicsCache.get(cacheKey);
  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return Promise.resolve(cache.data);
  }

  return githubAxios
    .get<{ names: string[] }>(`repos/${USERNAME}/${repoName}/topics`)
    .then(({ data }) => {
      fetchRepoTopicsCache.set(cacheKey, { timestamp: now, data: data.names });
      return data.names;
    })
    .catch(() => []);
};

// 获取用户所有仓库的topics，调用前两个函数，合并结果，不做自身缓存，不接受参数，内部用 USERNAME
const fetchUserRepoTopics = (): Promise<string[]> => {
  return fetchAllRepos().then((repos) => {
    const topicPromises = repos.map((repo) => fetchRepoTopics(repo.name));
    return Promise.all(topicPromises).then((allTopicsArrays) => {
      const allTopicsSet = new Set<string>();
      allTopicsArrays.forEach((topics) => {
        topics.forEach((t) => allTopicsSet.add(t));
      });
      return Array.from(allTopicsSet);
    });
  });
};

type RepoWithTopics = Repo & { 
  topics: string[],
  description?: string | null  // 允许没有描述
};

// 根据所有 topics 匹配仓库，不接受 username 参数，内部用 USERNAME
const fetchReposByAllTopics = async (
  topicsToMatch: string[]
): Promise<RepoWithTopics[]> => {
  const repos = await fetchAllRepos();

  const reposWithTopicsPromises = repos.map(async (repo) => {
    const topics = await fetchRepoTopics(repo.name);
    return { ...repo, topics };
  });

  const reposWithTopics = await Promise.all(reposWithTopicsPromises);

  return reposWithTopics.filter((repo) =>
    topicsToMatch.every((topic) => repo.topics.includes(topic))
  );
};

// 根据任意 topic 匹配仓库，不接受 username 参数，内部用 USERNAME
const fetchReposByAnyTopic = async (
  topicsToMatch: string[]
): Promise<RepoWithTopics[]> => {
  const repos = await fetchAllRepos();

  const reposWithTopicsPromises = repos.map(async (repo) => {
    const topics = await fetchRepoTopics(repo.name);
    return { ...repo, topics };
  });

  const reposWithTopics = await Promise.all(reposWithTopicsPromises);

  return reposWithTopics.filter((repo) =>
    repo.topics.some((topic) => topicsToMatch.includes(topic))
  );
};

export {
  fetchAllRepos,
  fetchRepoTopics,
  fetchUserRepoTopics,
  fetchReposByAllTopics,
  fetchReposByAnyTopic,
};
export type { Repo, RepoWithTopics };
