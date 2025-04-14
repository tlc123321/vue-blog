import { studyPosts } from './study';
import { toolPosts } from './tool';

// 首页的三篇文章
export const homePosts = [
  studyPosts[0],
  studyPosts[1],
  toolPosts[0],
];

export const posts = [
  ...studyPosts,
  ...toolPosts,
];

