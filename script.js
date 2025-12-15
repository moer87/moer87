// ===== CONFIGURATION =====
// Your GIF CIDs from Pinata/IPFS
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

// IPFS Gateway - You can change this if needed[citation:4]
const IPFS_GATEWAY = 'https://ipfs.io/ipfs';

// ===== SLIDESHOW LOGIC =====
let autoScrollInterval;
let isPlaying = true;
const scrollSpeed = 1; // Pixels per interval
const intervalTime = 30; // Milliseconds between scroll updates

function initSlideshow() {
    const track = document.getElementById('slideshowTrack');
    if (!track) return;

    // 1. SHUFFLE the array for a random order
    const shuffledCids = [...gifCids].sort(() => Math.random() - 0.5);

    // 2. BUILD the image elements
    track.innerHTML = ''; // Clear any existing content
    shuffledCids.forEach(cid => {
        const imgUrl = `${IPFS_GATEWAY}/${cid}`;
        const img = document.createElement('img');
        img.src = imgUrl;
        img.alt = `Pixel Art by MoeR87 - CID: ${cid.substring(0,8)}...`;
        img.loading = 'lazy'; // Good for performance
        track.appendChild(img);
    });

    // 3. DUPLICATE images for a seamless infinite loop effect
    const images = track.querySelectorAll('img');
    images.forEach(img => {
        const clone = img.cloneNode(true);
        track.appendChild(clone);
    });

    // 4. START auto-scroll
    startAutoScroll();
}

function startAutoScroll() {
    const track = document.getElementById('slideshowTrack');
    if (!track || autoScrollInterval) return;

    autoScrollInterval = setInterval(() => {
        // Scroll a tiny bit to the left
        track.scrollLeft += scrollSpeed;

        // If we've scrolled to the end of the original set, jump back near the start
        const scrollWidth = track.scrollWidth / 2; // Because we duplicated
        if (track.scrollLeft >= scrollWidth - track.clientWidth) {
            track.scrollLeft = 10; // Small jump, not 0, to avoid a jarring reset
        }
    }, intervalTime);
    isPlaying = true;
    updatePlayPauseButtons();
}

function stopAutoScroll() {
    if (autoScrollInterval) {
        clearInterval(autoScrollInterval);
        autoScrollInterval = null;
        isPlaying = false;
        updatePlayPauseButtons();
    }
}

function togglePlayPause() {
    if (isPlaying) {
        stopAutoScroll();
    } else {
        startAutoScroll();
    }
}

function updatePlayPauseButtons() {
    const pauseBtn = document.getElementById('pauseBtn');
    const playBtn = document.getElementById('playBtn');
    if (isPlaying) {
        pauseBtn.style.display = 'inline-block';
        playBtn.style.display = 'none';
    } else {
        pauseBtn.style.display = 'none';
        playBtn.style.display = 'inline-block';
    }
}

// ===== SETUP PAGE =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('MoeR87 Portfolio - Initializing...');

    // 1. Initialize the slideshow
    initSlideshow();

    // 2. Set up play/pause button event listeners
    document.getElementById('pauseBtn').addEventListener('click', togglePlayPause);
    document.getElementById('playBtn').addEventListener('click', togglePlayPause);

    // 3. Pause slideshow when user hovers over it
    const track = document.getElementById('slideshowTrack');
    if (track) {
        track.parentElement.addEventListener('mouseenter', stopAutoScroll);
        track.parentElement.addEventListener('mouseleave', () => {
            if (!isPlaying) return; // Don't restart if user manually paused
            startAutoScroll();
        });
    }

    // 4. Set current year in footer
    document.getElementById('currentYear').textContent = new Date().getFullYear();

    // 5. (Optional) Add a subtle visual effect to project cards on hover
    const projectCards = document.querySelectorAll('.drop-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transition = 'all 0.4s ease';
        });
    });
});
