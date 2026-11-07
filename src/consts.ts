export const SITE = {
  TITLE: 'Ray 的观察切片',
  TAGLINE: '用照片、游戏、书和孩子，记录日常里的感受与观察。',
  DESCRIPTION: 'Ray 的日常观察随笔：摄影、主机游戏、阅读与儿童心理学。',
} as const;

export type TagSlug = 'photo' | 'games' | 'reading' | 'kids';

export interface TagDef {
  slug: TagSlug;
  name: string;
  description: string;
}

export const TAGS: TagDef[] = [
  {
    slug: 'photo',
    name: '光影札记',
    description: '拍摄时的注意力与心情，日常光景。',
  },
  {
    slug: 'games',
    name: '通关之后',
    description: '游戏结束后的回味与片段记忆，剧透会标注。',
  },
  {
    slug: 'reading',
    name: '读页之间',
    description: '摘录、感受与联想。',
  },
  {
    slug: 'kids',
    name: '小小人类',
    description: '对孩子行为与情绪的观察，不贴标签、不做诊断。',
  },
];
