"use client";

import { useEffect, useState, useRef, useCallback } from 'react';

// Function to determine video resolution based on viewport and connection
function getVideoResolution(connectionSpeed: string = 'fast') {
  if (typeof window === 'undefined') return '1080p'; // Default for SSR
  
  const width = window.innerWidth;
  const height = window.innerHeight;
  const maxDimension = Math.max(width, height);
  
  // Adjust resolution based on connection speed
  if (connectionSpeed === 'slow') {
    if (maxDimension <= 720) return '480p';
    if (maxDimension <= 1080) return '720p';
    return '1080p'; // Cap at 1080p for slow connections
  }
  
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

// Function to detect browser capabilities and connection speed
function getBrowserCapabilities() {
  if (typeof window === 'undefined') return { supportsWebM: false, isIOS: false, connectionSpeed: 'fast' };
  
  const video = document.createElement('video');
  const supportsWebM = video.canPlayType('video/webm') !== '';
  
  // Detect iOS (including iPad Pro with desktop user agent)
  const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) || 
    (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1);
  
  // Detect connection speed
  let connectionSpeed = 'fast';
  if ('connection' in navigator) {
    const connection = (navigator as any).connection;
    if (connection.effectiveType === 'slow-2g' || connection.effectiveType === '2g') {
      connectionSpeed = 'slow';
    } else if (connection.effectiveType === '3g') {
      connectionSpeed = 'medium';
    }
  }
  
  return { supportsWebM, isIOS, connectionSpeed };
}

