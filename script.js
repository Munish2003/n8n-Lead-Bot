// ============================
// SMOOTH SCROLLING
// ============================
function scrollToSection(sectionId) {
    const section = document.getElementById(sectionId);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ============================
// NAVBAR SCROLL EFFECT
// ============================
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.15)';
    } else {
        navbar.style.boxShadow = '0 2px 20px rgba(0,0,0,0.1)';
    }
    
    lastScroll = currentScroll;
});

// ============================
// TESTIMONIALS SLIDER
// ============================
const testimonials = document.querySelectorAll('.testimonial-card');
const dots = document.querySelectorAll('.dot');
let currentTestimonial = 0;

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        if (i === index) {
            testimonial.classList.add('active');
        } else {
            testimonial.classList.remove('active');
        }
    });
    
    dots.forEach((dot, i) => {
        if (i === index) {
            dot.classList.add('active');
        } else {
            dot.classList.remove('active');
        }
    });
}

function nextTestimonial() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    showTestimonial(currentTestimonial);
}

// Auto-rotate testimonials every 5 seconds
setInterval(nextTestimonial, 5000);

// Dot click handlers
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        currentTestimonial = index;
        showTestimonial(currentTestimonial);
    });
});

// ============================
// PROGRAM CARDS ANIMATION
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all program cards
document.querySelectorAll('.program-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'all 0.6s ease-out';
    observer.observe(card);
});

// ============================
// APPLY NOW BUTTONS
// ============================
const applyButtons = document.querySelectorAll('.apply-btn, .btn-primary-large, .floating-apply-btn');

applyButtons.forEach(button => {
    button.addEventListener('click', () => {
        alert('🎓 Thank you for your interest in Zoxima University!\n\nYou will be redirected to our online application portal.\n\nFor assistance, please chat with our support team.');
    });
});

// ============================
// CONTACT FORM SUBMISSION
// ============================
const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Show success message
        alert('✅ Thank you for contacting Zoxima University!\n\nYour message has been received. Our admissions team will get back to you within 24 hours.');
        
        // Reset form
        contactForm.reset();
    });
}

// ============================
// PROGRAM BUTTONS
// ============================
const programButtons = document.querySelectorAll('.program-btn');

programButtons.forEach(button => {
    button.addEventListener('click', (e) => {
        const programName = e.target.closest('.program-card').querySelector('h3').textContent;
        alert(`📚 ${programName}\n\nYou will be redirected to the detailed program page.\n\nFor more information, please use our chatbot or contact admissions.`);
    });
});

// ============================
// HELPER FUNCTIONS FOR CHATBOT
// ============================

// Escape HTML to prevent XSS
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Typewriter effect function
async function typewriterEffect(element, text, speed = 20) {
    return new Promise((resolve) => {
        const paragraphs = text.split('\n').filter(p => p.trim());
        element.innerHTML = '';
        
        let currentP = document.createElement('p');
        element.appendChild(currentP);
        
        let paragraphIndex = 0;
        let charIndex = 0;
        
        function type() {
            if (paragraphIndex < paragraphs.length) {
                const currentText = paragraphs[paragraphIndex];
                
                if (charIndex < currentText.length) {
                    currentP.textContent += currentText.charAt(charIndex);
                    charIndex++;
                    
                    // Auto-scroll to bottom
                    const chatMessages = element.closest('.chat-messages');
                    if (chatMessages) {
                        chatMessages.scrollTop = chatMessages.scrollHeight;
                    }
                    
                    setTimeout(type, speed);
                } else {
                    // Move to next paragraph
                    paragraphIndex++;
                    charIndex = 0;
                    
                    if (paragraphIndex < paragraphs.length) {
                        currentP = document.createElement('p');
                        element.appendChild(currentP);
                        setTimeout(type, speed);
                    } else {
                        resolve();
                    }
                }
            } else {
                resolve();
            }
        }
        
        type();
    });
}

// ============================
// LEFT CHATBOT (Zoxima Support)
// ============================

// const N8N_WEBHOOK_URL_LEFT = 'https://munishkumar.app.n8n.cloud/webhook/a117424e-1eb5-46cf-bfe3-fabd6bd03c79/chat';
const N8N_WEBHOOK_URL_LEFT = 'https://munishkumarr.app.n8n.cloud/webhook/310f8cbf-b6e0-4933-acec-2fd0ada3b3cd/chat';

