import React from 'react';
import {
  motion,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from 'framer-motion';
import { Menu, ArrowRight } from 'lucide-react';

const avatarImages = [
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=240&q=80',
  'https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=240&q=80',
];

const heroProfiles = avatarImages;

const services = [
  {
    eyebrow: 'Office of multiple interest content',
    title: 'Collaborative & partnership',
  },
  {
    eyebrow: 'The hanger US Air force digital experimental',
    title: 'We talk about our weight',
  },
  {
    eyebrow: 'Delta faucet content, social, digital',
    title: 'Piloting digital confidence',
  },
];

function Highlight({ children, tone = 'mint' }) {
  return <span className={`highlight highlight-${tone}`}>{children}</span>;
}

function Underline({ children }) {
  return <span className="underline-mark">{children}</span>;
}

const revealSection = {
  initial: { opacity: 0, y: 60 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.8 },
};

function useSubtleParallax(max = 15) {
  const reduceMotion = useReducedMotion();
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const smoothX = useSpring(mouseX, { stiffness: 90, damping: 24, mass: 0.35 });
  const smoothY = useSpring(mouseY, { stiffness: 90, damping: 24, mass: 0.35 });
  const x = useTransform(smoothX, [-1, 1], [-max, max]);
  const y = useTransform(smoothY, [-1, 1], [-max, max]);

  const onMouseMove = (event) => {
    if (reduceMotion) return;
    const rect = event.currentTarget.getBoundingClientRect();
    mouseX.set(((event.clientX - rect.left) / rect.width - 0.5) * 2);
    mouseY.set(((event.clientY - rect.top) / rect.height - 0.5) * 2);
  };

  const onMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return {
    containerProps: { onMouseMove, onMouseLeave },
    style: reduceMotion ? undefined : { x, y },
  };
}

function Navbar() {
  return (
    <header className="site-header">
      <nav className="navbar" aria-label="Primary navigation">
        <a className="logo" href="#home">Elementum</a>
        <ul className="nav-links">
          {['Home', 'Studio', 'Services', 'Contact', "FAQ's"].map((item) => (
            <li key={item}>
              <a href={`#${item.toLowerCase().replace(/[^a-z]/g, '')}`}>{item}</a>
            </li>
          ))}
        </ul>
        <button className="icon-button" aria-label="Open navigation menu">
          <Menu size={24} strokeWidth={1.7} />
        </button>
      </nav>
    </header>
  );
}

function FloatingBadge({ label, className }) {
  return (
    <motion.div className={`floating-badge ${className}`}>
      <span className="badge-dot badge-dot-pink" />
      <span className="badge-dot badge-dot-yellow" />
      <span>{label}</span>
    </motion.div>
  );
}

function Hero() {
  const reduceMotion = useReducedMotion();
  const purpleParallax = useSubtleParallax(15);
  const waveParallax = useSubtleParallax(15);
  const headlineLines = [
    <>The <Underline>thinkers</Underline> and</>,
    <>doers were <Highlight tone="pink">changing</Highlight></>,
    <>the <Highlight>status</Highlight> <span className="mobile-break">Quo with</span></>,
  ];

  return (
    <section className="hero section-pad" id="home" {...purpleParallax.containerProps}>
      <motion.div
        className="purple-blob hero-blob"
        style={purpleParallax.style}
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
      />
      <motion.svg
        className="hero-margin-waves"
        viewBox="0 0 92 230"
        style={waveParallax.style}
        aria-hidden="true"
        {...waveParallax.containerProps}
      >
        <path className="hero-wave-red" d="M4 20 C44 34, 44 76, 4 92 C48 112, 48 166, 4 188" />
        <path className="hero-wave-black" d="M34 8 C82 24, 82 65, 36 88 C78 112, 78 166, 36 192" />
      </motion.svg>
      <div className="container hero-inner">
        <motion.h1
          initial="hidden"
          animate="show"
          variants={{
            hidden: {},
            show: {
              transition: { staggerChildren: reduceMotion ? 0 : 0.15 },
            },
          }}
        >
          {headlineLines.map((line, index) => (
            <motion.span
              className="hero-headline-line"
              key={index}
              variants={{
                hidden: { opacity: 0, y: reduceMotion ? 0 : 40 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: reduceMotion ? 0 : 0.8, ease: 'easeOut' }}
            >
              {line}
            </motion.span>
          ))}
        </motion.h1>
        <p>
          We are a team of strategists, designers communicators, researchers.
          Together, we belive that progress only happens when you refuse to play
          things safe.
        </p>
        <div className="hero-orbit" aria-label="Creative team portraits">
          {heroProfiles.map((image, index) => (
            <motion.img
              key={image}
              className={`avatar hero-avatar hero-avatar-${index + 1}`}
              src={image}
              alt=""
              animate={reduceMotion ? undefined : { y: [-12, 12, -12], scale: [1, 1.04, 1] }}
              transition={{
                duration: [4, 5, 6][index % 3],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <motion.section className="about section-pad" id="studio" {...revealSection}>
      <div className="container about-wrap">
        <svg className="about-curve about-curve-main" viewBox="0 0 720 360" aria-hidden="true">
          <path d="M720 8 C660 32, 642 108, 592 176 C546 238, 485 265, 382 229 C278 194, 202 168, 112 192 C62 206, 28 228, 0 252" />
        </svg>
        <svg className="about-curve about-curve-bottom" viewBox="0 0 460 150" aria-hidden="true">
          <path d="M10 126 C70 8, 192 42, 276 88 C354 132, 416 130, 454 20" />
        </svg>

        <div className="about-row about-row-top">
          <div className="about-copy about-copy-top">
            <h2>
              <span className="about-heading-line"><Underline>Tomorrow</Underline> should</span>
              <span className="about-heading-line">
                be better than <Highlight>today</Highlight>
              </span>
            </h2>
            <p>
              We are a team of strategists, designers communicators, researchers.
              Together, we belive that progress only happens when you refuse to
              play things safe.
            </p>
            <a className="text-link" href="#services">
              Read more <ArrowRight size={18} />
            </a>
          </div>
          <div className="image-stage image-stage-right about-image-wash">
            <span className="decor-square" />
            <img
              className="circle-image circle-image-md"
              src="https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=720&q=80"
              alt="Business team in a meeting"
            />
          </div>
        </div>

        <div className="about-row about-row-reverse about-row-bottom">
          <div className="image-stage image-stage-left">
            <span className="decor-triangle decor-triangle-left" />
            <span className="decor-triangle decor-triangle-large" />
            <img
              className="circle-image circle-image-lg"
              src="https://images.unsplash.com/photo-1552664730-d307ca884978?auto=format&fit=crop&w=820&q=80"
              alt="Collaborators working at a laptop"
            />
          </div>
          <div className="about-copy about-copy-progress">
            <h2>
              <Highlight>See</Highlight> how we can help you{' '}
              <Underline>progress</Underline>
            </h2>
            <p>
              We add layer of fearless insights and action that allows change
              making accelerate their progress in areas such as brand, design
              systems and social research.
            </p>
            <a className="text-link" href="#services">
              Read more <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </div>
    </motion.section>
  );
}

function ServicesSection() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section className="services section-pad" id="services" {...revealSection}>
      <div className="container services-container">
        <svg className="services-curve" viewBox="0 0 430 170" aria-hidden="true">
          <path d="M0 146 C44 146, 42 108, 50 78 C68 6, 150 10, 222 34 C292 58, 356 92, 430 22" />
        </svg>
        <h2>
          <span className="services-heading-line">What we <Highlight>can</Highlight></span>
          <span className="services-heading-line"><Underline>offer</Underline> you!</span>
        </h2>
        <div className="service-list">
          {services.map((service, index) => (
            <motion.a
              className="service-row"
              href="#contact"
              key={service.title}
              whileHover={
                reduceMotion
                  ? undefined
                  : {
                      scale: 1.01,
                      backgroundColor: '#f4fbf6',
                      transition: { duration: 0.3 },
                    }
              }
            >
              <span className="service-eyebrow">{service.eyebrow}</span>
              <span className="service-title">
                {service.title}
                {index === 2 && (
                  <span className="service-sticker" aria-hidden="true">
                    FX
                  </span>
                )}
              </span>
              <motion.span
                className="service-arrow-wrap"
                whileHover={reduceMotion ? undefined : { x: 12 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="service-arrow" size={30} strokeWidth={1.5} />
              </motion.span>
            </motion.a>
          ))}
        </div>
      </div>
    </motion.section>
  );
}

function TestimonialSection() {
  const reduceMotion = useReducedMotion();
  return (
    <motion.section className="testimonials section-pad" {...revealSection}>
      <div className="container testimonial-wrap">
        <h2>
          <Highlight>What</Highlight> our customer says{' '}
          <Underline>About Us</Underline>
        </h2>
        <div className="testimonial-stage">
          {avatarImages.map((image, index) => (
            <motion.img
              key={image}
              className={`avatar testimonial-avatar testimonial-avatar-${index + 1}`}
              src={image}
              alt=""
              animate={reduceMotion ? undefined : { y: [-12, 12, -12], scale: [1, 1.04, 1] }}
              transition={{
                duration: [4, 5, 6][index % 3],
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}
          <article className="testimonial-card">
            <span className="quote-mark quote-mark-open" aria-hidden="true">
              “
            </span>
            <p>
              Elementum delivered the site with inthe timeline as they requested.
              Inthe end, the client found a 50% increase in traffic with in days
              since its launch. They also had an impressive ability to use
              technologies that the company hasn't used, which have also proved
              to be easy to use and reliable
            </p>
            <span className="quote-mark quote-mark-close" aria-hidden="true">
              ”
            </span>
          </article>
        </div>
      </div>
    </motion.section>
  );
}

function Newsletter() {
  const reduceMotion = useReducedMotion();
  const purpleParallax = useSubtleParallax(15);
  const arrowParallax = useSubtleParallax(15);
  return (
    <motion.section className="newsletter section-pad" id="contact" {...revealSection}>
      <motion.svg
        className="coral-arrows"
        viewBox="0 0 220 120"
        style={arrowParallax.style}
        aria-hidden="true"
        {...arrowParallax.containerProps}
      >
        <path d="M52 -18 C47 22, 17 26, 20 70" />
        <path d="M20 70 L9 56 M20 70 L35 58" />
        <path d="M135 -18 C129 28, 96 33, 99 82" />
        <path d="M99 82 L87 67 M99 82 L115 69" />
      </motion.svg>
      <motion.div
        className="purple-blob newsletter-blob"
        style={purpleParallax.style}
        animate={reduceMotion ? undefined : { scale: [1, 1.05, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden="true"
        {...purpleParallax.containerProps}
      />
      <div className="container newsletter-inner">
        <h2>
          <span className="newsletter-line">Subscribe to</span>
          <span className="newsletter-line">our newsletter</span>
        </h2>
        <p>To make your stay special and even more memorable</p>
        <a className="primary-button" href="mailto:info@elementum.com">
          Subscribe Now
        </a>
      </div>
    </motion.section>
  );
}

function Footer() {
  const columns = [
    ['Company', 'Home', 'Studio', 'Service', 'Blog'],
    ['Terms & Policies', 'Privacy Policy', 'Terms & Conditions', 'Explore', 'Accessibility'],
    ['Follow Us', 'Instagram', 'LinkedIn', 'Youtube', 'Twitter'],
    ['Terms & Policies', '1498w Fulton ste, STE 2D Chicago, IL 63867.', '(123) 456789000', 'info@elementum.com'],
  ];

  return (
    <footer className="footer" id="contact">
      <div className="container footer-inner">
        <div className="footer-grid">
          {columns.map(([title, ...items]) => (
            <div className="footer-column" key={title}>
              <h3>{title}</h3>
              {items.map((item) => (
                <a key={item} href={item.includes('@') ? `mailto:${item}` : '#home'}>
                  {item}
                </a>
              ))}
            </div>
          ))}
        </div>
        <p className="copyright">©2023 Elementum. All rights reserved</p>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <AboutSection />
        <ServicesSection />
        <TestimonialSection />
        <Newsletter />
      </main>
      <Footer />
    </>
  );
}
