// Application Logic
document.addEventListener('DOMContentLoaded', () => {
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
            const filteredRepos = repos.filter(repo => !featured.includes(repo.name)).slice(0, 6);

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

    initCarousel('stock-carousel', 5000);
    initCarousel('edudoc-carousel', 5000);

    const stockVideo = document.getElementById('stock-video');
    if (stockVideo) {
        stockVideo.addEventListener('loadedmetadata', () => {
            stockVideo.currentTime = 5;
        });

        stockVideo.addEventListener('timeupdate', () => {
            if (stockVideo.currentTime >= 10) {
                stockVideo.currentTime = 5;
            }
        });
    }
});