const chatToggleBtnLeft = document.getElementById('chatToggleBtnLeft');
const chatWindowLeft = document.getElementById('chatWindowLeft');
const chatMessagesLeft = document.getElementById('chatMessagesLeft');
const chatInputLeft = document.getElementById('chatInputLeft');
const sendButtonLeft = document.getElementById('sendButtonLeft');
const minimizeBtnLeft = document.getElementById('minimizeBtnLeft');
const typingIndicatorLeft = document.getElementById('typingIndicatorLeft');

// Generate unique session ID for chatbot
let sessionIdLeft = localStorage.getItem('chatSessionIdZoxima');
if (!sessionIdLeft) {
    sessionIdLeft = 'zoxima_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
    localStorage.setItem('chatSessionIdZoxima', sessionIdLeft);
}

console.log('Zoxima Chat Session ID:', sessionIdLeft);

// Toggle chat window
function toggleChatLeft() {
    chatToggleBtnLeft.classList.toggle('active');
    chatWindowLeft.classList.toggle('active');
    
    // Focus on input when opening
    if (chatWindowLeft.classList.contains('active')) {
        setTimeout(() => {
            chatInputLeft.focus();
        }, 300);
    }
}

chatToggleBtnLeft.addEventListener('click', toggleChatLeft);
minimizeBtnLeft.addEventListener('click', toggleChatLeft);

