import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import HeroCanvas from './Animations/HeroCanvas';
import SkillConstellation from './Animations/SkillConstellation';
import ContactCompanion from './Animations/ContactCompanion';
import './Portfolio.css';

gsap.registerPlugin(ScrollTrigger);

const techStack = ['React', 'Next.js', 'Node.js', 'Tailwind CSS', 'TypeScript', 'Git', 'Figma'];

const skillCategories = [
  {
    title: 'Frontend Development',
    desc: 'React, Next.js, Tailwind CSS, HTML, CSS, JavaScript, TypeScript',
    icon: '💻'
  },
  {
    title: 'Backend Development',
    desc: 'Node.js, Express.js, REST APIs, GraphQL, JWT Authentication',
    icon: '⚙️'
  },
  {
    title: 'Databases',
    desc: 'MongoDB, MySQL, PostgreSQL, Firebase',
    icon: '🗄️'
  },
  {
    title: 'Tools & DevOps',
    desc: 'Git, Docker, Vercel, Linux, Postman',
    icon: '🛠️'
  },
  {
    title: '3D & Animation',
    desc: 'Three.js, React Three Fiber, GSAP, Framer Motion, Blender',
    icon: '🧊'
  },
  {
    title: 'Design & Others',
    desc: 'Figma, UI/UX, Responsive Design, System Architecture',
    icon: '🎨'
  }
];

