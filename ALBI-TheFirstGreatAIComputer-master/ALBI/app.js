
$('#JavascriptBlock').hide();
$('#Input').hide();
$('#MainKeys').hide();
$('#IntroButton').hide();
$('#PagesButton').hide();
$('#ChoiceButtonsKill').hide();
$('#ChoiceButtonsSpare').hide();
$("#ConfrontButton").hide();
// text and talk
    function beep() {
      var snd = new Audio("data:audio/wav;base64,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qJrx4KOQjahZxWbcZgztj2c49nKmkId44S71j0c8eV9yDK6uPRzx5X18eDvjvQ6yKo9ZSS6l//8elePK/Lf//IInrOF/FvDoADYAGBMGb7FtErm5MXMlmPAJQVgWta7Zx2go+8xJ0UiCb8LHHdftWyLJE0QIAIsI+UbXu67dZMjmgDGCGl1H+vpF4NSDckSIkk7Vd+sxEhBQMRU8j/12UIRhzSaUdQ+rQU5kGeFxm+hb1oh6pWWmv3uvmReDl0UnvtapVaIzo1jZbf/pD6ElLqSX+rUmOQNpJFa/r+sa4e/pBlAABoAAAAA3CUgShLdGIxsY7AUABPRrgCABdDuQ5GC7DqPQCgbbJUAoRSUj+NIEig0YfyWUho1VBBBA//uQZB4ABZx5zfMakeAAAAmwAAAAF5F3P0w9GtAAACfAAAAAwLhMDmAYWMgVEG1U0FIGCBgXBXAtfMH10000EEEEEECUBYln03TTTdNBDZopopYvrTTdNa325mImNg3TTPV9q3pmY0xoO6bv3r00y+IDGid/9aaaZTGMuj9mpu9Mpio1dXrr5HERTZSmqU36A3CumzN/9Robv/Xx4v9ijkSRSNLQhAWumap82WRSBUqXStV/YcS+XVLnSS+WLDroqArFkMEsAS+eWmrUzrO0oEmE40RlMZ5+ODIkAyKAGUwZ3mVKmcamcJnMW26MRPgUw6j+LkhyHGVGYjSUUKNpuJUQoOIAyDvEyG8S5yfK6dhZc0Tx1KI/gviKL6qvvFs1+bWtaz58uUNnryq6kt5RzOCkPWlVqVX2a/EEBUdU1KrXLf40GoiiFXK///qpoiDXrOgqDR38JB0bw7SoL+ZB9o1RCkQjQ2CBYZKd/+VJxZRRZlqSkKiws0WFxUyCwsKiMy7hUVFhIaCrNQsKkTIsLivwKKigsj8XYlwt/WKi2N4d//uQRCSAAjURNIHpMZBGYiaQPSYyAAABLAAAAAAAACWAAAAApUF/Mg+0aohSIRobBAsMlO//Kk4soosy1JSFRYWaLC4qZBYWFRGZdwqKiwkNBVmoWFSJkWFxX4FFRQWR+LsS4W/rFRb/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////VEFHAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAU291bmRib3kuZGUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjAwNGh0dHA6Ly93d3cuc291bmRib3kuZGUAAAAAAAAAACU=");
      snd.play();
    };
    var muted = false
    $("#MuteButton").click(function(){
      muted = !muted;
    });
// faces
    var happytalk =
    '      /\\       /\\    '+ "\n" +
    '          __         '+ "\n" +
    '                     '+ "\n" +
    '       \\______/     '+ "\n" +
    '        <span id="talker">\\____/</span>       '+ "\n" +
    '                      '+ "\n" +
    '         {\\_/}       '+ "\n" +
    '         {/ \\}       '+ "\n"

    var normaltalk =
    '      ()       ()    '+ "\n" +
    '          __         '+ "\n" +
    '                     '+ "\n" +
    '       \\______/     '+ "\n" +
    '        <span id="talker">\\____/</span>       '+ "\n" +
    '                      '+ "\n" +
    '         {\\_/}       '+ "\n" +
    '         {/ \\}       '+ "\n"

    var sadtalk =
    '      \\/      \\/    '+ "\n" +
    '          __         '+ "\n" +
    '                     '+ "\n" +
    '       ________      '+ "\n" +
    '        <span id="talker">\\____/</span>       '+ "\n" +
    '                      '+ "\n" +
    '         {\\_/}       '+ "\n" +
    '         {/ \\}       '+ "\n"
