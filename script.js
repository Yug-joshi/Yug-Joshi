document.addEventListener('DOMContentLoaded', () => {
    // Project Data for Modal
    const projectData = {
        'trade-allocation': {
            title: 'Trade Allocation Platform',
            tag: 'Live Production Build',
            description: 'A live, production-grade broker-client management system architected for real-world scaling. This platform manages complex trade executions, real-time client ledgers, and secure administrative workflows.',
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
            container.innerHTML = `<img src="${media.src}" style="max-height: 80vh; max-width: 100%; object-fit: contain;" class="modal-media-item p-4" alt="Preview">`;
        } else if (media.type === 'video') {
            container.innerHTML = `<video src="${media.src}" style="max-height: 80vh; max-width: 100%; object-fit: contain;" class="modal-media-item p-4" controls autoplay muted loop></video>`;
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

    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 150;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
                mobileNavLinks.forEach(link => {
                    link.classList.remove('text-primary');
                    link.classList.add('text-[#e5e2e1]/60');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.remove('text-[#e5e2e1]/60');
                        link.classList.add('text-primary');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav, { passive: true });
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
                container.innerHTML = '<p class="col-span-full text-on-surface-variant text-center opacity-50 py-10">Archive successfully synchronized. No additional public repositories to display.</p>';
                return;
            }

            filteredRepos.forEach((repo, index) => {
                const card = document.createElement('a');
                card.href = repo.html_url;
                card.target = '_blank';
                card.rel = 'noopener noreferrer';
                card.className = 'block group p-8 bg-surface-container rounded-xl border border-outline-variant/10 hover:border-primary/40 transition-all duration-300 flex flex-col justify-between hover:translate-y-[-4px] shadow-sm card-hover cursor-pointer';
                card.style.animationDelay = `${index * 50}ms`;
                card.onclick = (e) => {
                    e.preventDefault();
                    openProjectModal(repo.name, repo);
                };

                const lang = repo.language || 'Code';
                const year = new Date(repo.updated_at).getFullYear();
                const desc = repo.description || 'Professional source code repository.';

                card.innerHTML = `
                    <div>
                        <div class="flex justify-between items-start mb-6">
                            <span class="material-symbols-outlined text-primary/70 text-3xl">folder_zip</span>
                            <div class="flex gap-3">
                                ${repo.stargazers_count > 0 ? `
                                    <div class="flex items-center gap-1 text-[10px] text-on-surface-variant font-bold bg-surface-container-high px-2 py-1 rounded">
                                        <span class="material-symbols-outlined text-[14px]" style="font-variation-settings: 'FILL' 1;">star</span>
                                        ${repo.stargazers_count}
                                    </div>
                                ` : ''}
                                <span class="w-8 h-8 flex items-center justify-center rounded-full bg-surface-container-high text-on-surface-variant group-hover:text-primary transition-colors">
                                    <span class="material-symbols-outlined text-lg">open_in_new</span>
                                </span>
                            </div>
                        </div>
                        <h4 class="font-headline font-bold text-xl mb-3 group-hover:text-primary transition-colors tracking-tight">${repo.name.replace(/-/g, ' ')}</h4>
                        <p class="text-sm text-on-surface-variant line-clamp-3 mb-6 leading-relaxed">${desc}</p>
                    </div>
                    <div class="flex items-center gap-4 border-t border-outline-variant/5 pt-4">
                        <div class="flex items-center gap-2">
                            <span class="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(164,230,255,0.5)]"></span>
                            <span class="text-[10px] font-mono text-on-surface/70 uppercase tracking-widest font-bold">${lang}</span>
                        </div>
                        <span class="text-[10px] font-mono text-on-surface/30 uppercase tracking-widest ml-auto">${year}</span>
                    </div>
                `;
                container.appendChild(card);
            });
        } catch (error) {
            console.error('Error fetching repos:', error);
            container.innerHTML = '<p class="col-span-full text-on-surface-variant text-center opacity-50">GitHub API Synchronization temporarily unavailable.</p>';
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
            const width = carousel.offsetWidth;
            track.style.transform = `translateX(-${currentSlide * width}px)`;
            indicators.forEach((ind, i) => {
                ind.classList.toggle('active', i === currentSlide);
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
        window.addEventListener('resize', updateCarousel);
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

    // Magnetic Hover Effect
    const magneticBtns = document.querySelectorAll('.magnetic-btn');
    magneticBtns.forEach(btn => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;
            btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`;
        });
        btn.addEventListener('mouseleave', () => {
            btn.style.transform = 'translate(0, 0)';
        });
    });
});