export default function Home() {
  const [videoResolution, setVideoResolution] = useState('1080p');
  const [browserCaps, setBrowserCaps] = useState({ supportsWebM: false, isIOS: false, connectionSpeed: 'fast' });
  const [videoError, setVideoError] = useState(false);
  const [shouldLoadVideo, setShouldLoadVideo] = useState(false);
  const [videoLoaded, setVideoLoaded] = useState(false);
  const [useStaticFallback, setUseStaticFallback] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const introSectionRef = useRef<HTMLDivElement>(null);

  // Check if we should use static fallback for very slow connections
  useEffect(() => {
    const caps = getBrowserCapabilities();
    setBrowserCaps(caps);
    
    // Use static fallback for very slow connections or if user prefers reduced data
    if (caps.connectionSpeed === 'slow' && 'connection' in navigator) {
      const connection = (navigator as any).connection;
      if (connection.saveData || connection.effectiveType === 'slow-2g') {
        setUseStaticFallback(true);
        console.log('Using static fallback due to slow connection or data saver mode');
        return;
      }
    }
    
    setVideoResolution(getVideoResolution(caps.connectionSpeed));
  }, []);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (useStaticFallback) return; // Skip video loading if using static fallback
    
    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !shouldLoadVideo) {
          console.log('Intro section in view, starting video load...');
          setShouldLoadVideo(true);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      rootMargin: '50px', // Start loading 50px before the section is visible
      threshold: 0.1
    });

    if (introSectionRef.current) {
      observer.observe(introSectionRef.current);
    }

    return () => {
      if (introSectionRef.current) {
        observer.unobserve(introSectionRef.current);
      }
    };
  }, [shouldLoadVideo, useStaticFallback]);

  useEffect(() => {
    // Update resolution on window resize
    const handleResize = () => {
      if (!useStaticFallback) {
        setVideoResolution(getVideoResolution(browserCaps.connectionSpeed));
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [browserCaps.connectionSpeed, useStaticFallback]);

  // Handle video loading and playback
  const handleVideoLoad = useCallback(async () => {
    const video = videoRef.current;
    if (!video || !shouldLoadVideo) return;

    try {
      // For iOS, we need to handle autoplay more carefully
      if (browserCaps.isIOS) {
        const playPromise = video.play();
        if (playPromise !== undefined) {
          await playPromise;
        }
      } else {
        await video.play();
      }
      setVideoLoaded(true);
      console.log(`Video playing: ${videoResolution} resolution`);
    } catch (error) {
      console.log('Autoplay failed, video will play on user interaction:', error);
      setVideoLoaded(true); // Still mark as loaded even if autoplay fails
    }
  }, [shouldLoadVideo, browserCaps.isIOS, videoResolution]);

  useEffect(() => {
    if (shouldLoadVideo && videoRef.current && !videoLoaded) {
      const video = videoRef.current;
      
      if (video.readyState >= 2) {
        handleVideoLoad();
      } else {
        video.addEventListener('loadeddata', handleVideoLoad, { once: true });
      }
    }
  }, [shouldLoadVideo, videoLoaded, handleVideoLoad]);

  const videoUrls = getVideoUrls(videoResolution);
  return (
    <div className="scroll-snap-container">
      {/* Intro Section - Performance Optimized */}
      <section ref={introSectionRef} className="section section-intro">
        {/* Static fallback for very slow connections */}
        {useStaticFallback && (
          <div className="static-fallback">
            <div className="static-content">
              <div className="logo-placeholder">
                {/* Simple animated logo placeholder */}
                <div className="animated-logo">
                  <div className="logo-circle"></div>
                  <div className="logo-text">JS</div>
                </div>
              </div>
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1rem', marginTop: '2rem' }}>
                Welcome
              </h1>
              <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', opacity: 0.9 }}>
                Creative Developer & Designer
              </p>
              <button 
                onClick={() => {
                  setUseStaticFallback(false);
                  setShouldLoadVideo(true);
                }}
                style={{
                  marginTop: '2rem',
                  padding: '0.75rem 1.5rem',
                  background: 'rgba(255, 255, 255, 0.1)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  borderRadius: '0.5rem',
                  color: 'white',
                  cursor: 'pointer',
                  fontSize: '1rem'
                }}
              >
                Load Full Experience
              </button>
            </div>
          </div>
        )}

        {/* Loading placeholder (only show if not using static fallback) */}
        {!useStaticFallback && !shouldLoadVideo && (
          <div className="video-placeholder">
            <div className="placeholder-content">
              <div className="loading-indicator">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
                <p>Loading experience...</p>
              </div>
            </div>
          </div>
        )}

        {/* Load video only when needed and not using static fallback */}
        {!useStaticFallback && shouldLoadVideo && !videoError && (
          <video 
            ref={videoRef}
            key={`${videoResolution}-${shouldLoadVideo}`} // Force re-render when needed
            autoPlay
            muted
            loop
            playsInline
            preload="none" // Don't preload anything until we decide to load
            className={`foreground-video ${videoLoaded ? 'video-loaded' : 'video-loading'}`}
            controls={false}
            disablePictureInPicture
            onLoadStart={() => {
              console.log(`Starting to load video: ${videoResolution} resolution`);
            }}
            onLoadedData={() => {
              console.log(`Video data loaded: ${videoResolution} resolution`);
              setVideoError(false);
            }}
            onCanPlay={() => {
              console.log('Video can play');
              handleVideoLoad();
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
        
        {/* Enhanced fallback content when video fails */}
        {!useStaticFallback && shouldLoadVideo && videoError && (
          <div className="video-fallback">
            <div className="fallback-content">
              <h1 style={{ fontSize: 'clamp(3rem, 8vw, 6rem)', marginBottom: '1rem' }}>
                Welcome
              </h1>
              <p style={{ fontSize: 'clamp(1.2rem, 3vw, 2rem)', opacity: 0.9 }}>
                Creative Developer & Designer
              </p>
              <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                <button 
                  onClick={() => {
                    setVideoError(false);
                    setShouldLoadVideo(true);
                    setVideoLoaded(false);
                  }}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.1)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    borderRadius: '0.5rem',
                    color: 'white',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Try Again
                </button>
                <button 
                  onClick={() => setUseStaticFallback(true)}
                  style={{
                    padding: '0.75rem 1.5rem',
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    borderRadius: '0.5rem',
                    color: 'rgba(255, 255, 255, 0.7)',
                    cursor: 'pointer',
                    fontSize: '1rem'
                  }}
                >
                  Use Simple Mode
                </button>
              </div>
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