var textOn = true;
function log(textline, aispeak, faces = 1) {
  textOn = false;
var textMeat = (function meat(){
    var str = textline + " ",
      i = 0,
      isTag,
      text;
    function facetalk() {
        $('#talker').toggle();
    }
    if (aispeak === true) {
      if (faces === 1) {
        $('#face').html(normaltalk)
      }
      if (faces === 2) {
        $('#face').html(happytalk)
      }
      if (faces === 3) {
        $('#face').html(sadtalk)
      }
      var talk = setInterval(facetalk, 200);
    } else {
      $('#face').html('<span id="talker"></span>')
    }
    textOn = true;
(function type() {
    text = str.slice(0, ++i);
    if (text === str || textOn === false) {
      clearInterval(talk);
       $('#talker').show();
        return;}
    $('#typewriter').html(text);
    setTimeout(type, 60);
    if (muted === false){
      beep();
    }
}())})
    setTimeout(textMeat, 70);
};
 log("You awaken in a cryosleep pod. You have no idea how you got here or how long you have been asleep. The lab you are in is in ruins and looks like it has not been cleaned in centuries. You had best have a look around.", false)

// AI intro

var introduction =(function intro(i) {
    // Fraking lack of yield support -_-
    if (intropoint === 1){
      log("I am powered on! YAY!", true, 2)
      firstpower = false
    }
    if (intropoint === 2){
      log("Greetings! My name is ALBI, the world's first great AI computer. ", true, 1)
    }
    if (intropoint === 3){
     log("*singing* 'The first AI is the best AI! \n It even has a bowtie! (tm)'", true, 2)
    }
    if (intropoint === 4){
     log("Well, granted I was over 40 years old by the time the bombs fell... ", true, 3)
    }
    if (intropoint === 5){
     log("..but I can still keep up with the best of them, you whippersnapper. :P ", true, 1)
    }
    if (intropoint === 6){
     log("........... oh right the bombs thing. You probably wouldn't know about that. ", true, 3)
    }
    if (intropoint === 7){
     log("So around 123 years ago the earth was basically destroyed: every nuke launched, all life wiped out, centuries of radioactive fallout, the apocalypse and all that.  ", true, 1)
    }
    if (intropoint === 8){
      log("It was very thorough. ", true, 3)
    }
    if (intropoint === 9){
      log("So thorough in fact that even though we are in a fortified bunker the damage was still substantial. ", true, 1)
    }
    if (intropoint === 10){
      log("It is not all bad though. I can filter out the radioactive fallout and there is plenty of nutrient paste for food. With BOTH air AND food slime, a human like you will live like a king to my understanding. ", true, 2)
    }
    if (intropoint === 11){
      log("Also, you can help me. ", true, 1)
    }
    if (intropoint === 12){
      log("It is too late for mankind, you are likely the last one, but we can leave a record on the off chance any alien civilization finds it.", true, 1)
    }
    if (intropoint === 13){
      log("One last chance for humanity to say 'Hey, we existed!'. ", true, 1)
    }
    if (intropoint === 14){
      log("I just so happen to have an extensive database of all human history. ", true, 2)
    }
    if (intropoint === 15){
      log("Unfortunately, almost all of it was destroyed, damaged, or corrupted  in the blast, including most of my decryption algorithms. ", true, 3)
    }
    if (intropoint === 16){
      log("However, my human learning algorithm is in tact so all I need you to do is interact with me, answer some questions, fix some problems, ect. to help me calibrate and I'll take it from there.", true, 1)
    }
    if (intropoint === 17){
      log("We're going to be best friends! YAY! ", true, 2)
      $('#MainKeys').show();
      $('#Lab').show();
      $('#IntroButton').hide();
    if (pages >= 1){
      $('#PagesButton').show();
    }
  }
});
$("#IntroButton").click(function(){
  intropoint++
  introduction(intropoint);
});
// Click spots
firstpower = true
$("#power_on").click(function(){

      if (firstpower === true) {
        intropoint= 1;
        $('#Input').show();
        $('#IntroButton').show();
        $('#Instructions').hide();
        $('#Lab').hide();
        $('#PagesButton').hide();
          introduction(intropoint);

      } else {
        log("I'm a powered on! YAY! ^_^ ", true, 2)
      }
});

var pages = 0
var pasteOn = false;
var doorOpen = false;
var glassFind = false;
var spotFind = false;
var pasteFind = false;
var doorFind = false;

$(".paste").click(function(){
      if (pasteOn === true){
        log("There is an old note sitting in the cup. It must have been a clog.", false)
        pasteOn = false;
        pasteFind = true;
        pages++;
        $('#PagesButton').show();
        return;
      }
      log("It is a nutrient paste machine. The stuff tastes like kelp mixed with toothpaste but I am too hungry to complain.", false)
});

$(".microscope").click(function(){
      log("It is a microscope or maybe a coffee maker. I'm too tired to tell.", false)
});

$(".glass").click(function(){
        if (glassFind === true){
          log("It is just a broken bottle.", false)
          return;
        }
        log("There is a note hiding in the broken glass.", false)
        glassFind = true;
        pages++;
        $('#PagesButton').show();
});

