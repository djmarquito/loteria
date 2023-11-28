//array of cards
const cards = [
    "el gallo", "el diablito", "la dama", "el catrín", "el paraguas",
    "la sirena", "la escalera", "la botella", "el barríl", "el árbol",
    "el melón", "el valiente", "el gorrito", "la muerte", "la pera",
    "la bandera", "el bandolón", "el violoncello", "la garza", "el pajarito",
    "la mano", "la bota", "la luna", "el cotorro", "el borracho",
    "el negrito", "el corazón", "la sandía", "el tambor", "el camarón",
    "las jaras", "el músico", "la araña", "el soldado", "la estrella",
    "el cazo", "el mundo", "el apache", "el nopal", "el alacrán",
    "la rosa", "la calavera", "la campana", "el cantarito", "el venado",
    "el sol", "la corona", "la chalupa", "el pino", "el pescado",
    "la palma", "la maceta", "el arpa", "la rana"];

const msg = new SpeechSynthesisUtterance();
const voicesList = window.speechSynthesis.getVoices();

msg.rate = 1;//.1 - 10
msg.pitch = 1;//0 - 2

var card;
var myInterval;
let speed = 4;

let iphone = true; 
let shuffled = false;

window.onload = function(){document.getElementById("year").innerHTML = new Date().getFullYear();}

// To prevent accidental web application re-load
window.onbeforeunload = function() {
    return "Data will be lost if you leave the page, are you sure?";
};

function iPhone(){
    let hasEnabledVoice = false;

    document.addEventListener('click', () => {
      if (hasEnabledVoice) {
        return;
      }

    if (navigator.userAgent.match(/iPhone|iPad|iPod|Macintosh/)) {
    // Code for Apple devices
    msg.lang = 'es-ES';
    } else {
    // Code for other devices
    msg.lang = 'es-MX';
    }
          
    msg.volume = 0;
    speechSynthesis.speak(msg);
    msg.volume = 1;
      hasEnabledVoice = true;
    }); 
}

function shuffle(){
    if (document.querySelector('#play').innerHTML=="READY"){
        cards.sort(function(){return 0.5 - Math.random()});//shuffle
        card = 0;//start from the first card (0-53)
        document.getElementById("message").innerHTML="";//remove the ready to start message
        document.getElementById("speed").innerHTML=speed;//show the speed
        }
}

function buttonToggle(){
    //if you press the center of the screen to start the game
    if (document.querySelector('#play').innerHTML=="READY"){
        document.querySelector('#play').innerHTML="PLAYING";
        document.getElementById("play").style.background='green';
        document.getElementById("play").style.color='white';
        document.body.style.overflow='hidden';
    }

    //if you press the center of the screen when is playing then it changes to paused 
    else if (document.querySelector('#play').innerHTML=="PLAYING"){
        document.querySelector('#play').innerHTML="PAUSED";
        document.body.style.backgroundColor = "whitesmoke";
        document.getElementById("play").style.background='red';
        document.getElementById("play").style.color='black';
        document.body.style.overflow='visible';
    }

    //if you press the center of the screen when is paused then it changes to playing
    else if (document.querySelector('#play').innerHTML=="PAUSED"){
        document.querySelector('#play').innerHTML="PLAYING";
        document.body.style.backgroundColor = "white";
        document.getElementById("play").style.background='green';
        document.getElementById("play").style.color='white';
        document.body.scrollIntoView(document.querySelector('#header'));
        document.body.style.overflow='hidden';
    }

    //if you press the center of the screen when is final then it changes to ready
    else if (document.querySelector('#play').innerHTML=="FINAL"){
        document.querySelector('#play').innerHTML="READY";
        document.body.style.backgroundColor = "white";
        document.getElementById("play").style.background='white';
        document.getElementById("play").style.color='black';

        //remove all the images
        document.querySelectorAll("#list_div img")
        .forEach(img => img.remove());

        //cards NOT shuffled - so it shuffles when you re-start the game 
        shuffled = false;

        //show the ready to start message
        document.getElementById("message").innerHTML="Loteria: <br>(Mexican Bingo)\
        <br><br> Press the card to pause.\
        <br><br> Press the card again to continue.\
        <br><br> Scroll down when paused.\
        <br><br> Press the plus/minus buttons to adjust the speed.\
        <br><br> Press here to start.";        
    }
}

function callCards(){
    if (document.querySelector('#play').innerHTML=="PLAYING"){
        
      let img = document.getElementById('list_div');
      
      // Create image element
      let dynamicImage = document.createElement('img');
      
      // Initialize the image source
      dynamicImage.src = `./images/${cards[card]}.webp`;
        
      //insert new image on top
      img.insertBefore(dynamicImage, img.children[0]); 
      
      //make sure is scrolled UP!
      document.body.scrollIntoView(document.querySelector('#header'));

      //...and the scrolling is OFF!
      document.body.style.overflow='hidden';
        
        msg.text = `${cards[card]}`;// this is for the speechSynthesis
        
        speechSynthesis.speak(msg);
        if (card < 53){card++;
        }else{
            document.querySelector('#play').innerHTML="FINAL";
        }
    }
}

function cardCaller(){
    if (!myInterval){
        myInterval = setInterval(callCards, (9-speed)*1000);
    }//3000fast 6000normal 9000slow
}

function play(){
    if (iphone){iPhone();iphone=false;}
    if (!shuffled){shuffle();shuffled=true;}
    buttonToggle();
    cardCaller();
}

function faster(){
    if (speed < 9){
        clearInterval(myInterval);
        speed++;
        document.getElementById("speed").innerHTML=speed;
        myInterval = setInterval(callCards, (11-speed)*1000);//10-5
    }
}

function slower(){
    if (speed > 1){
        clearInterval(myInterval);
        speed--;
        document.getElementById("speed").innerHTML=speed;
        myInterval = setInterval(callCards, (11-speed)*1000);//(x-1)*1000=7000
    }
}
