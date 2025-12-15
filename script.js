// Moe's Pixel Art Portfolio - Main Script

// Artwork IPFS links for the gallery
const artworkIPFS = [
    "bafkreianp5huzaxm5izaxlblflaei6imzxywritvh2e7spspjwlvvggrjy",
    "bafybeicxol7as63i43tokig6zimbsq5oyybhftmunmitrnwy5udlnfvjnu",
    "bafybeigq65kclpl6wysx4fjktc2w46zzboar3ttzpddedgee5drmyquut4",
    "bafybeicovahsc6vyo5z5n7iow3mwh354vu6fg4jybvrobvw6xvfmis2wnq",
    "bafybeiebb7vbse574gfty3mbuhjxw7jjkcfz77o7b2xzzqw6yfv7y7fzba",
    "bafybeidbplto3mu44shomizfq6sklumtmyaefj6w5dzcqmwgjrbcidxasm",
    "bafkreigrh7wdaqhsr5xv3lwvmu6bmt23v6pjn7q6wtszpn3m642vu2krlm",
    "bafkreiegzsvxqhbw73kfnf4vus6qs3za3ka4bj2ai2p5vznnwibb637swe",
    "bafkreicymsqef4afympwpfsczck66c62w235ijruwmirgxlp52e33ssb7e",
    "bafybeifyymub6ykn234logc4asstsitqxqistcavkto37cbshv7xrrsuni",
    "bafybeigwlza6tmz36zfjoozwjs4xypq2qw6w6dz6aemqre2pr2ykp3ujtu",
    "bafkreiedasx3jz4eoppshoftmk6o3afkt5vnevnlas3rod6v2ikrf6u7xe",
    "bafkreihaza2yknlhm24nhfhzldbgt4morhqktg2fp4uitzs5rovjeqglvi",
    "bafybeidctdjm72ntogqhizfcovhsje5eixvl77sohyqsiq3u3p4ifm2r7u",
    "bafybeigjdhe5adx2gfxcbldw6vj27pcoqqkzcu6wzhn6eoffumshgl56t4",
    "bafkreiarf5voahgzexthq4n2ijsetnutqvc7pe3fck3cflkb3hj5dhsazq",
    "bafkreigmlw4tkx3ws7fh6hdoyfxrp4wldi5qvryu5nlzjahevu2gphxiva",
    "bafkreidakh5lqzbq3n2az3zh5wo6umfbjy5vwccuurlpne5g6wk4u7znhm",
    "bafybeiapg27h2brlmelbmxcfffatv3xe3zkf2nmpczxufkssw7sjq22p4q"
];

// DOM Elements
let galleryTrack;
let modal;
let modalImage;
let modalClose;
let ipfsLink;
let shuffleBtn;
let fullscreenBtn;
let currentImageIndex = 0;

// Custom Cursor
const cursor = document.querySelector('.cursor');

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    initGallery();
    initModal();
    initEventListeners();
    updateCurrentYear();
    
    // Custom cursor movement
    document.addEventListener('mousemove', (e) => {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    // Add cursor effects on interactive elements
    document.querySelectorAll('a, button, .gallery-item').forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.style.transform = 'scale(1.5)';
        });
        el.addEventListener('mouseleave', () => {
            cursor.style.transform = 'scale(1)';
        });
    });
});

// Initialize the gallery with shuffled artwork
function initGallery() {
    galleryTrack = document.getElementById('gallery-track');
    shuffleBtn = document.getElementById('shuffle-btn');
    fullscreenBtn = document.getElementById('fullscreen-btn');
    
    // Load initial gallery
    loadGallery();
    
    // Shuffle button event
    shuffleBtn.addEventListener('click', shuffleGallery);
    
    // Fullscreen button event
    fullscreenBtn.addEventListener('click', toggleFullscreenView);
    
    // Horizontal scroll for gallery
    let isDown = false;
    let startX;
    let scrollLeft;
    
    galleryTrack.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - galleryTrack.offsetLeft;
        scrollLeft = galleryTrack.scrollLeft;
        galleryTrack.style.cursor = 'grabbing';
    });
    
    galleryTrack.addEventListener('mouseleave', () => {
        isDown = false;
        galleryTrack.style.cursor = 'grab';
    });
    
    galleryTrack.addEventListener('mouseup', () => {
        isDown = false;
        galleryTrack.style.cursor = 'grab';
    });
    
    galleryTrack.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - galleryTrack.offsetLeft;
        const walk = (x - startX) * 2;
        galleryTrack.scrollLeft = scrollLeft - walk;
    });
    
    // Also enable mousewheel horizontal scroll
    galleryTrack.addEventListener('wheel', (e) => {
        e.preventDefault();
        galleryTrack.scrollLeft += e.deltaY;
    });
}

