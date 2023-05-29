import {
  AppFeatureSection,
  AppFeatureSectionProps,
  HomeHero
} from '@/features/promo';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <div className="p-16 w-full flex flex-col space-y-12">
        {appFeatureSections.map(appfeatureSection => (
          <AppFeatureSection
            key={appfeatureSection.title}
            {...appfeatureSection}
          />
        ))}
      </div>
    </div>
  );
}

const appFeatureSections: AppFeatureSectionProps[] = [
  {
    index: '01.',
    title: 'Summarise',
    img: {
      src: '/previews/summarise-preview.jpg',
      alt: 'summarise feature preview'
    },
    description:
      'Save time and get a summarised version of your textbooks or homework in just seconds!',
    href: '/summarise'
  },
  {
    index: '02.',
    title: 'Explain',
    img: {
      src: '/previews/explain-preview.jpg',
      alt: 'explain feature preview'
    },
    description:
      "Have a question or want to understand your academic content better? \
      StudyGPT's Explain feature explains concepts to you in a simple and easy to understand way. \
      Additionally, you can interact with StudyGPT to get further clarifications.",
    href: '/explain'
  },
  {
    index: '03.',
    title: 'Flash Card',
    img: {
      src: '/previews/flash-card-preview.jpg',
      alt: 'flash card feature preview'
    },
    description:
      "Tired of taking hours to manually create your own flash cards? Introducing to you StudyGPT's Flash Card feature! \
      StudyGPT's Flash Card allows you to upload the texts that you want to be tested on and a compilation of flash cards will be generated just for you.",
    href: '/flash-card'
  }
];
