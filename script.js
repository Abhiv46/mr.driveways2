// Mobile Menu Toggle
function toggleMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    mobileMenu.classList.toggle('active');
}

// Close mobile menu when clicking outside
document.addEventListener('click', function(event) {
    const mobileMenu = document.getElementById('mobileMenu');
    const menuBtn = document.querySelector('.mobile-menu-btn');
    
    if (!mobileMenu.contains(event.target) && !menuBtn.contains(event.target)) {
        mobileMenu.classList.remove('active');
    }
});

// ========== AI IMAGES - ONLY DRIVEWAYS ==========
const aiImages = [
    'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
    'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
    'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg',
    'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
    'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
    'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
    'https://images.pexels.com/photos/1396131/pexels-photo-1396131.jpeg',
    'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg',
    'https://images.pexels.com/photos/164522/pexels-photo-164522.jpeg',
    'https://images.pexels.com/photos/1396109/pexels-photo-1396109.jpeg'
];

function getRandomImage() {
    const randomIndex = Math.floor(Math.random() * aiImages.length);
    return aiImages[randomIndex];
}

function updateAIImage() {
    const aiImage = document.getElementById('aiImage');
    const updateTime = document.getElementById('imageUpdateTime');
    
    aiImage.src = getRandomImage();
    
    const now = new Date();
    updateTime.textContent = `Updated: ${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    
    localStorage.setItem('lastImageUpdate', now.toISOString());
    localStorage.setItem('currentImage', aiImage.src);
}

function refreshAIImage() {
    updateAIImage();
}

// Check and update image on load
document.addEventListener('DOMContentLoaded', function() {
    const lastUpdate = localStorage.getItem('lastImageUpdate');
    const currentImage = localStorage.getItem('currentImage');
    const aiImage = document.getElementById('aiImage');
    const updateTime = document.getElementById('imageUpdateTime');
    
    if (lastUpdate && currentImage) {
        const lastUpdateDate = new Date(lastUpdate);
        const now = new Date();
        const hoursSinceUpdate = (now - lastUpdateDate) / (1000 * 60 * 60);
        
        if (hoursSinceUpdate > 24) {
            updateAIImage();
        } else {
            aiImage.src = currentImage;
            updateTime.textContent = `Updated: ${lastUpdateDate.toLocaleDateString()} ${lastUpdateDate.toLocaleTimeString()}`;
        }
    } else {
        updateAIImage();
    }
});

// ========== CALCULATOR - UPDATED (No Depth, Price Range) ==========
function calculateEstimate() {
    const length = parseFloat(document.getElementById('length').value);
    const width = parseFloat(document.getElementById('width').value);
    const type = document.getElementById('drivewayType').value;
    
    // Validation
    if (!length || !width) {
        alert('Please enter length and width');
        return;
    }
    
    // Calculate area
    const area = length * width;
    
    // Price ranges based on driveway type
    let minPricePerM2 = 80;
    let maxPricePerM2 = 100;
    
    // Adjust for premium types
    if (type === 'imprinted') {
        minPricePerM2 = 90;
        maxPricePerM2 = 110;
    } else if (type === 'premium') {
        minPricePerM2 = 100;
        maxPricePerM2 = 120;
    }
    
    // Calculate costs
    const costMin = area * minPricePerM2;
    const costMax = area * maxPricePerM2;
    const costAvg = (costMin + costMax) / 2;
    
    // Display results
    document.getElementById('area').textContent = area.toFixed(2);
    document.getElementById('costMin').textContent = costMin.toFixed(2);
    document.getElementById('costMax').textContent = costMax.toFixed(2);
    document.getElementById('costAvg').textContent = costAvg.toFixed(2);
    
    document.getElementById('calculatorResult').style.display = 'block';
}

// ========== IMAGE UPLOAD ==========
document.addEventListener('DOMContentLoaded', function() {
    const uploadArea = document.getElementById('uploadArea');
    const imageUpload = document.getElementById('imageUpload');
    const uploadPreview = document.getElementById('uploadPreview');
    const previewImage = document.getElementById('previewImage');
    
    uploadArea.addEventListener('click', function() {
        imageUpload.click();
    });
    
    uploadArea.addEventListener('dragover', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#e8f4f8';
    });
    
    uploadArea.addEventListener('dragleave', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#f8f9fa';
    });
    
    uploadArea.addEventListener('drop', function(e) {
        e.preventDefault();
        uploadArea.style.background = '#f8f9fa';
        
        const file = e.dataTransfer.files[0];
        if (file && file.type.startsWith('image/')) {
            handleImageUpload(file);
        }
    });
    
    imageUpload.addEventListener('change', function(e) {
        const file = e.target.files[0];
        if (file) {
            handleImageUpload(file);
        }
    });
});

function handleImageUpload(file) {
    if (file.size > 10 * 1024 * 1024) {
        alert('File size should be less than 10MB');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        document.getElementById('previewImage').src = e.target.result;
        document.getElementById('uploadPreview').style.display = 'block';
        document.getElementById('uploadArea').style.display = 'none';
    };
    reader.readAsDataURL(file);
}

function removeImage() {
    document.getElementById('uploadPreview').style.display = 'none';
    document.getElementById('uploadArea').style.display = 'block';
    document.getElementById('imageUpload').value = '';
}

// ========== QUOTE FORM ==========
function submitQuote(event) {
    event.preventDefault();
    
    const name = document.getElementById('name').value;
    const phone = document.getElementById('phone').value;
    const email = document.getElementById('email').value;
    const postcode = document.getElementById('postcode').value;
    const size = document.getElementById('size').value;
    const details = document.getElementById('details').value;
    
    let message = `Hello Mr. Driveways! I need a quote for my driveway:%0A%0A`;
    message += `*Name:* ${name}%0A`;
    message += `*Phone:* ${phone}%0A`;
    message += `*Email:* ${email || 'Not provided'}%0A`;
    message += `*Postcode:* ${postcode}%0A`;
    message += `*Approx Size:* ${size || 'Not specified'} m²%0A`;
    message += `*Details:* ${details || 'No details provided'}%0A`;
    
    window.open(`https://wa.me/447383555131?text=${message}`, '_blank');
}

