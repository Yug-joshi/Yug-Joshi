document.addEventListener('DOMContentLoaded', () => {
    // Touch Feedback System
    const touchFeedback = {
        isTouch: () => {
            return (
                window.matchMedia('(hover: none) and (pointer: coarse)').matches ||
                ('ontouchstart' in window) ||
                navigator.maxTouchPoints > 0
            );
        },
        triggerHaptic: (intensity = 'medium') => {
            if ('vibrate' in navigator) {
                const patterns = {
                    light: 10,
                    medium: 20,
                    heavy: 30,
                    double: [15, 10, 15]
                };
                navigator.vibrate(patterns[intensity] || patterns.medium);
            }
        },
        addTouchFeedback: (element) => {
            if (!touchFeedback.isTouch()) return;

            element.addEventListener('touchstart', (e) => {
                touchFeedback.triggerHaptic('light');
                element.style.opacity = '0.8';
            }, { passive: true });

            element.addEventListener('touchend', (e) => {
                element.style.opacity = '1';
            }, { passive: true });

            element.addEventListener('touchcancel', (e) => {
                element.style.opacity = '1';
            }, { passive: true });
        }
    };

    // Initialize touch feedback for interactive elements
    if (touchFeedback.isTouch()) {
        document.querySelectorAll('button, a[href], .card-hover, .nav-link, .indicator').forEach(el => {
            touchFeedback.addTouchFeedback(el);
        });
    }

    // Project Data for Modal
    const projectData = {
        'trade-allocation': {
            title: 'Trade Allocation Platform',
            tag: 'Display Only Portal',
            description: 'A high-fidelity broker-client management portal built strictly for display purposes. This platform allows clients and brokers to track allocation states, monitor balances, and verify historical logs under high security standards (does not support trade execution).',
            tech: ['MONGODB', 'REACT', 'NODE.JS', 'EXPRESS'],
            media: [
                { type: 'image', src: 'trade1.png' },
                { type: 'image', src: 'trade2.png' }
            ],
            live: '#',
            repo: 'https://github.com/Yug-joshi'
        },
        'stockpulse': {
            title: 'Stock Pulse CRM',
            tag: 'Full-Stack Solution',
            description: 'A high-performance CRM platform combining advanced client management with real-time stock tracking tailored for local business operations. Features advanced data visualization and client relationship mapping.',
            tech: ['MERN STACK', 'REDUX', 'CHART.JS'],
            media: [
                { type: 'video', src: 'stock.mp4' },
                { type: 'image', src: 'stock.png' }
            ],
            live: 'https://dhanicontrol.vercel.app/',
            repo: 'https://github.com/Yug-joshi/StockPulse.git'
        },
        'edudoc': {
            title: 'EduDoc App',
            tag: 'Mobile Architecture',
            description: 'A cross-platform mobile application developed with Flutter and Supabase. I implemented a custom token-based economy for document sharing, alongside robust bookmarking and secure authentication flows.',
            tech: ['FLUTTER', 'SUPABASE', 'DART'],
            media: [
                { type: 'image', src: 'edudoc2.jpg' },
                { type: 'image', src: 'edudoc3.jpg' },
                { type: 'image', src: 'edudoc4.jpg' }
            ],
            live: 'https://github.com/shwetajadhav0230-ux/edudoc_app_mdv.git',
            repo: 'https://github.com/shwetajadhav0230-ux/edudoc_app_mdv.git'
        }
    };

    let currentMediaIndex = 0;
    let currentProjectMedia = [];

    // Modal Global Functions
    window.openProjectModal = function(projectId, extraData = null) {
        let project = projectData[projectId];

        if (!project && extraData) {
            project = {
                title: extraData.name.replace(/-/g, ' '),
                tag: 'In-Depth Walkthrough Placeholder',
                description: extraData.description || 'Technical architecture overview including system design and logic implementation.',
                tech: [extraData.language || 'Software Engineering'],
                media: [{ type: 'image', src: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&q=80&w=1200' }],
                live: extraData.html_url,
                repo: extraData.html_url
            };
        }

        if (!project) return;

        const modal = document.getElementById('project-modal');
        const title = document.getElementById('modal-title');
        const tag = document.getElementById('modal-tag');
        const desc = document.getElementById('modal-description');
        const techStack = document.getElementById('modal-tech-stack');
        const liveLink = document.getElementById('modal-live-link');
        const repoLink = document.getElementById('modal-repo-link');

        // Populate Info
        title.innerText = project.title;
        tag.innerText = project.tag;
        desc.innerText = project.description;
        liveLink.href = project.live;
        repoLink.href = project.repo;

        // Populate Tech
        techStack.innerHTML = '';
        project.tech.forEach(t => {
            const span = document.createElement('span');
            span.className = 'text-primary text-[10px] font-mono border border-primary/20 px-2 py-1 rounded bg-primary/5';
            span.innerText = t;
            techStack.appendChild(span);
        });

        // Setup Media
        currentProjectMedia = project.media;
        currentMediaIndex = 0;
        updateModalMedia();

        modal.classList.remove('hidden');
        setTimeout(() => modal.classList.add('show'), 10);
        document.body.classList.add('modal-open');
    };

    function updateModalMedia() {
        const container = document.getElementById('modal-media-container');
        const media = currentProjectMedia[currentMediaIndex];
        const nav = document.getElementById('modal-nav-container');

        nav.style.display = currentProjectMedia.length > 1 ? 'flex' : 'none';
        container.innerHTML = '';

        if (media.type === 'image') {
            container.innerHTML = `<img src="${media.src}" style="max-height: 100%; max-width: 100%; object-fit: contain;" class="modal-media-item p-4 md:p-8" alt="Preview">`;
        } else if (media.type === 'video') {
            container.innerHTML = `<video src="${media.src}" style="max-height: 100%; max-width: 100%; object-fit: contain;" class="modal-media-item p-4 md:p-8" controls autoplay muted loop></video>`;
        }
    }

    const modal = document.getElementById('project-modal');
    const closeBtn = document.getElementById('close-modal');
    const overlay = document.getElementById('modal-overlay');

    function closeModal() {
        modal.classList.remove('show');
        setTimeout(() => modal.classList.add('hidden'), 400);
        document.body.classList.remove('modal-open');
    }

    closeBtn.addEventListener('click', closeModal);
    overlay.addEventListener('click', closeModal);

    document.getElementById('modal-prev').addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex - 1 + currentProjectMedia.length) % currentProjectMedia.length;
        updateModalMedia();
    });

    document.getElementById('modal-next').addEventListener('click', () => {
        currentMediaIndex = (currentMediaIndex + 1) % currentProjectMedia.length;
        updateModalMedia();
    });

    // Handle Escape Key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closeModal();
    });

    const currentPath = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function updateActiveNav() {
        navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.remove('text-[#e5e2e1]');
                link.classList.add('text-[#a4e6ff]', 'active');
            }
        });
        mobileNavLinks.forEach(link => {
            const href = link.getAttribute('href');
            link.classList.remove('text-primary');
            link.classList.add('text-[#e5e2e1]/60');
            if (href === currentPath || (currentPath === '' && href === 'index.html')) {
                link.classList.remove('text-[#e5e2e1]/60');
                link.classList.add('text-primary', 'active');
            }
        });
    }

    updateActiveNav();

    // High Impact Scroll Animations
    const fadeElements = document.querySelectorAll('.fade-in-section');
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    fadeElements.forEach(el => fadeObserver.observe(el));

    async function fetchGitHubRepos() {
        const container = document.getElementById('github-repos-container');
        if (!container) return;
        const username = 'Yug-joshi';

        try {
            const response = await fetch(`https://api.github.com/users/${username}/repos?type=public&sort=updated&per_page=12`, {
                headers: { 'Accept': 'application/vnd.github.v3+json' }
            });

            if (!response.ok) throw new Error('GitHub API error');
            const repos = await response.json();
            container.innerHTML = '';

            const featured = ['EduDoc', 'Trade-Allocation', 'Artego-CRM'];
            const excluded = ['Artemis', 'Swasthya-Mitra', 'portfolio', 'Yug-Joshi'];
            const filteredRepos = repos.filter(repo => 
                !featured.includes(repo.name) && !excluded.includes(repo.name)
            ).slice(0, 6);

            if (filteredRepos.length === 0) {
                container.innerHTML = '<p class="text-on-surface-variant text-center opacity-50 py-10">Archive successfully synchronized. No additional public repositories to display.</p>';
                return;
            }

            filteredRepos.forEach((repo, index) => {
                const row = document.createElement('a');
                row.href = repo.html_url;
                row.target = '_blank';
                row.rel = 'noopener noreferrer';
                row.className = 'flex flex-col sm:flex-row sm:items-center justify-between py-4 px-4 hover:bg-primary/5 transition-all duration-200 group rounded-lg border border-transparent hover:border-outline-variant/10';
                row.style.animationDelay = `${index * 50}ms`;
                row.onclick = (e) => {
                    e.preventDefault();
                    openProjectModal(repo.name, repo);
                };

                const lang = repo.language || 'Code';
                const year = new Date(repo.updated_at).getFullYear();
                const size = repo.size ? `${(repo.size / 1024).toFixed(1)}M` : '4.0K';

                row.innerHTML = `
                    <div class="flex flex-wrap items-center gap-x-4 gap-y-1 font-mono">
                        <span class="text-low select-none">drwxr-xr-x</span>
                        <span class="text-on-surface-variant/40 select-none">yj</span>
                        <span class="text-on-surface-variant/40 select-none">${size}</span>
                        <span class="text-primary font-bold group-hover:text-primary-fixed-dim transition-colors">${repo.name.toLowerCase()}</span>
                    </div>
                    <div class="flex items-center gap-4 mt-2 sm:mt-0 font-mono text-[11px] md:text-xs">
                        <span class="text-accent/80 font-bold">&lt;${lang}&gt;</span>
                        ${repo.stargazers_count > 0 ? `
                        <span class="text-gold flex items-center gap-0.5">
                            <span class="material-symbols-outlined text-[12px]" style="font-variation-settings: 'FILL' 1;">star</span>
                            ${repo.stargazers_count}
                        </span>
                        ` : ''}
                        <span class="text-low">${year}</span>
                        <span class="material-symbols-outlined text-[16px] text-low group-hover:text-primary transition-colors">open_in_new</span>
                    </div>
                `;
                container.appendChild(row);
            });
        } catch (error) {
            console.error('Error fetching repos:', error);
            container.innerHTML = '<p class="text-on-surface-variant text-center opacity-50">GitHub API Synchronization temporarily unavailable.</p>';
        }
    }

    fetchGitHubRepos();

    function initCarousel(carouselId, intervalTime = 5000) {
        const carousel = document.getElementById(carouselId);
        if (!carousel) return;

        const track = carousel.querySelector('.carousel-track');
        const slides = carousel.querySelectorAll('.carousel-slide');
        const indicators = carousel.querySelectorAll('.indicator');
        let currentSlide = 0;
        let slideInterval;

        function updateCarousel() {
            requestAnimationFrame(() => {
                track.style.transform = `translateX(-${currentSlide * 100}%)`;
                indicators.forEach((ind, i) => {
                    ind.classList.toggle('active', i === currentSlide);
                });
            });
        }

        function nextSlide() {
            currentSlide = (currentSlide + 1) % slides.length;
            updateCarousel();
            startInterval();
        }

        function startInterval() {
            clearTimeout(slideInterval);
            const hasVideo = slides[currentSlide].querySelector('video');
            const time = hasVideo ? intervalTime * 1.6 : intervalTime;
            slideInterval = setTimeout(nextSlide, time);
        }

        startInterval();

        indicators.forEach((indicator, index) => {
            indicator.addEventListener('click', () => {
                currentSlide = index;
                updateCarousel();
                startInterval();
            });
        });

        carousel.addEventListener('mouseenter', () => clearTimeout(slideInterval));
        carousel.addEventListener('mouseleave', () => startInterval());
        
        let resizeTimeout;
        window.addEventListener('resize', () => {
            if (resizeTimeout) cancelAnimationFrame(resizeTimeout);
            resizeTimeout = requestAnimationFrame(updateCarousel);
        });
    }

    initCarousel('featured-carousel', 5000);
    initCarousel('edudoc-carousel', 5000);

    const featuredVideo = document.getElementById('featured-video');
    if (featuredVideo) {
        featuredVideo.addEventListener('loadedmetadata', () => {
            featuredVideo.currentTime = 5;
        });

        featuredVideo.addEventListener('timeupdate', () => {
            if (featuredVideo.currentTime >= 10) {
                featuredVideo.currentTime = 5;
            }
        });
    }

    // High-Performance Magnetic Hover Effect (No Layout Thrashing)
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        let rect = null;
        btn.addEventListener('mouseenter', () => {
            rect = btn.getBoundingClientRect();
        });
        btn.addEventListener('mousemove', (e) => {
            if (!rect) rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
            rect = null;
        });
    });

    // --- Interactive Engine Shell (neofetch card) ---
    const cliInput = document.getElementById('cli-input');
    const cliHistory = document.getElementById('cli-history');
    
    if (cliInput && cliHistory) {
        cliInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                const rawVal = cliInput.value;
                const cmd = rawVal.trim().toLowerCase();
                cliInput.value = '';
                
                // Add input to history
                const promptRow = document.createElement('div');
                promptRow.className = 'text-accent font-semibold';
                promptRow.textContent = `visitor@yj-engine:~$ ${rawVal}`;
                cliHistory.appendChild(promptRow);
                
                // Process output
                const outputContainer = document.createElement('div');
                outputContainer.className = 'pl-2 text-on-surface-variant/90 space-y-0.5 border-l border-outline-variant/10 mb-2 mt-0.5';
                
                if (cmd === 'help') {
                    outputContainer.innerHTML = `
                        <div class="text-accent font-semibold">Available commands:</div>
                        <div>  <span class="text-gold font-bold">neofetch</span> - System specs &amp; overview</div>
                        <div>  <span class="text-gold font-bold">skills</span>   - Graphic competency matrix</div>
                        <div>  <span class="text-gold font-bold">contact</span>  - Communication routing vectors</div>
                        <div>  <span class="text-gold font-bold">clear</span>    - Flush session stream history</div>
                    `;
                } else if (cmd === 'neofetch') {
                    outputContainer.innerHTML = `
                        <div class="text-accent font-bold">Yug Joshi @ portfolio</div>
                        <div class="text-muted/40">--------------------</div>
                        <div><span class="text-muted">OS:</span> Custom Hardware Kernel v1.2.0</div>
                        <div><span class="text-muted">Shell:</span> yj_engine_shell 1.0.0</div>
                        <div><span class="text-muted">Uptime:</span> 2.5 hours</div>
                        <div><span class="text-muted">Status:</span> System operating at peak efficiency</div>
                        <div><span class="text-muted">Engine:</span> React / Next.js / Flutter</div>
                    `;
                } else if (cmd === 'skills') {
                    outputContainer.innerHTML = `
                        <div class="text-accent font-semibold">SKILL COMPETENCY MATRIX:</div>
                        <div class="font-mono text-[11px] sm:text-xs">React/Next.js   <span class="text-accent">[██████████]</span> Adept</div>
                        <div class="font-mono text-[11px] sm:text-xs">Node.js/Express <span class="text-accent">[██████████]</span> Adept</div>
                        <div class="font-mono text-[11px] sm:text-xs">Flutter/Dart   <span class="text-accent">[█████████░]</span> Advanced</div>
                        <div class="font-mono text-[11px] sm:text-xs">Python/Django  <span class="text-accent">[█████████░]</span> Advanced</div>
                        <div class="font-mono text-[11px] sm:text-xs">SQL/Databases  <span class="text-accent">[████████░░]</span> Adept</div>
                    `;
                } else if (cmd === 'contact') {
                    outputContainer.innerHTML = `
                        <div class="text-accent font-semibold">COMMUNICATION VECTOR ROOT:</div>
                        <div>Email: <a href="mailto:yugjoshi@protonmail.com" class="text-primary hover:underline">yugjoshi@protonmail.com</a></div>
                        <div>GitHub: <a href="https://github.com/Yug-joshi" target="_blank" class="text-primary hover:underline">Yug-joshi</a></div>
                        <div>LinkedIn: <a href="https://linkedin.com" target="_blank" class="text-primary hover:underline">yug-joshi</a></div>
                    `;
                } else if (cmd === 'clear') {
                    cliHistory.innerHTML = '<div class="text-muted">> Shell history flushed.</div>';
                    return;
                } else if (cmd === '') {
                    // Do nothing on empty enter
                    return;
                } else {
                    outputContainer.innerHTML = `<div class="text-[#ff5f56]">command not found: ${rawVal}. Type 'help' for options.</div>`;
                }
                
                cliHistory.appendChild(outputContainer);
                
                // Auto scroll to bottom
                cliHistory.scrollTop = cliHistory.scrollHeight;
            }
        });
        
        // Focus input if user clicks inside the container
        const cliContainer = cliInput.closest('.border');
        if (cliContainer) {
            cliContainer.addEventListener('click', () => {
                cliInput.focus();
            });
        }
    }

    // --- Fluctuating HTOP Process Values (Micro-animations) ---
    const cpuCells = document.querySelectorAll('tbody tr td:nth-child(3)');
    if (cpuCells.length > 0) {
        const baseValues = Array.from(cpuCells).map(cell => parseFloat(cell.textContent));
        setInterval(() => {
            cpuCells.forEach((cell, idx) => {
                const base = baseValues[idx];
                const variance = (Math.random() * 2 - 1) * 0.4; // fluctuate by +/- 0.4%
                const newVal = Math.min(100, Math.max(0, base + variance)).toFixed(1);
                cell.textContent = newVal;
                
                // Add fluctuating effect to CPU percentage color
                cell.style.opacity = '0.9';
                setTimeout(() => { cell.style.opacity = '1'; }, 150);
            });
        }, 2500);
    }

    // --- PORTFOLIO INTERACTIVE NETWORK MESH LOADER ---
    const meshLoader = document.getElementById("network-mesh-loader");
    const parallaxContainer = document.getElementById("mesh-parallax-container");
    const meshSpark = document.getElementById("mesh-spark");

    if (meshLoader && parallaxContainer) {
        const isReload = performance.getEntriesByType('navigation')[0]?.type === 'reload';
        const isFirstLoad = !sessionStorage.getItem('site-loaded');

        if (!isFirstLoad && !isReload) {
            meshLoader.remove();
        } else {
            sessionStorage.setItem('site-loaded', 'true');
            let targetX = 0;
            let targetY = 0;
            let currentX = 0;
            let currentY = 0;
            let rAFId = null;

            // Optimized lag-free updates using hardware refresh rates
            const updateParallax = () => {
                currentX += (targetX - currentX) * 0.12; // buttery elastic ease
                currentY += (targetY - currentY) * 0.12;

                parallaxContainer.style.transform = `translate3d(${currentX * 0.07}px, ${currentY * 0.07}px, 20px) rotateX(${-currentY * 0.07}deg) rotateY(${currentX * 0.07}deg)`;
                
                if (Math.abs(targetX - currentX) > 0.05 || Math.abs(targetY - currentY) > 0.05) {
                    rAFId = requestAnimationFrame(updateParallax);
                } else {
                    rAFId = null;
                }
            };

            // Handle touchscreen vs desktop inputs
            if (touchFeedback.isTouch()) {
                // Auto Orbit Loop: continuously rotates slowly in 3D for a luxurious visual demo on touch screens
                let angle = 0;
                const autoOrbitLoop = () => {
                    if (!meshLoader.parentNode) return;
                    
                    angle += 0.02; // slow fluid cycle speed
                    targetX = Math.cos(angle) * 60; // 60px horizontal bounds
                    targetY = Math.sin(angle) * 40; // 40px vertical bounds

                    if (!rAFId) {
                        rAFId = requestAnimationFrame(updateParallax);
                    }
                    requestAnimationFrame(autoOrbitLoop);
                };
                autoOrbitLoop();

                // Direct Touch Drag: users can glide their finger to interactively shift the 3D network mesh
                meshLoader.addEventListener("touchmove", (e) => {
                    if (e.touches.length > 0) {
                        const touch = e.touches[0];
                        const rect = meshLoader.getBoundingClientRect();
                        targetX = (touch.clientX - rect.left) - rect.width / 2;
                        targetY = (touch.clientY - rect.top) - rect.height / 2;

                        // Bound constraints to protect 3D limits
                        targetX = Math.max(-80, Math.min(80, targetX));
                        targetY = Math.max(-80, Math.min(80, targetY));

                        if (!rAFId) {
                            rAFId = requestAnimationFrame(updateParallax);
                        }
                    }
                }, { passive: true });
            } else {
                // Desktop mouse cursor tracker
                meshLoader.addEventListener("mousemove", (e) => {
                    const rect = meshLoader.getBoundingClientRect();
                    targetX = (e.clientX - rect.left) - rect.width / 2;
                    targetY = (e.clientY - rect.top) - rect.height / 2;

                    if (!rAFId) {
                        rAFId = requestAnimationFrame(updateParallax);
                    }
                });
            }

            // Dynamic center mesh compilation sync spark
            setTimeout(() => {
                if (meshSpark) {
                    meshSpark.style.opacity = "1";
                    meshSpark.style.transform = "scale(18)";
                    meshSpark.style.background = "var(--color-primary)";
                    meshSpark.style.boxShadow = "0 0 50px var(--color-primary)";
                }
                
                setTimeout(() => {
                    meshLoader.classList.add("mesh-collapse");
                    setTimeout(() => {
                        meshLoader.remove();
                    }, 1200);
                }, 250);
            }, 2800); // 2.8s duration allows the user to experience the dynamic mouse interactivity
        }
    }
});
