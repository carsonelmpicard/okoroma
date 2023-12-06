var i = 0;
var txt = `"I was conscious of the fact that I was the only Black player there, and the standards meant that I had to prove myself to belong and qualify for the team."`;
var speed = 20;
var headline = document.getElementById('headline');

var headlineDisped = false;

// function typeWriter() {
//     if (i < txt.length) {
//         headline.innerHTML += txt.charAt(i);
//         i++;
//         setTimeout(typeWriter, speed);
//     }
//     headlineDisped = true
// }

// function typeWriter() {
//     if (i < txt.length) {
//         headline.innerHTML += txt.charAt(i);
//         i++;
//         setTimeout(typeWriter, speed);
//     }
//     headlineDisped = true
// }

// function onScrollAction() {
//     typeWriter();
// }
  
// function checkScroll() {
//     let scrollThreshold = 350;

//     if (window.scrollY > scrollThreshold && !headlineDisped) {
//         onScrollAction();
//     }
// }

// window.onscroll = checkScroll;

document.addEventListener('DOMContentLoaded', (event) => {
    let text = txt;
    let displayText = '';
    let scrollProgress = 0;
    const maxScroll = 2000;

    var userHasStartedScroll = false;

    var scrollCta = document.getElementById('scroll');

    if (window.scrollY !== 0 || window.screen.width < 576) {
        headline.innerHTML = text;
    }
    else {
        window.addEventListener('wheel', (e) => {
            if (!userHasStartedScroll) {
                scrollCta.classList.add('disappearing-element');
            }

            if (scrollProgress > 100) {
                userHasStartedScroll = true;
            }

            if (scrollProgress < maxScroll && window.scrollY === 0) {
                e.preventDefault();
            }
    
            if (e.deltaY > 0) {
                scrollProgress += e.deltaY;
                scrollProgress = Math.min(scrollProgress, maxScroll);
            }
    
            updateText();
        }, { passive: false });
    }

    function updateText() {
        let textLengthToShow = Math.floor((scrollProgress / maxScroll) * text.length);
        displayText = text.substring(0, textLengthToShow);
        headline.innerHTML = `<span class="head-char">${displayText}</span>`;
    }

    function updateScrollPosition() {
        let scrollPosition = window.scrollY || document.documentElement.scrollTop;
        if (scrollPosition > 200) {
            var mainImage = document.getElementById("main-art");
            mainImage.classList.remove("hidden")
        }
        if (scrollPosition > 50) {
            var subhead = document.getElementById("subhead");
            subhead.classList.remove("hidden")
        }
    }

    window.addEventListener('scroll', () => {
        updateScrollPosition();
    });

    updateScrollPosition();
});

new AudioPlayer("voa-1", "voa-1-card");