// Add message to chat with streaming
async function addMessageLeft(text, sender, shouldStream = false) {
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${sender}`;
    
    if (sender === 'bot') {
        messageDiv.innerHTML = `
            <div class="message-avatar">🎓</div>
            <div class="message-content"></div>
        `;
        chatMessagesLeft.appendChild(messageDiv);
        
        const contentDiv = messageDiv.querySelector('.message-content');
        
        if (shouldStream) {
            // Apply typewriter effect
            await typewriterEffect(contentDiv, text, 20);
        } else {
            // Instant display (for initial message)
            const paragraphs = text.split('\n').filter(p => p.trim());
            contentDiv.innerHTML = paragraphs.map(p => `<p>${escapeHtml(p)}</p>`).join('');
        }
    } else {
        messageDiv.innerHTML = `
            <div class="message-content">
                ${text.split('\n').filter(p => p.trim()).map(p => `<p>${escapeHtml(p)}</p>`).join('')}
            </div>
        `;
        chatMessagesLeft.appendChild(messageDiv);
    }
    
    chatMessagesLeft.scrollTop = chatMessagesLeft.scrollHeight;
}

// Show typing indicator
function showTypingIndicatorLeft() {
    typingIndicatorLeft.classList.add('active');
    chatMessagesLeft.scrollTop = chatMessagesLeft.scrollHeight;
}

// Hide typing indicator
function hideTypingIndicatorLeft() {
    typingIndicatorLeft.classList.remove('active');
}

// Send message to n8n webhook
async function sendMessageToN8NLeft(message) {
    try {
        showTypingIndicatorLeft();
        sendButtonLeft.disabled = true;
        chatInputLeft.disabled = true;

        const response = await fetch(N8N_WEBHOOK_URL_LEFT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chatInput: message,
                sessionId: sessionIdLeft
            })
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        
        hideTypingIndicatorLeft();
        sendButtonLeft.disabled = false;
        chatInputLeft.disabled = false;

        let botReply = '';
        
        if (data.output) {
            botReply = data.output;
        } else if (data.response) {
            botReply = data.response;
        } else if (data.message) {
            botReply = data.message;
        } else if (data.text) {
            botReply = data.text;
        } else if (typeof data === 'string') {
            botReply = data;
        } else {
            botReply = 'I received your message. How else can I help you with Zoxima University?';
        }

        // Add message with streaming effect
        await addMessageLeft(botReply, 'bot', true);

    } catch (error) {
        console.error('Error sending message to n8n:', error);
        hideTypingIndicatorLeft();
        sendButtonLeft.disabled = false;
        chatInputLeft.disabled = false;
        
        await addMessageLeft(
            'Sorry, I\'m having trouble connecting. Please try again or contact us at admissions@zoxima.edu or call +91 11 4567 8900.',
            'bot',
            false
        );
    }
}

// Send message function
function sendMessageLeft() {
    const message = chatInputLeft.value.trim();
    
    if (!message) return;
    
    // Add user message
    addMessageLeft(message, 'user', false);
    
    // Clear input
    chatInputLeft.value = '';
    
    // Send to n8n webhook
    sendMessageToN8NLeft(message);
}

// Event listeners
sendButtonLeft.addEventListener('click', sendMessageLeft);

chatInputLeft.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        sendMessageLeft();
    }
});

// ============================
// SCROLL TO TOP ON PAGE LOAD
// ============================
window.addEventListener('load', () => {
    window.scrollTo(0, 0);
});

// ============================
// HERO STATS ANIMATION
// ============================
const stats = document.querySelectorAll('.stat-number');

const animateStats = () => {
    stats.forEach(stat => {
        const target = parseInt(stat.textContent);
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateStat = () => {
            current += increment;
            if (current < target) {
                stat.textContent = Math.floor(current) + (stat.textContent.includes('%') ? '%' : '+');
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = target + (stat.textContent.includes('%') ? '%' : '+');
            }
        };
        
        updateStat();
    });
};

// Trigger stats animation when hero section is visible
const heroObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateStats();
            heroObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const heroSection = document.querySelector('.hero-section');
if (heroSection) {
    heroObserver.observe(heroSection);
}

// ============================
// CAMPUS CARD HOVER EFFECTS
// ============================
const campusCards = document.querySelectorAll('.campus-card');

campusCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const image = card.querySelector('.campus-image');
        if (image) {
            image.style.transform = 'scale(1.1)';
        }
    });
    
    card.addEventListener('mouseleave', () => {
        const image = card.querySelector('.campus-image');
        if (image) {
            image.style.transform = 'scale(1)';
        }
    });
});

// ============================
// QUICK LINK CARDS INTERACTION
// ============================
const quickLinkCards = document.querySelectorAll('.quick-link-card');

quickLinkCards.forEach(card => {
    card.addEventListener('click', () => {
        card.style.transform = 'scale(0.95)';
        setTimeout(() => {
            card.style.transform = 'translateY(-10px)';
        }, 100);
    });
});

// ============================
// PRELOADER (OPTIONAL)
// ============================
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s';
        document.body.style.opacity = '1';
    }, 100);
});

// ============================
// RESEARCH STATS COUNTER
// ============================
const researchStats = document.querySelectorAll('.research-stat h3');

const animateResearchStats = () => {
    researchStats.forEach(stat => {
        const text = stat.textContent;
        const hasRupee = text.includes('₹');
        const hasPlus = text.includes('+');
        const target = parseInt(text.replace(/[₹+Cr]/g, ''));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const updateStat = () => {
            current += increment;
            if (current < target) {
                let display = Math.floor(current);
                if (hasRupee) display = '₹' + display;
                if (text.includes('Cr')) display += 'Cr';
                if (hasPlus) display += '+';
                stat.textContent = display;
                requestAnimationFrame(updateStat);
            } else {
                stat.textContent = text;
            }
        };
        
        updateStat();
    });
};

// Trigger research stats animation
const researchObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateResearchStats();
            researchObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const researchSection = document.querySelector('.research-section');
if (researchSection) {
    researchObserver.observe(researchSection);
}

// ============================
// FLOATING APPLY BUTTON SCROLL BEHAVIOR
// ============================
const floatingApplyBtn = document.querySelector('.floating-apply-btn');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > lastScrollTop && scrollTop > 500) {
        // Scrolling down
        floatingApplyBtn.style.transform = 'translateY(150px)';
    } else {
        // Scrolling up
        floatingApplyBtn.style.transform = 'translateY(0)';
    }
    
    lastScrollTop = scrollTop;
}, false);

// ============================
// ADMISSIONS TIMELINE ANIMATION
// ============================
const timelineItems = document.querySelectorAll('.timeline-item');

timelineItems.forEach((item, index) => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(30px)';
    item.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
});

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            timelineItems.forEach(item => {
                item.style.opacity = '1';
                item.style.transform = 'translateY(0)';
            });
            timelineObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.3 });

const admissionsSection = document.querySelector('.admissions-section');
if (admissionsSection) {
    timelineObserver.observe(admissionsSection);
}

// ============================
// CONSOLE WELCOME MESSAGE
// ============================
console.log(`
%c🎓 Welcome to Zoxima University! 🎓
%cEmpowering Future Leaders Since 1875
%c
Interested in joining our development team?
Visit: careers.zoxima.edu
`, 
'color: #1a237e; font-size: 24px; font-weight: bold;',
'color: #3949ab; font-size: 16px;',
'color: #666; font-size: 12px;'
);

// ============================
// ERROR HANDLING
// ============================
window.addEventListener('error', (e) => {
    console.error('An error occurred:', e.message);
});

// ============================
// ACCESSIBILITY: KEYBOARD NAVIGATION
// ============================
document.addEventListener('keydown', (e) => {
    // ESC key closes chatbot
    if (e.key === 'Escape' && chatWindowLeft.classList.contains('active')) {
        toggleChatLeft();
    }
});

console.log('✅ Zoxima University Website Loaded Successfully!');
