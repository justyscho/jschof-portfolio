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
        { text: 'whoami', delay: 50 },
        { text: '', delay: 400 },
        { text: '\nJustin Schofield - Cybersecurity Analyst', delay: 40 },
        { text: '', delay: 500 },
        { text: '\n\njustin@cybersecurity:~$ nmap --version', delay: 50 },
        { text: '', delay: 300 },
        { text: '\nNmap 7.94', delay: 40 },
        { text: '', delay: 500 },
        { text: '\n\njustin@cybersecurity:~$ ls education', delay: 50 },
        { text: '', delay: 300 },
        { text: '\nMaster of Science in Cybersecurity and Information Assurance', delay: 40 },
        { text: '', delay: 500 },
        { text: '\n\njustin@cybersecurity:~$ cat certifications.txt', delay: 50 },
        { text: '', delay: 300 },
        { text: '\nSecurityX, CySA+, PenTest+, Security+, Network+, CS50', delay: 40 },
        { text: '', delay: 250 }
    ];
    
    let commandIndex = 0;
    let charIndex = 0;
    let currentText = '';
    const prompt = '<span class="terminal-prompt">justin@cybersecurity:~$</span>';
    
    function typeCommand() {
        if (commandIndex >= commands.length) {
            return;
        }
        
        const command = commands[commandIndex];
        
        if (charIndex < command.text.length) {
            currentText += command.text[charIndex];
            terminalCommand.textContent = currentText;
            charIndex++;
            setTimeout(typeCommand, command.delay);
        } else {
            commandIndex++;
            charIndex = 0;
            if (commandIndex < commands.length) {
                setTimeout(typeCommand, 250);
            }
        }
    }
    
    // Start typing after a short delay
    setTimeout(typeCommand, 500);
});
