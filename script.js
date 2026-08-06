// Initialize AOS Animation
AOS.init({ duration: 1000, once: true });

// Auto-changing Hero Background
const heroBgImages = [
    'https://images.pexels.com/photos/110854/pexels-photo-110854.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1600',
    'https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&w=1600'
];
let bgIndex = 0;
const heroBgElement = document.getElementById('hero-bg');

function changeHeroBackground() {
    if (heroBgElement) {
        heroBgElement.style.backgroundImage = `url('${heroBgImages[bgIndex]}')`;
        bgIndex = (bgIndex + 1) % heroBgImages.length;
    }
}
changeHeroBackground();
setInterval(changeHeroBackground, 5000);

// Swiper Gallery Slider
const swiper = new Swiper('.mySwiper', {
    slidesPerView: 'auto',
    spaceBetween: 30,
    centeredSlides: true,
    autoplay: { delay: 3000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
});

// Dynamic Gallery Load
const defaultGalleryImages = [
    'https://images.pexels.com/photos/417074/pexels-photo-417074.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/33109/fall-autumn-red-season.jpg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/1274260/pexels-photo-1274260.jpeg?auto=compress&cs=tinysrgb&w=600',
    'https://images.pexels.com/photos/2150/sky-space-dark-galaxy.jpg?auto=compress&cs=tinysrgb&w=600'
];

const galleryContainer = document.getElementById('dynamic-gallery');
if (galleryContainer) {
    defaultGalleryImages.forEach(imgUrl => {
        const slide = document.createElement('div');
        slide.className = 'swiper-slide';
        slide.style.backgroundImage = `url('${imgUrl}')`;
        galleryContainer.appendChild(slide);
    });
    swiper.update();
}

// EmailJS Integration
const PUBLIC_KEY = "f61be8dc-3fa2-4c7b-ac22-720190daa069";
emailjs.init(PUBLIC_KEY);

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalBtnText = submitBtn.innerHTML;
        submitBtn.innerText = 'Sending...';

        const serviceID = 'YOUR_SERVICE_ID';
        const templateID = 'YOUR_TEMPLATE_ID';

        emailjs.sendForm(serviceID, templateID, this)
            .then(() => {
                submitBtn.innerHTML = originalBtnText;
                formStatus.style.display = 'block';
                formStatus.style.color = '#00ff88';
                formStatus.innerText = 'Message sent successfully!';
                contactForm.reset();
            }, (error) => {
                submitBtn.innerHTML = originalBtnText;
                formStatus.style.display = 'block';
                formStatus.style.color = '#ff4d4d';
                formStatus.innerText = 'Failed to send message. Please check EmailJS settings.';
                console.error('EmailJS Error:', error);
            });
    });
}