import { useInView } from 'react-intersection-observer';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Tv, Newspaper, Film, Building2, Video, GraduationCap,
} from 'lucide-react';
import { companyInfo, stats, services, testimonials, clients } from '@/data/content';
import ContactCTA from '@/components/ContactCTA';

const iconMap = { Tv, Newspaper, Film, Building2, Video, GraduationCap };

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

function HeroSection() {
  return (
    <section
      className="bg-foreground min-h-screen flex items-center pt-20 md:pt-0"
      aria-labelledby="hero-heading"
      data-testid="hero-section"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-0 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center">
          <div>
            <span className="inline-block font-heading text-xs uppercase tracking-[0.3em] text-secondary mb-4 border-2 border-secondary px-3 py-1">
              India's First Deaf-Led Media House
            </span>
            <h1
              id="hero-heading"
              className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[0.95] mb-6"
            >
              Sign Language<br />
              <span className="text-accent">is a Superpower</span>
            </h1>
            <p className="font-body text-lg md:text-xl text-gray-300 mb-8 max-w-lg leading-relaxed">
              {companyInfo.description}
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                to="/our-work"
                className="brutalist-btn bg-primary text-white px-8 py-4 text-base"
                data-testid="hero-cta-our-work"
              >
                See Our Work
                <ArrowRight size={20} aria-hidden="true" />
              </Link>
              <a
                href={`mailto:${companyInfo.email}`}
                className="brutalist-btn bg-white text-black px-8 py-4 text-base"
                data-testid="hero-cta-contact"
              >
                Get In Touch
              </a>
            </div>
          </div>

          <div className="video-container" data-testid="hero-video">
            <iframe
              src={`https://www.youtube.com/embed/${companyInfo.heroVideoId}?rel=0`}
              title="ISH News - India Signing Hands"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBar() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.2 });
  return (
    <section
      ref={ref}
      className="bg-primary py-10 md:py-14"
      aria-label="Key statistics"
      data-testid="stats-section"
    >
      <div className={`max-w-7xl mx-auto px-4 md:px-8 stagger-children ${inView ? 'visible' : ''}`}>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
          {stats.map((stat, i) => (
            <div key={i} data-testid={`stat-item-${i}`}>
              <div className="font-heading text-3xl md:text-5xl font-bold text-white">{stat.value}</div>
              <div className="font-heading text-xs md:text-sm uppercase tracking-widest text-blue-200 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function LogoWall() {
  return (
    <section
      className="bg-white py-12 md:py-16 border-b-2 border-black overflow-hidden"
      aria-label="Our clients and partners"
      data-testid="logo-wall-section"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8 mb-8">
        <h2 className="font-heading text-xs uppercase tracking-[0.3em] text-muted-foreground text-center">
          Trusted By
        </h2>
      </div>
      <div className="relative overflow-hidden">
        <div className="marquee-track" aria-hidden="true">
          {[...clients, ...clients].map((client, i) => (
            <span
              key={i}
              className="inline-flex items-center px-10 md:px-14 font-heading text-xl md:text-2xl uppercase tracking-wider text-foreground whitespace-nowrap opacity-60"
            >
              {client}
              <span className="ml-10 md:ml-14 w-2 h-2 bg-secondary rotate-45 flex-shrink-0" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

function ServicesSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.05 });
  return (
    <section
      ref={ref}
      className="bg-muted py-16 md:py-24"
      aria-labelledby="services-heading"
      data-testid="services-section"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-secondary">What We Do</span>
          <h2 id="services-heading" className="font-heading text-4xl md:text-5xl font-bold uppercase text-foreground mt-2 mb-12">
            Our Services
          </h2>
        </Reveal>

        <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 stagger-children ${inView ? 'visible' : ''}`}>
          {services.map((service, i) => {
            const Icon = iconMap[service.icon];
            return (
              <div
                key={i}
                className="brutalist-card p-8 flex flex-col"
                data-testid={`service-card-${i}`}
              >
                <div
                  className="w-12 h-12 flex items-center justify-center border-2 border-black mb-5"
                  style={{ backgroundColor: service.color }}
                >
                  {Icon && <Icon size={24} className="text-white" aria-hidden="true" />}
                </div>
                <h3 className="font-heading text-xl uppercase font-bold text-foreground mb-3">
                  {service.title}
                </h3>
                <p className="font-body text-base text-muted-foreground leading-relaxed">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <section
      ref={ref}
      className="bg-white py-16 md:py-24 border-t-2 border-black"
      aria-labelledby="testimonials-heading"
      data-testid="testimonials-section"
    >
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <Reveal>
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-secondary">What People Say</span>
          <h2 id="testimonials-heading" className="font-heading text-4xl md:text-5xl font-bold uppercase text-foreground mt-2 mb-12">
            Testimonials
          </h2>
        </Reveal>

        <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 stagger-children ${inView ? 'visible' : ''}`}>
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="brutalist-card p-8 relative"
              data-testid={`testimonial-card-${i}`}
            >
              <span className="quote-mark" aria-hidden="true">"</span>
              <blockquote className="relative pt-8">
                <p className="font-body text-base text-foreground leading-relaxed mb-6">
                  "{t.quote}"
                </p>
                <footer className="flex items-center gap-3">
                  {t.hasImage ? (
                    <img
                      src={t.image}
                      alt={t.author}
                      className="w-12 h-12 object-cover border-2 border-black"
                      loading="lazy"
                    />
                  ) : (
                    <div
                      className="w-12 h-12 flex items-center justify-center border-2 border-black text-white font-heading text-lg font-bold"
                      style={{ backgroundColor: t.color }}
                      aria-hidden="true"
                    >
                      {t.author.charAt(0)}
                    </div>
                  )}
                  <div>
                    <cite className="font-heading text-sm uppercase font-bold not-italic block">{t.author}</cite>
                    <span className="font-body text-xs text-muted-foreground">{t.role}</span>
                  </div>
                </footer>
              </blockquote>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBar />
      <LogoWall />
      <ServicesSection />
      <TestimonialsSection />
      <ContactCTA />
    </>
  );
}
