document.addEventListener('DOMContentLoaded', function(){   

// Szukanie elementów:

const playerBtn = document.querySelector('#btn-play-stop');
const bpmForm = document.querySelector('#form-bmp');
const bpmInput = document.querySelector('#form-bmp__input');
const bpmUp = document.querySelector('#btn-tempo__up');
const bpmDown = document.querySelector('#btn-tempo__down');

//___w tym pól tabeli__

//ins 1:
// const cells1inst = document.querySelectorAll([id]);

// id="i0p---"




// Funkcje startowe

function bpmToMms(bpm) {
    return (60000/bpm/2); // /2, gdyż idziemy po 8-kach a nie ćwierć nutach, dla 16-tek byłoby to dzielone na 4
}


// Podstawowe zmienne na start:

bpmInput.value = 125; // startowe bpm
let counter = 1; // do obsługi playHead
let toPlay = true; // do obsługi guzika playerBtn
let tempo = bpmInput.value; // tempo
let mms = bpmToMms(tempo);


//  Biblioteka dzięków (Howler)

const soundCrash = new Howl({src: ['../sound/crash.mp3']});
const soundHh = new Howl({src: ['../sound/hh.mp3']});
const soundKick = new Howl({src: ['../sound/kick.mp3']});
const soundSnare = new Howl({src: ['../sound/snare.mp3']});
const soundTom = new Howl({src: ['../sound/tom.mp3']});


// _____________ Obsługa zmiany tempa _________________ //

// enterem 

bpmForm.addEventListener('submit',function(ev){
    ev.preventDefault();
    tempo = bpmInput.value;
    mms = bpmToMms(tempo);

})

// klikiem na zewnątrz

bpmInput.addEventListener('blur',function(ev){
    ev.preventDefault();
    tempo = bpmInput.value;
    mms = bpmToMms(tempo);

})

// klikiem + 
bpmUp.addEventListener('click',function(){
    bpmInput.value = Number(bpmInput.value) + 5;
    tempo = bpmInput.value;
    mms = bpmToMms(tempo);
})



// klikiem - 
bpmDown.addEventListener('click',function(){
    bpmInput.value = Number(bpmInput.value) - 5;
    tempo = bpmInput.value;
    mms = bpmToMms(tempo);

})




// _____________ Obsługa klawiszy _______________ //

function keyPressed(ev) {

    const keyTable = {
        99    : soundCrash,    // 99 - c
        104   : soundHh,       // 104 - h
        116   : soundTom,      // 116 - t
        115   : soundSnare,    // 115 - s 
        107   : soundKick      // 107 - k 
    };
        
    if (keyTable[ev.charCode]!== undefined) {
        keyTable[ev.charCode].play();
    } else {
        console.log ( 'nieobsługiwany' );
    }
}

document.addEventListener('keypress',keyPressed);

// _____________ Obsługa timelineu _______________ //

const timeline = [
    [0,0,0,0,0,0,0,0], // crash
    [1,1,1,1,1,1,1,1], // hh
    [0,0,0,0,0,0,0,1], // tom
    [0,0,1,0,0,0,1,0], // snare
    [1,0,0,1,1,0,0,0], // kick
]

// _____________ Obsługa głowicy ____________ //

function playMusic() {
        if (timeline[0][counter-1] != 0) { soundCrash.play();}  // inst 1
        if (timeline[1][counter-1] != 0) { soundHh.play();}     // inst 2
        if (timeline[2][counter-1] != 0) { soundTom.play();}    // inst 3
        if (timeline[3][counter-1] != 0) { soundSnare.play();}  // inst 4    
        if (timeline[4][counter-1] != 0) { soundKick.play();}  // inst 5        
        
        counter++;
        
        if (counter === 9) {
            counter = 1;
        }
    
}

// _________ Obsługa guzika play / stop ________ //

let timelineTravers = false;

function chooseMusic(ev) {

    if(timelineTravers !== false) {
        clearInterval(timelineTravers);
        timelineTravers = false;
        counter = 1;
    } else {
        timelineTravers = setInterval(playMusic, mms);
    }

    toPlay = false;        
}


playerBtn.addEventListener('click', chooseMusic);


// __________ Obsługa boardu.... ______________

// on / off kwadratu
// budowanie tablicy na podstawie kwadratów 






















}) 



// --------- KOD OBIEKTU


// function PlayHead(tempo) {
//     this.tempo = tempo;
//     this.counter = 1;
//     this.timeLine = [
//         [1,0,0,0,0,0,0,0], // crash
//         [1,1,1,1,1,1,1,1], // hh
//         [0,0,0,0,0,0,0,1], // tom
//         [0,0,1,0,0,0,1,0], // snare
//         [1,0,0,1,1,0,0,0], // kick
//     ]
//     this.start = setInterval(function () {
//         console.log ( this );

//             if (this.timeline[0][this.counter-1] != 0) { soundCrash.play();}  // inst 1
//             if (this.timeline[1][this.counter-1] != 0) { soundHh.play();}     // inst 2
//             if (this.timeline[2][this.counter-1] != 0) { soundTom.play();}    // inst 3
//             if (this.timeline[3][this.counter-1] != 0) { soundSnare.play();}  // inst 4    
//             if (this.timeline[4][this.counter-1] != 0) { soundKick.play();}  // inst 5        
            
//             this.counter++;
            
//             if (this.counter === 9) {
//                 this.counter = 1;
//             }
//         }, this.tempo
//     )
        
//     this.stop = function(){
//         clearInterval(this.start);
//     }

    
//   };

// const playewew = new PlayHead(300);

// playewew.start();


