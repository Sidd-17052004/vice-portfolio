// All content comes from the resume. Edit here, not in components.
export const profile = {
  name: 'Siddhesh Ravindra Katkade', short: 'Siddhesh Katkade',
  role: 'Software Engineer — Full Stack & AI Automation',
  location: 'Pune, India',
  photo: '/me.jpg', // put your photo at public/me.jpg
  intro: 'I build AI-driven automation and full-stack products. At Neilsoft Ltd. I develop MCP servers and agentic AI workflows for engineering and construction software, on a foundation of JavaScript, Python, Node.js and React.',
  email: 'srkatkade@gmail.com', phone: '+91 7972679029',
  linkedin: 'https://linkedin.com/in/siddhesh-katkade-tech-coder-ai',
  github: 'https://github.com/Sidd-17052004', resume: '/resume.pdf',
}
export const traits = [
  ['Development', 'MERN stack apps, REST APIs, Android'],
  ['Problem Solving', 'Listed professional skill'],
  ['Automation', 'AI agents, tool calling, MCP servers'],
  ['Innovation', 'Oracle Certified Generative AI Professional'],
  ['Leadership', 'Team Leader, Smart India Hackathon'],
]
export const skills = [
  { title: 'Languages', color: '#19d3ff', items: ['C', 'C++', 'Java', 'JavaScript', 'PHP'] },
  { title: 'Frontend', color: '#ff2e88', items: ['React', 'HTML', 'CSS', 'Tailwind', 'Bootstrap'] },
  { title: 'Backend & APIs', color: '#ffb347', items: ['Node.js', 'Express.js', 'REST APIs'] },
  { title: 'Databases', color: '#7b2cff', items: ['MongoDB', 'MySQL'] },
  { title: 'AI Automation', color: '#2cffb0', items: ['Generative AI', 'Agentic AI', 'AI Agents', 'Model Context Protocol (MCP)', 'AI Tool Calling', 'AI-assisted Automation'] },
  { title: 'Tools & Working Style', color: '#ff6a3d', items: ['Git', 'Problem Solving', 'Leadership', 'Collaboration', 'Time Management'] },
]
export const experience = [
  { company: 'Neilsoft Ltd.', title: 'Graduate Engineer Trainee', duration: '2026 – Present', place: 'Pune, India',
    points: ['Contributing to software projects involving AI-driven automation and compliance workflows for engineering and construction applications.',
      'Developed a Weather Model Context Protocol (MCP) Server that provides weather data for evaluating construction-material compliance checkpoints and supporting AI-assisted decisions.',
      'Hands-on with Agentic AI, AI agents, tool calling and MCP-based integrations on internal projects.'],
    tech: ['MCP', 'Agentic AI', 'AI Agents', 'Tool Calling'] },
  { company: 'Aryahs World Infotech (OPC) Pvt. Ltd.', title: 'Software Engineering Intern', duration: 'Jul 2025 – Nov 2025', place: 'Mumbai, India',
    points: ['Developed MERN stack applications with authentication, CRUD operations, database integration and RESTful APIs.',
      'Contributed to Android application development for internal and client-facing projects.',
      'Built AI-powered chatbots to support automation and improve user interaction.'],
    tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Android'] },
]
export const projects = [
  { title: 'Samvidhan Sarathi', image: '/projects/samvidhan-sarathi.jpg', tech: ['Express.js', 'Tailwind CSS', 'Node.js', 'MongoDB', 'React.js'], colors: ['#7b2cff', '#19d3ff'],
    summary: 'A gamified constitutional learning platform focused on interactive and accessible experiences.',
    contribution: ['Built the gamified learning platform.', 'Developed dashboards with quizzes, user goals and analytics to improve engagement.', 'Designed a scalable full-stack architecture for content and user management.'] },
  { title: 'Full-Stack Blog Application', image: '/projects/blog-app.jpg', tech: ['MongoDB', 'Express.js', 'React', 'Node.js', 'Redux', 'Material UI'], colors: ['#ff2e88', '#ffb347'],
    summary: 'A secure MERN blogging platform with authentication, authorization and full CRUD.',
    contribution: ['Built a responsive React interface with Redux and Material UI.', 'Designed MongoDB schemas for users, blogs and author relationships.', 'Focused on maintainability and efficient data access.'] },
  { title: 'Premium E-Commerce Website', image: '/projects/e-commerce.jpg', tech: ['Node.js', 'Express', 'MongoDB', 'EJS', 'Stripe'], colors: ['#ff6a3d', '#ff2e88'],
    summary: 'A full-stack e-commerce platform with cart, order management and admin product management.',
    contribution: ['Integrated Stripe payments and automated PDF invoice generation.', 'Implemented secure sessions, bcrypt authentication and CSRF protection.', 'Built responsive server-rendered interfaces.'] },
]
export const education = {
  degree: 'Bachelor of Engineering in Information Technology', school: 'D. Y. Patil College of Engineering, Akurdi, Pune',
  period: 'Nov 2022 – July 2026', score: 'CGPA 8.42 / 10',
  certs: ['Oracle Cloud Infrastructure 2025 Certified Generative AI Professional', 'Google AI Essentials', 'Google Cybersecurity Certification'],
  achievements: ['Team Leader, Smart India Hackathon', 'GDSC Google Cloud Workshop Coordinator'],
}