// ========== TIKTOK FEED ==========
function loadTikTokFeed() {
    const feed = document.getElementById('tiktokFeed');
    feed.innerHTML = '';
    
    const tiktokVideos = [
        {
            thumbnail: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
            description: 'Imprinted concrete driveway installation in Birmingham',
            likes: '1.2K',
            comments: '45'
        },
        {
            thumbnail: 'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
            description: 'Satisfying concrete finishing process',
            likes: '2.5K',
            comments: '78'
        },
        {
            thumbnail: 'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg',
            description: 'Before and after - Driveway transformation',
            likes: '3.1K',
            comments: '92'
        },
        {
            thumbnail: 'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
            description: 'Patterned concrete driveway installation',
            likes: '4.5K',
            comments: '123'
        },
        {
            thumbnail: 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            description: 'Customer review - Happy customer in Birmingham',
            likes: '2.8K',
            comments: '67'
        },
        {
            thumbnail: 'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
            description: 'Imprinted concrete driveway process',
            likes: '5.2K',
            comments: '156'
        }
    ];
    
    tiktokVideos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.className = 'tiktok-video';
        videoElement.innerHTML = `
            <img src="${video.thumbnail}" alt="TikTok Video" loading="lazy">
            <div class="video-info">
                <p>${video.description}</p>
                <div class="video-stats">
                    <span><i class="fas fa-heart"></i> ${video.likes}</span>
                    <span><i class="fas fa-comment"></i> ${video.comments}</span>
                </div>
            </div>
        `;
        
        videoElement.addEventListener('click', function() {
            window.open('https://www.tiktok.com/@mr.driveways', '_blank');
        });
        
        feed.appendChild(videoElement);
    });
}

// ========== GALLERY ==========
function loadGallery() {
    const gallery = document.getElementById('galleryGrid');
    if (!gallery) return;
    
    gallery.innerHTML = '';
    
    const galleryImages = [
        'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
        'https://images.pexels.com/photos/323705/pexels-photo-323705.jpeg',
        'https://images.pexels.com/photos/280221/pexels-photo-280221.jpeg',
        'https://images.pexels.com/photos/164558/pexels-photo-164558.jpeg',
        'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
        'https://images.pexels.com/photos/259588/pexels-photo-259588.jpeg',
        'https://images.pexels.com/photos/1396131/pexels-photo-1396131.jpeg',
        'https://images.pexels.com/photos/280222/pexels-photo-280222.jpeg'
    ];
    
    galleryImages.forEach((img, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.innerHTML = `
            <img src="${img}" alt="Driveway Project ${index + 1}" loading="lazy">
            <div class="gallery-overlay">
                <span>Driveway Project</span>
            </div>
        `;
        gallery.appendChild(item);
    });
}

// Load all on page load
document.addEventListener('DOMContentLoaded', function() {
    loadTikTokFeed();
    loadGallery();
});

// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});
