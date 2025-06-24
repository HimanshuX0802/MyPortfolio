import { useState } from 'react';
import { motion } from 'framer-motion';

interface Skill {
  name: string;
  percentage: number;
}

interface Technology {
  name: string;
  icon: string;
}

const Skills = ({ darkMode }) => {
  console.log('Skills darkMode:', darkMode); // Debug log to confirm prop value
  const [activeTab, setActiveTab] = useState('skills');

  const skills: Skill[] = [
    { name: 'HTML/CSS', percentage: 100 },
    { name: 'JavaScript', percentage: 100 },
    { name: 'React', percentage: 100 },
    { name: 'UI/UX Design', percentage: 90 },
    { name: 'Node.js', percentage: 99 },
    { name: 'Figma', percentage: 90 },
    { name: 'Java', percentage: 85 },
    { name: 'Python', percentage: 80 },
    { name: 'Automation', percentage: 75 },
    { name: 'TypeScript', percentage: 90 },
  ];

  const technologies: { [key: string]: Technology[] } = {
    skills: [
      { name: 'HTML5', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg' },
      { name: 'CSS3', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
      { name: 'JavaScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg' },
      { name: 'React', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg' },
      { name: 'Node.js', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg' },
      { name: 'Java', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg' },
      { name: 'Express', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg' },
      { name: 'TypeScript', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg' },
      { name: 'Python', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg' },
      { name: 'Figma', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg' },
      { name: 'Firebase', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg' },
      { name: 'MongoDB', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg' },
      { name: 'jQuery', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/jquery/jquery-original.svg' },
      { name: 'Tailwind CSS', icon: 'https://www.svgrepo.com/show/333609/tailwind-css.svg' },
      { name: 'Git', icon: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg' },
    ],
  };

  const CircularProgress = ({ percentage }) => {
    const circumference = 2 * Math.PI * 50; // r = 50
    const strokeDashoffset = circumference - (percentage / 100) * circumference;

    return (
      <svg className="transform -rotate-90 w-32 h-32" aria-hidden="true">
        <circle
          cx="64"
          cy="64"
          r="50"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          className="text-gray-300 dark:text-gray-600 !important"
        />
        <circle
          cx="64"
          cy="64"
          r="50"
          stroke="currentColor"
          strokeWidth="8"
          fill="transparent"
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          className="text-indigo-500 dark:text-indigo-400 !important transition-all duration-1000"
        />
      </svg>
    );
  };

  return (
    <section id="skills" className="py-24 bg-white text-gray-900 dark:bg-gray-900 dark:text-white !important">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-5xl font-bold mb-6 text-indigo-600 dark:text-indigo-400"
          >
            My Technical Skills
          </motion.h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
            I've worked with a variety of technologies to create exceptional digital experiences. Here are my technical and creative skills.
          </p>
        </div>

        {/* Skills Progress Section */}
        <div className="mb-20">
          <div className="flex flex-wrap justify-center items-center gap-8">
            {skills.map((skill, index) => (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="text-center"
              >
                <div className="relative">
                  <CircularProgress percentage={skill.percentage} />
                  <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <span className="text-2xl font-bold text-gray-900 dark:text-white !important">
                      {skill.percentage}%
                    </span>
                  </div>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900 dark:text-white !important">
                  {skill.name}
                </h3>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Technologies Section */}
        <div>
          <div className="flex justify-center gap-4 mb-12">
            <button
              onClick={() => setActiveTab('skills')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === 'skills'
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
              }`}
              aria-label="View technical skills"
            >
              Skills
            </button>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-8"
          >
            {technologies[activeTab].map((tech, index) => (
              <motion.div
                key={tech.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="tech-grid-item p-6 rounded-xl text-center bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 transition-colors !important"
              >
                <img
                  src={tech.icon}
                  alt={`${tech.name} icon`}
                  className="w-12 h-12 mx-auto mb-4"
                  loading="lazy"
                />
                <p className="text-sm font-medium text-gray-900 dark:text-white !important">
                  {tech.name}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Problem-Solving and DSA Subsection */}
          <motion.div
            className="mt-16 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              Additional Strengths
            </h3>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto text-lg leading-relaxed">
              I also excel in <span className="font-semibold text-indigo-600 dark:text-indigo-400">problem-solving</span>,{' '}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">data structures & algorithms (DSA)</span>, and{' '}
              <span className="font-semibold text-indigo-600 dark:text-indigo-400">automation</span>, enabling me to tackle complex challenges and optimize solutions effectively.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Skills;