import { BlogPost, Project, CVData } from '../types';

export const DEFAULT_PROFILE_PHOTO = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=500&q=80';

export function getProfilePhoto(): string {
  try {
    const saved = localStorage.getItem('sp_profile_photo');
    return saved || DEFAULT_PROFILE_PHOTO;
  } catch {
    return DEFAULT_PROFILE_PHOTO;
  }
}

export function saveProfilePhoto(url: string): void {
  try {
    localStorage.setItem('sp_profile_photo', url);
  } catch (e) {
    console.error('Failed to save profile photo', e);
  }
}

export const cvData: CVData = {
  name: 'Ponlork Sreyka',
  name_km: 'ពន្លក ស្រីកា',
  title: 'Digital Economy Student',
  title_km: 'និស្សិតសេដ្ឋកិច្ចឌីជីថល',
  avatar_url: DEFAULT_PROFILE_PHOTO,
  email: 'sreykaponlork@gmail.com',
  phone: '+855 96 888 7766',
  location: 'Phnom Penh, Cambodia',
  location_km: 'រាជធានីភ្នំពេញ កម្ពុជា',
  portfolio_url: 'https://ponlorksreyka.dev',
  github_url: 'https://github.com/sreykaponlork',
  linkedin_url: 'https://linkedin.com/in/sreyka-ponlork',
  summary:
    'Dedicated Digital Economy student at the National University of Management (NUM) with practical internship experience in HR recruitment, candidate communications, and document coordination at WEduShare / Weduabroad. Enthusiastic about digital business, office tools, and bilingual cross-cultural communication.',
  summary_km:
    'ជានិស្សិតផ្នែកសេដ្ឋកិច្ចឌីជីថលនៅសាកលវិទ្យាល័យជាតិគ្រប់គ្រង (NUM) ដែលមានបទពិសោធន៍កម្មសិក្សាជាក់ស្តែងផ្នែកជ្រើសរើសធនធានមនុស្ស (HR Recruitment) ការប្រាស្រ័យទាក់ទងជាមួយបេក្ខជន និងការសម្របសម្រួលឯកសារនៅ WEduShare / Weduabroad។ មានការប្តេជ្ញាចិត្តខ្ពស់ក្នុងការរៀនសូត្រ ជំនាញការិយាល័យ និងការទំនាក់ទំនងពហុភាសា។',
  experiences: [
    {
      role: 'HR Recruitment Intern',
      role_km: 'កម្មសិក្សាការីផ្នែកជ្រើសរើសបុគ្គលិក (HR Recruitment Intern)',
      company: 'WEduShare / Weduabroad',
      period: '6-month internship',
      period_km: 'កម្មសិក្សារយៈពេល ៦ ខែ',
      location: 'Phnom Penh, Cambodia',
      description: [
        'Assisted with recruitment and interviews.',
        'Followed up with candidates through Telegram.',
        'Collected CVs and identification documents.',
        'Assisted with visitor and client communication.',
        'Helped prepare internship recruitment announcements.',
      ],
      description_km: [
        'ជួយសម្របសម្រួលការជ្រើសរើស និងការសម្ភាសន៍បុគ្គលិក។',
        'តាមដាន និងទាក់ទងបេក្ខជនតាមរយៈ Telegram។',
        'ប្រមូល និងរៀបចំឯកសារ CV ព្រមទាំងឯកសារបញ្ជាក់អត្តសញ្ញាណប័ណ្ណ។',
        'ជួយសម្របសម្រួលការទំនាក់ទំនងជាមួយភ្ញៀវ និងអតិថិជន។',
        'ជួយរៀបចំការប្រកាសជ្រើសរើសកម្មសិក្សាការី (Internship Announcements)។',
      ],
    },
  ],
  education: [
    {
      degree: "Bachelor's Degree in Digital Economy",
      degree_km: 'បរិញ្ញាបត្រសេដ្ឋកិច្ចឌីជីថល',
      institution: 'National University of Management (NUM)',
      period: 'Currently studying • Completed Year 1',
      period_km: 'កំពុងសិក្សា • បានបញ្ចប់ឆ្នាំទី១',
      details: 'Faculty of Digital Economy. Completed Year 1.',
      details_km: 'មហាវិទ្យាល័យសេដ្ឋកិច្ចឌីជីថល។ បានបញ្ចប់ឆ្នាំទី១។',
    },
  ],
  technical_skills: [
    {
      category: 'Software & Tools',
      category_km: 'កម្មវិធី និងឧបករណ៍',
      skills: ['Microsoft Word', 'Microsoft Excel', 'Microsoft PowerPoint', 'Canva', 'Basic Photoshop'],
    },
    {
      category: 'Professional Skills',
      category_km: 'ជំនាញវិជ្ជាជីវៈ',
      skills: ['Communication', 'Teamwork', 'Recruitment Support'],
    },
  ],
  soft_skills: [
    { en: 'Communication', km: 'ការទំនាក់ទំនង' },
    { en: 'Teamwork', km: 'ការធ្វើការងារជាក្រុម' },
    { en: 'Recruitment Support', km: 'ការគាំទ្រការជ្រើសរើសបុគ្គលិក' },
  ],
  languages: [
    { language: 'Khmer', language_km: 'ភាសាខ្មែរ' },
    { language: 'English', language_km: 'ភាសាអង់គ្លេស' },
    { language: 'Chinese', language_km: 'ភាសាចិន' },
    { language: 'French', language_km: 'ភាសាបារាំង' },
  ],
  certifications: [
    {
      name: 'Certificate of Internship Completion',
      name_km: 'វិញ្ញាបនបត្របញ្ចប់កម្មសិក្សា',
      issuer: 'WEduShare / Weduabroad',
      year: '2024',
    },
  ],
};

