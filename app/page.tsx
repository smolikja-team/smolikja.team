"use client";

import { useEffect, useState, useRef } from 'react';

// Function to determine video resolution based on viewport
function getVideoResolution() {
  if (typeof window === 'undefined') return '1080p'; // Default for SSR
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const maxDimension = Math.max(width, height);
  
  if (maxDimension <= 480) return '480p';
  if (maxDimension <= 720) return '720p';
  if (maxDimension <= 1080) return '1080p';
  return '2160p';
}

// Function to generate video URLs
function getVideoUrls(resolution: string) {
  const baseUrl = 'https://smolikja.team/assets/portfolio-web/loop2x/team-logo-';
  return {
    webm: `${baseUrl}${resolution}.webm`,
    mp4: `${baseUrl}${resolution}.mp4`
  };
}

// Function to detect browser capabilities
function getBrowserCapabilities() {
  if (typeof window === 'undefined') return { supportsWebM: false, isIOS: false };
  
  const video = document.createElement('video');
  const supportsWebM = video.canPlayType('video/webm') !== '';
  
  // Detect iOS (including iPad Pro with desktop user agent)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  return { supportsWebM, isIOS };
}

export default function Home() {
  const [videoResolution, setVideoResolution] = useState('1080p');
  const [browserCaps, setBrowserCaps] = useState({ supportsWebM: false, isIOS: false });
  const [videoError, setVideoError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Set initial resolution and browser capabilities
    setVideoResolution(getVideoResolution());
    setBrowserCaps(getBrowserCapabilities());

    // Update resolution on window resize
    const handleResize = () => {
      setVideoResolution(getVideoResolution());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Ensure video plays on iOS after load
    const video = videoRef.current;
    if (video && browserCaps.isIOS) {
      const playVideo = async () => {
        try {
          await video.play();
        } catch (error) {
          console.log('Autoplay failed on iOS, which is expected:', error);
        }
      };

      if (video.readyState >= 2) {
        playVideo();
      } else {
        video.addEventListener('loadeddata', playVideo, { once: true });
      }
    }
  }, [videoResolution, browserCaps.isIOS]);

  const videoUrls = getVideoUrls(videoResolution);
  return (
    <div className="scroll-snap-container">
      {/* Intro Section - Foreground Video Only */}
      <section className="section section-intro">
        {!videoError && (
          <video 
            ref={videoRef}
            key={videoResolution} // Force re-render when resolution changes
            autoPlay
            muted
            loop
            playsInline
            preload="metadata" // Changed from "auto" for better iOS compatibility
            className="foreground-video"
            controls={false}
            disablePictureInPicture
            onLoadedData={() => {
              console.log(`Video loaded: ${videoResolution} resolution`);
              setVideoError(false);
            }}
            onCanPlay={() => {
              // Additional attempt to play on iOS
              if (browserCaps.isIOS && videoRef.current) {
                videoRef.current.play().catch(() => {
                  console.log('iOS autoplay prevented, video will play on user interaction');
                });
              }
            }}
            onError={(e) => {
              console.log('Video failed to load:', e);
              setVideoError(true);
            }}
            onStalled={() => {
              console.log('Video stalled, attempting recovery...');
              if (videoRef.current) {
                videoRef.current.load();
              }
            }}
          >
            {/* Prioritize MP4 for iOS Safari since WebM is not supported */}
            {browserCaps.isIOS ? (
              <>
                <source src={videoUrls.mp4} type="video/mp4" />
              </>
            ) : (
              <>
                {browserCaps.supportsWebM && <source src={videoUrls.webm} type="video/webm" />}
                <source src={videoUrls.mp4} type="video/mp4" />
              </>
            )}
            Your browser does not support the video tag.
          </video>
        )}
        
        {/* Fallback content when video fails */}
        {videoError && (
          <div className="video-fallback">
            <div className="fallback-content">
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1rem' }}>
                Welcome
              </h1>
              <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', opacity: 0.9 }}>
                Creative Developer & Designer
              </p>
            </div>
          </div>
        )}
      </section>

      {/* Projects Section */}
      <section className="section section-projects">
        <div className="content-wrapper">
          <h2 className="section-title">Projects</h2>
          <p className="section-subtitle">Featured Work & Portfolio</p>
          <div className="section-content">
            <div className="projects-grid">
              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>E-Commerce Platform</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Modern e-commerce solution built with Next.js, featuring real-time inventory management and seamless payment integration.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">Next.js</span>
                  <span className="tag">TypeScript</span>
                  <span className="tag">Stripe</span>
                </div>
              </div>
              
              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>
              
              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Portfolio Website</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Responsive portfolio website with smooth animations, optimized performance, and modern design principles.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">Next.js</span>
                  <span className="tag">Framer Motion</span>
                  <span className="tag">CSS</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>

              <div className="card">
                <h3 style={{ fontSize: '1.5rem', marginBottom: '1rem', fontWeight: '600' }}>Task Management App</h3>
                <p style={{ marginBottom: '1rem', opacity: 0.9 }}>
                  Collaborative task management application with real-time updates, drag-and-drop functionality, and team collaboration features.
                </p>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="tag">React</span>
                  <span className="tag">Node.js</span>
                  <span className="tag">Socket.io</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section-about">
        <div className="content-wrapper">
          <h2 className="section-title">About Us</h2>
          <p className="section-subtitle">Passionate About Technology & Innovation</p>
          <div className="section-content">
            <div className="about-grid">
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '600' }}>Our Story</h3>
                <p style={{ marginBottom: '1.5rem', lineHeight: '1.8' }}>
                  We are a team of passionate developers and designers who believe in the power of technology to solve real-world problems. 
                  Our journey began with a simple idea: to create digital experiences that not only look beautiful but also provide genuine value to users.
                </p>
                <p style={{ lineHeight: '1.8' }}>
                  With years of experience in web development, mobile applications, and user experience design, 
                  we bring a unique blend of technical expertise and creative vision to every project.
                </p>
              </div>
              
              <div>
                <h3 style={{ fontSize: '2rem', marginBottom: '1.5rem', fontWeight: '600' }}>Our Approach</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                  <div className="approach-card">
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>User-Centered Design</h4>
                    <p style={{ opacity: 0.9 }}>We put users at the heart of everything we do, ensuring intuitive and accessible experiences.</p>
                  </div>
                  
                  <div className="approach-card">
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Modern Technologies</h4>
                    <p style={{ opacity: 0.9 }}>We leverage the latest technologies and best practices to build scalable, maintainable solutions.</p>
                  </div>
                  
                  <div className="approach-card">
                    <h4 style={{ fontSize: '1.25rem', marginBottom: '0.75rem', fontWeight: '600' }}>Collaborative Process</h4>
                    <p style={{ opacity: 0.9 }}>We work closely with our clients throughout the entire development process, ensuring transparency and alignment.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '3rem', textAlign: 'center' }}>
              <p style={{ fontSize: '1.25rem', opacity: 0.9 }}>
                Ready to bring your ideas to life? Let's create something amazing together.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