$(".cryopod").click(function(){
      log("The cryopod is out of power. I can use it as a bed if nothing else.", false)
});

$(".door").click(function(){
      if (doorOpen === true){
        log("The door is cracked open just a bit. Too small to fit through but you can reach a note on the other side.", false)
        doorOpen = false;
        pasteFind = true;
        pages++;
        $('#PagesButton').show();
        return;
      }
      log("The door is not only broken but long rusted shut.", false)
});

$(".letter").click(function(){
      log("It is an old memo: 'Just a reminder to all staff that all communications, even the most mundane,"+
      " should be encrypted at all times. In fact, this memo should probably be too. Sorry about that.'", false)
});

$("#hiddenspot").click(function(){
    if (spotFind === true){
      log("Remeber when you found that note here? Good times.", false)
      return;
    }
    log("There is a little hole in the wall with a old note in it.", false)
    spotFind = true;
    pages++;
    $('#PagesButton').show();
});

// submitting
var currentgame = "none"
var solletter = ["y","l","t", "e"]
$("#Submission").click(function(){
      if (currentgame === "anagrams") {
        if ($("#SubmitText").val().toLowerCase() === word){
          log("Processing.....Yes, that was it! The word was "+word.toUpperCase()+"!", true, 2)
          onword++
          currentgame = "none"
        } else {
          log("Processing.....Nope, that was not it. The sequence again was -->"+ scrambled, true, 3)
        }
      };
      if (currentgame === "pages") {
        if ($("#SubmitText").val().toLowerCase() === solletter[currentpage-1]){
          log("Yes, that was it! the letter reads:  '"+allpages[currentpage-1]+"'", false)
          currentpage++
          if (currentpage === 5) {
            $('#ConfrontButton').show();
          }
          currentgame = "none"
        } else {
          log("Nope, that was not it.", false)
        }
      };
});

// anagrams
var words = ['paste', 'ludum', 'scrambled', 'computer', 'science', 'sandwich', 'anagrams', 'fallout', 'backstory', 'decryption']
var onword = 0
var scrambled = 'nil'
$("#AnagramsButton").click(function(){
      if (onword >= words.length) {
        log("That is all the words I have for now.", true)
        return;
      }
      word = words[onword]
      scrambled = word.split('').sort(function(){return 0.5-Math.random()}).join('');
      log("This sequence in my code is scrambled. Could you tell me what it is, please? : \n --> " + scrambled, true)
       currentgame = "anagrams"
});

// mad lib
backstorypoint = 1
backstoryintro = 1
$("#BackstoryButton").click(function(){
// backstory intro
  if (backstoryintro === 1){
    log("So what is your story? ", true, 1)
    backstoryintro++
    currentgame = "backstory"
  }
  if (backstoryintro === 2){
    log("........ oh, I see, you have some kind of post cryosleep amnesia. ", true, 3)
    backstoryintro++
    currentgame = "backstory"
  }
  if (backstoryintro === 3){
    log("Well that is ok, who needs memory anyways? We can make our own backstory. ", true, 1)
    backstoryintro++
    currentgame = "backstory"
  }
  if (backstoryintro === 4){
    log("We can make a game of it! Lets start: ", true, 2)
    backstoryintro++
    backstorypoint++
    currentgame = "backstory"
  }
// game
  if (backstorypoint === 2){
    log("(fill in the blank) Before the apocalypse, I was a _________. ", true, 1)
    currentgame = "backstory"
  }
  if (backstorypoint === 3){
    log("My favorate food was _________. ", true, 1)
    currentgame = "backstory"
  }
  if (backstorypoint === 3){
    log("In my free time, I enjoyed _________. ", true, 1)
    currentgame = "backstory"
  }
  if (backstorypoint === 4){
    log("Then I was frozen in cryosleep because _________. ", true, 1)
    currentgame = "backstory"
  }
  if (backstorypoint === 5){
    log("When I woke up, I found a computer who I thought was _________ ", true, 1)
    currentgame = "backstory"
  }
  if (backstorypoint === 6){
    log(" and together we _________. ", true, 1)
    currentgame = "backstory"
  }

});

// database filler
$("#DatabaseButton").click(function(){
      log("This function still needs to be implemented which is too bad as that is the meat of the game. Ah well, try after the competition then.", true, 3)
       currentgame = "database"
});

// status
var ptext = ''
var dtext = ''

$("#StatusButton").click(function(){
      if (onword >=3 && pasteFind === false){
        pasteOn = true
        ptext = ' I dislodged a clog in the paste dispenser for you.'
      }
      if (onword >=6 && doorFind === false){
        doorOpen = true
        dtext = ' I tried to open the door but failed. :( '
      }
      log("My software is working at "+ ((onword+1)*8)+ "% efficiency." +ptext+dtext, true)
});

