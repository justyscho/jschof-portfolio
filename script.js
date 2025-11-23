// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Highlight active navigation item on scroll
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-menu a');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    const navHeight = document.querySelector('.navbar').offsetHeight;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - navHeight - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Add active state styling
const style = document.createElement('style');
style.textContent = `
    .nav-menu a.active {
        color: var(--primary-blue);
    }
    .nav-menu a.active::after {
        width: 100%;
    }
`;
document.head.appendChild(style);

// Dynamic Terminal Animation
document.addEventListener('DOMContentLoaded', function() {
    const terminalLine = document.getElementById('terminal-output');
    const terminalCommand = terminalLine.querySelector('.terminal-command');
    const terminalCursor = terminalLine.querySelector('.terminal-cursor');
    
    if (!terminalCommand || !terminalLine) return;
    
    const commands = [
        { text: 'whoami', delay: 33, isPrompt: false },
        { text: '', delay: 267, isPrompt: false },
        { text: 'Justin Schofield - Cybersecurity Analyst', delay: 27, isPrompt: false, isOutput: true },
        { text: '', delay: 333, isPrompt: false },
        { text: 'nmap --version', delay: 33, isPrompt: false, newLine: true },
        { text: '', delay: 200, isPrompt: false },
        { text: 'Nmap 7.94', delay: 27, isPrompt: false, isOutput: true },
        { text: '', delay: 333, isPrompt: false },
        { text: 'ls education', delay: 33, isPrompt: false, newLine: true },
        { text: '', delay: 200, isPrompt: false },
        { text: 'Master of Science in Cybersecurity and Information Assurance', delay: 27, isPrompt: false, isOutput: true },
        { text: '', delay: 333, isPrompt: false },
        { text: 'cat certifications.txt', delay: 33, isPrompt: false, newLine: true },
        { text: '', delay: 200, isPrompt: false },
        { text: 'SecurityX, CySA+, PenTest+, Security+, Network+, CS50', delay: 27, isPrompt: false, isOutput: true },
        { text: '', delay: 167, isPrompt: false }
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    const cursorHTML = terminalCursor.outerHTML;
    
    function processText(text, isOutput, newLine) {
        let html = '';
        if (newLine) {
            html += '<br>';
            html += '<span class="terminal-prompt">justin@cybersecurity:~$</span>';
        }
        if (text.trim()) {
            // If it's output, it should be on a new line (after the command output)
            if (isOutput) {
                html += '<br>';
            }
            // Wrap in appropriate class
            if (isOutput) {
                html += '<span class="terminal-output">' + text + '</span>';
            } else {
                html += '<span class="terminal-command">' + text + '</span>';
            }
        }
        return html;
    }
    
    function typeCommand() {
        if (commandIndex >= commands.length) {
            return;
        }
        
        const command = commands[commandIndex];
        
        if (charIndex < command.text.length) {
            const char = command.text[charIndex];
            const partialText = command.text.substring(0, charIndex + 1);
            
            // Build HTML for current state
            let html = '';
            
            // Include all previous commands
            let firstCommandProcessed = false;
            for (let i = 0; i < commandIndex; i++) {
                const cmd = commands[i];
                // Add prompt before first command
                if (i === 0 && cmd.text && !firstCommandProcessed) {
                    html += '<span class="terminal-prompt">justin@cybersecurity:~$</span>';
                    firstCommandProcessed = true;
                }
                if (cmd.text) {
                    html += processText(cmd.text, cmd.isOutput, cmd.newLine);
                }
            }
            
            // Include current command being typed
            if (command.text) {
                // For first command, add prompt before it
                if (commandIndex === 0) {
                    html += '<span class="terminal-prompt">justin@cybersecurity:~$</span>';
                    const currentCmd = { ...command, text: partialText };
                    html += processText(currentCmd.text, currentCmd.isOutput, false);
                } else {
                    const currentCmd = { ...command, text: partialText };
                    html += processText(currentCmd.text, currentCmd.isOutput, currentCmd.newLine);
                }
            }
            
            terminalLine.innerHTML = html + cursorHTML;
            charIndex++;
            setTimeout(typeCommand, command.delay);
        } else {
            commandIndex++;
            charIndex = 0;
            if (commandIndex < commands.length) {
                setTimeout(typeCommand, 167);
            }
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCommand, 333);
});

// Mobile Menu Toggle
document.addEventListener('DOMContentLoaded', function() {
    const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu a');
    
    if (mobileMenuToggle && navMenu) {
        mobileMenuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });
        
        // Close menu when clicking a link
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            });
        });
        
        // Close menu when clicking outside
        document.addEventListener('click', function(e) {
            if (!navMenu.contains(e.target) && !mobileMenuToggle.contains(e.target)) {
                navMenu.classList.remove('active');
                mobileMenuToggle.classList.remove('active');
            }
        });
    }
});
