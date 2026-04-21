export const categories = [
  'Science & Tech',
  'Environment',
  'Health',
  'Humanities',
  'Business',
  'Campus'
] as const;

export type LessonCategory = (typeof categories)[number];

export type Lesson = {
  id: string;
  category: LessonCategory;
  headline: string;
  paragraph1: string;
  paragraph2: string;
  tags: string[];
  readTimeSeconds: number;
  imageUrl: string;
  imageCredit: string;
  sourceUrl: string;
  publishedAgo: string;
};


export const lessons: Lesson[] = [
  {
    id: 'adaptive-ai-chips',
    category: 'Science & Tech',
    headline: 'ASU applies adaptive AI tools to boost chip manufacturing',
    paragraph1:
      'Think of chipmaking like finding dust on a mirror the size of a football field. ASU teams are training AI to spot tiny defects faster so engineers can react before yields drop.',
    paragraph2:
      'The Applied Materials collaboration brings imaging and analytics methods from health tech into semiconductor inspection. The goal is cleaner data, earlier fault detection and faster factory decisions.',
    tags: ['#ai', '#research', '#innovation'],
    readTimeSeconds: 36,
    imageUrl: 'https://news.asu.edu/sites/default/files/2025-06/SCAI-Baoxin-Li-2025-EG-5920-a_1920x1080.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20250616-science-and-technology-aipowered-smart-medicine-meets-smart-microchips',
    publishedAgo: '10mo ago'
  },
  {
    id: 'freeway-water-optimization',
    category: 'Environment',
    headline: 'ASU and ADOT map smarter watering for Phoenix freeways',
    paragraph1:
      'Freeway plants are city infrastructure, but irrigation is often guesswork. ASU is helping Arizona turn that guesswork into measured, site-specific watering plans.',
    paragraph2:
      'The project with ADOT tracks landscape water use and identifies where less water can keep plants healthy. It is part of the Arizona Water Innovation Initiative focused on long-term desert resilience.',
    tags: ['#water', '#sustainability', '#innovation'],
    readTimeSeconds: 34,
    imageUrl: 'https://news.asu.edu/sites/default/files/2026-03/ASU%20News%20header.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20260305-environment-and-sustainability-asu-partnership-helps-adot-optimize-water-use-across-urban-freeways',
    publishedAgo: '1mo ago'
  },
  {
    id: 'choline-brain-decline',
    category: 'Health',
    headline: 'Low choline levels linked to faster Alzheimer’s-related decline',
    paragraph1:
      'Your brain runs on nutrients the way an engine runs on fuel. ASU researchers found that lower blood choline tracks with worse Alzheimer’s-related brain pathology.',
    paragraph2:
      'The team says this adds urgency because many Americans do not hit recommended choline intake. Their findings support more prevention-focused nutrition conversations before symptoms escalate.',
    tags: ['#alzheimers', '#nutrition', '#brainhealth'],
    readTimeSeconds: 31,
    imageUrl: 'https://news.asu.edu/sites/default/files/styles/block_image_16_9_lge/public/13d9bb8b-156c-404e-b8ff-cd43e700a187.jpg?itok=XbhyKWdg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20230807-new-research-links-low-choline-levels-blood-alzheimers-disease-progression',
    publishedAgo: '2y ago'
  },
  {
    id: 'jane-austen-scholar',
    category: 'Humanities',
    headline: 'ASU Jane Austen scholar uncovers letters with new context',
    paragraph1:
      'Classic literature can still produce breaking news. ASU professor Devoney Looser helped identify previously unpublished letters that deepen what we know about Jane Austen’s world.',
    paragraph2:
      'The discovery shows how humanities research works like historical detective work, adding evidence piece by piece. New primary sources can reshape how major authors are taught and interpreted.',
    tags: ['#literature', '#austen', '#research'],
    readTimeSeconds: 29,
    imageUrl: 'https://news.asu.edu/sites/default/files/2025-08/Looser_for%20ASUNews.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20250826-arts-humanities-and-education-jane-austen-more-wild-people-realize-says-asu-professor',
    publishedAgo: '11y ago'
  },
  {
    id: 'novus-innovation-corridor',
    category: 'Business',
    headline: 'Novus corridor grows into a live-work innovation district',
    paragraph1:
      'ASU is treating campus land like an economic lab, not just a boundary line. Novus is building a dense district where housing, offices and venues reinforce each other.',
    paragraph2:
      'Leaders report the project is about one-third complete and designed for long-run job creation and wage growth. It also reflects a shift toward mixed-use spaces that match hybrid work patterns.',
    tags: ['#innovation', '#economicdevelopment', '#tempe'],
    readTimeSeconds: 38,
    imageUrl: 'https://news.asu.edu/sites/default/files/2025-06/20250218%20TempeDroneNovusPlaceWaltonCenter_010.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20250627-sun-devil-community-asu-thriving-live-work-play-community-novus',
    publishedAgo: '9mo ago'
  },
  {
    id: 'dual-enrollment-expansion',
    category: 'Campus',
    headline: 'ASU expands dual enrollment pathways for high school students',
    paragraph1:
      'College momentum often starts before college. ASU partners are scaling dual enrollment so more students can earn credits early and lower time-to-degree later.',
    paragraph2:
      'At the Accelerate ASU conference, educators focused on access across districts and student pathways. The push aligns with evidence that dual-enrollment students are more likely to attend and complete college.',
    tags: ['#k12', '#collegeaccess', '#studentsuccess'],
    readTimeSeconds: 33,
    imageUrl: 'https://news.asu.edu/sites/default/files/2026-03/Hero%20photo%20-%20Accelerate%20partner%20conference.png',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20260313-arts-humanities-and-education-accelerate-asu-partners-expand-dual-enrollment-high-school-students',
    publishedAgo: '1mo ago'
  },
  {
    id: 'snowmelt-survey',
    category: 'Environment',
    headline: 'ASU and SRP use snowpack flights to sharpen forecasts',
    paragraph1:
      'Arizona’s water story starts far from Arizona, in mountain snow. ASU and SRP are using airborne surveys to measure snowpack with greater precision.',
    paragraph2:
      'Better snow data helps reservoir operators forecast runoff and plan supplies with less uncertainty. The project combines federal support, utility operations and university hydrology expertise.',
    tags: ['#snowpack', '#waterforecasting', '#water'],
    readTimeSeconds: 32,
    imageUrl: 'https://news.asu.edu/sites/default/files/2026-01/1920_a2_01080%20%281%29%202.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20260121-environment-and-sustainability-asu-srp-project-takes-flight-improve-water-supply',
    publishedAgo: '3mo ago'
  },
  {
    id: 'microscope-research',
    category: 'Science & Tech',
    headline: 'ASU cryo-EM microscope reveals hidden structures of life',
    paragraph1:
      'Imagine freezing biology mid-motion to inspect it frame by frame. ASU scientists use a specialized cryo-electron microscope to study cells and molecular structures in extreme detail.',
    paragraph2:
      'The instrument supports researchers across disciplines by making ultra-small structures visible without traditional staining limits. That visibility helps speed discoveries in biology and biomedicine.',
    tags: ['#microscopy', '#biotech', '#research'],
    readTimeSeconds: 35,
    imageUrl: 'https://news.asu.edu/sites/default/files/semte-brent-nannenga-2020-eg-2649w-scaled_0.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20211116-discoveries-freeze-frame-scientists-use-new-electron-microscope-cryo-em-explore-mysteries',
    publishedAgo: '4y ago'
  },
  {
    id: 'engineering-health-innovation',
    category: 'Health',
    headline: 'ASU and Mayo launch biomedical engineering innovation pathway',
    paragraph1:
      'Health innovation needs both clinic insight and engineering speed. ASU and Mayo Clinic are formalizing a program that trains students to build practical care technologies.',
    paragraph2:
      'The alliance adds routes for clinical immersion, entrepreneurship and design-center prototyping. It is designed to move ideas from concept to patient-centered solutions faster.',
    tags: ['#biomedical', '#mayo', '#healthinnovation'],
    readTimeSeconds: 37,
    imageUrl: 'https://news.asu.edu/sites/default/files/2024-10/SBHSE-Mayo-2024-EG-0384-a%20%285%29.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20241101-health-and-medicine-asu-mayo-clinic-forge-new-health-innovation-program',
    publishedAgo: '1y ago'
  },
  {
    id: 'first-gen-stories',
    category: 'Campus',
    headline: 'First-gen Sun Devil story highlights mentorship and momentum',
    paragraph1:
      'First-generation students often navigate college without a family playbook. ASU profiles show how mentorship and community support can turn uncertainty into leadership.',
    paragraph2:
      'One featured student connected sustainability and social justice through interdisciplinary study. The story underscores ASU’s broader first-gen support ecosystem and identity-affirming programs.',
    tags: ['#firstgen', '#studentsuccess', '#mentorship'],
    readTimeSeconds: 30,
    imageUrl: 'https://news.asu.edu/sites/default/files/styles/quarter_width/public/2024-11/mauricio_0_0.jpeg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20241107-sun-devil-community-asu-firstgen-college-student-leader-sustainability-social-justice',
    publishedAgo: '1y ago'
  },
  {
    id: 'dreamscape-classrooms',
    category: 'Humanities',
    headline: 'Dreamscape classrooms bring immersive storytelling into science learning',
    paragraph1:
      'Instead of only reading a chapter, students step inside a narrative world. ASU’s Dreamscape Learn model blends cinematic storytelling with active-learning design to lift engagement.',
    paragraph2:
      'The approach now extends beyond ASU into K–12 classrooms, where mobile and fixed labs support biology instruction. Early reports highlight stronger attention and hands-on participation.',
    tags: ['#vrlearning', '#edtech', '#classroominnovation'],
    readTimeSeconds: 39,
    imageUrl: 'https://news.asu.edu/sites/default/files/2025-11/20251119%20DreamscapeLearnMobilePodPendergastElementary_0105.jpg',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20251120-science-and-technology-asu-dreamscape-learn-bring-immersive-vr-biology-classrooms-phoenix',
    publishedAgo: '5mo ago'
  },
  {
    id: 'asu-london-expansion',
    category: 'Business',
    headline: 'ASU London expansion adds dual-degree route in the UK',
    paragraph1:
      'ASU is exporting its learning model by building a stronger U.K. footprint. The new ASU London launch expands project-based degrees tied to global employability.',
    paragraph2:
      'Students can combine a U.K. bachelor’s path with an accelerated ASU master’s track. The structure is meant to cut time and cost while offering cross-border academic experience.',
    tags: ['#globaleducation', '#london', '#innovation'],
    readTimeSeconds: 40,
    imageUrl: 'https://news.asu.edu/sites/default/files/2025-11/20251105_ASU_L_ASUNEWS_Hero%20%281%29.png',
    imageCredit: 'ASU News',
    sourceUrl: 'https://news.asu.edu/20251120-university-news-asu-launches-asu-london-bringing-global-reputation-innovation-uk',
    publishedAgo: '5mo ago'
  }
];
