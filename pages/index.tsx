import {
  AppFeatureSection,
  AppFeatureSectionProps,
  HomeHero
} from '@/features/promo';

export default function Home() {
  return (
    <div>
      <HomeHero />
      <div className="p-16 w-full flex flex-col space-y-16">
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
      'Unlock the essence of complex concepts effortlessly. \
      Our summarization feature condenses lengthy and abstract notes into sleek summaries, giving you a sneak peek into the bigger picture.',
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
      'No more doubts holding you back! \
      Our interactive platform provides instant, intelligent responses to your queries, empowering you to clarify new concepts whenever you need.',
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
      "Retain knowledge for the long term and elevate your learning. \
      Craft personalized flashcards based on your own notes, reinforcing your understanding of the concepts you've learned.",
    href: '/flash-card'
  }
];
