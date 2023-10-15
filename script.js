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

    var msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[0];
    msg.lang = "es";//spanish-espanol
    msg.rate = 1;//.1 - 10
    msg.pitch = 1;//0 - 2
    speaker = window.speechSynthesis;
    var newCard = 0;
    var x = 0;
    var card = firstCard;//first card
    var firstCard = 0;
    var myInterval;
    let speed = 5;

function shuffle(){
    if (document.querySelector('#play').innerHTML=="READY"){
        cards.sort(function(){return 0.5 - Math.random()});
        card=firstCard;document.getElementById("message").innerHTML="";
        document.getElementById("speed").innerHTML=speed;
        }
}

function buttonToggle(){
    //if you press the center of the screen to start the game
    if (document.querySelector('#play').innerHTML=="READY"){
        document.querySelector('#play').innerHTML="PLAYING";
        document.getElementById("play").style.background='green';
        document.getElementById("play").style.color='white';
    }

    //if you press the center of the screen when is playing then it changes to paused 
    else if (document.querySelector('#play').innerHTML=="PLAYING"){
        document.querySelector('#play').innerHTML="PAUSED";
        document.body.style.backgroundColor = "grey";
        document.getElementById("play").style.background='red';
        document.getElementById("play").style.color='black';
    }

    //if you press the center of the screen when is paused then it changes to playing
    else if (document.querySelector('#play').innerHTML=="PAUSED"){
        document.querySelector('#play').innerHTML="PLAYING";
        document.body.style.backgroundColor = "white";
        document.getElementById("play").style.background='green';
        document.getElementById("play").style.color='white';
    }
}

function callCards(){
    if (document.querySelector('#play').innerHTML=="PLAYING"){
        
      let img = document.getElementById('list_div');
      
      // Create image element
      let dynamicImage = document.createElement('img');
      
      // Initialize the image source
      dynamicImage.src = `./images/${cards[card]}.jpg`;
        
      //insert new image on top
      img.insertBefore(dynamicImage, img.children[0]);   
        
        msg.text = `${cards[card]}`;// this is for the speechSynthesis
        speaker.speak(msg);
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
    shuffle();
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