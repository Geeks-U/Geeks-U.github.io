import githubAxios from "@/utils/request";

const USERNAME = "Geeks-U"; // GitHub username
const CACHE_DURATION = 600 * 1000; // Cache duration 10 minutes

// User info cache
const userInfoCache = new Map<string, { timestamp: number; data: any }>();

export interface UserInfo {
  login: string;
  avatar_url: string;
  bio: string;
  location: string;
  followers: number;
  following: number;
  html_url: string;
  blog: string;
  email: string;
  twitter_username: string;
}

// Fetch user information with caching
export const fetchUserInfo = async (): Promise<UserInfo> => {
  const cacheKey = USERNAME;
  const now = Date.now();
  const cache = userInfoCache.get(cacheKey);

  if (cache && now - cache.timestamp < CACHE_DURATION) {
    return cache.data;
  }

  try {
    const { data } = await githubAxios.get<UserInfo>(`users/${USERNAME}`);
    userInfoCache.set(cacheKey, { timestamp: now, data });
    return data;
  } catch (error) {
    console.error('Failed to fetch user data:', error);
    throw new Error('Failed to fetch user data');
  }
};
