// Art GIFs from IPFS
const gifCIDs = [
    "bafkreiepqzjkki4vmmaz7h2qdbhvqztlc4cqvs2o2ddlcsb6u3cidl3vx4",
    "bafkreig4aqxu34kehpidyaay3to63z2wmkbpbrzb57yvijbs65kgxfaifu",
    "bafkreibi277kh6uf4toqlapq3elv4lfe3drtaxbm7hgig3luqp4jdpbqm4",
    "bafkreibxawbxqcfftxpeqvi2iu6jpyb3wtbcvgyvg6lybvbru3jdpvt5la",
    "bafkreibbisckvxoomksesel2kx6yu3on3enj5hl7tmznz6fn7o4pcmbbiu",
    "bafkreidnkc4nugckh7y2vje4ugq5aaluqsycib5iu6sjk3w2u3m2wftxxe",
    "bafkreifxnn5nin3ai7vs5o7jzsghmlvn2bk42meggdndz522llqosxm2ee",
    "bafkreigrh7wdaqhsr5xv3lwvmu6bmt23v6pjn7q6wtszpn3m642vu2krlm",
    "bafkreiegzsvxqhbw73kfnf4vus6qs3za3ka4bj2ai2p5vznnwibb637swe",
    "bafybeigwlza6tmz36zfjoozwjs4xypq2qw6w6dz6aemqre2pr2ykp3ujtu",
    "bafkreidlhtakzaeyciwxmtfxwog6ve5qv4q5odwa54kqni5d2zxbaldvjy",
    "bafkreiedasx3jz4eoppshoftmk6o3afkt5vnevnlas3rod6v2ikrf6u7xe",
    "bafkreicymsqef4afympwpfsczck66c62w235ijruwmirgxlp52e33ssb7e"
];

// DOM Elements
const slideshowTrack = document.getElementById('slideshowTrack');
const pauseBtn = document.getElementById('pauseBtn');
const randomizeBtn = document.getElementById('randomizeBtn');
let isPaused = false;
let animationId = null;

// Initialize the site
document.addEventListener('DOMContentLoaded', function() {
    // Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();
    
    // Initialize slideshow
    initializeSlideshow();
    
    // Add smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add header scroll effect
    window.addEventListener('scroll', handleHeaderScroll);
});

// Initialize the slideshow with GIFs
function initializeSlideshow() {
    // Clear existing content
    slideshowTrack.innerHTML = '';
    
    // Create duplicate array for seamless infinite scroll
    const allGifs = [...gifCIDs, ...gifCIDs, ...gifCIDs];
    
    // Create GIF elements
    allGifs.forEach(cid => {
        const gifItem = document.createElement('div');
        gifItem.className = 'gif-item';
        
        const img = document.createElement('img');
        img.src = `https://ipfs.io/ipfs/${cid}`;
        img.alt = 'Pixel Art GIF by MoeR87';
        img.loading = 'lazy';
        
        gifItem.appendChild(img);
        slideshowTrack.appendChild(gifItem);
    });
    
    // Start animation
    startSlideshowAnimation();
    
    // Add event listeners for controls
    pauseBtn.addEventListener('click', toggleSlideshow);
    randomizeBtn.addEventListener('click', randomizeSlideshow);
}

// Start slideshow animation
function startSlideshowAnimation() {
    const track = slideshowTrack;
    const speed = 1; // pixels per frame
    
    let position = 0;
    const itemWidth = 250 + 24; // width + gap
    
    function animate() {
        if (!isPaused) {
            position -= speed;
            
            // Reset position when we've scrolled through one set of duplicates
            if (Math.abs(position) >= itemWidth * gifCIDs.length) {
                position = 0;
            }
            
            track.style.transform = `translateX(${position}px)`;
        }
        
        animationId = requestAnimationFrame(animate);
    }
    
    animate();
}

// Toggle slideshow pause/play
function toggleSlideshow() {
    isPaused = !isPaused;
    pauseBtn.textContent = isPaused ? 'Play' : 'Pause';
    
    // Add visual feedback
    if (isPaused) {
        pauseBtn.style.background = 'rgba(239, 68, 68, 0.3)';
        pauseBtn.style.borderColor = 'rgba(239, 68, 68, 0.6)';
    } else {
        pauseBtn.style.background = 'rgba(124, 58, 237, 0.2)';
        pauseBtn.style.borderColor = 'rgba(124, 58, 237, 0.5)';
    }
}

// Randomize the slideshow order
function randomizeSlideshow() {
    // Shuffle the GIF CIDs array
    const shuffled = [...gifCIDs].sort(() => Math.random() - 0.5);
    
    // Update the global array
    gifCIDs.length = 0;
    gifCIDs.push(...shuffled);
    
    // Reinitialize the slideshow
    initializeSlideshow();
    
    // Visual feedback
    randomizeBtn.style.background = 'rgba(16, 185, 129, 0.3)';
    randomizeBtn.style.borderColor = 'rgba(16, 185, 129, 0.6)';
    
    setTimeout(() => {
        randomizeBtn.style.background = 'rgba(124, 58, 237, 0.2)';
        randomizeBtn.style.borderColor = 'rgba(124, 58, 237, 0.5)';
    }, 300);
}

// Handle header scroll effect
function handleHeaderScroll() {
    const header = document.querySelector('.site-header');
    const scrollPosition = window.scrollY;
    
    if (scrollPosition > 100) {
        header.style.background = 'rgba(10, 10, 10, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
        header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.2)';
    } else {
        header.style.background = 'rgba(10, 10, 10, 0.9)';
        header.style.boxShadow = 'none';
    }
}

// Handle responsive adjustments on window resize
window.addEventListener('resize', function() {
    // Cancel existing animation
    if (animationId) {
        cancelAnimationFrame(animationId);
    }
    
    // Restart animation with new dimensions
    startSlideshowAnimation();
});

// Lazy loading for images
if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}
