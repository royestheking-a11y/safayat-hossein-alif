// case-study.js

const projectData = {
  'giga-rental': {
    title: 'Giga Rental System',
    tag: 'SaaS Platform',
    desc: 'A comprehensive multi-tenant SaaS platform designed to handle equipment and vehicle rentals at scale. The system provides complete isolation for different tenants while running on a unified codebase.',
    challenge: 'Managing inventory, bookings, and payments across hundreds of different rental businesses required a highly scalable architecture that could prevent data leakage while maintaining realtime availability.',
    solution: 'Engineered a scalable multi-tenant architecture utilizing PostgreSQL row-level security. Built a robust API with NestJS and a highly responsive frontend using React. Implemented Redis for caching and session management to handle high traffic spikes.',
    impact: 'Reduced tenant onboarding time by 80%. System handles 10k+ daily transactions with 99.99% uptime, resulting in a 40% increase in client retention for our enterprise customers.',
    tech: ['NestJS', 'React.js', 'PostgreSQL', 'Redis', 'Docker'],
    mockClass: 'mock-1'
  },
  'h360-erp': {
    title: 'H360 ERP',
    tag: 'Enterprise ERP',
    desc: 'A complete Hospital Information Management System (HIMS) integrating multiple departments including OPD, IPD, Pharmacy, LIS, RIS, and EMR.',
    challenge: 'Hospitals were using fragmented systems leading to data silos, delayed patient care, and billing discrepancies. The challenge was to create a unified, high-performance system compliant with medical data standards.',
    solution: 'Developed a unified ERP using Laravel and Oracle Database. Architected modular components to allow hospitals to only activate the modules they need. Implemented complex SQL optimizations for fast patient record retrieval.',
    impact: 'Deployed across multiple healthcare organizations (DMHL, KPJ, Unico, East West). Reduced patient admission times by 60% and entirely eliminated manual pharmacy billing errors.',
    tech: ['Laravel', 'Oracle DB', 'JavaScript', 'Docker'],
    mockClass: 'mock-2'
  },
  'call-center': {
    title: 'Call Center Management',
    tag: 'Realtime System',
    desc: 'A high-throughput realtime call center management system designed to route, record, and analyze customer service interactions instantly.',
    challenge: 'The legacy system suffered from high latency during peak hours, causing dropped calls and agent idle time. The client needed a system capable of handling thousands of concurrent WebSocket connections.',
    solution: 'Architected a realtime data pipeline using Socket.IO, Redis Pub/Sub, and BullMQ for background job processing. Built the interface with React to instantly push call data to agent screens without page reloads.',
    impact: 'System now effortlessly handles 5,000+ concurrent connections. Agent response time improved by 35%, and system latency was reduced from 2 seconds to under 50 milliseconds.',
    tech: ['Node.js', 'Socket.IO', 'Redis', 'BullMQ', 'React'],
    mockClass: 'mock-3'
  },
  'divine-mercy': {
    title: 'Divine Mercy Hospital Portal',
    tag: 'Web Portal',
    desc: 'An integrated healthcare web portal allowing patients to book appointments, access test results, and make digital payments.',
    challenge: 'Patients faced long queues for appointments and report collection. The hospital needed a secure portal directly integrated with their internal ERP system.',
    solution: 'Developed a secure Next.js web application with SSR for fast load times. Built robust APIs to sync seamlessly with the internal Laravel ERP system in realtime.',
    impact: 'Shifted 45% of total appointments to the online portal within 3 months. Dramatically reduced hospital lobby congestion and improved overall patient satisfaction scores.',
    tech: ['Next.js', 'React', 'Laravel API', 'PostgreSQL'],
    mockClass: 'mock-4'
  }
};

document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const projectId = urlParams.get('id');

  const project = projectData[projectId];

  if (!project) {
    // Redirect if project not found
    window.location.href = 'index.html';
    return;
  }

  // Populate data
  document.title = `${project.title} | Case Study`;
  document.getElementById('cs-title').textContent = project.title;
  document.getElementById('cs-tag').textContent = project.tag;
  document.getElementById('cs-desc').textContent = project.desc;
  document.getElementById('cs-challenge').textContent = project.challenge;
  document.getElementById('cs-solution').textContent = project.solution;
  document.getElementById('cs-impact').textContent = project.impact;
  
  const imgHero = document.getElementById('cs-image');
  imgHero.classList.add('project-image');
  imgHero.classList.add(project.mockClass);

  const techContainer = document.getElementById('cs-tech');
  project.tech.forEach(tech => {
    const span = document.createElement('span');
    span.className = 'tech-tag';
    span.textContent = tech;
    techContainer.appendChild(span);
  });

  // Handle Views Logic (Simulated with LocalStorage for effect)
  let views = localStorage.getItem(`views_${projectId}`);
  if (!views) {
    views = Math.floor(Math.random() * 500) + 1200; // Base random views
  }
  views = parseInt(views) + 1; // Increment on visit
  localStorage.setItem(`views_${projectId}`, views);
  document.getElementById('cs-views').textContent = views.toLocaleString();

  // Handle Share Button
  const shareBtn = document.getElementById('cs-share-btn');
  shareBtn.addEventListener('click', async () => {
    const shareData = {
      title: project.title,
      text: `Check out this case study on ${project.title} by Safayat Alif!`,
      url: window.location.href
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        await navigator.clipboard.writeText(window.location.href);
        const originalText = shareBtn.innerHTML;
        shareBtn.innerHTML = '<span>✅</span> Copied Link!';
        setTimeout(() => { shareBtn.innerHTML = originalText; }, 2000);
      }
    } catch (err) {
      console.error('Error sharing', err);
    }
  });
});
