document.addEventListener('DOMContentLoaded', function(){

// **************************************************************
// ******** Mapowanie instrumentów -->
// **************************************************************

const drmSnd = {
    'snare'             : 'c/5',
    'snare cross stic'  : 'c/5/x1',
    'hh pedal'          : 'd/4/x1',
    'hh close'          : 'g/5/x1',
    'hh open'           : 'g/5/x3',
    'tom1'              : 'e/5/x3',
    'tom2'              : 'd/5/x3',
    'tom3'              : 'a/4/x3',
    'kick'              : 'f/4',
    'ride1'             : 'f/5/d3', // podobno można jakoś uzykać trójkącik
    'ride2'             : 'f/5/x2', // podobno można jakoś uzykać trójkącik
    'crash1'            : 'a/5/x1',
    'crash2'            : 'a/5/x2',
    'crash3'            : 'a/5/x3',
};

// HAHA!!! to są modyfikatory nut:
// 'D0': { code: 'v27', shift_right: -0.5 },
// 'D1': { code: 'v2d', shift_right: -0.5 },
// 'D2': { code: 'v22', shift_right: -0.5 },
// 'D3': { code: 'v70', shift_right: -0.5 },

// /* Triangle */
// 'T0': { code: 'v49', shift_right: -2 },
// 'T1': { code: 'v93', shift_right: 0.5 },
// 'T2': { code: 'v40', shift_right: 0.5 },
// 'T3': { code: 'v7d', shift_right: 0.5 },

// /* Cross */
// 'X0': { code: 'v92', shift_right: -2 },
// 'X1': { code: 'v95', shift_right: -0.5 },
// 'X2': { code: 'v7f', shift_right: 0.5 },
// 'X3': { code: 'v3b', shift_right: -2 },

// **************************************************************
// ********  Przykład nr 1 -->
// **************************************************************

/*
    Pojedyńczy Voice, uderzenia w tym samym czasie zrobione metodą "na akord":
*/

function exm1() {

    // Tworzymy kontekst

        var VF = Vex.Flow;
        var div = document.getElementById("boo")
        var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
        renderer.resize(700, 300);
        var context = renderer.getContext();
        context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
        var stave = new VF.Stave(50, 50, 350);
        stave.addClef("percussion").addTimeSignature("4/4");
        stave.setContext(context).draw();

    // Dodajemy nuty



    var notes = [
        new VF.BarNote({ type: 'single' }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['ride1'], drmSnd['kick']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['snare']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.BarNote({ type: 'single' }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['kick']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['snare']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.BarNote({ type: 'single' }),
    ];

    // Create a voice in 4/4 and add above notes
    var voice = new VF.Voice({num_beats: 4,  beat_value: 4});
    //   voice.setStrict(false);
    voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 300);

    // Render voice
    voice.draw(context, stave);

    };

exm1();


// **************************************************************
// ********  Przykład nr 2 -->
// **************************************************************

/*
    Dodajemy kolejny "voice" / Zestaw nut + wstawiamy opis (L / R)
*/


function exm2() {

    // Tworzymy kontekst

    var VF = Vex.Flow;
    var div = document.getElementById("boo2")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(700, 300);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    var stave = new VF.Stave(50, 50, 700);
    stave.addClef("percussion").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Dodajemy nuty

    var notes = [
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['kick']], duration: "8" }).
        addAnnotation(0, new Vex.Flow.Annotation('R')),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['snare']], duration: "8" }).
        addAnnotation(0, new Vex.Flow.Annotation('L')),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['kick']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close'], drmSnd['snare']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
    ];

    let notes2 = [
        new VF.StaveNote({clef: "percussion", keys: ['b/4'], duration: "8r" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh pedal']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: ['b/4'], duration: "8r" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh pedal']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: ['b/4'], duration: "8r" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh pedal']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: ['b/4'], duration: "8r" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh pedal']], duration: "8" }),
    ]

    // Create a voice in 4/4 and add above notes
    var voices = [
        new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes),
        new VF.Voice({num_beats: 4,  beat_value: 4}).addTickables(notes2)
    ];

    //   voice.setStrict(false);
    // voice.addTickables(notes);

    // Format and justify the notes to 400 pixels.
    var formatter = new VF.Formatter().joinVoices(voices).format(voices, 400);

    // Render voice
    voices.forEach(function(v) { v.draw(context, stave); })

};

exm2();

// **************************************************************
// ********  Przykład nr 3 -->
// **************************************************************

/*
    Łączymy nuty
*/

function exm3() {

    // Tworzymy kontekst

    var VF = Vex.Flow;
    var div = document.getElementById("boo3")
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(700, 300);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    var stave = new VF.Stave(50, 50, 700);
    stave.addClef("percussion").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Dodajemy nuty

    var notes = [
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
    ];

    let notes2 = [
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['kick']], duration: "4" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['snare']], duration: "4" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['kick']], duration: "4" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['snare']], duration: "4" })
    ]

    // Create a beam for each group of notes
    const beams = [
        new VF.Beam(notes),
        // new VF.Beam(notes2)
    ]

    // Render the notes followed by the beams
    var all_notes = notes.concat(notes2);


    Vex.Flow.Formatter.FormatAndDraw(context, stave, all_notes);
    beams.forEach(function(b) {b.setContext(context).draw()})


}

exm3();



// **************************************************************
// ********  Przykład nr 4 -->
// **************************************************************

/*
    Łączymy nuty automatycznie
*/

function exm4(elementToAttach) {

    // Tworzymy kontekst

    var VF = Vex.Flow;
    var div = document.getElementById(elementToAttach)
    var renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);
    renderer.resize(700, 300);
    var context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    var stave = new VF.Stave(50, 50, 700);
    stave.addClef("percussion").addTimeSignature("4/4");
    stave.setContext(context).draw();

    // Dodajemy nuty

    var notes = [
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
        new VF.StaveNote({clef: "percussion", keys: [drmSnd['hh close']], duration: "8" }),
    ];


    var beams = VF.Beam.generateBeams(notes);
    Vex.Flow.Formatter.FormatAndDraw(context, stave, notes);
    beams.forEach(function(b) {b.setContext(context).draw()})

}

exm4('boo4');



})
