import { useInView } from 'react-intersection-observer';
import { team } from '@/data/content';
import ContactCTA from '@/components/ContactCTA';

function Reveal({ children, className = '', delay = 0 }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`reveal ${inView ? 'visible' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

function TeamCard({ member, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  const initials = member.name.split(' ').map(n => n[0]).join('');

  return (
    <div
      ref={ref}
      className={`brutalist-card text-center reveal ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      data-testid={`team-card-${index}`}
    >
      <div
        className="team-avatar"
        style={{ backgroundColor: member.color }}
        aria-hidden="true"
      >
        {initials}
      </div>
      <div className="p-5">
        <h3 className="font-heading text-lg uppercase font-bold text-foreground">
          {member.name}
        </h3>
        <p className="font-heading text-xs uppercase tracking-widest text-primary mt-1">
          {member.role}
        </p>
        <p className="font-body text-sm text-muted-foreground mt-3 leading-relaxed">
          {member.bio}
        </p>
      </div>
    </div>
  );
}

export default function OurTeam() {
  const { ref: gridRef, inView: gridInView } = useInView({ triggerOnce: true, threshold: 0.05 });

  return (
    <>
      <section
        className="bg-foreground pt-28 md:pt-36 pb-16 md:pb-20"
        aria-labelledby="team-heading"
        data-testid="our-team-hero"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-secondary">
            The People Behind ISH
          </span>
          <h1
            id="team-heading"
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[0.95] mt-2"
          >
            Our Team
          </h1>
          <p className="font-body text-lg text-gray-300 mt-4 max-w-xl leading-relaxed">
            A hardworking team of Deaf professionals and CODAs (Children of Deaf Adults) driving accessibility across India.
          </p>
        </div>
      </section>

      <section
        className="bg-white py-12 md:py-16 border-b-2 border-black"
        aria-label="Team group photo"
        data-testid="team-group-photo"
      >
        <div className="max-w-5xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="brutalist-card overflow-hidden">
              <img
                src="https://indiasigninghands.com/wp-content/uploads/2021/11/YouTube-Creator-Award-2021.jpg"
                alt="ISH team receiving the YouTube Silver Creator Award in 2021 - Alok Kejriwal, Aqil Chinoy, Mansi Shah and team"
                className="w-full h-auto object-cover"
                loading="lazy"
              />
              <div className="p-4 bg-foreground text-white">
                <p className="font-heading text-sm uppercase tracking-widest text-center">
                  ISH Team at the YouTube Silver Creator Award Ceremony, 2021
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <section
        ref={gridRef}
        className="bg-muted py-16 md:py-24"
        aria-labelledby="team-members-heading"
        data-testid="team-members-section"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <h2
              id="team-members-heading"
              className="font-heading text-3xl md:text-4xl font-bold uppercase text-foreground mb-10"
            >
              Meet the Team
            </h2>
          </Reveal>

          <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 stagger-children ${gridInView ? 'visible' : ''}`}>
            {team.map((member, i) => (
              <TeamCard key={member.name} member={member} index={i} />
            ))}
          </div>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
