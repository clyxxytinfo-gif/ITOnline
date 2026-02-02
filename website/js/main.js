// ========================================
// ITOnline - Website JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
  initMobileMenu();
  initFAQ();
  initContactForm();
  initActiveNav();
  initScrollToTop();
  initScrollAnimations();
  initCounterAnimation();
  initCarousel();
  initTabs();
  initSmoothScroll();
  initFormValidation();
});

// ========================================
// MOBILE MENU TOGGLE
// ========================================
function initMobileMenu() {
  const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
  const nav = document.querySelector('nav');

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', function() {
      nav.classList.toggle('active');
      mobileMenuBtn.style.transform = nav.classList.contains('active') ? 'rotate(90deg)' : 'rotate(0)';
    });

    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('active');
        mobileMenuBtn.style.transform = 'rotate(0)';
      });
    });
  }
}

// ========================================
// FAQ ACCORDION
// ========================================
function initFAQ() {
  const faqQuestions = document.querySelectorAll('.faq-question');

  faqQuestions.forEach(question => {
    question.addEventListener('click', function() {
      const answer = this.nextElementSibling;
      const toggle = this.querySelector('.faq-toggle');
      const isOpen = answer.classList.contains('active');

      // Close all other FAQs
      document.querySelectorAll('.faq-answer.active').forEach(item => {
        if (item !== answer) {
          item.classList.remove('active');
          item.previousElementSibling.querySelector('.faq-toggle').classList.remove('active');
        }
      });

      // Toggle current FAQ with smooth animation
      if (isOpen) {
        answer.classList.remove('active');
        toggle.classList.remove('active');
      } else {
        answer.classList.add('active');
        toggle.classList.add('active');
      }
    });
  });
}

// ========================================
// CONTACT FORM HANDLER
// ========================================
function initContactForm() {
  const form = document.getElementById('contactForm');
  if (!form) return;

  form.addEventListener('submit', function(e) {
    e.preventDefault();

    const formData = {
      name: form.querySelector('input[name="name"]').value,
      email: form.querySelector('input[name="email"]').value,
      company: form.querySelector('input[name="company"]').value,
      phone: form.querySelector('input[name="phone"]').value,
      subject: form.querySelector('select[name="subject"]').value,
      message: form.querySelector('textarea[name="message"]').value
    };

    if (!formData.name || !formData.email || !formData.message) {
      showNotification('Bitte füllen Sie alle Pflichtfelder aus.', 'error');
      return;
    }

    // Simulate form submission
    const submitBtn = form.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '⏳ Wird versendet...';
    submitBtn.disabled = true;

    setTimeout(() => {
      console.log('Form submitted:', formData);
      
      const successMsg = form.querySelector('.form-success');
      successMsg.classList.add('show');
      
      form.reset();
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;

      setTimeout(() => {
        successMsg.classList.remove('show');
      }, 5000);
    }, 1000);
  });
}

// ========================================
// HIGHLIGHT ACTIVE NAVIGATION
// ========================================
function initActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('nav a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    const linkPath = href.split('/').pop();
    const current = currentPath.split('/').pop() || 'index.html';
    
    if (linkPath === current || (current === '' && linkPath === 'index.html')) {
      link.classList.add('active');
    }
  });
}

// ========================================
// SCROLL TO TOP BUTTON
// ========================================
function initScrollToTop() {
  const scrollBtn = document.querySelector('.scroll-top-btn');
  
  if (!scrollBtn) {
    const btn = document.createElement('button');
    btn.className = 'scroll-top-btn';
    btn.innerHTML = '↑';
    btn.title = 'Nach oben';
    document.body.appendChild(btn);
    
    const scrollBtn = document.querySelector('.scroll-top-btn');
    scrollBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    window.addEventListener('scroll', () => {
      if (window.pageYOffset > 300) {
        scrollBtn.classList.add('show');
      } else {
        scrollBtn.classList.remove('show');
      }
    });
  }
}

// ========================================
// SCROLL ANIMATIONS (Fade-in beim scrollen)
// ========================================
function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.feature-card, .service-box, .testimonial, .timeline-item').forEach(el => {
    observer.observe(el);
  });
}

