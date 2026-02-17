export interface Character {
  id: string;
  name: string;
  role: string;
  age: string;
  description: string;
  image: string;
  socialImage?: string;
  color: string;
  tags: string[];
  details?: {
    height: string;
    likes: string[];
    dislikes: string[];
    personality: {
      surface: string;
      inner: string;
    };
    quotes: string[];
  };
}

export interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
}

export interface Comment {
  id: number;
  user: string;
  text: string;
  time: string;
  isOfficial?: boolean;
}

export interface SocialPost {
  id: number;
  image: string;
  likes: string;
  caption: string;
  comments: number;
  date: string;
  location?: string;
  initialComments: Comment[];
}

export enum SectionType {
  INTRO = 'INTRO',
  CHARACTERS = 'CHARACTERS',
  WORLD = 'WORLD',
  SOCIAL = 'SOCIAL',
}