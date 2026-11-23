export interface TroubleshootingItem {
  title?: string;
  problem: string;
  cause?: string;
  solution: string;
  result?: string;
}

export interface FeatureGroup {
  title: string;
  items: string[];
}

export interface Project {
  id: string;
  title: string;
  period: string;
  summary: string;
  categoryBadge?: string;
  role: string;
  roleDetails?: string[];
  teamSize?: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  description: string;
  planning?: string;
  verificationHighlights?: string[];
  coreFeatures: string[];
  featureGroups?: FeatureGroup[];
  troubleshooting: TroubleshootingItem[];
  retrospective: string[];
  published?: boolean;
  order?: number;
  thumbnail?: string;
}

export const sampleProjects: Project[] = [];