// ========================================
// COUNTER ANIMATION
// ========================================
function initCounterAnimation() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll('.stat-counter');
        counters.forEach(counter => {
          const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
          animateCounter(counter, target);
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });

  document.querySelectorAll('.stat-counter').forEach(counter => {
    observer.observe(counter);
  });
}

function animateCounter(el, target) {
  let count = 0;
  const increment = target / 30;
  const interval = setInterval(() => {
    count += increment;
    if (count >= target) {
      el.textContent = target + (el.textContent.includes('+') ? '+' : '');
      clearInterval(interval);
    } else {
      el.textContent = Math.floor(count) + (el.textContent.includes('+') ? '+' : '');
    }
  }, 30);
}

// ========================================
// CAROUSEL / SLIDER
// ========================================
function initCarousel() {
  const carousels = document.querySelectorAll('.carousel-container');
  
  carousels.forEach(carouselContainer => {
    const carousel = carouselContainer.querySelector('.carousel');
    const items = carousel.querySelectorAll('.carousel-item');
    const prevBtn = carouselContainer.querySelector('.carousel-btn.prev');
    const nextBtn = carouselContainer.querySelector('.carousel-btn.next');
    const dots = carouselContainer.querySelectorAll('.dot');
    
    if (!carousel) return;
    
    let currentIndex = 0;
    
    function showSlide(index) {
      carousel.style.transform = `translateX(-${index * 100}%)`;
      
      dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        showSlide(currentIndex);
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % items.length;
        showSlide(currentIndex);
      });
    }
    
    dots.forEach((dot, index) => {
      dot.addEventListener('click', () => {
        currentIndex = index;
        showSlide(currentIndex);
      });
    });
    
    // Auto-rotate
    setInterval(() => {
      currentIndex = (currentIndex + 1) % items.length;
      showSlide(currentIndex);
    }, 5000);
  });
}

// ========================================
// TABS
// ========================================
function initTabs() {
  const tabs = document.querySelectorAll('.tab-button');
  
  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabsContainer = tab.closest('.tabs');
      const contentId = tab.getAttribute('data-tab');
      const content = document.getElementById(contentId);
      
      if (!content) return;
      
      // Deactivate all tabs and contents
      tabsContainer.querySelectorAll('.tab-button').forEach(t => {
        t.classList.remove('active');
      });
      
      tabsContainer.parentElement.querySelectorAll('.tab-content').forEach(c => {
        c.classList.remove('active');
      });
      
      // Activate selected tab and content
      tab.classList.add('active');
      content.classList.add('active');
    });
  });
}

// ========================================
// SMOOTH SCROLL FOR INTERNAL LINKS
// ========================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// ========================================
// FORM VALIDATION
// ========================================
function initFormValidation() {
  const inputs = document.querySelectorAll('input, textarea, select');
  
  inputs.forEach(input => {
    input.addEventListener('blur', function() {
      validateField(this);
    });
  });
}

function validateField(field) {
  let isValid = true;
  
  if (field.hasAttribute('required') && !field.value.trim()) {
    isValid = false;
  }
  
  if (field.type === 'email' && field.value) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    isValid = emailRegex.test(field.value);
  }
  
  if (field.type === 'tel' && field.value) {
    const phoneRegex = /^[\d\s\-\+\(\)]+$/;
    isValid = phoneRegex.test(field.value);
  }
  
  if (isValid) {
    field.style.borderColor = 'var(--success)';
  } else {
    field.style.borderColor = 'var(--danger)';
  }
}

// ========================================
// NOTIFICATION SYSTEM
// ========================================
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.style.cssText = `
    position: fixed;
    top: 2rem;
    right: 2rem;
    background: ${type === 'error' ? 'var(--danger)' : 'var(--success)'};
    color: white;
    padding: 1rem 2rem;
    border-radius: 4px;
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    animation: slideIn 0.3s ease;
  `;
  notification.textContent = message;
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 3000);
}

// ========================================
// PROGRESS BAR ANIMATION
// ========================================
function animateProgressBars() {
  const bars = document.querySelectorAll('.progress-fill');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width;
        observer.unobserve(entry.target);
      }
    });
  });
  
  bars.forEach(bar => observer.observe(bar));
}

document.addEventListener('DOMContentLoaded', animateProgressBars);
