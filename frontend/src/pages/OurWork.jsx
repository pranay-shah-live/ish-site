import { useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { portfolio } from '@/data/content';
import ContactCTA from '@/components/ContactCTA';

const categories = ['All', ...new Set(portfolio.map(p => p.category))];

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

function PortfolioCard({ item, index }) {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });
  return (
    <div
      ref={ref}
      className={`portfolio-card brutalist-card overflow-hidden group reveal ${inView ? 'visible' : ''}`}
      style={{ transitionDelay: `${index * 80}ms` }}
      data-testid={`portfolio-card-${index}`}
    >
      <div className="relative aspect-[16/10] overflow-hidden">
        <img
          src={item.image}
          alt={item.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="portfolio-card-overlay">
          <div className="text-white">
            <p className="font-body text-sm leading-relaxed">{item.description}</p>
          </div>
        </div>
      </div>
      <div className="p-6">
        <div className="flex items-center gap-3 mb-3">
          <span className="font-heading text-[10px] uppercase tracking-[0.2em] bg-foreground text-white px-2.5 py-1 border border-black">
            {item.category}
          </span>
          <span className="font-heading text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            {item.year}
          </span>
        </div>
        <h3 className="font-heading text-xl uppercase font-bold text-foreground">
          {item.title}
        </h3>
      </div>
    </div>
  );
}

export default function OurWork() {
  const [activeFilter, setActiveFilter] = useState('All');

  const filtered = activeFilter === 'All'
    ? portfolio
    : portfolio.filter(p => p.category === activeFilter);

  return (
    <>
      <section
        className="bg-foreground pt-28 md:pt-36 pb-16 md:pb-20"
        aria-labelledby="work-heading"
        data-testid="our-work-hero"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <span className="font-heading text-xs uppercase tracking-[0.3em] text-secondary">
            Portfolio
          </span>
          <h1
            id="work-heading"
            className="font-heading text-5xl md:text-6xl lg:text-7xl font-bold uppercase text-white leading-[0.95] mt-2"
          >
            Our Work
          </h1>
          <p className="font-body text-lg text-gray-300 mt-4 max-w-xl leading-relaxed">
            From live cricket broadcasting to Bollywood films, we're making India's biggest moments accessible through Indian Sign Language.
          </p>
        </div>
      </section>

      <section
        className="bg-white py-12 md:py-20"
        aria-label="Portfolio projects"
        data-testid="portfolio-grid-section"
      >
        <div className="max-w-7xl mx-auto px-4 md:px-8">
          <Reveal>
            <div className="flex flex-wrap gap-3 mb-10" role="tablist" aria-label="Filter portfolio">
              {categories.map(cat => (
                <button
                  key={cat}
                  onClick={() => setActiveFilter(cat)}
                  className={`font-heading text-xs uppercase tracking-widest px-4 py-2 border-2 transition-colors ${
                    activeFilter === cat
                      ? 'border-black bg-foreground text-white'
                      : 'border-gray-300 text-foreground hover:border-black'
                  }`}
                  role="tab"
                  aria-selected={activeFilter === cat}
                  data-testid={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </Reveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filtered.map((item, i) => (
              <PortfolioCard key={item.title} item={item} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="text-center font-body text-muted-foreground py-20" data-testid="no-results">
              No projects found in this category.
            </p>
          )}
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
