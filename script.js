document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dark / Light Theme Switcher ---
  const themeToggleBtn = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('portfolioTheme') || 'dark';

  if (savedTheme === 'light') {
    document.documentElement.setAttribute('data-theme', 'light');
    themeToggleBtn.textContent = '☀️';
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      themeToggleBtn.textContent = '🌙';
      localStorage.setItem('portfolioTheme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
      themeToggleBtn.textContent = '☀️';
      localStorage.setItem('portfolioTheme', 'light');
    }
  });

  // --- 2. Category Filter for Projects ---
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      filterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filterValue = btn.getAttribute('data-filter');

      projectCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filterValue === 'all' || category === filterValue) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });

  // --- 3. Contact Form Validation ---
  const contactForm = document.getElementById('contactForm');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('nameError');
  const emailError = document.getElementById('emailError');
  const messageError = document.getElementById('messageError');
  const formStatus = document.getElementById('formStatus');

  const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    let isValid = true;

    // Clear old errors
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formStatus.textContent = '';

    // Name Validation
    if (!nameInput.value.trim()) {
      nameError.textContent = 'Please enter your name.';
      isValid = false;
    }

    // Email Validation
    if (!emailInput.value.trim()) {
      emailError.textContent = 'Please enter your email address.';
      isValid = false;
    } else if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email address.';
      isValid = false;
    }

    // Message Validation
    if (!messageInput.value.trim()) {
      messageError.textContent = 'Please enter a message.';
      isValid = false;
    }

    // If form is valid, simulate submission
    if (isValid) {
      formStatus.className = 'status-msg success';
      formStatus.textContent = `Thank you, ${nameInput.value.trim()}! Your message has been sent successfully.`;
      contactForm.reset();
    }
  });
});