const localProjects = [
  {
    id: 1,
    title: 'LIC Software',
    category: 'Dashboard , Analytics and Management',
    description: 'A modern dashboard for customer policy management and analytics.',
    technologies: ['React', 'Node.js', 'Express.js', 'Tailwind CSS'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=80',
    githubUrl: 'https://github.com/akthar3008/LIC-SOLUTION'
  },
  {
    id: 2,
    title: 'School Website',
    category: 'School Portfolio',
    description: 'A responsive school website with interactive designs.',
    technologies: ['React.js', 'Node.js', 'Tailwind'],
    image: 'https://images.unsplash.com/photo-1556742049-0a67e5572293?w=800&auto=format&fit=crop&q=80',
    liveUrl: '#',
    githubUrl: 'https://github.com/akthar3008/school'
  },
  {
    id: 3,
    title: 'Portfolio Template',
    category: 'Open Source',
    description: 'A modern portfolio template with 3D animations and smooth interactions.',
    technologies: ['React', 'Three.js', 'GSAP', 'Framer Motion'],
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=800&auto=format&fit=crop&q=80',
    liveUrl: '#',
    githubUrl: '#'
  },
];

const localCertificates = [
  {
    id: 1,
    title: 'Frontend Development participation',
    organization: 'WebCraft HAkathon `24',
    issueDate: '2024-10-13',
    credentialId: 'MERN-2025-015',
    featured:false,
    description: 'Comprehensive program covering end-to-end frontend webdevelopment, Components Advanced Designing, HTML5, and Tailwind CSS, with a focus on building responsive and interactive user interfaces.',
    skills: ['HTML5', 'CSS3', 'JavaScript', 'React.js', 'Tailwind CSS'],
    image: '/a.jpeg',
    credentialUrl: '#'
  },
  {
    id: 2,
    title: 'Backend Development Essentials',
    organization: 'WebCraft Hakathon 2.0',
    issueDate: '2024-11-19',
    credentialId: 'FED-2024-118',
    featured: false,
    description: 'Advanced modern web engineering focusing on component architecture, state management, responsive design patterns, and cross-browser performance.',
    skills: ['Node.js', 'Express.js', 'Tailwind CSS', 'TypeScript', 'Responsive Design', 'Cross-Browser Compatibility', 'Performance Optimization', 'Component Architecture', 'State Management'],
    image: '/b.jpeg',
    credentialUrl: '#'
  },
  {
    id: 3,
    title: 'A Cloud Based Intelligent Parking System With QR Code Access',
    organization: 'ICTACA 2026 International Conference.',
    issueDate: '2025-04-18',
    credentialId: '3D-WEB-2024-88',
    featured: false,
    description: 'Development of a cloud-based intelligent parking system with QR code access functionality.',
    skills: ['React Native', 'JavaScript', 'Firebase', 'Node.js', 'QR Code Integration', 'Tailwind CSS'],
    image: '/c.jpeg',
    credentialUrl: '#'
  },
  {
    id: 4,
    title: 'A Cloud Based Intelligent Parking System With QR Code Scanner',
    organization: 'Final Year Project, 3rd Place Winner',
    issueDate: '2025-04-16',
    credentialId: 'JS-2024-052',
    featured: true,
    description: 'Development of a cloud-based intelligent parking system with QR code scanning functionality.',
    skills: ['React Native', 'JavaScript', 'Firebase', 'Node.js', 'QR Code Integration', 'Tailwind CSS'],
    image: '/d.jpeg',
    credentialUrl: '#'
  },
  {
    id: 5,
    title: 'Internship in MERN Stack Development',
    organization: 'Service Provider Developer Hub',
    issueDate: '2025-07-25',
    credentialId: 'NODE-2023-319',
    featured: true,
    description: 'Hands-on MERN Stack development engineering implementing scalable microservices, Express middleware, MongoDB aggregation pipelines, and robust authentication mechanisms.',
    skills: ['Node.js', 'Express.js', 'MongoDB', 'Mongoose', 'API Security'],
    image: '/e.jpeg',
    credentialUrl: '#'
  }
];

export default function Portfolio() {
  const [about] = useState({
    name: 'Z.Mohammed.Akthar',
    title: 'MERN Stack Developer',
    bio: 'Full stack developer with expertise in MERN stack development.',
    image: '/profile.jpeg'
  });

  const [projects] = useState(localProjects);
  const [certificates] = useState(localCertificates);
  const [expandedCertId, setExpandedCertId] = useState(1);
  const [previewCertificate, setPreviewCertificate] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeModalTab, setActiveModalTab] = useState('Overview');
  const [activeSection, setActiveSection] = useState('home');
  const [darkMode, setDarkMode] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState(null);

  const toggleCertificate = (id) => {
    setExpandedCertId((prev) => (prev === id ? null : id));
  };

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  useEffect(() => {
    if (mobileMenuOpen || selectedProject || previewCertificate) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [mobileMenuOpen, selectedProject, previewCertificate]);

  // GSAP Animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.hero-reveal', {
        y: 25,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.about-stagger', {
        scrollTrigger: {
          trigger: '#about',
          start: 'top 80%'
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out'
      });

      gsap.from('.project-card-item', {
        scrollTrigger: {
          trigger: '#projects',
          start: 'top 75%'
        },
        y: 35,
        opacity: 0,
        duration: 0.75,
        stagger: 0.12,
        ease: 'power3.out'
      });
    });

    return () => ctx.revert();
  }, [projects]);

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setMobileMenuOpen(false);
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 68;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  const handleContactSubmit = (e) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.target).entries());
    const subject = encodeURIComponent(data.subject || `Portfolio enquiry from ${data.name}`);
    const body = encodeURIComponent(`Name: ${data.name}\nEmail: ${data.email}\n\n${data.message}`);
    window.location.href = `mailto:zakthar3008@gmail.com?subject=${subject}&body=${body}`;
    setContactStatus('Your email app is ready to send this message.');
    e.target.reset();
    setTimeout(() => setContactStatus(null), 5000);
  };

  const filteredProjects = activeFilter === 'All'
    ? projects
    : projects.filter(
        (p) => (p.category || '').toLowerCase() === activeFilter.toLowerCase()
      );

  const brandDisplayName = (about.name || 'AKTHAR').replace(/\./g, ' ').trim().toUpperCase();

  const journeyMilestones = [
    {
      year: '2022',
      title: 'Started Learning',
      description: 'Began my web development journey with HTML, CSS and JavaScript.'
    },
    {
      year: '2023',
      title: 'Built Real Projects',
      description: 'Created multiple projects and learned modern frameworks.'
    },
    ...certificates
      .slice()
      .sort((a, b) => new Date(a.issueDate) - new Date(b.issueDate))
      .map((certificate) => ({
        year: String(new Date(certificate.issueDate).getFullYear()),
        title: certificate.title,
        description: `Earned a certificate in ${certificate.title} from ${certificate.organization}.`
      })),
    {
      year: 'Now',
      title: 'Looking Ahead',
      description: 'Excited to build bigger products and collaborate on amazing ideas.'
    }
  ];

  return (
    <div className="portfolio-container">
      
      {/* ===================== NAVBAR ===================== */}
      <header className="fixed-nav">
        <div className="nav-inner">

          {/* Desktop Nav Links */}
          <nav className="nav-links">
            {['home', 'about', 'projects', 'skills', 'certificates', 'contact'].map((sec) => (
              <button
                key={sec}
                className={`nav-link-btn ${activeSection === sec ? 'active' : ''}`}
                onClick={() => handleNavClick(sec)}
              >
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </nav>

          <div className="nav-actions">
            <button
              className="theme-toggle-btn"
              onClick={() => setDarkMode(!darkMode)}
              aria-label="Toggle theme"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
            
            <button className="primary-pill-btn header-talk-btn" onClick={() => handleNavClick('contact')}>
              Let's Talk <span className="btn-arrow">→</span>
            </button>

            {/* Mobile Hamburger Toggle */}
            <button 
              className={`mobile-menu-toggle ${mobileMenuOpen ? 'open' : ''}`}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle mobile menu"
            >
              <span className="bar"></span>
              <span className="bar"></span>
              <span className="bar"></span>
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div 
              className="mobile-nav-drawer"
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mobile-nav-links">
                {['home', 'about', 'projects', 'skills', 'certificates', 'contact'].map((sec) => (
                  <button
                    key={sec}
                    className={`mobile-link-item ${activeSection === sec ? 'active' : ''}`}
                    onClick={() => handleNavClick(sec)}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </button>
                ))}
                <button 
                  className="primary-pill-btn mobile-cta-btn"
                  onClick={() => handleNavClick('contact')}
                >
                  Let's Talk <span className="btn-arrow">→</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      <main>
        {/* ===================== HERO SECTION ===================== */}
        <section id="home" className="section-shell hero-layout">
          <div className="hero-text-col">
            <div className="hero-reveal hero-pill-badge">
              <span className="pulsing-blue-dot"></span>
              {about.title?.toUpperCase() || 'FULL STACK WEB DEVELOPER'}
            </div>

            <h1 className="hero-reveal hero-heading">
              I Build <br />
              <span className="gradient-blue-text">Modern Web</span> <br />
              Experiences
            </h1>

            <p className="hero-reveal hero-subheading">
              Turning ideas into fast, scalable and beautiful web applications using modern technologies.
            </p>

            <div className="hero-reveal hero-cta-group">
              <button
                className="primary-pill-btn"
                onClick={() => handleNavClick('projects')}
              >
                View My Work <span className="btn-arrow">→</span>
              </button>

              <a
                href="/resume.pdf"
                download
                className="secondary-pill-btn"
              >
                Download CV <span className="btn-download-icon">↓</span>
              </a>
            </div>

            {/* Stat Counters Grid */}
            <div className="hero-reveal stats-counter-row">
              <div className="stat-unit">
                <span className="stat-num">3+</span>
                <span className="stat-label">Projects<br />Completed</span>
              </div>
              <div className="stat-unit">
                <span className="stat-num">2+</span>
                <span className="stat-label">Years<br />Learning</span>
              </div>
              <div className="stat-unit">
                <span className="stat-num">100%</span>
                <span className="stat-label">Commitment<br />to Quality</span>
              </div>
            </div>
          </div>

          {/* Angled Laptop Scene */}
          <div className="hero-canvas-col">
            <HeroCanvas />
          </div>

          {/* Bottom Tech Strip */}
          <div className="hero-bottom-strip">
            <div className="tech-strip-inner">
              <span className="trusted-text">Trusted by innovation</span>
              <div className="tech-pills-list">
                {techStack.map((tech) => (
                  <span key={tech} className="tech-text-item">{tech}</span>
                ))}
              </div>
            </div>

            <div className="scroll-hint">
              <div className="mouse-wheel">
                <span className="wheel-dot"></span>
              </div>
              <span>Scroll to explore</span>
            </div>
          </div>
        </section>

        {/* ===================== ABOUT SECTION ===================== */}
        <section id="about" className="section-shell about-layout">
          <div className="about-left-photo about-stagger">
            <div className="photo-card-wrap">
              <img
                src={about.image || '/profile.jpg'}
                alt={about.name}
                onError={(e) => { e.target.src = '/profile.jpg'; }}
                className="about-portrait-img"
              />
              <div className="photo-corner-badge">
                Better Ideas · Brighter Web
              </div>
            </div>
          </div>

          <div className="about-right-copy about-stagger">
            <div className="section-pill-badge">
              <span className="blue-dot"></span> ABOUT ME
            </div>

            <h2 className="section-main-heading">
              Passionate <span className="blue-word">Developer</span>. <br />
              Problem Solver. <span className="blue-word">Lifelong Learner</span>.
            </h2>

            <p className="about-bio-text">
              {about.bio || "I'm a web developer who loves turning ideas into real products. I enjoy building scalable web applications, exploring new technologies, and creating digital experiences that make an impact."}
            </p>

            <div className="about-cta-row">
              <a href="/resume.pdf" download className="secondary-pill-btn">
                Download CV <span className="btn-download-icon">↓</span>
              </a>
              <button className="primary-pill-btn" onClick={() => handleNavClick('contact')}>
                Let's Talk <span className="btn-arrow">→</span>
              </button>
            </div>

            <div className="four-cards-grid">
              <div className="feature-item-card">
                <span className="card-symbol">&lt;/&gt;</span>
                <h4>Clean Code</h4>
                <p>Maintainable and scalable code structure.</p>
              </div>

              <div className="feature-item-card">
                <span className="card-symbol">💡</span>
                <h4>Creative Solutions</h4>
                <p>Turning complex problems into simple solutions.</p>
              </div>

              <div className="feature-item-card">
                <span className="card-symbol">👤</span>
                <h4>User Focused</h4>
                <p>Building for real user needs and experiences.</p>
              </div>

              <div className="feature-item-card">
                <span className="card-symbol">📈</span>
                <h4>Continuous Learning</h4>
                <p>Always exploring new technologies and ideas.</p>
              </div>
            </div>
          </div>

          {/* Journey Timeline */}
          <div className="journey-timeline-section about-stagger">
            <h3 className="journey-title">My Journey</h3>
            <div className="timeline-horizontal-grid">
              {journeyMilestones.map((milestone) => (
                <div key={`${milestone.year}-${milestone.title}`} className="timeline-step">
                  <div className="timeline-node"></div>
                  <span className="timeline-year">{milestone.year}</span>
                  <strong className="timeline-heading">{milestone.title}</strong>
                  <p>{milestone.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ===================== PROJECTS SECTION ===================== */}
        <section id="projects" className="section-shell projects-layout">
          <div className="section-header-center">
            <div className="section-pill-badge">
              <span className="blue-dot"></span> FEATURED WORK
            </div>
            <h2 className="section-main-heading">
              Projects that Make an <span className="blue-word">Impact</span>
            </h2>
            <p className="section-subtext">
              A collection of projects that showcase my skills in web development, problem solving and design.
            </p>

            <div className="filter-pills-row">
              {[].map((filter) => (
                <button
                  key={filter}
                  className={`filter-btn ${activeFilter === filter ? 'selected' : ''}`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          <div className="projects-three-col-grid">
            {filteredProjects.map((project, idx) => (
              <motion.div
                key={project.id || idx}
                whileHover={{ y: -6 }}
                className="project-card-item"
                onClick={() => setSelectedProject(project)}
              >
                <div className="project-card-thumb">
                  <img
                    src={project.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'}
                    alt={project.title}
                    loading="lazy"
                  />
                </div>

                <div className="project-card-details">
                  <h3 className="project-card-title">{project.title}</h3>
                  <p className="project-card-desc">{project.description}</p>

                  <div className="project-tags-row">
                    {(Array.isArray(project.technologies)
                      ? project.technologies
                      : String(project.technologies || '').split(',')
                    )
                      .filter(Boolean)
                      .slice(0, 3)
                      .map((t) => (
                        <span key={t} className="tech-badge">{t.trim()}</span>
                      ))}
                  </div>

                  <button className="project-link-action">
                    View Project <span className="arrow-small">→</span>
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <div className="modal-backdrop-blur" onClick={() => setSelectedProject(null)}>
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.25 }}
                className="modal-card-surface"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="modal-header-bar">
                  <button className="modal-back-btn" onClick={() => setSelectedProject(null)}>
                    ← Back to Projects
                  </button>
                  <div className="modal-actions-right">
                    <a
                      href={selectedProject.liveUrl || '#'}
                      target="_blank"
                      rel="noreferrer"
                      className="primary-pill-btn modal-live-btn"
                    >
                      Live Demo ↗
                    </a>
                  </div>
                </div>

                <div className="modal-body-scroller">
                  <h2 className="modal-project-title">{selectedProject.title}</h2>
                  <p className="modal-project-desc">{selectedProject.description}</p>

                  <div className="modal-image-preview">
                    <img
                      src={selectedProject.image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800'}
                      alt={selectedProject.title}
                    />
                  </div>

                  <div className="modal-tabs-strip">
                    {[].map((tab) => (
                      <button
                        key={tab}
                        className={`modal-tab-btn ${activeModalTab === tab ? 'active' : ''}`}
                        onClick={() => setActiveModalTab(tab)}
                      >
                        {tab}
                      </button>
                    ))}
                  </div>

                  <div className="modal-tab-content">
                    <h4>Project Overview</h4>
                    <p>
                      {selectedProject.title} is designed to help teams scale effortlessly.
                      Engineered with modern architecture, responsive views, clean APIs, and verified security standards.
                    </p>

                    <div className="modal-metrics-grid">
                      <div>
                        <strong>12+</strong>
                        <span>Modules</span>
                      </div>
                      <div>
                        <strong>Modern</strong>
                        <span>Tech Stack</span>
                      </div>
                    </div>

                    <div className="modal-technologies-section">
                      <h5>Technologies Used</h5>
                      <div className="tech-tags-flex">
                        {(Array.isArray(selectedProject.technologies)
                          ? selectedProject.technologies
                          : String(selectedProject.technologies || '').split(',')
                        ).map((tech, i) => (
                          <span key={i} className="tech-pill-large">
                            {tech.trim()}
                          </span>
                        ))}
                      </div>
                    </div>

                    <div className="modal-cta-card">
                      <div>
                        <strong>Like This Project?</strong>
                        <p>Let's build something amazing together.</p>
                      </div>
                      <button
                        className="modal-action-btn"
                        onClick={() => {
                          setSelectedProject(null);
                          handleNavClick('contact');
                        }}
                      >
                        Get In Touch →
                      </button>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* Certificate Image Lightbox Popup Modal */}
        <AnimatePresence>
          {previewCertificate && (
            <div
              className="modal-backdrop-blur cert-lightbox-backdrop"
              onClick={() => setPreviewCertificate(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.92, y: 15 }}
                transition={{ duration: 0.22 }}
                className="cert-lightbox-card"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="cert-lightbox-header">
                  <div className="cert-lightbox-title-wrap">
                    <span className="cert-pill-verified">Verified Credential</span>
                    <h3 className="cert-lightbox-title">{previewCertificate.title}</h3>
                  </div>
                  <button
                    type="button"
                    className="cert-lightbox-close-btn"
                    onClick={() => setPreviewCertificate(null)}
                    aria-label="Close certificate preview"
                  >
                    ✕
                  </button>
                </div>
                <div className="cert-lightbox-body">
                  <img
                    src={previewCertificate.src}
                    alt={previewCertificate.title}
                    className="cert-lightbox-img"
                  />
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>

        {/* ===================== CERTIFICATES SECTION ===================== */}
        <section id="certificates" className="section-shell certificates-layout">
          <div className="section-header-center">
            <div className="section-pill-badge">
              <span className="blue-dot"></span> CERTIFICATIONS & CREDENTIALS
            </div>
            <h2 className="section-main-heading">
              Credentials That <span className="blue-word">Validate My Journey</span>
            </h2>
            <p className="section-subtext">
              An interactive milestone timeline of verified achievements. Click any certificate to expand its details, skills learned, and verification preview.
            </p>
          </div>

          <div className="certificates-timeline-container">
            {/* Continuous Vertical Timeline Line */}
            <div className="certificates-timeline-spine" aria-hidden="true"></div>

            <div className="certificates-timeline-list">
              {certificates
                .slice()
                .sort((a, b) => new Date(b.issueDate) - new Date(a.issueDate))
                .map((certificate, index) => {
                  const isExpanded = expandedCertId === certificate.id;
                  const issueYear = new Date(certificate.issueDate).getFullYear();
                  const formattedDate = new Date(certificate.issueDate).toLocaleDateString('en-US', {
                    month: 'short',
                    year: 'numeric'
                  });

                  return (
                    <article
                      key={certificate.id}
                      className={`certificate-timeline-entry ${certificate.featured ? 'is-featured' : ''} ${isExpanded ? 'is-expanded' : ''}`}
                    >
                      {/* Timeline Node & Year Tag */}
                      <div className="timeline-node-column">
                        <div className={`timeline-marker-dot ${certificate.featured ? 'marker-featured' : ''}`}>
                          {certificate.featured ? '★' : index + 1}
                        </div>
                        <span className="timeline-marker-year">{issueYear}</span>
                      </div>

                      {/* Main Interactive Accordion Card */}
                      <div className="certificate-interactive-card">
                        {/* Clickable Header Dropdown Bar */}
                        <button
                          type="button"
                          className="certificate-header-trigger"
                          onClick={() => toggleCertificate(certificate.id)}
                          aria-expanded={isExpanded}
                          aria-controls={`cert-details-${certificate.id}`}
                        >
                          <div className="cert-header-content">
                            <div className="cert-badges-row">
                              <span className="cert-pill-verified">✓ Verified Credential</span>
                              {certificate.featured && (
                                <span className="cert-pill-featured">⭐ Featured</span>
                              )}
                              <span className="cert-pill-date">{formattedDate}</span>
                            </div>

                            <h3 className="cert-header-title">{certificate.title}</h3>
                            <p className="cert-header-org">{certificate.organization}</p>
                          </div>

                          <div className="cert-expand-indicator">
                            <span className="expand-label">{isExpanded ? 'Hide' : 'View'}</span>
                            <span className={`expand-chevron ${isExpanded ? 'rotated' : ''}`}>▼</span>
                          </div>
                        </button>

                        {/* Expandable Dropdown Body */}
                        <AnimatePresence initial={false}>
                          {isExpanded && (
                            <motion.div
                              id={`cert-details-${certificate.id}`}
                              key="content"
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: 'auto' }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3, ease: 'easeInOut' }}
                              className="certificate-expandable-drawer"
                            >
                              <div className="certificate-drawer-inner">
                                <div className="cert-split-preview">
                                  {/* Certificate Image Preview with In-Page Lightbox Trigger */}
                                  {certificate.image && (
                                    <div
                                      className="cert-preview-frame"
                                      onClick={() =>
                                        setPreviewCertificate({
                                          src: certificate.image,
                                          title: certificate.title
                                        })
                                      }
                                      role="button"
                                      tabIndex={0}
                                      onKeyDown={(e) => {
                                        if (e.key === 'Enter' || e.key === ' ') {
                                          setPreviewCertificate({
                                            src: certificate.image,
                                            title: certificate.title
                                          });
                                        }
                                      }}
                                    >
                                      <img
                                        src={certificate.image}
                                        alt={`${certificate.title} preview`}
                                        className="cert-preview-thumb"
                                        loading="lazy"
                                      />
                                      <div className="cert-zoom-overlay">
                                        <span>🔍 Expand Preview</span>
                                      </div>
                                    </div>
                                  )}

                                  {/* Comprehensive Info Breakdown */}
                                  <div className="cert-details-breakdown">
                                    <div className="cert-overview-box">
                                      <h4 className="drawer-subhead">Key Takeaways & Overview</h4>
                                      <p className="drawer-desc">{certificate.description}</p>
                                    </div>

                                    {/* Skills Learned Badges */}
                                    {certificate.skills && certificate.skills.length > 0 && (
                                      <div className="cert-skills-group">
                                        <h4 className="drawer-subhead">Skills Acquired</h4>
                                        <div className="cert-skills-pills">
                                          {certificate.skills.map((skill) => (
                                            <span key={skill} className="cert-skill-pill">
                                              {skill}
                                            </span>
                                          ))}
                                        </div>
                                      </div>
                                    )}

                                    {/* Verification Metadata & Action */}
                                    <div className="cert-footer-meta">
                                      <div className="cert-meta-item">
                                        <span className="meta-key">Credential ID:</span>
                                        <span className="meta-val font-mono">{certificate.credentialId}</span>
                                      </div>

                                      {certificate.credentialUrl && certificate.credentialUrl !== '#' ? (
                                        <a
                                          href={certificate.credentialUrl}
                                          target="_blank"
                                          rel="noreferrer"
                                          className="primary-pill-btn cert-verify-btn"
                                        >
                                          Verify Credential ↗
                                        </a>
                                      ) : (
                                        <button
                                          type="button"
                                          className="primary-pill-btn cert-verify-btn"
                                          onClick={() =>
                                            setPreviewCertificate({
                                              src: certificate.image,
                                              title: certificate.title
                                            })
                                          }
                                        >
                                          View Certificate 🔍
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    </article>
                  );
                })}
            </div>
          </div>
        </section>

        {/* ===================== SKILLS SECTION ===================== */}
        <section id="skills" className="section-shell skills-layout">
          <div className="section-header-center">
            <div className="section-pill-badge">
              <span className="blue-dot"></span> MY SKILLS
            </div>
            <h2 className="section-main-heading">
              Technologies I Work With
            </h2>
            <p className="section-subtext">
              I use modern tools and frameworks to build fast, scalable and maintainable web applications.
            </p>
          </div>

          <div className="skills-split-layout">
            <div className="skills-3d-orbit-col">
              <SkillConstellation />
            </div>

            <div className="skills-cards-list">
              {skillCategories.map((item) => (
                <div key={item.title} className="skill-category-card">
                  <span className="skill-cat-icon">{item.icon}</span>
                  <div className="skill-cat-text">
                    <h4>{item.title}</h4>
                    <p>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="quote-wide-banner">
            <span className="quote-glyph">“</span>
            <p className="quote-text">
              The best way to predict the future is to build it. Clean code today, a better tomorrow.
            </p>
          </div>
        </section>

        {/* ===================== CONTACT SECTION ===================== */}
        <section id="contact" className="section-shell contact-layout">
          <div className="contact-info-col">
            <div className="section-pill-badge">
              <span className="blue-dot"></span> GET IN TOUCH
            </div>

            <h2 className="section-main-heading">
              Let's Build Something Great
            </h2>

            <p className="contact-subhead">
              Have a project in mind or just want to say hello? I'm always open to new opportunities and exciting collaborations.
            </p>

            <div className="contact-details-cards">
              <div className="contact-card-item">
                <span className="contact-icon-box">✉️</span>
                <div>
                  <small>Email</small>
                  <strong>zakthar3008@gmail.com</strong>
                </div>
              </div>

              <div className="contact-card-item">
                <span className="contact-icon-box">📞</span>
                <div>
                  <small>Phone</small>
                  <strong>+91 95008 44478</strong>
                </div>
              </div>

              <div className="contact-card-item">
                <span className="contact-icon-box">📍</span>
                <div>
                  <small>Location</small>
                  <strong>Ambur, India</strong>
                </div>
              </div>

              <div className="contact-card-item">
                <span className="contact-icon-box avail-box">📅</span>
                <div>
                  <small>Availability</small>
                  <strong>Open to opportunities</strong>
                </div>
              </div>
            </div>

          </div>

          <div className="contact-form-col">
            <div className="form-card-surface">
              <h3 className="form-heading">Send a Message</h3>

              {contactStatus && (
                <div className="form-status-banner">
                  ✓ {contactStatus}
                </div>
              )}

              <form onSubmit={handleContactSubmit}>
                <div className="form-field">
                  <input type="text" name="name" placeholder="Your Name" required />
                </div>
                <div className="form-field">
                  <input type="email" name="email" placeholder="Your Email" required />
                </div>
                <div className="form-field">
                  <input type="text" name="subject" placeholder="Subject" required />
                </div>
                <div className="form-field">
                  <textarea name="message" placeholder="Your Message" rows="5" required></textarea>
                </div>
                <button type="submit" className="primary-pill-btn form-submit-btn">
                  Send Message <span className="btn-arrow">→</span>
                </button>
              </form>
            </div>
          </div>

          <div className="contact-3d-globe-col">
            <ContactCompanion />
            <div className="globe-overlay-copy">
              <span>Ideas</span>
              <span>Collaborations</span>
              <span>Opportunities</span>
              <strong className="blue-word">Let's Talk.</strong>
            </div>
          </div>
        </section>
      </main>

      {/* ===================== FOOTER ===================== */}
      <footer className="footer-bar">
        <div className="footer-inner">
          <div className="footer-left">
            <span className="logo-ring-small"></span>
            <strong>{brandDisplayName}</strong>
            <small>Crafting a better tomorrow, one line of code at a time.</small>
          </div>

          <div className="footer-nav">
            {['home', 'about', 'projects', 'skills', 'certificates', 'contact'].map((sec) => (
              <button key={sec} onClick={() => handleNavClick(sec)}>
                {sec.charAt(0).toUpperCase() + sec.slice(1)}
              </button>
            ))}
          </div>

          <div className="footer-copy">
            © 2026 {brandDisplayName}. All rights reserved.
          </div>
        </div>
      </footer>

    </div>
  );
}