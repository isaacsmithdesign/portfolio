// Main JavaScript file for portfolio website

document.addEventListener('DOMContentLoaded', function() {
    // Initialize navigation highlighting
    highlightCurrentPage();
    
    // Initialize smooth scrolling for anchor links
    initSmoothScroll();
    
    // Initialize form handling for password protected page
    initPasswordForm();
    
    // Add hover effects for project cards
    initProjectCardEffects();
    
    // Initialize mobile menu toggle if needed
    initMobileMenu();
});

// Highlight the current page in navigation
function highlightCurrentPage() {
    const currentPage = window.location.pathname.split('/').pop();
    const navLinks = document.querySelectorAll('.nav-links a');
    
    navLinks.forEach(link => {
        const linkHref = link.getAttribute('href');
        if (linkHref === currentPage || 
            (currentPage === '' && linkHref === 'index.html') ||
            (currentPage.includes('project') && linkHref === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Smooth scrolling for anchor links
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Handle password form submission
function initPasswordForm() {
    const passwordForm = document.querySelector('.password-form');
    if (passwordForm) {
        passwordForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const passwordInput = this.querySelector('.password-input');
            const password = passwordInput.value.trim();
            
            // This is just a placeholder - in a real implementation,
            // you would validate against a server-side check
            if (password === 'demo123') {
                // Show protected content
                document.querySelector('.password-protection').style.display = 'none';
                
                // Create and show courses content
                const coursesContainer = document.querySelector('.courses-container');
                coursesContainer.innerHTML = `
                    <div class="courses-content">
                        <h1>Available Courses</h1>
                        <div class="courses-grid">
                            <div class="course-card">
                                <div class="course-image">
                                    <img src="images/course-placeholder1.jpg" alt="Course 1">
                                </div>
                                <h3>Course Title 1</h3>
                                <p>Course description goes here. This is a brief overview of what students will learn.</p>
                                <a href="#" class="course-button">Learn More</a>
                            </div>
                            <div class="course-card">
                                <div class="course-image">
                                    <img src="images/course-placeholder2.jpg" alt="Course 2">
                                </div>
                                <h3>Course Title 2</h3>
                                <p>Course description goes here. This is a brief overview of what students will learn.</p>
                                <a href="#" class="course-button">Learn More</a>
                            </div>
                        </div>
                    </div>
                `;
            } else {
                // Show error message
                const errorMessage = document.createElement('p');
                errorMessage.classList.add('error-message');
                errorMessage.textContent = 'Incorrect password. Please try again.';
                errorMessage.style.color = 'red';
                
                // Remove any existing error messages
                const existingError = passwordForm.querySelector('.error-message');
                if (existingError) {
                    existingError.remove();
                }
                
                passwordForm.appendChild(errorMessage);
                passwordInput.value = '';
                passwordInput.focus();
            }
        });
    }
}

// Add hover effects for project cards
function initProjectCardEffects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-5px)';
            this.style.transition = 'transform 0.3s ease';
            
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1.05)';
                image.style.transition = 'transform 0.5s ease';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            
            const image = this.querySelector('.project-image img');
            if (image) {
                image.style.transform = 'scale(1)';
            }
        });
    });
}

// Initialize mobile menu toggle
function initMobileMenu() {
    // This is a placeholder for mobile menu functionality
    // In a real implementation, you would add a hamburger menu for mobile devices
    const mobileBreakpoint = 768;
    
    // Check if we need to add a mobile menu
    if (window.innerWidth <= mobileBreakpoint) {
        const navbar = document.querySelector('.navbar');
        const navLinks = document.querySelector('.nav-links');
        
        if (navbar && navLinks && !document.querySelector('.mobile-menu-toggle')) {
            // Create mobile menu toggle button
            const mobileMenuToggle = document.createElement('button');
            mobileMenuToggle.classList.add('mobile-menu-toggle');
            mobileMenuToggle.innerHTML = `
                <span></span>
                <span></span>
                <span></span>
            `;
            
            // Insert toggle button before nav links
            navbar.insertBefore(mobileMenuToggle, navLinks);
            
            // Hide nav links by default on mobile
            navLinks.style.display = 'none';
            
            // Toggle nav links visibility on button click
            mobileMenuToggle.addEventListener('click', function() {
                if (navLinks.style.display === 'none') {
                    navLinks.style.display = 'flex';
                    navLinks.style.flexDirection = 'column';
                    this.classList.add('active');
                } else {
                    navLinks.style.display = 'none';
                    this.classList.remove('active');
                }
            });
        }
    }
    
    // Update mobile menu on window resize
    window.addEventListener('resize', function() {
        if (window.innerWidth > mobileBreakpoint) {
            const navLinks = document.querySelector('.nav-links');
            if (navLinks) {
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'row';
            }
        } else {
            const navLinks = document.querySelector('.nav-links');
            const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
            
            if (navLinks && mobileMenuToggle && !mobileMenuToggle.classList.contains('active')) {
                navLinks.style.display = 'none';
            }
        }
    });
}
