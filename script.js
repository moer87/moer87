// script.js
// Creates the randomized, horizontally scrolling GIF slideshow.

document.addEventListener('DOMContentLoaded', function() {
    const slideshowContainer = document.getElementById('gifSlideshow');

    // IPFS GIF CIDs - DO NOT EDIT
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

    // Function to shuffle an array (Fisher-Yates algorithm)
    function shuffleArray(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    }

    // Create the slideshow images
    function createSlideshow() {
        // Shuffle the CIDs for random order on each load
        const shuffledCids = shuffleArray([...gifCids]);

        // Clear any existing content
        slideshowContainer.innerHTML = '';

        // Create image elements for each GIF and append to the track
        shuffledCids.forEach(cid => {
            const img = document.createElement('img');
            img.src = `https://gateway.pinata.cloud/ipfs/${cid}`;
            img.alt = 'Pixel Art GIF by MoeR87';
            img.loading = 'lazy'; // For better performance
            slideshowContainer.appendChild(img);
        });

        // Duplicate the set of images for seamless infinite scrolling
        shuffledCids.forEach(cid => {
            const imgClone = document.createElement('img');
            imgClone.src = `https://gateway.pinata.cloud/ipfs/${cid}`;
            imgClone.alt = 'Pixel Art GIF by MoeR87';
            imgClone.loading = 'lazy';
            slideshowContainer.appendChild(imgClone);
        });
    }

    // Initialize the slideshow
    createSlideshow();

    // Optional: Pause animation on hover for better mobile/desktop viewing
    slideshowContainer.addEventListener('touchstart', function() {
        this.style.animationPlayState = 'paused';
    });

    slideshowContainer.addEventListener('touchend', function() {
        this.style.animationPlayState = 'running';
    });
});
