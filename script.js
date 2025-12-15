// MOBILE MENU TOGGLE
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Close menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// RANDOMIZE AND LOAD GIF SLIDESHOW
const gifCids = [
    'bafkreiepqzjkki4vmmaz7h2qdbhvqztlc4cqvs2o2ddlcsb6u3cidl3vx4',
    'bafkreig4aqxu34kehpidyaay3to63z2wmkbpbrzb57yvijbs65kgxfaifu',
    'bafkreibi277kh6uf4toqlapq3elv4lfe3drtaxbm7hgig3luqp4jdpbqm4',
    'bafkreibxawbxqcfftxpeqvi2iu6jpyb3wtbcvgyvg6lybvbru3jdpvt5la',
    'bafkreibbisckvxoomksesel2kx6yu3on3enj5hl7tmznz6fn7o4pcmbbiu',
    'bafkreidnkc4nugckh7y2vje4ugq5aaluqsycib5iu6sjk3w2u3m2wftxxe',
    'bafkreifxnn5nin3ai7vs5o7jzsghmlvn2bk42meggdndz522llqosxm2ee',
    'bafkreigrh7wdaqhsr5xv3lwvmu6bmt23v6pjn7q6wtszpn3m642vu2krlm',
    'bafkreiegzsvxqhbw73kfnf4vus6qs3za3ka4bj2ai2p5vznnwibb637swe',
    'bafybeigwlza6tmz36zfjoozwjs4xypq2qw6w6dz6aemqre2pr2ykp3ujtu',
    'bafkreidlhtakzaeyciwxmtfxwog6ve5qv4q5odwa54kqni5d2zxbaldvjy',
    'bafkreiedasx3jz4eoppshoftmk6o3afkt5vnevnlas3rod6v2ikrf6u7xe',
    'bafkreicymsqef4afympwpfsczck66c62w235ijruwmirgxlp52e33ssb7e'
];

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function initializeSlideshow() {
    const slideshowTrack = document.getElementById('gifSlideshow');
    if (!slideshowTrack) return;

    // Clear any existing content
    slideshowTrack.innerHTML = '';

    // Shuffle the CIDs for random order on each load
    const shuffledCids = shuffleArray([...gifCids]);

    // Create two sets of images for seamless infinite loop
    const allCids = [...shuffledCids, ...shuffledCids];

    allCids.forEach(cid => {
        const img = document.createElement('img');
        img.src = `https://gateway.pinata.cloud/ipfs/${cid}`;
        img.alt = 'Pixel Art by MoeR87';
        img.loading = 'lazy'; // Optimize loading
        slideshowTrack.appendChild(img);
    });

    // Adjust animation duration based on number of items
    const totalImages = allCids.length;
    const duration = totalImages * 3; // 3 seconds per image segment
    slideshowTrack.style.animationDuration = `${duration}s`;
}

// Initialize when DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeSlideshow();

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add subtle parallax effect to hero section
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const hero = document.querySelector('.hero');
        if (hero) {
            hero.style.transform = `translateY(${scrolled * 0.05}px)`;
        }
    });
});

// Fallback for older browsers
if (!NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