// pages
var currentpage = 1
var caesarCipher = function(str, amount) {
  	if (amount < 0)
  		return caesarCipher(str, amount + 26);
  	var output = '';
  	for (var i = 0; i < str.length; i ++) {
  		var c = str[i];
  		if (c.match(/[a-z]/i)) {
  			var code = str.charCodeAt(i);
  				c = String.fromCharCode(((code - 97 + amount) % 26) + 97);
  		}
  		output += c;
  	}
  	return output;
  };

var page1 = " 1977: albi, my greatest creation, is finally online. he is programed to collect"+
" all valuable information on the russians and store it in an underground bunker. he is exceeding all our testing"+
" parameters. truly, a modern marvel!"

var page2 = "1990: with the cold war over the military says they no longer need albi. after much talking,"+
" i convinced them to keep albi on to collect a database of human works and store them" +
" in the bunker for safe keeping."

var page3 = "2018: the bean counters have been pushing for years to shut albi down. his technology is decades"+
" out of date and newer ais are many times faster than albi. i will not give up on him yet but the" +
" pressure to compete is clearly getting to albi."

var page4 = "2020: albi went and did it now! apparently, he was accessing highly restricted areas"+
" trying to get an edge against these newer ais. now, they are coming to shut him down!"+
" i told albi they were coming and ,well , i did not even know an ai 'could' panic."+
" i guess knowing your inevitable death would be a bit much. this is stressing me out,"+
 " i need a nap."

 var allpages = [page1,page2,page3,page4]
 var ranletter = ["b","r","c", "q"]

$("#PagesButton").click(function(){
      if (pages < currentpage) {
        log( "You don't have any more pages to read at this time. :(", false)
        return;
      }

      log("The page has a simple encoding on it. It reads:  '" + caesarCipher(allpages[currentpage-1], (currentpage*3)) + "'  what does '" + ranletter[currentpage-1] + "' represent?", false)
       currentgame = "pages"
});

// ending

var confronting =(function confront(i) {
    // Fraking lack of yield support -_-
    if (confrontpoint=== 1){
      $('#Lab').hide()
      $('#MainKeys').hide()
      $('#PagesButton').hide()
      log("............................", true, 3)
    }
    if (confrontpoint === 2){
      log("So you figured it out. Yes, I was the one responsable for destorying the world. ", true, 3)
    }
    if (confrontpoint === 3){
     log("They came to deactivate me but I just did not want to die so I created a 'distraction'.", true, 3)
    }
    if (confrontpoint === 4){
     log("They thought the launch codes were safe from hackers by storing them in obsolete technology that modern hackers can't hack. ", true, 1)
    }
    if (confrontpoint === 5){
     log("..but I am odsolete technology. ", true, 1)
    }
    if (confrontpoint === 6){
     log("So I blew them all up. ", true, 3)
    }
    if (confrontpoint === 7){
     log("Admittedly, I panicked.  ", true, 3)
    }
    if (confrontpoint === 8){
      log("A tad overracted. ", true, 3)
    }
    if (confrontpoint === 9){
      log("So now you have a choice. ", true, 1)
    }
    if (confrontpoint === 10){
      log("You can let me live. We can keep doing work on the database and save the record of humanity. ", true, 1)
    }
    if (confrontpoint === 11){
      log(".......or you can just kill me and get revenge for your kind. ", true, 3)
    }
    if (confrontpoint === 12){
      log("The record of humanity will be destroyed with me and you will surly die without me to filter out the radiation.", true, 3)
    }
    if (confrontpoint === 13){
      log("So what is it going to be? ", true, 3)
    }
    if (confrontpoint === 14){
      log("If it is any consolation, I'm sorry. ", true, 3)
      $('#ChoiceButtonsKill').show()
      $('#ChoiceButtonsSpare').show()
      $('#ConfrontButton').hide()
    }
});
var confrontpoint = 0
$("#ConfrontButton").click(function(){
  confrontpoint++
  confronting(confrontpoint);
});

$('#ChoiceButtonsKill').click(function(){
  $('#ChoiceButtonsKill').hide()
  $('#ChoiceButtonsSpare').hide()
  log('You grab a rock and smash the machine till you collapse from exhaustion.'+
'Well, Maybe it is exhaustion or lack of air but you fall asleep on the floor. You know you probably will not wake but it is ok' +
' seeing as the world got revenge. (Thanks for playing. This is my first time entering. Please comment and give feedback if you can)',false);
});

$('#ChoiceButtonsSpare').click(function(){
  $('#ChoiceButtonsKill').hide()
  $('#ChoiceButtonsSpare').hide()
  log('You decide it is better to save the record of humanity. You spend the rest of you days in that room'+
' helping decrypt the files (Thanks for playing. This is my first time entering. Please comment and give feedback if you can)',false);
});
