/**
 * Projects Component - Manages the projects page functionality with lazy loading
 */
export class ProjectsComponent {
    constructor() {
        this.projects = [
            {
                id: 1,
                title: "Portfolio Website",
                description: "Modern responsive portfolio with smooth scroll navigation and dynamic content loading.",
                technologies: ["JavaScript ES6+", "CSS Grid", "Scroll API"],
                image: "src/assets/images/projects/portfolio.svg",
                link: "#portfolio",
                status: "completed"
            },
            {
                id: 2,
                title: "Team Collaboration Tool",
                description: "Real-time collaboration platform with advanced project management features.",
                technologies: ["TypeScript", "WebSocket", "Node.js"],
                image: "assets/projects/collaboration.svg",
                link: "#collaboration",
                status: "in-progress"
            },
            {
                id: 3,
                title: "Data Visualization Dashboard",
                description: "Interactive dashboard for complex data analysis with beautiful charts and insights.",
                technologies: ["React", "D3.js", "REST API"],
                image: "assets/projects/dashboard.svg",
                link: "#dashboard",
                status: "completed"
            },
            {
                id: 4,
                title: "Mobile App Design System",
                description: "Comprehensive design system for mobile applications with reusable components.",
                technologies: ["Figma", "React Native", "Design Tokens"],
                image: "assets/projects/design-system.svg",
                link: "#design-system",
                status: "planned"
            }
        ];
        
        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        document.addEventListener('pageLoaded', (event) => {
            if (event.detail.pageName === 'projects') {
                this.renderProjects();
            }
        });
    }

    renderProjects() {
        const projectsContainer = document.querySelector('.projects-grid');
        if (!projectsContainer) return;

        // Clear container
        projectsContainer.innerHTML = '';
        
        // Create loading placeholder
        const loadingPlaceholder = document.createElement('div');
        loadingPlaceholder.className = 'projects-loading';
        loadingPlaceholder.innerHTML = '<span class="loading-spinner"></span> Loading projects...';
        projectsContainer.appendChild(loadingPlaceholder);
        
        // Use requestIdleCallback or setTimeout to defer project loading
        const deferLoading = window.requestIdleCallback || setTimeout;
        
        deferLoading(() => {
            this.lazyLoadProjects(projectsContainer);
        }, 100);
    }
    
    lazyLoadProjects(container) {
        // Remove loading placeholder
        const loadingPlaceholder = container.querySelector('.projects-loading');
        if (loadingPlaceholder) {
            loadingPlaceholder.remove();
        }
        
        // Use IntersectionObserver to load projects as they come into view
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const projectElement = entry.target;
                    const projectId = parseInt(projectElement.dataset.projectId);
                    
                    // Add animation class to show the project
                    setTimeout(() => {
                        projectElement.classList.add('animate-in');
                    }, projectId * 100); // Stagger the animations
                    
                    // Stop observing this element
                    observer.unobserve(projectElement);
                }
            });
        }, {
            root: null,
            rootMargin: '0px',
            threshold: 0.1
        });
        
        // Create and add each project card
        this.projects.forEach((project, index) => {
            const projectCard = document.createElement('div');
            projectCard.className = 'project-item';
            projectCard.dataset.projectId = project.id;
            projectCard.innerHTML = this.createProjectCardContent(project);
            
            container.appendChild(projectCard);
            
            // Start observing the project card
            observer.observe(projectCard);
        });
        
        this.bindProjectEvents();
    }

    createProjectCardContent(project) {
        const statusClass = `status-${project.status}`;
        const techTags = project.technologies
            .map(tech => `<span class="technology-tag">${tech}</span>`)
            .join('');

        return `
                <div class="project-image">
                    <div class="image-placeholder" style="background: linear-gradient(135deg, #${this.generateColorFromId(project.id)}, #${this.generateSecondaryColor(project.id)});">
                        <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
                            <circle cx="50" cy="50" r="20" fill="rgba(255,255,255,0.2)"/>
                            <text x="50" y="55" text-anchor="middle" fill="white" font-size="12" font-family="Arial">${project.title.charAt(0)}</text>
                        </svg>
                    </div>
                    <div class="project-overlay">
                        <button class="view-project-btn" data-link="${project.link}">
                            View Project
                        </button>
                    </div>
                </div>
                <div class="project-content">
                    <h3 class="project-title">${project.title}</h3>
                    <p class="project-description">${project.description}</p>
                    <div class="project-technologies">
                        ${techTags}
                    </div>
                    <div class="project-status ${statusClass}">
                        ${this.formatStatus(project.status)}
                    </div>
                </div>
            </div>
        `;
    }

    formatStatus(status) {
        const statusMap = {
            'completed': '✓ Completed',
            'in-progress': '🔄 In Progress',
            'planned': '📋 Planned'
        };
        return statusMap[status] || status;
    }

    bindProjectEvents() {
        const projectItems = document.querySelectorAll('.project-item');
        const viewButtons = document.querySelectorAll('.view-project-btn');

        projectItems.forEach(item => {
            item.addEventListener('mouseenter', this.handleProjectHover.bind(this));
            item.addEventListener('mouseleave', this.handleProjectLeave.bind(this));
        });

        viewButtons.forEach(button => {
            button.addEventListener('click', this.handleViewProject.bind(this));
        });
    }

    handleProjectHover(event) {
        const item = event.currentTarget;
        item.classList.add('hovered');
    }

    handleProjectLeave(event) {
        const item = event.currentTarget;
        item.classList.remove('hovered');
    }

    handleViewProject(event) {
        event.preventDefault();
        const link = event.target.dataset.link;
        
        // Here you could implement modal, redirect, or other navigation
        console.log(`Viewing project: ${link}`);
        
        // Example: Open in modal or navigate
        this.openProjectModal(link);
    }

    openProjectModal(projectLink) {
        // Placeholder for modal implementation
        alert(`Opening project: ${projectLink}`);
    }

    addProject(project) {
        this.projects.push(project);
        this.renderProjects();
    }

    getProject(id) {
        return this.projects.find(project => project.id === id);
    }

    filterProjectsByStatus(status) {
        return this.projects.filter(project => project.status === status);
    }

    generateColorFromId(id) {
        const colors = ['667eea', '764ba2', 'f093fb', '4facfe', 'f093fb', '43e97b'];
        return colors[id % colors.length];
    }

    generateSecondaryColor(id) {
        const colors = ['764ba2', 'f093fb', 'f5576c', '4facfe', 'f5576c', '38f9d7'];
        return colors[id % colors.length];
    }
}
