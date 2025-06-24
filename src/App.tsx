import { useState, useEffect, useRef } from 'react';
import { Moon, Sun, Linkedin, Github, Mail, Menu, X } from 'lucide-react';
import { motion } from 'framer-motion';
import emailjs from 'emailjs-com';
import Skills from './Skills';
import Projects from './Projects';
import me from './img/me.jpeg';
import resume from './img/Himanshu_singh_Resume.pdf';

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });
  const [currentRole, setCurrentRole] = useState(0);
  const [text, setText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [formStatus, setFormStatus] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const formRef = useRef<HTMLFormElement>(null);

  const roles = ['Full-Stack Developer', 'Web Developer', 'Creative Thinker'];

  // Toggle dark mode
  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  // Typewriter effect
  useEffect(() => {
    const tick = () => {
      const fullText = roles[currentRole];
      setText((prev) => {
        if (!isDeleting && prev.length < fullText.length) {
          return fullText.substring(0, prev.length + 1);
        } else if (isDeleting && prev.length > 0) {
          return fullText.substring(0, prev.length - 1);
        } else if (!isDeleting && prev.length === fullText.length) {
          setTimeout(() => setIsDeleting(true), 1500);
          return prev;
        } else {
          setIsDeleting(false);
          setCurrentRole((prev) => (prev + 1) % roles.length);
          return '';
        }
      });
    };
    const timer = setInterval(tick, isDeleting ? 80 : 150);
    return () => clearInterval(timer);
  }, [text, isDeleting, currentRole, roles]);

  // Scroll spy for active section
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Scroll to section
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      window.scrollTo({
        top: element.offsetTop - 80,
        behavior: 'smooth',
      });
      setActiveSection(sectionId);
      setMobileMenuOpen(false);
    }
  };

  // Handle form submission with EmailJS
  const sendEmail = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormStatus('');

    if (formRef.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID || 'Himanshu', // Default to your Service ID
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'template_dxx4dyg', // Replace with your Template ID
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'Pcoh3zHZTphOi043t' // Your Public Key
        )
        .then(
          () => {
            setFormStatus('Message sent successfully!');
            formRef.current?.reset();
            setIsSubmitting(false);
          },
          (error) => {
            setFormStatus('Failed to send message. Please try again later.');
            console.error('EmailJS error:', error);
            setIsSubmitting(false);
          }
        );
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${darkMode ? 'dark bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
      {/* Navbar */}
   <nav className="fixed w-full z-50 backdrop-blur-md bg-white/80 dark:bg-gray-900/80 transition-all duration-300 shadow-sm">
  <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8 flex justify-between items-center h-16">
    <div className="flex-shrink-0 font-bold text-xl sm:text-2xl">
      Himanshu Singh<span className="text-indigo-600 dark:text-indigo-400"></span>
    </div>
    <div className="hidden md:flex space-x-4">
      {['home', 'about', 'skills', 'projects', 'contact', 'Download Resume'].map((item) => (
        <button
          key={item}
          onClick={() => {
            if (item === 'Download Resume') {
              const link = document.createElement('a');
              link.href = resume; // Use the resume path defined earlier (line 72)
              link.download = 'Himanshu_Singh_Resume.pdf'; // Specify the filename
              document.body.appendChild(link);
              link.click();
              document.body.removeChild(link);
            } else {
              scrollToSection(item);
            }
          }}
          className={`capitalize transition-colors duration-300 ${activeSection === item
            ? 'text-indigo-600 dark:text-indigo-400 font-medium'
            : 'text-gray-600 dark:text-gray-300 hover:text-indigo-600 dark:hover:text-indigo-400'
            }`}
        >
          {item}
        </button>
      ))}
    </div>
    <div className="flex items-center space-x-2">
      <button
        onClick={() => setDarkMode(!darkMode)}
        className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle dark mode"
      >
        {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </button>
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="md:hidden p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
        aria-label="Toggle menu"
      >
        {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </button>
    </div>
  </div>
  {mobileMenuOpen && (
    <div className="md:hidden bg-white dark:bg-gray-900 shadow-lg">
      <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
        {['home', 'about', 'skills', 'projects', 'contact', 'Download Resume'].map((item) => (
          <button
            key={item}
            onClick={() => {
              if (item === 'Download Resume') {
                const link = document.createElement('a');
                link.href = resume;
                link.download = 'Himanshu_Singh_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
              } else {
                scrollToSection(item);
              }
            }}
            className={`block px-3 py-2 rounded-md text-base font-medium w-full text-left capitalize ${activeSection === item
              ? 'bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400'
              : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
              }`}
          >
            {item}
          </button>
        ))}
      </div>
    </div>
  )}
</nav>  

      {/* Hero Section */}
      <section id="home" className="pt-24 pb-12 md:pt-32 md:pb-24">
        <div className="container mx-auto px-2 sm:px-4 md:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8 w-full">
            <motion.div
              className="w-full md:w-1/2 md:pr-6 mb-8 md:mb-0 p-2 sm:p-4"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative inline-block mb-4">
                <span className="bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 px-3 py-1 rounded-full text-sm font-medium">
                  Welcome to my portfolio
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Hi, I'm Himanshu<br />
                <span className="text-indigo-600 dark:text-indigo-400 min-h-[40px] inline-block">
                  {text}
                  <span className="animate-blink">|</span>
                </span>
              </h1>
              <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg mb-6 max-w-lg leading-relaxed">
                I create beautiful, functional, and user-centered digital experiences. Focused on building products that people love to use.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-5 py-2 sm:px-6 sm:py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors duration-300"
                >
                  Get in touch
                </button>
                <button
                  onClick={() => scrollToSection('projects')}
                  className="px-5 py-2 sm:px-6 sm:py-3 border border-gray-300 dark:border-gray-700 hover:border-indigo-600 dark:hover:border-indigo-400 rounded-full transition-colors duration-300"
                >
                  View my work
                </button>
              </div>
            </motion.div>
            <motion.div
              className="w-full md:w-1/2 flex justify-center p-2 sm:p-4"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 rounded-full blur-3xl opacity-20 animate-pulse"></div>
                <img
                  src={me}
                  alt="Himanshu Singh's profile"
                  className="relative z-10 rounded-full w-48 sm:w-56 md:w-64 lg:w-80 h-48 sm:h-56 md:h-64 lg:h-80 object-cover mx-auto border-4 border-white dark:border-gray-800 shadow-xl"
                  loading="lazy"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              About Me
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Get to know more about my journey, skills, and passion for building exceptional web applications.
            </p>
          </motion.div>
          <div className="flex flex-col md:flex-row items-center gap-12">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="relative group">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-30 rounded-lg blur-2xl"></div>
                <img
                  src="https://miro.medium.com/v2/resize:fit:960/1*0WDqECSWiU6N41iBQc3KPQ.png"
                  alt="Himanshu Singh working on a project"
                  className="relative w-full h-auto rounded-lg shadow-2xl transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
            </motion.div>
            <div className="md:w-1/2 flex flex-col gap-8">
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <p className="text-gray-600 dark:text-gray-300 mb-4 text-lg leading-relaxed">
                  I'm <span className="font-semibold text-indigo-600 dark:text-indigo-400">Himanshu Singh</span>, a passionate{' '}
                  <span className="font-semibold text-indigo-600 dark:text-indigo-400">full stack web developer</span> focused on building clean, responsive, and functional web applications. Over the past year, I've been sharpening my skills by working on real-world projects, exploring both front-end and back-end development.
                </p>
                <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg leading-relaxed">
                  I specialize in creating responsive, accessible, and performant web applications using modern technologies like React, Node.js, and more. My strong <span className="font-semibold text-indigo-600 dark:text-indigo-400">problem-solving skills</span> and knowledge of <span className="font-semibold text-indigo-600 dark:text-indigo-400">data structures & algorithms (DSA)</span> enable me to tackle complex challenges and optimize solutions effectively.
                </p>
              </motion.div>
              <motion.div
                className="flex flex-col sm:flex-row gap-6"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="flex-1 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Experience</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">
                    Over a year of hands-on experience with real-world projects
                  </p>
                </div>
                <div className="flex-1 bg-white dark:bg-gray-700 p-4 rounded-lg shadow-md">
                  <h3 className="text-lg font-semibold mb-2 text-indigo-600 dark:text-indigo-400">Availability</h3>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">Available for work</p>
                </div>
              </motion.div>
              <motion.div
                className="flex flex-wrap gap-4 justify-center"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <button
                  onClick={() => scrollToSection('contact')}
                  className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors duration-300 transform hover:scale-105"
                  aria-label="Hire Himanshu Singh"
                >
                  Hire Me
                </button>
                <a
                  href={resume}
                  download="Himanshu_Singh_Resume.pdf"
                  className="px-6 py-3 border border-gray-300 dark:border-gray-700 hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-600 dark:hover:border-indigo-600 text-gray-600 dark:text-gray-300 rounded-full transition-colors duration-300 transform hover:scale-105"
                  aria-label="Download Himanshu Singh's CV"
                >
                  Download CV
                </a>
              </motion.div>
              <motion.div
                className="flex justify-center gap-4"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                {[
                  // { href: 'https://www.linkedin.com/in/himanshu-singh7905/', icon: <Linkedin className="h-5 w-5" />, label: 'LinkedIn' },
                  { href: 'https://github.com/HimanshuX0802', icon: <Github className="h-5 w-5" />, label: 'GitHub' },
                  { href: 'mailto:himanshux0802@gmail.com', icon: <Mail className="h-5 w-5" />, label: 'Email' },
                ].map((link, index) => (
                  <motion.a
                    key={index}
                    href={link.href}
                    className="p-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-full transition-colors duration-300 transform hover:scale-110"
                    aria-label={`${link.label} profile`}
                    initial={{ opacity: 0, scale: 0 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.8 + index * 0.2 }}
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-24 bg-gradient-to-b from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="grid grid-cols-2 md:grid-cols-4 gap-8"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {[
              { value: '4+', label: 'Year Experience' },
              { value: '50+', label: 'Projects Completed' },
              { value: '50+', label: 'Happy Clients' },
              { value: '2+', label: 'Awards Won' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <h3 className="text-3xl md:text-4xl font-bold text-indigo-600 dark:text-indigo-400 mb-2">{stat.value}</h3>
                <p className="text-gray-600 dark:text-gray-300">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Skills Section */}
      <Skills />

      {/* Projects Section */}
      <Projects />

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gray-50 dark:bg-gray-800">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-4 text-indigo-600 dark:text-indigo-400">
              Get In Touch
            </h2>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto text-lg leading-relaxed">
              Have a project in mind or want to collaborate? Feel free to reach out to me using the form below.
            </p>
          </motion.div>
          <motion.div
            className="max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="relative bg-white dark:bg-gray-700 rounded-2xl shadow-2xl p-8 bg-gradient-to-br from-indigo-100/50 to-white dark:from-indigo-900/50 dark:to-gray-800">
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-600 to-purple-600 opacity-10 rounded-2xl"></div>
              <form ref={formRef} onSubmit={sendEmail} className="relative space-y-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                  >
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="user_name"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-sm hover:shadow-md transition-shadow duration-300"
                      placeholder="Your name"
                      required
                    />
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                  >
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="user_email"
                      className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-sm hover:shadow-md transition-shadow duration-300"
                      placeholder="Your email"
                      required
                    />
                  </motion.div>
                </div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
                >
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    placeholder="Subject"
                    required
                  />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-indigo-600 dark:focus:ring-indigo-400 focus:border-transparent dark:bg-gray-800 dark:text-white shadow-sm hover:shadow-md transition-shadow duration-300"
                    placeholder="Your message"
                    required
                  ></textarea>
                </motion.div>
                <motion.div
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.7 }}
                >
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`px-8 py-3 bg-indigo-600 text-white rounded-full transition-colors duration-300 transform hover:scale-105 shadow-lg ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-indigo-700'
                      }`}
                    aria-label="Send message"
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                  {formStatus && (
                    <p
                      className={`mt-4 text-sm ${formStatus.includes('success') ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                        }`}
                    >
                      {formStatus}
                    </p>
                  )}
                </motion.div>
              </form>
            </div>
          </motion.div>
          <motion.div
            className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.8 }}
          >
            {[
              { icon: <Mail className="h-6 w-6" />, title: 'Email', content: 'himanshux0802@gmail.com' },
              // { icon: <Linkedin className="h-6 w-6" />, title: 'LinkedIn', content: 'linkedin.com/in/himanshu-singh7905/' },
              { icon: <Github className="h-6 w-6" />, title: 'GitHub', content: 'github.com/HimanshuX0802' },
            ].map((item, index) => (
              <motion.div
                key={index}
                className="bg-white dark:bg-gray-700 p-6 rounded-lg shadow-lg text-center transform hover:scale-105 transition-transform duration-300"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 + index * 0.1 }}
              >
                <div className="inline-flex items-center justify-center w-12 h-12 bg-indigo-100 dark:bg-indigo-900 text-indigo-600 dark:text-indigo-400 rounded-full mb-4">
                  {item.icon}
                </div>
                <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 dark:text-gray-300">{item.content}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            className="flex flex-col md:flex-row justify-between items-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 md:mb-0 text-center md:text-left">
              <div className="font-bold text-2xl mb-2">
                Himanshu Singh<span className="text-indigo-400">.</span>
              </div>
              <p className="text-gray-400 text-sm">© {new Date().getFullYear()} All rights reserved.</p>
            </div>
            <div className="flex space-x-6">
              {/* <motion.a
                // href="https://www.linkedin.com/in/himanshu-singh7905/"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="LinkedIn"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Linkedin className="h-5 w-5" />
              </motion.a> */}
              <motion.a
                href="https://github.com/HimanshuX0802"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="GitHub"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Github className="h-5 w-5" />
              </motion.a>
              <motion.a
                href="mailto:himanshux0802@gmail.com"
                className="text-gray-400 hover:text-indigo-400 transition-colors"
                aria-label="Email"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Mail className="h-5 w-5" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </footer>
    </div>
  );
}

export default App;