document.addEventListener('DOMContentLoaded', function(){   

// Szukanie elementów:

const playerBtn = document.querySelector('#btn-play-stop');
const bpmForm = document.querySelector('#form-bmp');
const bpmInput = document.querySelector('#form-bmp__input');
const bpmUp = document.querySelector('#btn-tempo__up');
const bpmDown = document.querySelector('#btn-tempo__down');
const allCells = document.querySelector('.tabs-table');


const cellsColums = [
    document.querySelectorAll('[data-x="0"]'),
    document.querySelectorAll('[data-x="1"]'),
    document.querySelectorAll('[data-x="2"]'),
    document.querySelectorAll('[data-x="3"]'),
    document.querySelectorAll('[data-x="4"]'),
    document.querySelectorAll('[data-x="5"]'),
    document.querySelectorAll('[data-x="6"]'),
    document.querySelectorAll('[data-x="7"]')
]

const keyboardKeys = document.querySelectorAll('[id^=btn-key-]');
// console.log ( keyboardKeys );

const instrumentsBtns = document.querySelectorAll('[id^=btn-inst]');


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

const soundCrash = new Howl({src: ['sound/crash.mp3'],volume: 0.4});
const soundHh = new Howl({src: ['sound/hh.mp3'],volume: 1});
const soundKick = new Howl({src: ['sound/kick.mp3']});
const soundSnare = new Howl({src: ['sound/snare.mp3']});
const soundTom = new Howl({src: ['sound/tom.mp3']});

// brzydkie ... inicjacja volumenu
let soundCrashFlag = 'on';
let soundHhFlag = 'on';
let soundKickFlag = 'on';
let soundSnareFlag = 'on';
let soundTomFlag = 'on';


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
    // ev.preventDefault();

    const keyTable = {
        99    : soundCrash,    // 99 - c
        104   : soundHh,       // 104 - h
        116   : soundTom,      // 116 - t
        115   : soundSnare,    // 115 - s 
        107   : soundKick      // 107 - k 
    };

    // toglowanie koloru na keyboardzie
    function whatToToggle (keyNb) {
        keyboardKeys[keyNb].classList.toggle('tabs__btn--key-active');
        setTimeout(function () {
            keyboardKeys[keyNb].classList.toggle('tabs__btn--key-active')
        }, 400);
        console.log ( keyNb );
    }

    // const keyTablePressed = {
    //     99    : whatToToggle(0),    // 99 - c
    //     104   : whatToToggle(1),       // 104 - h
    //     116   : whatToToggle(2),      // 116 - t
    //     115   : whatToToggle(3),    // 115 - s 
    //     107   : whatToToggle(4)      // 107 - k 

    // };
        
    if (keyTable[ev.charCode]!== undefined) {
        keyTable[ev.charCode].play();
        
        // to powino działać, a nie działa... :( doweidzieć się dlaczego - już wiem dlaczego...
        // bo wywołuję funkcj w zmiennej / tabeli keyTablePressed....
        // keyTablePressed[ev.charCode];

        // brzydkie rozwiązanie:
        
        if (ev.charCode === 99) {
            whatToToggle(0);
        } else if (ev.charCode === 104){
            whatToToggle(1);
        } else if (ev.charCode === 116){
            whatToToggle(2);
        } else if (ev.charCode === 115){
            whatToToggle(3);
        } else if (ev.charCode === 107){
            whatToToggle(4);
        }
        

    } else {
        console.log ( 'nieobsługiwany' );
    }
}

/* Oval: */

document.addEventListener('keypress',keyPressed);

// _____________ Obsługa timelineu _______________ //

const timeline = [
    [0,0,0,0,0,0,0,0], // crash
    [1,1,1,1,1,1,1,1], // hh
    [0,0,0,0,0,0,0,0], // tom
    [0,0,1,0,0,0,1,0], // snare
    [1,0,0,0,1,0,0,0], // kick
]

// _____________ Obsługa głowicy ____________ //

function playMusic() {
        if (timeline[0][counter-1] != 0) { soundCrash.play();}  // inst 1
        if (timeline[1][counter-1] != 0) { soundHh.play();}     // inst 2
        if (timeline[2][counter-1] != 0) { soundTom.play();}    // inst 3
        if (timeline[3][counter-1] != 0) { soundSnare.play();}  // inst 4    
        if (timeline[4][counter-1] != 0) { soundKick.play();}  // inst 5        
        
        
        // Zaznaczanie kolumny na której znajduje się playhead
        
    
        for (let i=0;i<cellsColums[counter-1].length;i++) {
            cellsColums[counter-1][i].innerHTML = '<div class="playheadActive"></div>' ;
        } 
        if (counter!=1) {
            for (let i=0;i<cellsColums[counter-2].length;i++) {
                cellsColums[counter-2][i].innerHTML = '' ;
            }   
        } else {
            for (let i=0;i<cellsColums[counter+6].length;i++) {
                cellsColums[counter+6][i].innerHTML = '' ;
            }
        }


        // for (let i=0;i<cellsColums[counter-1].length;i++) {
        //     cellsColums[counter-1][i].innerText = 'x' ;
        // } 
        // if (counter!=1) {
        //     for (let i=0;i<cellsColums[counter-2].length;i++) {
        //         cellsColums[counter-2][i].innerText = '' ;
        //     }   
        // } else {
        //     for (let i=0;i<cellsColums[counter+6].length;i++) {
        //         cellsColums[counter+6][i].innerText = '' ;
        //     }
        // }



        counter++;
        
        if (counter === 9) {
            counter = 1;
        }
    
}

// _________ Obsługa guzika play / stop ________ //

let timelineTravers = false;

function chooseMusic(ev) {
    ev.preventDefault();

    if(timelineTravers !== false) {
        clearInterval(timelineTravers);
        timelineTravers = false;
        counter = 1;
    } else {
        timelineTravers = setInterval(playMusic, mms);
    }

    toPlay = false;        
    // czyszczenie głowicy (bo zostawała widoczna)

    for (var i=0;i<cellsColums.length;i++) {
        for (var j=0;j<cellsColums[i].length;j++) {
            cellsColums[i][j].innerHTML = '' ;
        }
    }

    //zmiana ikonki pause / play
    this.classList.toggle('controls-pause');



}


playerBtn.addEventListener('click', chooseMusic);


// __________ Obsługa boardu.... ______________

// Render startowego stanu boardu:



for (let i=0;i<timeline.length;i++) {
    for (let j=0;j<timeline[i].length;j++) {
        let statusStart = timeline[i][j];        
        
        if (statusStart===1) {
            // to jest też słabe bo szukam po ID a nie po data secie - nalealby to przerobć na data set jakoś
            document.querySelector(`#x${j}y${i}`).classList.add('tabs-table__cell--active');            
        }
    }
}



// on / off kwadratu na boardzie (click)

allCells.addEventListener('click',function(ev){
    ev.preventDefault();

    
    if (ev.target.id.includes('x')) {
        // zasadniczo nie jest najlepsze bo jeśli inny id będzie zawierał x to się też złapie...


        ev.target.dataset.active = '1'; 
        ev.target.classList.toggle('tabs-table__cell--active')

        const cellId = ev.target.getAttribute('id');
        // console.log ( cellId );
        const yCord = Number(cellId.charAt(3)); //też słabe - jeśłi będzie więcej niż 1 cyfra (np. 10) - czyli więcej ytaktów to się sypnie
        const xCord = Number(cellId.charAt(1));

        console.log ( `Y: ${yCord}  X: ${xCord} ` ); 
        console.log ( timeline[yCord][xCord] );

        if (timeline[yCord][xCord] === 0) {
            timeline[yCord][xCord] = 1;
        } else {
            timeline[yCord][xCord] = 0;
        }
    }
})


// Obsługa MUTE instrumentu:

for (let i=0;i<instrumentsBtns.length;i++) {
   
    instrumentsBtns[i].addEventListener('click', function(ev) {
        this.classList.toggle('tabs__btn--icon-notactive');

    
        
        if (this.id === 'btn-inst1' && soundCrashFlag === 'on') {
            soundCrash.volume(0);
            soundCrashFlag = 'off'
        } else if (this.id === 'btn-inst1' && soundCrashFlag === 'off') {
            soundCrash.volume(0.4);
            soundCrashFlag = 'on'
        }

        if (this.id === 'btn-inst2' && soundHhFlag === 'on') {
            soundHh.volume(0);
            soundHhFlag = 'off'
        } else if (this.id === 'btn-inst2' && soundHhFlag === 'off') {
            soundHh.volume(1);
            soundHhFlag = 'on'
        }

        if (this.id === 'btn-inst3' && soundTomFlag === 'on') {
            soundTom.volume(0);
            soundTomFlag = 'off'
        } else if (this.id === 'btn-inst3' && soundTomFlag === 'off') {
            soundTom.volume(1);
            soundTomFlag = 'on'
        }

        if (this.id === 'btn-inst4' && soundSnareFlag === 'on') {
            soundSnare.volume(0);
            soundSnareFlag = 'off'
        } else if (this.id === 'btn-inst4' && soundSnareFlag === 'off') {
            soundSnare.volume(1);
            soundSnareFlag = 'on'
        }



        if (this.id === 'btn-inst5' && soundKickFlag === 'on') {
            soundKick.volume(0);
            soundKickFlag = 'off'
        } else if (this.id === 'btn-inst5' && soundKickFlag === 'off') {
            soundKick.volume(1);
            soundKickFlag = 'on'
        }

      
        
        
    })
}



// let ;
// let  = 'on';
// let soundKickFlag = 'on';
// let soundSnareFlag = 'on';
// let soundTomFlag = 'on';













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


