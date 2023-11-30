var i = 0;
var txt = "This is where we will write in the text for our headline...";
var speed = 35;
var headline = document.getElementById('headline');

function typeWriter() {
    if (i < txt.length) {
        headline.innerHTML += txt.charAt(i);
        i++;
        setTimeout(typeWriter, speed);
    }
}

function main() {
    typeWriter();
}

main();