export const initialBlogPosts: BlogPost[] = [
  {
    id: 'digital-post-1',
    title: "The Rise of Cambodia's Digital Economy and E-Payment Revolution",
    title_km: "ការរីកចម្រើននៃសេដ្ឋកិច្ចឌីជីថលនៅកម្ពុជា និងបដិវត្តន៍នៃការទូទាត់អេឡិចត្រូនិក",
    slug: 'cambodia-digital-economy-epayment-revolution',
    excerpt:
      'How digital payment innovations, the KHQR standard, and mobile banking are accelerating business efficiency and financial inclusion across Cambodia.',
    excerpt_km:
      'របៀបដែលនវានុវត្តន៍ការទូទាត់ឌីជីថល ស្តង់ដារ KHQR និងប្រព័ន្ធធនាគារចល័តកំពុងជំរុញប្រសិទ្ធភាពអាជីវកម្ម និងបរិយាបន្នហិរញ្ញវត្ថុនៅកម្ពុជា។',
    content: `
### The Digital Payment Transformation in Cambodia

Over the past few years, Cambodia has experienced an extraordinary leap in financial technology and digital payments. What once required cash transactions has now seamlessly transitioned to cashless QR code scans across supermarkets, local markets, educational institutions, and street food stalls.

#### 1. The Role of National Payment Infrastructures
The widespread adoption of unified QR standards (such as KHQR) and inter-bank payment systems has simplified how consumers and merchants transact daily. Rather than needing individual terminal hardware, vendors only require a printed QR code linked directly to their business account.

#### 2. Empowering Micro, Small, and Medium Enterprises (MSMEs)
For small entrepreneurs, digital payments eliminate the risks of handling paper cash, reduce transaction friction, and automatically generate clean digital transaction logs. This digital footprint is vital for small business owners when applying for formal credit or managing inventory.

#### 3. Opportunities for Digital Economy Students
Studying the digital economy provides firsthand insights into how technology transforms traditional markets. As consumer habits evolve, future business leaders will leverage these digital rails for cross-border e-commerce, digital bookkeeping, and automated billing.
    `,
    content_km: `
### ការផ្លាស់ប្តូរការទូទាត់ឌីជីថលនៅប្រទេសកម្ពុជា

ប៉ុន្មានឆ្នាំចុងក្រោយនេះ ប្រទេសកម្ពុជាទទួលបានការរីកចម្រើនយ៉ាងឆាប់រហ័សលើបច្ចេកវិទ្យាហិរញ្ញវត្ថុ (FinTech) និងការទូទាត់ឌីជីថល។ អ្វីដែលធ្លាប់តែពឹងផ្អែកលើក្រដាសប្រាក់សុទ្ធ ឥឡូវនេះបានប្តូរមកជាការស្កេន QR Code យ៉ាងទូលំទូលាយ។

#### ១. តួនាទីនៃប្រព័ន្ធទូទាត់រួម (KHQR)
ការអនុវត្តស្តង់ដាររួម KHQR បានជួយសម្រួលដល់ការទូទាត់រវាងធនាគារផ្សេងៗគ្នា ដោយអ្នកលក់គ្រាន់តែមានស្លាក QR មួយ អាចទទួលប្រាក់ពីអតិថិជននៃគ្រប់ធនាគារ។

#### ២. ការលើកកម្ពស់អាជីវកម្មខ្នាតតូច និងមធ្យម (MSMEs)
ការទូទាត់តាមប្រព័ន្ធឌីជីថលជួយកាត់បន្ថយការបាត់បង់សាច់ប្រាក់ និងបង្កើតនូវប្រវត្តិប្រតិបត្តិការហិរញ្ញវត្ថុដែលគួរឱ្យទុកចិត្ត។

#### ៣. ឱកាសសម្រាប់និស្សិតសេដ្ឋកិច្ចឌីជីថល
ការយល់ដឹងអំពីសេដ្ឋកិច្ចឌីជីថលជួយឱ្យយើងមើលឃើញពីកាលានុវត្តភាពនៃការធ្វើពាណិជ្ជកម្មតាមប្រព័ន្ធអេឡិចត្រូនិក និងការគ្រប់គ្រងអាជីវកម្មបែបទំនើប។
    `,
    cover_image: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=1000&q=80',
    category: 'Digital Economy',
    tags: ['Digital Economy', 'FinTech', 'E-Payment', 'KHQR', 'Cambodia'],
    author: 'Ponlork Sreyka',
    created_at: '2026-03-08T08:00:00Z',
    published: true,
    read_time: '5 min read',
    language: 'both',
    views: 780,
  },
  {
    id: 'digital-post-2',
    title: 'Essential Digital Skills Every Modern Student and Professional Needs',
    title_km: 'ជំនាញឌីជីថលសំខាន់ៗដែលនិស្សិត និងបុគ្គលិកសម័យទំនើបត្រូវមាន',
    slug: 'essential-digital-skills-for-modern-professionals',
    excerpt:
      'Why masteries in productivity software, cloud documentation, visual communication in Canva, and basic data analytics are vital in today’s digital workplace.',
    excerpt_km:
      'ហេតុអ្វីបានជាភាពស្ទាត់ជំនាញលើកម្មវិធីការិយាល័យ ការរៀបចំឯកសារលើ Cloud ការរចនាលើ Canva និងការវិភាគទិន្នន័យជាមូលដ្ឋាន មានសារៈសំខាន់ក្នុងទីផ្សារការងារឌីជីថល។',
    content: `
### Building a Strong Foundation in Digital Competencies

In an increasingly digitized economy, technical skills are no longer limited to computer programmers. Digital literacy has become the core baseline for every business, finance, management, and administrative professional.

#### 1. Advanced Office Productivity & Data Handling
Proficiency in tools like Microsoft Excel, Google Sheets, Word, and PowerPoint remains the cornerstone of daily business execution. Knowing how to structure tabular data, utilize lookup functions, create pivot summaries, and formulate visual charts allows professionals to present insights clearly to decision makers.

#### 2. Visual Content Creation for Business
Platforms like Canva and Adobe tools enable professionals to create polished announcements, reports, social media graphics, and presentation pitch decks without outsourcing every small design task.

#### 3. Asynchronous Communication & Collaboration
With remote and hybrid teams, digital communication tools like Telegram channels, Slack, and cloud storage (Google Drive, OneDrive) ensure teams maintain clear records, timely responses, and smooth workflows.
    `,
    content_km: `
### ការកសាងមូលដ្ឋានគ្រឹះរឹងមាំលើជំនាញឌីជីថល

នៅក្នុងសេដ្ឋកិច្ចឌីជីថល ជំនាញបច្ចេកវិទ្យាមិនមែនសម្រាប់តែអ្នកសរសេរកូដនោះទេ។ ចំណេះដឹងឌីជីថលបានក្លាយជាមូលដ្ឋានគ្រឹះសម្រាប់គ្រប់វិស័យការងារ។

#### ១. កម្មវិធីការិយាល័យ និងការគ្រប់គ្រងទិន្នន័យ
ការប្រើប្រាស់ Microsoft Word, Excel និង PowerPoint យ៉ាងស្ទាត់ជំនាញជួយឱ្យការរៀបចំរបាយការណ៍ និងការវិភាគទិន្នន័យមានភាពរហ័ស និងត្រឹមត្រូវ។

#### ២. ការរចនាខ្លឹមសារមើលឃើញ (Visual Design)
កម្មវិធី Canva ជួយឱ្យយើងអាចបង្កើតបដាប្រកាស និងស្លាយបទបង្ហាញប្រកបដោយភាពទាក់ទាញ និងវិជ្ជាជីវៈ។

#### ៣. ទំនាក់ទំនងការងារតាមប្រព័ន្ធឌីជីថល
ការប្រើប្រាស់ Telegram និង Cloud Storage ជួយឱ្យការងារជាក្រុមមានភាពរលូន និងមិនបាត់បង់ឯកសារ។
    `,
    cover_image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1000&q=80',
    category: 'Digital Skills',
    tags: ['Digital Skills', 'Productivity', 'Canva', 'Excel', 'Career'],
    author: 'Ponlork Sreyka',
    created_at: '2026-02-28T10:30:00Z',
    published: true,
    read_time: '4 min read',
    language: 'both',
    views: 920,
  },
  {
    id: 'digital-post-3',
    title: 'How Small Businesses Can Transition to Digital Commerce in Southeast Asia',
    title_km: 'របៀបដែលអាជីវកម្មខ្នាតតូចអាចផ្លាស់ប្តូរទៅកាន់ពាណិជ្ជកម្មឌីជីថលនៅអាស៊ីអាគ្នេយ៍',
    slug: 'small-business-digital-commerce-transition',
    excerpt:
      'Practical strategies for local businesses to adopt social commerce, digital catalogs, seamless messaging, and automated record-keeping.',
    excerpt_km:
      'យុទ្ធសាស្ត្រជាក់ស្តែងសម្រាប់អាជីវកម្មក្នុងស្រុកក្នុងការចាប់យកពាណិជ្ជកម្មសង្គម កាតាឡុកឌីជីថល និងការកត់ត្រាទិន្នន័យស្វ័យប្រវត្តិ។',
    content: `
### The Roadmap from Offline Shop to Digital Commerce

Across Southeast Asia, the transition to digital commerce does not always require building an expensive custom website from day one. Many successful small enterprises start through conversational social commerce.

#### 1. Leveraging Social & Conversational Commerce
In Cambodia, platforms like Telegram, Facebook Messenger, and TikTok Shop drive a massive volume of consumer sales. Having structured digital product catalogs and quick-response customer support creates immediate customer trust.

#### 2. Digital Bookkeeping and Cash Flow Tracking
Transitioning away from physical paper notebooks to spreadsheet tracking or digital point-of-sale applications helps owners understand profit margins, top-selling items, and seasonal demand fluctuations.

#### 3. Building Customer Loyalty Digitally
Retaining customers through digital membership discounts, Telegram broadcast updates, and digital payment receipts encourages repeat purchases and word-of-mouth recommendations.
    `,
    content_km: `
### ដំណើរឆ្ពោះទៅកាន់ពាណិជ្ជកម្មឌីជីថលសម្រាប់អាជីវកម្មខ្នាតតូច

នៅអាស៊ីអាគ្នេយ៍ ការចាប់ផ្តើមពាណិជ្ជកម្មឌីជីថលមិនទាមទារឱ្យមានគេហទំព័រថ្លៃៗភ្លាមៗនោះទេ ប៉ុន្តែអាចចាប់ផ្តើមពី Social Commerce។

#### ១. ការប្រើប្រាស់បណ្តាញសង្គមក្នុងការលក់
Telegram, Facebook និង TikTok Shop គឺជាបណ្តាញដ៏មានប្រសិទ្ធភាពក្នុងការផ្សព្វផ្សាយ និងឆ្លើយតបអតិថិជន។

#### ២. ការកត់ត្រាចំណូលចំណាយតាមបែបឌីជីថល
ការប្តូរពីសៀវភៅកត់ត្រាមកប្រើប្រាស់ Excel ឬ App ជួយឱ្យដឹងពីប្រាក់ចំណេញ និងគ្រប់គ្រងស្តុកបានច្បាស់លាស់។
    `,
    cover_image: 'https://images.unsplash.com/photo-1556742049-0a67e557224d?w=1000&q=80',
    category: 'Digital Business',
    tags: ['E-Commerce', 'Social Commerce', 'SMEs', 'Business Growth'],
    author: 'Ponlork Sreyka',
    created_at: '2026-02-15T09:15:00Z',
    published: true,
    read_time: '5 min read',
    language: 'both',
    views: 650,
  },
  {
    id: 'digital-post-4',
    title: 'Digital Transformation in Human Resources: Modernizing Recruitment',
    title_km: 'ការផ្លាស់ប្តូរឌីជីថលក្នុងធនធានមនុស្ស៖ ទំនើបកម្មនៃការជ្រើសរើសបុគ្គលិក',
    slug: 'digital-transformation-in-human-resources',
    excerpt:
      'How digital channels like Telegram, cloud documents, and digital screening transform recruitment speed and candidate communication.',
    excerpt_km:
      'របៀបដែលបណ្តាញឌីជីថលដូចជា Telegram ឯកសារលើ Cloud និងការពិនិត្យបេក្ខជនតាមប្រព័ន្ធឌីជីថលជួយបង្កើនល្បឿននៃការជ្រើសរើសបុគ្គលិក។',
    content: `
### How Technology Reshapes Modern Recruitment

Human Resources (HR) has traditionally been heavy on paper applications and manual filing. Today, digital transformation is streamlining every phase of hiring, from announcement dissemination to candidate onboarding.

#### 1. Instant Candidate Engagement via Messaging
Using Telegram channels and dedicated messaging bots enables recruiters to respond to candidate questions immediately, share interview location pins, and send schedule reminders, drastically reducing interview no-show rates.

#### 2. Digital CV and Document Verification
Storing applicant resumes, educational credentials, and identification files securely on cloud platforms ensures applicant privacy while enabling hiring teams to evaluate candidates collaboratively in real time.

#### 3. Data-Driven Hiring Insights
Tracking where applicants discover job openings (social platforms, university portals, job fairs) helps organizations allocate recruitment budgets efficiently and identify the strongest talent pools.
    `,
    content_km: `
### បច្ចេកវិទ្យាក្នុងការផ្លាស់ប្តូរការងារធនធានមនុស្ស

ធនធានមនុស្ស (HR) ធ្លាប់តែពឹងផ្អែកលើការដាក់ពាក្យតាមក្រដាស។ បច្ចុប្បន្ន ប្រព័ន្ធឌីជីថលបានជួយពន្លឿនគ្រប់ដំណាក់កាល។

#### ១. ការទាក់ទងបេក្ខជនរហ័សតាម Telegram
ការផ្ញើសាររំលឹក និងការផ្តល់ព័ត៌មានតាម Telegram ជួយកាត់បន្ថយការខកខានការសម្ភាសន៍។

#### ២. ការរក្សាទុកឯកសារ CV លើ Cloud
ជួយឱ្យក្រុមការងារអាចពិនិត្យ និងវាយតម្លៃបេក្ខជនបានគ្រប់ពេលវេលា និងមានសុវត្ថិភាពខ្ពស់។
    `,
    cover_image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1000&q=80',
    category: 'Digital HR',
    tags: ['Digital HR', 'Recruitment', 'Telegram', 'Workflow'],
    author: 'Ponlork Sreyka',
    created_at: '2026-02-05T14:00:00Z',
    published: true,
    read_time: '4 min read',
    language: 'both',
    views: 810,
  },
];

