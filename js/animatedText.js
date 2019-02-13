$(document).ready(function(){
    setup();
});


function setup(){

    function animate(cont) {
        let rawtxt = cont.html();

        //Get the length of the string for use in loop
        console.log(rawtxt);
        let len = rawtxt.length;

        //empty string used to store final text that includes spans
        let newtext = '';


        //For each character inside #desText string (this is why we got length)
        for(let i = 0; i < len; i ++){

            //get a random num between 1 and 5
            let rng = Math.floor(Math.random() * 5) + 1;

            //get the i-th character from the string
            let currentchar = rawtxt.charAt(i);
            let newchar;
            if(currentchar == ' '){
                //if it's a space, add an empty .space span
                newchar = currentchar;//'<span class="space"></span>';
            }
            else{
                //otherwise, wrap it with a span, and give it class effectN, where N is a random int as before
                newchar = '<span class="effect' + rng + '">' + currentchar + '</span>';
            }
            //add this new "char" (actually it's a char with spans wrapping it) to the empty string
            newtext = newtext + newchar;
        }

        //replace #desText paragraphs inner HTML with the newly created string
        cont.html(newtext);
    }

    let passage1 = $('#desText1');
    let passage2 = $('#desText2');
    let passage3 = $('#desText3');
    let passage4 = $('#desText4');
    let passage5 = $('#desText5');
    let passage6 = $('#desText6');
    let passage7 = $('#desText7');
    let passage8 = $('#desText8');
    let passage9 = $('#desText9');
    let passage10 = $('#desText10');
    let passage11 = $('#desText11');
    let passage12 = $('#desText12');


    animate(passage1);
    animate(passage2);
    animate(passage3);
    animate(passage4);
    animate(passage5);
    animate(passage6);
    animate(passage7);
    animate(passage8);
    animate(passage9);
    animate(passage10);
    animate(passage11);
    animate(passage12);

}
