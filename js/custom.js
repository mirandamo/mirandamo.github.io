var win = $(window);

// viewport dimensions
var ww = win.width();
var wh = win.height();

$(document).ready(function () {
    fadeInPage();
    sidebar();
    offsetScroll();
});

function scrollSmoothTo(elementId) {
    var element = document.getElementById(elementId);
    const offset = 50;
    const bodyRect = document.body.getBoundingClientRect().top;
    const elementRect = element.getBoundingClientRect().top;
    const elementPosition = elementRect - bodyRect;
    const offsetPosition = elementPosition - offset;

    window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
    });
}

/** Change tag passing anchor point */
function sidebar() {
    //find the number of anchors/sections
    var numSec = $('.section').length;

    //append all anchors 
    if (numSec > 0) {
        for (i = 1; i <= numSec; i++) {
            var secName = $('#s' + i).text();
            $('#tags').append('<a class="anchor" id="a' + i + '" onclick="scrollSmoothTo(\'s' + i + '\')">' + secName + '</a>');
        }
        //change tag when pass anchor point 
        var anchor_offset = 0;
        // highlight table of contents
        $(window).on('scroll', function () {
            for (i = 1; i <= numSec; i++) {
                anchor_offset = $('#s' + i).offset().top - 200;

                if ($(window).scrollTop() > anchor_offset) {
                    $('.active').removeClass('active');
                    $('#a' + i).addClass('active');
                }
            }
        })
    };
}



/** Fade In */
/** ===================== */
function fadeInPage() {
    if (!window.AnimationEvent) { return; }
    var fader = document.getElementById('fader');
    fader.classList.add('fade-out');

    document.addEventListener('DOMContentLoaded', function () {
        if (!window.AnimationEvent) { return; }
        var anchors = document.querySelectorAll('a:not(.img-link)');

        for (var idx = 0; idx < anchors.length; idx += 1) {
            if (anchors[idx].hostname !== window.location.hostname ||
                anchors[idx].pathname === window.location.pathname) {
                continue;
            }
            anchors[idx].addEventListener('click', function (event) {
                var fader = document.getElementById('fader'),
                    anchor = event.currentTarget;

                var listener = function () {
                    window.location = anchor.href;
                    fader.removeEventListener('animationend', listener);
                };
                fader.addEventListener('animationend', listener);

                event.preventDefault();
                fader.classList.add('fade-in');
            });
        }
    });
    window.addEventListener('pageshow', function (event) {
        if (!event.persisted) {
            return;
        }
        var fader = document.getElementById('fader');
        fader.classList.remove('fade-in');
    })
};

/** Intersection Observer API */
/** ===================== */
const images = document.querySelectorAll('.lazyload');
const config = {
    root: null,
    rootMargin: '0px',
    threshold: 0.5
  };
function handleIntersection(entries) {
  entries.map((entry) => {
    if (entry.isIntersecting) {
      entry.target.src = entry.target.dataset.src;
      entry.target.classList.add('loaded')
      observer.unobserve(entry.target);
    }
  });
}

const observer = new IntersectionObserver(handleIntersection);

images.forEach(image => observer.observe(image));