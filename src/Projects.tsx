import { useState, useEffect } from 'react';
import { ExternalLink, Code, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';

// Import project images from src/img/projects
import sixPackGym from './img/projects/6packgym.png';
import boltGym from './img/projects/boltgym.png';
import digitalCrud from './img/projects/digitalcrud.png';
import femaleGym from './img/projects/female gym.png';
import hearMe from './img/projects/hearme.png';
import iceCream from './img/projects/icecream.png';
import netflix from './img/projects/netflix.png';
import portfolio from './img/projects/portfolio.png';
import todo from './img/projects/todo.png';

function Projects() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  // Toggle dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  const projects = [
    {
      title: 'Hear Me',
      description: 'A social platform for sharing audio messages and connecting with friends, fostering meaningful interactions.',
      image: hearMe,
      tech: ['React', 'Node.js', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://hear-me-x.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/hear-me',
      highlights: ['Real-time audio messaging', 'Firebase authentication', 'Responsive design'],
    },
    {
      title: 'Bolt Gym',
      description: 'A modern gym platform with membership plans, workout tracking, and user dashboards to support fitness goals.',
      image: boltGym,
      tech: ['React', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      demoLink: 'https://gymbolt.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/bolt-gym',
      highlights: ['Workout tracking', 'User dashboards', 'MongoDB integration'],
    },
    {
      title: 'Digital CRUD',
      description: 'An all-in-one school management system designed to simplify operations, enhance productivity, and provide insights for smarter decision-making.',
      image: digitalCrud,
      tech: ['React', 'Express', 'MongoDB', 'Firebase'],
      demoLink: 'https://digitalcrud.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/digital-crud',
      highlights: ['School management', 'Real-time analytics', 'Secure data handling'],
    },
    {
      title: '6 Pack Gym',
      description: 'A responsive gym website with class schedules, trainer profiles, and booking functionality to help users achieve their fitness goals.',
      image: sixPackGym,
      tech: ['React', 'Node.js', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
      demoLink: '6packgym.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/6pack-gym',
      highlights: ['Class scheduling', 'Trainer profiles', 'Booking system'],
    },
    {
      title: 'Ice Cream Shop',
      description: 'An e-commerce site for an ice cream shop featuring online ordering, payment integration, and a delightful user experience.',
      image: iceCream,
      tech: ['React', 'Node.js', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://zzicecream.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/ice-cream-shop',
      highlights: ['Online ordering', 'Payment integration', 'User-friendly design'],
    },
    {
      title: 'Female Gym',
      description: 'A gym website tailored for women, featuring workout plans, community features, and personalized training programs.',
      image: femaleGym,
      tech: ['HTML', 'CSS', 'JavaScript', 'jQuery'],
      demoLink: 'https://femalegym.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/female-gym',
      highlights: ['Workout plans', 'Community features', 'Personalized training'],
    },
    {
      title: 'Netflix Clone',
      description: 'A Netflix-inspired streaming platform with user authentication, video playback, and a collection of original content.',
      image: netflix,
      tech: ['React', 'Tailwind CSS', 'Firebase', 'HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://vetflixgg.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/netflix-clone',
      highlights: ['Video streaming', 'User authentication', 'Original content'],
    },
    {
      title: 'Personal Portfolio',
      description: 'My personal portfolio showcasing my projects, skills, and contact information with a sleek, modern design.',
      image: portfolio,
      tech: ['React', 'Tailwind CSS', 'Framer Motion', 'HTML', 'CSS', 'JavaScript'],
      demoLink: 'https://himanshu7905.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/personal-portfolio',
      highlights: ['Modern design', 'Smooth animations', 'Responsive layout'],
    },
    {
      title: 'Todo App',
      description: 'A task management app with features to add, edit, and delete tasks, helping users stay organized.',
      image: todo,
      tech: ['React', 'Tailwind CSS', 'Firebase'],
      demoLink: 'https://todoboy.netlify.app',
      codeLink: 'https://github.com/HimanshuX0802/todo-app',
      highlights: ['Task management', 'Firebase backend', 'Clean UI'],
    },
  ];

  return (
    <section id="projects" className="py-24 bg-gray-50 dark:bg-gray-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
            My Projects
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
            Here are some of my recent projects, each crafted with attention to both functionality and design aesthetics.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {projects.map((project, index) => {
            const [isHovered, setIsHovered] = useState(false);

            return (
              <Tilt
                key={index}
                tiltMaxAngleX={10}
                tiltMaxAngleY={10}
                perspective={1000}
                scale={1.02}
                transitionSpeed={300}
                glareEnable={true}
                glareMaxOpacity={0.2}
                glareColor="white"
                glarePosition="all"
              >
                <motion.div
                  className="relative bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onMouseEnter={() => setIsHovered(true)}
                  onMouseLeave={() => setIsHovered(false)}
                >
                  {/* Image and Overlay */}
                  <div className="relative overflow-hidden h-64">
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
                      loading="lazy"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-black/70 to-transparent transition-opacity duration-300 flex items-center justify-center space-x-4 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                        aria-label={`View live demo of ${project.title}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </motion.a>
                      <motion.a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition-colors"
                        aria-label={`View source code of ${project.title}`}
                        initial={{ y: 20, opacity: 0 }}
                        animate={isHovered ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
                        transition={{ duration: 0.3, delay: 0.2 }}
                      >
                        <Code className="h-5 w-5" />
                      </motion.a>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6 pb-16 relative">
                    {/* Glowing Border Effect */}
                    <div className={`absolute inset-0 rounded-xl pointer-events-none transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
                      <div className="absolute inset-0 rounded-xl border-2 border-transparent shadow-[0_0_20px_rgba(99,102,241,0.7)] dark:shadow-[0_0_20px_rgba(129,140,248,0.7)]"></div>
                    </div>

                    <h3 className="text-xl font-bold mb-3 text-indigo-600 dark:text-indigo-400">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300 mb-4 text-base leading-relaxed">
                      {project.description}
                    </p>

                    {/* Tech Stack (Always Visible, No Animation) */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.tech.map((tech, techIndex) => (
                        <span
                          key={techIndex}
                          className="px-3 py-1 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full text-xs font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Slide-In Read More Button */}
                    <AnimatePresence>
                      {isHovered && (
                        <motion.div
                          className="absolute bottom-0 left-0 right-0 p-4 bg-indigo-600 text-white flex items-center justify-between"
                          initial={{ y: 50, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          exit={{ y: 50, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <span className="text-sm font-medium">Explore More</span>
                          <ArrowRight className="h-5 w-5" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              </Tilt>
            );
          })}
        </motion.div>
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <button className="px-8 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors duration-300 transform hover:scale-105 shadow-lg">
            View All Projects
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default Projects;