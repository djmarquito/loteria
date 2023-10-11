//array of cards
const cards = [
    "El gallo", "El diablito", "La dama", "El catrín", "El paraguas",
    "La sirena", "La escalera", "La botella", "El barríl", "El árbol",
    "El melón", "El valiente", "El gorrito", "La muerte", "La pera",
    "La bandera", "El bandolón", "El violoncello", "La garza", "El pajarito",
    "La mano", "La bota", "La luna", "El cotorro", "El borracho",
    "El negrito", "El corazón", "La sandía", "El tambor", "El camarón",
    "Las jaras", "El músico", "La araña", "El soldado", "La estrella",
    "El cazo", "El mundo", "El apache", "El nopal", "El alacrán",
    "La rosa", "La calavera", "La campana", "El cantarito", "El venado",
    "El sol", "La corona", "La chalupa", "El pino", "El pescado",
    "La palma", "La maceta", "El arpa", "La rana"];

    var msg = new SpeechSynthesisUtterance();
    msg.voice = window.speechSynthesis.getVoices()[0];
    msg.lang = "es";//spanish-espanol
    msg.rate = 1;//.1 - 10
    msg.pitch = 1;//0 - 2
    speaker = window.speechSynthesis;
    var newCard = 0;
    var x = 0;
    var card = 0;
    var myInterval;
    let speed = 5;

function play2(){
    
    
    // shuffle the cards only on START
    if (document.querySelector('#play').innerHTML=="START"){
    cards.sort(function(){return 0.5 - Math.random()});}
    // for (let m = 0; m < 54; m++) {
    // console.log((m+1)+" - "+cards[m]);
    //}

    //toggle the button
         if (document.querySelector('#play').innerHTML=="START"){document.querySelector('#play').innerHTML="PAUSE"; playStatus = 0;}
    else if (document.querySelector('#play').innerHTML=="PAUSE"){document.querySelector('#play').innerHTML="CONTINUE"; playStatus = 1;}
    else if (document.querySelector('#play').innerHTML=="CONTINUE"){document.querySelector('#play').innerHTML="PAUSE"; playStatus = 2;}
    
    
      //Call the cards 
        loop1:
        for (let card=newCard; card < 54; card++) {
            // if (document.querySelector('#play').innerHTML=="CONTINUE"){break;}
                setTimeout(function(){
                
                    
                if (document.querySelector('#play').innerHTML=="PAUSE"){
                document.getElementById("message").innerHTML=`<br>${card+1} ${cards[card]}`+ document.getElementById("message").innerHTML;  
                msg.text = `${cards[card]}`;
                
                // window.speechSynthesis.speak(msg);
                // } else {window.speechSynthesis.cancel(); newCard = card;}
                
                speaker.speak(msg);
            } else {
                speaker.cancel(); 
                newCard = card;}
            
            }, 1000*card);
        }
    
}

function shuffle(){
    if (document.querySelector('#play').innerHTML=="START"){
        cards.sort(function(){return 0.5 - Math.random()});
        card=0;document.getElementById("message").innerHTML="";
        document.getElementById("speed").innerHTML=speed;
    }
}

function buttonToggle(){
             if (document.querySelector('#play').innerHTML=="START"){document.querySelector('#play').innerHTML="PAUSE";}
        else if (document.querySelector('#play').innerHTML=="PAUSE"){document.querySelector('#play').innerHTML="CONTINUE";}
        else if (document.querySelector('#play').innerHTML=="CONTINUE"){document.querySelector('#play').innerHTML="PAUSE";}
}

function callCards(){
    if (document.querySelector('#play').innerHTML=="PAUSE"){
        document.getElementById("message").innerHTML=`<br>${card+1} ${cards[card]}`+ document.getElementById("message").innerHTML;  
        msg.text = `${cards[card]}`;
        speaker.speak(msg);
        if (card < 53){card++;
        }else{
            document.querySelector('#play').innerHTML="START";
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
