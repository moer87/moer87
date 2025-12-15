// Artwork IPFS links for the slideshow
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

// Function to shuffle array (randomize order)
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

// Create the slideshow with randomized artwork
function createSlideshow() {
    const slideshowTrack = document.getElementById('slideshow-track');
    
    if (!slideshowTrack) return;
    
    // Shuffle the artwork array
    const shuffledArtwork = shuffleArray(artworkIPFS);
    
    // Create two sets of images for seamless scrolling
    for (let set = 0; set < 2; set++) {
        shuffledArtwork.forEach(ipfsHash => {
            const img = document.createElement('img');
            img.src = `https://ipfs.io/ipfs/${ipfsHash}`;
            img.alt = "Moe's Pixel Art";
            img.loading = "lazy";
            slideshowTrack.appendChild(img);
        });
    }
}

// Smooth scrolling for anchor links
function setupSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Calculate position considering fixed header
                const headerHeight = document.querySelector('.navbar').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Update current year in footer
function updateCurrentYear() {
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }
}

// Add scroll effect to navbar
function setupNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScrollTop = 0;
    
    window.addEventListener('scroll', function() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop > 100) {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.backgroundColor = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.05)';
        }
        
        lastScrollTop = scrollTop;
    });
}

// Initialize everything when the page loads
document.addEventListener('DOMContentLoaded', function() {
    createSlideshow();
    setupSmoothScrolling();
    updateCurrentYear();
    setupNavbarScroll();
    
    // Add loading animation to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
});
