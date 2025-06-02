"use client";

export default function Home() {
  return (
    <div className="scroll-snap-container">
      {/* Intro Section - Foreground Video Only */}
      <section className="section section-intro">
        <video 
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          className="foreground-video"
          onLoadedData={() => {
            // Ensure video is ready to loop smoothly
            console.log('Video loaded and ready for smooth looping');
          }}
          onError={(e) => {
            console.log('Video failed to load, using fallback background');
            e.currentTarget.style.display = 'none';
          }}
        >
          <source src="https://smolikja.team/assets/portfolio-web/team-logo-1080p.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
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