// Load gallery with artwork
function loadGallery() {
    galleryTrack.innerHTML = '';
    
    // Create gallery items
    artworkIPFS.forEach((ipfsHash, index) => {
        const galleryItem = document.createElement('div');
        galleryItem.className = 'gallery-item';
        galleryItem.dataset.index = index;
        
        const img = document.createElement('img');
        img.src = `https://ipfs.io/ipfs/${ipfsHash}`;
        img.alt = `Pixel Art by Moe ${index + 1}`;
        img.loading = 'lazy';
        
        galleryItem.appendChild(img);
        galleryTrack.appendChild(galleryItem);
        
        // Click to open modal
        galleryItem.addEventListener('click', () => openModal(ipfsHash, index));
    });
}

// Shuffle the gallery
function shuffleGallery() {
    // Shuffle array using Fisher-Yates algorithm
    for (let i = artworkIPFS.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [artworkIPFS[i], artworkIPFS[j]] = [artworkIPFS[j], artworkIPFS[i]];
    }
    
    // Reload gallery with new order
    loadGallery();
    
    // Add visual feedback
    shuffleBtn.style.transform = 'rotate(360deg)';
    shuffleBtn.style.backgroundColor = 'var(--primary)';
    shuffleBtn.style.color = 'white';
    
    setTimeout(() => {
        shuffleBtn.style.transform = '';
        shuffleBtn.style.backgroundColor = '';
        shuffleBtn.style.color = '';
    }, 500);
}

// Toggle fullscreen view
function toggleFullscreenView() {
    const gallerySection = document.querySelector('.gallery-section');
    
    if (!document.fullscreenElement) {
        gallerySection.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
        fullscreenBtn.innerHTML = '<i class="fas fa-compress"></i>';
    } else {
        document.exitFullscreen();
        fullscreenBtn.innerHTML = '<i class="fas fa-expand"></i>';
    }
}

// Initialize modal
function initModal() {
    modal = document.getElementById('image-modal');
    modalImage = document.getElementById('modal-image');
    modalClose = document.getElementById('modal-close');
    ipfsLink = document.getElementById('ipfs-link');
    
    // Close modal events
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Keyboard navigation
    document.addEventListener('keydown', (e) => {
        if (modal.style.display === 'flex') {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowRight') nextImage();
            if (e.key === 'ArrowLeft') prevImage();
        }
    });
}

// Open modal with image
function openModal(ipfsHash, index) {
    currentImageIndex = index;
    modalImage.src = `https://ipfs.io/ipfs/${ipfsHash}`;
    ipfsLink.href = `https://ipfs.io/ipfs/${ipfsHash}`;
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

// Close modal
function closeModal() {
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// Navigate to next image
function nextImage() {
    currentImageIndex = (currentImageIndex + 1) % artworkIPFS.length;
    const nextHash = artworkIPFS[currentImageIndex];
    openModal(nextHash, currentImageIndex);
}

// Navigate to previous image
function prevImage() {
    currentImageIndex = (currentImageIndex - 1 + artworkIPFS.length) % artworkIPFS.length;
    const prevHash = artworkIPFS[currentImageIndex];
    openModal(prevHash, currentImageIndex);
}

// Initialize event listeners
function initEventListeners() {
    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Navbar scroll effect
    window.addEventListener('scroll', () => {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 100) {
            navbar.style.padding = '15px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.backdropFilter = 'blur(20px)';
        } else {
            navbar.style.padding = '24px 0';
            navbar.style.background = 'rgba(255, 255, 255, 0.9)';
            navbar.style.backdropFilter = 'blur(10px)';
        }
    });
}

// Update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Add subtle animations to elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animated');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.project-card, .about-img-main, .about-img-secondary').forEach(el => {
    observer.observe(el);
});
