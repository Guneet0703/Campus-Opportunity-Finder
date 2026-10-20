import { Link } from 'react-router-dom';
import {
  FiArrowRight,
  FiBookmark,
  FiCompass,
  FiTarget,
  FiTrendingUp,
  FiCheckCircle,
  FiSearch,
  FiUsers,
  FiCalendar,
  FiHeart,
} from 'react-icons/fi';
import Logo from '../../components/Logo/Logo';
import './Landing.css';

const features = [
  {
    icon: <FiCompass />,
    title: 'Opportunities in one place',
    description:
      'Explore internships, hackathons, workshops, scholarships and coding contests without jumping between websites.',
    color: 'lavender',
  },
  {
    icon: <FiSearch />,
    title: 'Find your kind of opportunity',
    description:
      'Search listings and filter by category to spend less time searching and more time preparing.',
    color: 'pink',
  },
  {
    icon: <FiBookmark />,
    title: 'Save what inspires you',
    description:
      'Create a free account to bookmark interesting opportunities and return to them whenever you need.',
    color: 'cream',
  },
];

const steps = [
  {
    number: '01',
    title: 'Explore',
    description: 'Browse opportunities and discover what matches your interests.',
  },
  {
    number: '02',
    title: 'Find your fit',
    description: 'Use search and categories to narrow down the possibilities.',
  },
  {
    number: '03',
    title: 'Save & take action',
    description: 'Sign in to bookmark opportunities, then follow the listing to apply.',
  },
];

