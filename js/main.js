var i = 0;
var txt = `"I was conscious of the fact that I was the only Black player there, and the standards meant that I had to prove myself to belong and qualify for the team."`;
var speed = 20;
var headline = document.getElementById('headline');

var headlineDisped = false;

function typeWriter() {
    if (i < txt.length) {
        headline.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
    headlineDisped = true
}

function onScrollAction() {
    typeWriter();
}
  
function checkScroll() {
    let scrollThreshold = 350;

    if (window.scrollY > scrollThreshold && !headlineDisped) {
        onScrollAction();
    }
}

window.onscroll = checkScroll;