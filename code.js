const nav_container = document.querySelector(".nav-container");
const big_nav = document.querySelector(".Big-nav");

nav_container.onclick = function(){
    this.classList.toggle("change")
    big_nav.classList.toggle("see")
};

$('.main-slider').slick({
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    adaptiveHeight: true
});

$('.arts_popup').magnificPopup({delegate:'a',
    type:'image',
    gallery:{
        enabled:true,
        navigateByImgClick: true
    },
    removalDelay: 300,

    mainClass:'mfp-fade'
});