const Landing = () => {
  return (
    <div className="landing-page">
      <section className="landing-hero">
        <div className="landing-container landing-hero-grid">
          <div className="landing-hero-copy">
            <span className="landing-eyebrow">
              <span className="landing-eyebrow-dot" />
              A little closer to your next big thing
            </span>

            <h1>
              Your next opportunity
              <span> starts here.</span>
            </h1>

            <p className="landing-hero-description">
              Internships, hackathons, scholarships and more — discover
              opportunities that help turn your ambitions into achievements.
            </p>

            <div className="landing-hero-actions">
              <Link to="/opportunities" className="btn btn-primary landing-primary-btn">
                Explore opportunities <FiArrowRight />
              </Link>
              <Link to="/register" className="landing-secondary-link">
                Create a free account
              </Link>
            </div>

            <div className="landing-trust-note">
              <FiCheckCircle />
              <span>Start exploring for free. Sign in when you're ready to save.</span>
            </div>
          </div>

          <div className="landing-hero-art" aria-label="A preview of student opportunities">
            <div className="landing-orbit landing-orbit-one" />
            <div className="landing-orbit landing-orbit-two" />

            <div className="landing-floating-star landing-star-one">✦</div>
            <div className="landing-floating-star landing-star-two">✳</div>

            <div className="landing-preview-card">
              <div className="landing-preview-top">
                <div>
                  <span className="landing-preview-label">YOUR NEXT CHAPTER</span>
                  <h3>Room to grow.</h3>
                </div>
                <span className="landing-preview-sparkle">✦</span>
              </div>

              <div className="landing-preview-item">
                <div className="landing-preview-icon lavender">
                  <FiTrendingUp />
                </div>
                <div className="landing-preview-item-copy">
                  <strong>Internships</strong>
                  <span>Build real-world experience</span>
                </div>
                <FiArrowRight className="landing-preview-arrow" />
              </div>

              <div className="landing-preview-item">
                <div className="landing-preview-icon pink">
                  <FiTarget />
                </div>
                <div className="landing-preview-item-copy">
                  <strong>Hackathons</strong>
                  <span>Bring your ideas to life</span>
                </div>
                <FiArrowRight className="landing-preview-arrow" />
              </div>

              <div className="landing-preview-item">
                <div className="landing-preview-icon cream">
                  <FiUsers />
                </div>
                <div className="landing-preview-item-copy">
                  <strong>Workshops</strong>
                  <span>Learn something new</span>
                </div>
                <FiArrowRight className="landing-preview-arrow" />
              </div>

              <div className="landing-preview-footer">
                <span className="landing-preview-heart"><FiHeart /></span>
                <span>Your goals deserve a starting point.</span>
              </div>
            </div>

            <div className="landing-floating-note">
              <span className="landing-note-icon"><FiCalendar /></span>
              <div>
                <strong>Make your next move</strong>
                <span>One opportunity at a time</span>
              </div>
            </div>
          </div>
        </div>

        <a className="landing-scroll-cue" href="#features">
          <span /> Discover what you can do
        </a>
      </section>

      <section className="landing-section landing-features" id="features">
        <div className="landing-container">
          <div className="landing-section-heading">
            <span className="landing-kicker">MADE FOR YOUR NEXT STEP</span>
            <h2>Big possibilities. <span>One simple place.</span></h2>
            <p>
              Finding your next opportunity should feel exciting, not overwhelming.
              We bring the possibilities closer to you.
            </p>
          </div>

          <div className="landing-feature-grid">
            {features.map((feature) => (
              <article className="landing-feature-card" key={feature.title}>
                <div className={`landing-feature-icon ${feature.color}`}>
                  {feature.icon}
                </div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
                <Link to="/opportunities" className="landing-card-link">
                  Discover more <FiArrowRight />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-how" id="how">
        <div className="landing-container landing-how-grid">
          <div className="landing-how-intro">
            <span className="landing-kicker">YOUR JOURNEY, SIMPLIFIED</span>
            <h2>Three little steps. <span>One big leap.</span></h2>
            <p>
              Whether you're looking for your first internship or your next
              competition, getting started is easy.
            </p>
            <Link to="/opportunities" className="btn btn-primary landing-primary-btn">
              Start exploring <FiArrowRight />
            </Link>
          </div>

          <div className="landing-steps">
            {steps.map((step) => (
              <article className="landing-step" key={step.number}>
                <div className="landing-step-number">{step.number}</div>
                <div>
                  <h3>{step.title}</h3>
                  <p>{step.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="landing-section landing-about" id="about">
        <div className="landing-container">
          <div className="landing-about-card">
            <div className="landing-about-decoration">✳</div>
            <span className="landing-kicker">A LITTLE ABOUT US</span>
            <h2>Made for students with <span>big plans.</span></h2>
            <p>
              Campus Opportunity Finder is designed to make discovering
              student-focused opportunities simpler. From hands-on learning to
              career-building experiences, our goal is to help you find
              possibilities worth pursuing — all from one convenient place.
            </p>
            <p>
              Explore openly, discover something new, and create an account
              whenever you're ready to save opportunities for later.
            </p>
            <Link to="/register" className="btn btn-primary landing-primary-btn">
              Join the community <FiArrowRight />
            </Link>
          </div>
        </div>
      </section>

      <section className="landing-cta">
        <div className="landing-container landing-cta-inner">
          <div>
            <span className="landing-kicker">YOUR NEXT CHAPTER IS WAITING</span>
            <h2>Ready to see what's possible?</h2>
            <p>Take a look around. Your next opportunity could be closer than you think.</p>
          </div>
          <Link to="/opportunities" className="btn landing-cta-btn">
            Browse opportunities <FiArrowRight />
          </Link>
        </div>
      </section>

      <footer className="landing-footer">
        <div className="landing-container landing-footer-inner">
          <Link to="/" className="landing-footer-brand">
            <Logo size={34} />
            <span>Campus Opportunity Finder</span>
          </Link>

          <p>Helping students discover better opportunities.</p>

          <div className="landing-footer-links">
            <a href="#features">Features</a>
            <a href="#how">How it works</a>
            <a href="#about">About</a>
            <Link to="/login">Login</Link>
          </div>
        </div>

        <div className="landing-container landing-footer-bottom">
          <span>© {new Date().getFullYear()} Campus Opportunity Finder</span>
          <span>Made for your next step ✦</span>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
