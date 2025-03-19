export interface Sponsor {
  id: number;
  name: string;
  logo: string;
  url: string;
}

export interface Judge {
  id: number;
  name: string;
  photo: string;
  bio: string;
  title?: string;
}

export const sponsors: Sponsor[] = [
  {
    id: 1,
    name: 'TechCorp',
    logo: 'https://via.placeholder.com/300x150/4cc9f0/FFFFFF.png?text=TechCorp',
    url: 'https://example.com',
  },
  {
    id: 2,
    name: 'InnovateX',
    logo: 'https://via.placeholder.com/300x150/4361ee/FFFFFF.png?text=InnovateX',
    url: 'https://example.com',
  },
  {
    id: 3,
    name: 'DevFund',
    logo: 'https://via.placeholder.com/300x150/3a0ca3/FFFFFF.png?text=DevFund',
    url: 'https://example.com',
  },
  {
    id: 4,
    name: 'CloudSys',
    logo: 'https://via.placeholder.com/300x150/7209b7/FFFFFF.png?text=CloudSys',
    url: 'https://example.com',
  },
  {
    id: 5,
    name: 'BuilderAI',
    logo: 'https://via.placeholder.com/300x150/f72585/FFFFFF.png?text=BuilderAI',
    url: 'https://example.com',
  },
  {
    id: 6,
    name: 'CodeLabs',
    logo: 'https://via.placeholder.com/300x150/480ca8/FFFFFF.png?text=CodeLabs',
    url: 'https://example.com',
  },
];

export const judges: Judge[] = [
  {
    id: 1,
    name: 'Alex Johnson',
    photo: 'https://via.placeholder.com/300x300/4cc9f0/FFFFFF.png?text=AJ',
    title: 'CTO at TechVentures',
    bio: 'Alex has over 15 years of experience in software engineering and has mentored numerous successful startups.',
  },
  {
    id: 2,
    name: 'Sam Rodriguez',
    photo: 'https://via.placeholder.com/300x300/4361ee/FFFFFF.png?text=SR',
    title: 'Founder & CEO',
    bio: 'Sam founded three successful tech startups and is passionate about fostering innovation in young developers.',
  },
  {
    id: 3,
    name: 'Jordan Lee',
    photo: 'https://via.placeholder.com/300x300/7209b7/FFFFFF.png?text=JL',
    title: 'VP of Engineering',
    bio: 'Jordan specializes in AI and machine learning applications, with a background in both academia and industry.',
  },
  {
    id: 4,
    name: 'Taylor Morgan',
    photo: 'https://via.placeholder.com/300x300/f72585/FFFFFF.png?text=TM',
    title: 'Product Director',
    bio: 'Taylor has led product teams at major tech companies and brings expertise in user experience and market fit.',
  },
]; 