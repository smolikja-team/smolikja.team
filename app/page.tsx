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

  // Reset gallery scroll positions to show left spacers and add controls functionality
  useEffect(() => {
    const resetGalleryScrolls = () => {
      const galleries = document.querySelectorAll('.project-gallery');
      galleries.forEach((gallery) => {
        if (gallery instanceof HTMLElement) {
          gallery.scrollLeft = 0;
        }
      });
    };

    // Gallery scroll bar functionality
    const setupGalleryScrollbars = () => {
      const galleryWrappers = document.querySelectorAll('.gallery-wrapper');
      
      galleryWrappers.forEach((wrapper) => {
        const gallery = wrapper.querySelector('.project-gallery') as HTMLElement;
        const scrollbar = wrapper.querySelector('.gallery-scrollbar') as HTMLElement;
        const thumb = wrapper.querySelector('.gallery-scrollbar-thumb') as HTMLElement;
        const prevArrow = wrapper.querySelector('.gallery-arrow-prev') as HTMLButtonElement;
        const nextArrow = wrapper.querySelector('.gallery-arrow-next') as HTMLButtonElement;
        
        if (!gallery || !scrollbar || !thumb || !prevArrow || !nextArrow) return;
        
        let isDragging = false;
        let startX = 0;
        let startScrollLeft = 0;
        
        // Calculate scroll step (approximately one image width)
        const getScrollStep = () => {
          const firstImage = gallery.querySelector('.gallery-image') as HTMLElement;
          if (firstImage) {
            return firstImage.offsetWidth + 32; // Image width + gap
          }
          return gallery.clientWidth * 0.8; // Fallback
        };
        
        // Update arrow states based on scroll position
        const updateArrowStates = () => {
          const scrollLeft = gallery.scrollLeft;
          const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
          
          prevArrow.disabled = scrollLeft <= 0;
          nextArrow.disabled = scrollLeft >= maxScrollLeft;
        };
        
        // Update thumb position and size based on gallery scroll
        const updateThumb = () => {
          const galleryScrollWidth = gallery.scrollWidth;
          const galleryClientWidth = gallery.clientWidth;
          const scrollLeft = gallery.scrollLeft;
          
          // Calculate thumb width as percentage of scrollbar width
          const thumbWidthPercent = Math.min((galleryClientWidth / galleryScrollWidth) * 100, 100);
          
          // Calculate thumb position as percentage
          const maxScrollLeft = galleryScrollWidth - galleryClientWidth;
          const thumbLeftPercent = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (100 - thumbWidthPercent) : 0;
          
          thumb.style.width = `${thumbWidthPercent}%`;
          thumb.style.left = `${thumbLeftPercent}%`;
          
          // Update arrow states
          updateArrowStates();
        };
        
        // Handle arrow clicks
        const handlePrevClick = () => {
          const scrollStep = getScrollStep();
          gallery.scrollTo({
            left: Math.max(0, gallery.scrollLeft - scrollStep),
            behavior: 'smooth'
          });
        };
        
        const handleNextClick = () => {
          const scrollStep = getScrollStep();
          const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
          gallery.scrollTo({
            left: Math.min(maxScrollLeft, gallery.scrollLeft + scrollStep),
            behavior: 'smooth'
          });
        };
        
        // Handle scrollbar click (not on thumb)
        const handleScrollbarClick = (e: MouseEvent) => {
          if (e.target === thumb) return;
          
          const scrollbarRect = scrollbar.getBoundingClientRect();
          const clickX = e.clientX - scrollbarRect.left;
          const scrollbarWidth = scrollbarRect.width;
          const clickPercent = clickX / scrollbarWidth;
          
          const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
          const targetScrollLeft = clickPercent * maxScrollLeft;
          
          gallery.scrollTo({
            left: targetScrollLeft,
            behavior: 'smooth'
          });
        };
        
        // Handle thumb dragging
        const handleThumbMouseDown = (e: MouseEvent) => {
          isDragging = true;
          startX = e.clientX;
          startScrollLeft = gallery.scrollLeft;
          e.preventDefault();
          
          document.addEventListener('mousemove', handleThumbMouseMove);
          document.addEventListener('mouseup', handleThumbMouseUp);
        };
        
        const handleThumbMouseMove = (e: MouseEvent) => {
          if (!isDragging) return;
          
          const deltaX = e.clientX - startX;
          const scrollbarRect = scrollbar.getBoundingClientRect();
          const scrollbarWidth = scrollbarRect.width;
          const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
          
          // Calculate scroll ratio based on mouse movement
          const scrollRatio = deltaX / scrollbarWidth;
          const targetScrollLeft = startScrollLeft + (scrollRatio * maxScrollLeft);
          
          gallery.scrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
        };
        
        const handleThumbMouseUp = () => {
          isDragging = false;
          document.removeEventListener('mousemove', handleThumbMouseMove);
          document.removeEventListener('mouseup', handleThumbMouseUp);
        };
        
        // Handle touch events for mobile
        const handleThumbTouchStart = (e: TouchEvent) => {
          isDragging = true;
          startX = e.touches[0].clientX;
          startScrollLeft = gallery.scrollLeft;
          e.preventDefault();
        };
        
        const handleThumbTouchMove = (e: TouchEvent) => {
          if (!isDragging) return;
          
          const deltaX = e.touches[0].clientX - startX;
          const scrollbarRect = scrollbar.getBoundingClientRect();
          const scrollbarWidth = scrollbarRect.width;
          const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
          
          const scrollRatio = deltaX / scrollbarWidth;
          const targetScrollLeft = startScrollLeft + (scrollRatio * maxScrollLeft);
          
          gallery.scrollLeft = Math.max(0, Math.min(targetScrollLeft, maxScrollLeft));
          e.preventDefault();
        };
        
        const handleThumbTouchEnd = () => {
          isDragging = false;
        };
        
        // Event listeners
        prevArrow.addEventListener('click', handlePrevClick);
        nextArrow.addEventListener('click', handleNextClick);
        scrollbar.addEventListener('click', handleScrollbarClick);
        thumb.addEventListener('mousedown', handleThumbMouseDown);
        thumb.addEventListener('touchstart', handleThumbTouchStart, { passive: false });
        thumb.addEventListener('touchmove', handleThumbTouchMove, { passive: false });
        thumb.addEventListener('touchend', handleThumbTouchEnd);
        
        // Update thumb on gallery scroll
        gallery.addEventListener('scroll', updateThumb);
        
        // Initial thumb update
        updateThumb();
        
        // Update on window resize
        const handleResize = () => {
          updateThumb();
        };
        
        window.addEventListener('resize', handleResize);
        
        // Store cleanup function
        (wrapper as any).cleanup = () => {
          prevArrow.removeEventListener('click', handlePrevClick);
          nextArrow.removeEventListener('click', handleNextClick);
          scrollbar.removeEventListener('click', handleScrollbarClick);
          thumb.removeEventListener('mousedown', handleThumbMouseDown);
          thumb.removeEventListener('touchstart', handleThumbTouchStart);
          thumb.removeEventListener('touchmove', handleThumbTouchMove);
          thumb.removeEventListener('touchend', handleThumbTouchEnd);
          gallery.removeEventListener('scroll', updateThumb);
          window.removeEventListener('resize', handleResize);
          document.removeEventListener('mousemove', handleThumbMouseMove);
          document.removeEventListener('mouseup', handleThumbMouseUp);
        };
      });
    };

    // Reset scroll positions after component mounts and on window load
    resetGalleryScrolls();
    setupGalleryScrollbars();
    
    window.addEventListener('load', () => {
      resetGalleryScrolls();
      setupGalleryScrollbars();
    });

    return () => {
      window.removeEventListener('load', resetGalleryScrolls);
      // Cleanup gallery scrollbar event listeners
      const galleryWrappers = document.querySelectorAll('.gallery-wrapper');
      galleryWrappers.forEach((wrapper: any) => {
        if (wrapper.cleanup) {
          wrapper.cleanup();
        }
      });
    };
  }, []);

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

  // Function to update gallery controls after images load
  const updateGalleryControls = () => {
    const galleryWrappers = document.querySelectorAll('.gallery-wrapper');
    
    galleryWrappers.forEach((wrapper) => {
      const gallery = wrapper.querySelector('.project-gallery') as HTMLElement;
      const scrollbar = wrapper.querySelector('.gallery-scrollbar') as HTMLElement;
      const thumb = wrapper.querySelector('.gallery-scrollbar-thumb') as HTMLElement;
      const prevArrow = wrapper.querySelector('.gallery-arrow-prev') as HTMLButtonElement;
      const nextArrow = wrapper.querySelector('.gallery-arrow-next') as HTMLButtonElement;
      
      if (!gallery || !scrollbar || !thumb || !prevArrow || !nextArrow) return;
      
      // Update arrow states based on current scroll position
      const updateArrowStates = () => {
        const scrollLeft = gallery.scrollLeft;
        const maxScrollLeft = gallery.scrollWidth - gallery.clientWidth;
        
        const prevDisabled = scrollLeft <= 0;
        const nextDisabled = scrollLeft >= maxScrollLeft;
        
        prevArrow.disabled = prevDisabled;
        nextArrow.disabled = nextDisabled;
        
        console.log(`Gallery controls updated - Prev: ${prevDisabled ? 'disabled' : 'enabled'}, Next: ${nextDisabled ? 'disabled' : 'enabled'}, ScrollLeft: ${scrollLeft}, MaxScroll: ${maxScrollLeft}`);
      };
      
      // Update thumb position and size based on gallery scroll
      const updateThumb = () => {
        const galleryScrollWidth = gallery.scrollWidth;
        const galleryClientWidth = gallery.clientWidth;
        const scrollLeft = gallery.scrollLeft;
        
        // Calculate thumb width as percentage of scrollbar width
        const thumbWidthPercent = Math.min((galleryClientWidth / galleryScrollWidth) * 100, 100);
        
        // Calculate thumb position as percentage
        const maxScrollLeft = galleryScrollWidth - galleryClientWidth;
        const thumbLeftPercent = maxScrollLeft > 0 ? (scrollLeft / maxScrollLeft) * (100 - thumbWidthPercent) : 0;
        
        thumb.style.width = `${thumbWidthPercent}%`;
        thumb.style.left = `${thumbLeftPercent}%`;
        
        // Update arrow states
        updateArrowStates();
      };
      
      // Update both thumb and arrows
      updateThumb();
    });
  };

  // Lazy loading functionality for gallery images
  useEffect(() => {
    // Function to load individual image
    const loadImage = (imageContainer: Element) => {
      const container = imageContainer as HTMLElement;
      const imageSrc = container.getAttribute('data-src');
      const imageAlt = container.getAttribute('data-alt') || '';

      if (!imageSrc) return;

      console.log(`Loading image: ${imageSrc}`);

      // Create new image element
      const img = new Image();
      
      // Set up load handlers
      img.onload = () => {
        // Image loaded successfully
        console.log(`Image loaded successfully: ${imageSrc}`);
        
        // Create a new img element with proper styling
        const newImg = document.createElement('img');
        newImg.src = imageSrc;
        newImg.alt = imageAlt;
        newImg.className = 'gallery-image-content';
        newImg.style.cssText = `
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 25px;
        `;
        
        // Replace placeholder with actual image
        container.innerHTML = '';
        container.appendChild(newImg);
        container.classList.remove('loading');
        container.classList.add('loaded');
        
        // Remove data attributes as they're no longer needed
        container.removeAttribute('data-src');
        container.removeAttribute('data-alt');
        
        // Update gallery controls after image loads
        updateGalleryControls();
      };

      img.onerror = () => {
        // Image failed to load
        console.error(`Failed to load image: ${imageSrc}`);
        container.classList.remove('loading');
        container.classList.add('error');
        
        // Show error placeholder
        container.innerHTML = `
          <div class="image-error-placeholder">
            <div style="font-size: 2rem; margin-bottom: 0.5rem;">⚠️</div>
            <div>Failed to load image</div>
          </div>
        `;
        
        // Update gallery controls after error state
        updateGalleryControls();
      };

      // Start loading the image
      img.src = imageSrc;
    };

    // Lazy loading functionality with Intersection Observer
    const setupLazyLoading = () => {
      // Check if Intersection Observer is supported
      if (!('IntersectionObserver' in window)) {
        console.log('IntersectionObserver not supported, loading all images immediately');
        // Fallback for older browsers - load all images immediately
        const lazyImages = document.querySelectorAll('.gallery-image[data-src]');
        lazyImages.forEach(loadImage);
        return;
      }

      // Configuration for the intersection observer
      const observerOptions = {
        root: null, // Use viewport as root
        rootMargin: '200px', // Start loading 200px before image comes into view for better UX
        threshold: 0.1 // Trigger when 10% of the image is visible
      };

      // Create intersection observer
      const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const imageContainer = entry.target as HTMLElement;
            loadImage(imageContainer);
            observer.unobserve(imageContainer); // Stop observing once loaded
          }
        });
      }, observerOptions);

      // Start observing all lazy images
      const lazyImages = document.querySelectorAll('.gallery-image[data-src]');
      console.log(`Found ${lazyImages.length} images to lazy load`);
      
      lazyImages.forEach(img => {
        imageObserver.observe(img);
      });

      // Store observer for cleanup
      (window as any).lazyImageObserver = imageObserver;
    };
    
    // Initialize lazy loading
    setupLazyLoading();
    
    // Also run on window load to catch any missed images
    window.addEventListener('load', setupLazyLoading);
    
    // Update gallery controls after a short delay to ensure DOM is ready
    setTimeout(() => {
      updateGalleryControls();
    }, 100);
    
    return () => {
      window.removeEventListener('load', setupLazyLoading);
      
      // Cleanup lazy loading observer
      if ((window as any).lazyImageObserver) {
        (window as any).lazyImageObserver.disconnect();
        delete (window as any).lazyImageObserver;
      }
    };
  }, []);

  const videoUrls = getVideoUrls(videoResolution);
  return (
    <div className="scroll-snap-container">
      {/* Intro Section - Performance Optimized */}
      <section ref={introSectionRef} className="section section-intro">
        {/* Logo and scroll indicator - always visible when not using video */}
        {(useStaticFallback || (!shouldLoadVideo || videoError)) && (
          <div className="logo-fallback">
            <div className="logo-content">
              <div className="logo-container">
                <img 
                  src="https://smolikja.team/assets/portfolio-web/logo-white.svg" 
                  alt="Portfolio Logo" 
                  className="portfolio-logo"
                />
              </div>

              <div className="simple-arrow-down"></div>
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

      </section>

      {/* Projects Section */}
      <section className="section section-projects">
        <div className="content-wrapper">
          <div className="section-content">
            <div className="projects-container">
              
              {/* Project 1: Domov pod palcem */}
              <div className="project-item">
                <h3 className="project-title">Domov pod palcem</h3>
                <p className="project-description">
                  Mobilní aplikace pro iOS a Android určená k ovládání chytré domácnosti.
                  Aplikace je navržena s důrazem na ergonomii – veškeré ovládací prvky jsou dostupné palcem ruky, která drží telefon, což umožňuje pohodlné ovládání i v situacích, kdy má uživatel k dispozici pouze jednu ruku.
                </p>
                
                <div className="gallery-wrapper">
                  <div className="project-gallery" data-gallery="domov">
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/domov/dashboard.png" data-alt="Domov pod palcem - Dashboard">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/domov/blinder.png" data-alt="Domov pod palcem - Blinder control">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/domov/heating.png" data-alt="Domov pod palcem - Heating control">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/domov/time-regime.png" data-alt="Domov pod palcem - Time regime">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="gallery-scrollbar-container">
                    <button className="gallery-arrow gallery-arrow-prev" data-gallery="domov">
                      <svg viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    
                    <div className="gallery-scrollbar" data-gallery="domov">
                      <div className="gallery-scrollbar-thumb"></div>
                    </div>
                    
                    <button className="gallery-arrow gallery-arrow-next" data-gallery="domov">
                      <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="project-description-2">
                  Aplikace se automaticky konfiguruje dle přihlášeného uživatele a komunikuje s chytrou domácností pomocí zabezpečeného WebSocket protokolu. Uživatel má možnost ovládat osvětlení, žaluzie, vstupní brány, vytápění, podlahové topení, rekuperaci i klimatizaci – včetně nastavení časových plánů.
                </p>
              </div>

              {/* Project 2: Inteligentní stáj */}
              <div className="project-item">
                <h3 className="project-title">Inteligentní stáj</h3>
                <p className="project-description">
                  Mobilní aplikace pro iOS a Android navržená pro správce inteligentní stáje určené pro chov skotu.
                  Aplikace umožňuje vzdálené ovládání vybavení stáje a poskytuje notifikace v případě technických problémů nebo neobvyklých stavů.
                </p>
                
                <div className="gallery-wrapper">
                  <div className="project-gallery" data-gallery="stable">
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/stable/splashscreen.png" data-alt="Inteligentní stáj - Splash screen">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/stable/stable-picker.png" data-alt="Inteligentní stáj - Stable picker">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/stable/ventilators.png" data-alt="Inteligentní stáj - Ventilators">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/stable/sail-control.png" data-alt="Inteligentní stáj - Sail control">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/stable/sensors.png" data-alt="Inteligentní stáj - Sensors">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/stable/light-control.png" data-alt="Inteligentní stáj - Light control">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="gallery-scrollbar-container">
                    <button className="gallery-arrow gallery-arrow-prev" data-gallery="stable">
                      <svg viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    
                    <div className="gallery-scrollbar" data-gallery="stable">
                      <div className="gallery-scrollbar-thumb"></div>
                    </div>
                    
                    <button className="gallery-arrow gallery-arrow-next" data-gallery="stable">
                      <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="project-description-2">
                  Přizpůsobuje se přihlášenému uživateli a komunikuje prostřednictvím zabezpečeného WebSocket protokolu. Uživatel může ovládat ventilátory, plachty a osvětlení stáje. K dispozici je také přehled aktuálních hodnot z čidel a interaktivní grafy vývoje za posledních 24 hodin. V případě potřeby aplikace automaticky upozorní správce prostřednictvím push notifikace.
                </p>
              </div>

              {/* Project 3: Firebase Auth Flow pro Flutter */}
              <div className="project-item">
                <h3 className="project-title">Firebase Auth Flow pro Flutter</h3>
                <p className="project-description">
                  Open-source Flutter package s uživatelským rozhraním pro přihlášení a registraci k Firebase pomocí e-mailové adresy.
                </p>
                
                <div className="gallery-wrapper">
                  <div className="project-gallery" data-gallery="auth-flow">
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/auth-flow/login.png" data-alt="Firebase Auth Flow - Login">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/auth-flow/registration.png" data-alt="Firebase Auth Flow - Registration">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                    <div className="gallery-image loading" data-src="https://smolikja.team/assets/portfolio-web/projects/auth-flow/confirmation.png" data-alt="Firebase Auth Flow - Confirmation">
                      <div className="image-loading-placeholder">
                        <div className="image-loading-spinner"></div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="gallery-scrollbar-container">
                    <button className="gallery-arrow gallery-arrow-prev" data-gallery="auth-flow">
                      <svg viewBox="0 0 24 24">
                        <path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z"/>
                      </svg>
                    </button>
                    
                    <div className="gallery-scrollbar" data-gallery="auth-flow">
                      <div className="gallery-scrollbar-thumb"></div>
                    </div>
                    
                    <button className="gallery-arrow gallery-arrow-next" data-gallery="auth-flow">
                      <svg viewBox="0 0 24 24">
                        <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
                      </svg>
                    </button>
                  </div>
                </div>
                
                <p className="project-description-2">
                  Balíček nabízí kompletní přihlašovací tok připravený k integraci do mobilní aplikace. Dostupný veřejně zde: <a href="https://github.com/smolikja-team/firebase-auth-flow" target="_blank" rel="noopener noreferrer" className="project-link">https://github.com/smolikja-team/firebase-auth-flow</a>
                </p>
              </div>
              
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="section section-about">
        <div className="content-wrapper">
          <div className="section-content" style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%',
            textAlign: 'center',
            gap: '2rem'
          }}>
            <p style={{ 
              fontSize: '1.5rem', 
              lineHeight: '1.6',
              margin: '0 auto'
            }}>
              Tým tvůrců mobilních aplikací vedený <a 
                href="https://www.linkedin.com/in/smolikja/" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ 
                  color: 'inherit', 
                  textDecoration: 'underline',
                  textDecorationColor: 'rgba(255, 255, 255, 0.5)',
                  transition: 'text-decoration-color 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLAnchorElement).style.textDecorationColor = 'rgba(255, 255, 255, 1)';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLAnchorElement).style.textDecorationColor = 'rgba(255, 255, 255, 0.5)';
                }}
              >
                Jakubem Smolíkem
              </a>
            </p>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '1.5rem' 
            }}>
              <a 
                href="https://github.com/smolikja-team/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="github-logo-link"
                style={{ 
                  display: 'inline-block',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  opacity: '0.8'
                }}
              >
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{ 
                    color: 'white',
                    pointerEvents: 'none' // Prevent SVG from interfering with hover events
                  }}
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
              </a>

              <a 
                href="https://discord.gg/fgA2PMck" 
                target="_blank" 
                rel="noopener noreferrer"
                className="discord-logo-link"
                style={{ 
                  display: 'inline-block',
                  transition: 'transform 0.3s ease, opacity 0.3s ease',
                  opacity: '0.8'
                }}
              >
                <svg 
                  width="48" 
                  height="48" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                  style={{ 
                    color: 'white',
                    pointerEvents: 'none' // Prevent SVG from interfering with hover events
                  }}
                >
                  <path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419-.0002 1.3332-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3332-.9555 2.4189-2.1568 2.4189Z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