// Project listing: ONLY Personal Portfolio Website as explicitly requested!
// "Remove Nearbyt completely. Do not display Nearbyt anywhere in the portfolio or CV. Do not invent replacement projects."
export const portfolioProjects: Project[] = [
  {
    id: 'proj-1',
    title: 'Personal Portfolio Website',
    title_km: 'គេហទំព័រ Portfolio ផ្ទាល់ខ្លួន',
    description:
      'My bilingual personal portfolio and CV website built with React, Vite, and Supabase. Features a soft pink aesthetic, A4 printable CV export, blog management system, and responsive design.',
    description_km:
      'គេហទំព័រ Portfolio និង CV ផ្ទាល់ខ្លួនទ្វេភាសា ដែលបង្កើតឡើងដោយ React, Vite និង Supabase។ បំពាក់ដោយរចនាបថពណ៌ផ្កាឈូកស្រាល ប្រព័ន្ធទាញយក CV ទំហំ A4 ប្រព័ន្ធគ្រប់គ្រងប្លុក និងដំណើរការយ៉ាងរលូនលើគ្រប់ទូរស័ព្ទ។',
    category: 'web',
    tags: ['React', 'Vite', 'Supabase', 'Tailwind CSS', 'Bilingual'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&q=80',
    demo_url: 'https://ponlorksreyka.dev',
    github_url: 'https://github.com/sreykaponlork',
    featured: true,
    completed_date: '2026',
  },
];
