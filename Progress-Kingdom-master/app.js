
$('#UselessButton').hide();
$('#PauseButton').hide();
$('#MusicButton').hide();
$('#LogButton').hide();
$('#Clicks').hide();
$("#WoodLabel").hide();
$("#FishLabel").hide();
$("#FaithLabel").hide();
$("#DrunksLabel").hide();
$("#BooksLabel").hide();
$("#KnickKnacksLabel").hide();
$("#ManaLabel").hide();
$('#JavascriptBlock').hide();
$('#Status').hide();
$('#FullLog').hide();
// $('#ZoomButton').hide();
// $('#CheatButton').hide();

//cookie functions
function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        };
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        };
    };
    return 0;
};

function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays*24*60*60*1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
};

function deleteAllCookies() {
    var cookies = document.cookie.split(";");

    for (var i = 0; i < cookies.length; i++) {
        var cookie = cookies[i];
        var eqPos = cookie.indexOf("=");
        var name = eqPos > -1 ? cookie.substr(0, eqPos) : cookie;
        document.cookie = name + "=;expires=Thu, 01 Jan 1970 00:00:00 GMT";
    }
};

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  };

  return array;
};

var log = ["<br>","<br>","<br>","<br>","<br>"]
function logtext(text) {
  log.push(text+ "<br>");
  if (log.length > 50) { log.shift() }
  $('#Log').html(log.slice(-5));
  $('#FullLog').html(log);
};
logtext('Welcome');

var startmap1 = [
  ['============================================================================'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|....~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|..........~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|..................~~~~~~~~~~~~~~~~...........~~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|...................~~~~~~~~~~~~~~.............~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|....................~~~~~~~~~~~~...............~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|....................~~~~~~~~~~~~................~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|...................~~~~~~~~~~~~.................~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|.................~~~~~~~~~~~~~~..................~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|................~~~~~~~~~~~~~~..........................~~~~~~~~~~~~~~~~~~|'],
  ['|..............~~~~~~~~~~~~~~~~...........................~~~~~~~~~~~~~~~~~|'],
  ['|............~~~~~~~~~~~~~~~~~~............................~~~~~~~~~~~~~~~~|'],
  ['|..........~~~~~~~~~~~~~~~~~~~..............................~~~~~~~~~~~~~~~|'],
  ['|..........~~~~~~~~~~~~~~~~~~...............................~~~~~~~~~~~~~~~|'],
  ['|.........~~~~~~~~~~~~~~~~~~.................................~~~~~~~~~~~~~.|'],
  ['|t........~~~~~~~~~~~~~~~~~...................................~~~~~~~~~~...|'],
  ['|tt.......~~~~~~~~~~~~~~~~.....................................~~~~~~~~....|'],
  ['|t.........~~~~~~~~~~~~~~~.................................................|'],
  ['|....................~~...................C................................|'],
  ['|........................................CCC...............................|'],
  ['|....tt...................................C................................|'],
  ['|...tttt........................................................tt.........|'],
  ['|....tt...........................ttt..........................tttt........|'],
  ['|............ttt..t........t.....ttttt.................t..tttttttt.........|'],
  ['|...........ttttt.............ttttttt...............t...ttttttttttt........|'],
  ['|tt................ttttttttttttttttt..t................t..tttttttt.........|'],
  ['|ttt.....t...tttttttttttttttttttttt.....................t..tttttt..........|'],
  ['|tt............ttttttttttttttttttt.....t....................ttt............|'],
  ['|t.........t.....ttttttttttttttt................tt...........t.............|'],
  ['|..............................................tttt........................|'],
  ['============================================================================']];
  var workablemap = [];
  var cityblocks = [];
  var treeslocations = [];
  var waterlocations = [];
  function mapStart(startmap) {
    for (i = 0; i < startmap.length; i++) {
      var l = startmap[i][0].split("");
      workablemap.push(l)
    }
    for (i = 0; i < workablemap.length; i++) {
      for (j = 0; j < workablemap[i].length; j++) {
        if (workablemap[i][j] == "~") {
          waterlocations.push([j,i]);
        }
        if (workablemap[i][j] == "t") {
          treeslocations.push([j,i]);
        }
        if (workablemap[i][j] == "C") {
          cityblocks.push([j,i]);
        }
      }
    }
  }
  mapStart(startmap1);

  var map = '';
  function mapUpdate(rawmap) {
    map = '';
    newmap = [];
    for (i = 0; i < rawmap.length; i++) {
          newmap.push(rawmap[i][0].split(""))
          map += rawmap[i].join("") + "<br>";
      };
      var workablemap = newmap
      $('#Map').html(map);
  };
  mapUpdate(workablemap);

  function statusUpdate() {
    $('#Hovels').html(hovels);
    $('#Houses').html(houses);
    $('#Foresters').html(foresters);
    $('#Fisheries').html(fisheries);
    $('#Churches').html(churches);
    $('#Taverns').html(taverns);
    $('#Woodworkers').html(woodworker);
    $('#Libraries').html(libraries);
    $('#Merchants').html(merchants);
    $('#Mills').html(mills);
    $('#Docks').html(docks);
    $('#Wizards').html(wizards);
    $('#Guild').html(guild);
    $('#Scribe').html(scribe);
  };

  var complete = false;
  var workingblock = [];
 function mapBuild() {
      for (i = 0; i < cityblocks.length; i++) {
        shuffle(cityblocks);
        citysquare = cityblocks[0];
        var adjacent = [[citysquare[0],citysquare[1]+1],[citysquare[0]+1,citysquare[1]],[citysquare[0]-1,citysquare[1]],[citysquare[0],citysquare[1]-1]]
        shuffle(adjacent);
        notree = true;
        for (j = 0; j < adjacent.length; j++) {
          block = adjacent[j];
          if (workablemap[block[1]][block[0]] == '.') {
            workablemap[block[1]][block[0]] = '_';
            workingblock.push(block);
            cityblocks.push(block);
            mapUpdate(workablemap);
            return;
          }
          if (workablemap[block[1]][block[0]] == 't') {
            notree = false;
          }
        }
        if (notree == true) {cityblocks.shift();}
      }
      logtext("Your Kingdom has dominated this area completely!");
      logtext("Victory!");
      mapUpdate(workablemap);
      complete = true;
      clearInterval(gameProgress);
  };
mapBuild();

function saveScores() {
  // setCookie("fisheries", fisheries, 365);
  // setCookie("churches", churches, 365);
  // setCookie("foresters", foresters, 365);
  // setCookie("wealth", wealth, 365);
  // setCookie("guild", guild, 365);
  // setCookie("wood", wood, 365);
  // setCookie("woodworker", woodworker, 365);
  // setCookie("hovels", hovels, 365);
  // setCookie("houses", houses, 365);
  // setCookie("taverns", taverns, 365);
  // setCookie("docks", docks, 365);
  // setCookie("fish", fish, 365);
  // setCookie("faith", faith, 365);
  // setCookie("drunks", drunks, 365);
  // setCookie("boats", boats, 365);
  // setCookie("mills", mills, 365);
  // setCookie("wizards", wizards, 365);
  // setCookie("merchants", merchants, 365);
  // setCookie("libraries", libraries, 365);
  // setCookie("scribe", scribe, 365);
  // setCookie("books", books, 365);
  // setCookie("knickknacks", knickknacks, 365);
  // setCookie("mana", mana, 365);
};

var fisheries = getCookie("fisheries");
var churches = getCookie("churches");
var foresters = getCookie("foresters");
var wealth = getCookie("wealth");
var guild = getCookie("guild");
var wood = getCookie("wood");
var woodworker = getCookie("woodworker");
var hovelslocations = [];
var hovels = getCookie("hovels");
var houses = getCookie("houses");
var taverns = getCookie("taverns");
var docks = getCookie("docks");
var fish = getCookie("fish");
var faith = getCookie("faith");
var drunks = getCookie("drunks");
var boats = getCookie("boats");
var mills = getCookie("mills");
var wizards = getCookie("wizards");
var merchants = getCookie("merchants");
var libraries = getCookie("libraries");
var scribe = getCookie("scribe");
var books = getCookie("books");
var knickknacks = getCookie("knickknacks");
var mana = getCookie("mana");
function buildComplete() {
    citysquare = workingblock[0]
    adjacent = [workablemap[citysquare[1]][citysquare[0]+1],workablemap[citysquare[1]+1][citysquare[0]],workablemap[citysquare[1]-1][citysquare[0]],workablemap[citysquare[1]][citysquare[0]-1]]

    if (adjacent.includes('t')) {
      newbuilding = 'forester';
      newsymbol = 'f';
      value = 3;
      foresters++;
      $("#WoodLabel").show();
    } else if (adjacent.includes('~')) {
      if (fisheries/10-docks >= 1) {
        newbuilding = 'docks';
        newsymbol = 'D';
        value = 10;
        docks++;
      } else {
        newbuilding = 'fishery';
        newsymbol = 'F';
        value = 4;
        fisheries++;
        $("#FishLabel").show();
      }
    } else if (wood >= 100 && wealth/250 - woodworker >= 1 && woodworker < 10) {
        newbuilding = "woodworker's house";
        newsymbol = 'w';
        value = 5;
        wood -= 100;
        woodworker++;
    } else if ((woodworker*2+foresters)/5 - mills >= 1 && mills < 10) {
        newbuilding = 'mill';
        newsymbol = 'M';
        value = 8;
        mills++;
    } else if ((wealth+25)/50 - churches >= 1) {
        newbuilding = 'church';
        newsymbol = 'c';
        value = 5;
        churches++;
        $("#FaithLabel").show();
    } else if ((((houses*2)+hovels)/40) - taverns >= 1) {
        newbuilding = "tavern";
        newsymbol = 'T';
        value = 7;
        taverns += 1;
        $("#DrunksLabel").show();
    } else if ((wealth+40)/75 - merchants >= 1) {
        newbuilding = "merchant's shop";
        newsymbol = 'm';
        value = 6;
        merchants++;
        $("#KnickKnacksLabel").show();
    } else if (wealth/100 - libraries >= 1) {
        newbuilding = "library";
        newsymbol = 'l';
        value = 8;
        libraries++;
        $("#BooksLabel").show();
    } else if (libraries/3 - wizards >= 1) {
        newbuilding = "wizard's tower";
        newsymbol = 'W';
        value = 10;
        wizards++;
        $("#ManaLabel").show();
    } else if (log.length == 50 && scribe == 0) {
        newbuilding = "scribe";
        newsymbol = 'S';
        value = 10;
        scribe++;
        logtext("Your scribe provide you with a log button.");
        $("#LogButton").show();
    } else if (wealth >= 250 && guild == 0) {
        newbuilding = "bard's guild";
        newsymbol = 'B';
        value = 10;
        guild++;
        logtext("You may use this music button to summon your new bards.");
        $('#MusicButton').show();
    } else {
        newbuilding = 'hovel';
        newsymbol = 'h';
        value = 1;
        hovelslocations.push(citysquare);
        hovels++;
    }

    workablemap[workingblock[0][1]][workingblock[0][0]] = newsymbol
    wealth += value;
    $('#Wealth').html(wealth)
    workingblock.shift();
    progress = '';
    logtext("Your Kingdom has built a new "+newbuilding+".");
    statusUpdate();
    // saveScores();
};

function houseUpgrade(){
  shuffle(hovelslocations);
  workablemap[hovelslocations[0][1]][hovelslocations[0][0]] = 'H';
  wealth += 2;
  hovelslocations.shift();
  logtext("Your woodworkers just upgraded a hovel to a house.");
  woodworkerWork = 0;
  hovels--;
  houses++;
  statusUpdate();
}

function treeCut(){
  shuffle(treeslocations);
  workablemap[treeslocations[0][1]][treeslocations[0][0]] = '.';
  treeslocations.shift();
  logtext("Your foresters finished cutting down a tree.");
  if (treeslocations.length == 0) { logtext("Your foresters cut down the last tree in the area.")}
  treehealth = 150;
  statusUpdate();
}

function boatCreate(){
  shuffle(waterlocations);
  if ((boats+1) % 5 != 0) {
    workablemap[waterlocations[0][1]][waterlocations[0][0]] = 'b';
    wealth += 5;
    logtext("Your docks are attracting a lot of commerce.");
    boats++;
  } else {
    workablemap[waterlocations[0][1]][waterlocations[0][0]] = 'p';
    wealth -= 5;
    logtext("Oh no, pirates on the high seas! :( ");
    boats++;
  }
  waterlocations.shift();
  boatwork = 0;
  statusUpdate();
}


var progress = '';
var count = 0;
var uselessbutton = false;
var pausebutton = false;
var treehealth = 100;
var woodworkerWork = 0;
var boatwork = 0;
var buildtime = 15;
var Increment = function() {
  progress += "*";
  count += 1;
  if (wood >= woodworker && hovelslocations.length > 0) { woodworkerWork+=woodworker; wood -= woodworker}
  if (foresters > 0) {
    if (treeslocations.length > 0) {
      wood += foresters;
      treehealth -= foresters;
      if (treehealth < 0) { treeCut(); }
    }
    $('#Wood').html(wood);
  }
  if (fisheries > 0) {  fish += fisheries; $('#Fish').html(fish)}
  if (churches > 0) {  faith += churches; $('#Faith').html(faith)}
  if (taverns > 0) {  drunks += taverns; $('#Drunks').html(drunks)}
  if (libraries > 0) {  books += libraries; $('#Books').html(books)}
  if (merchants > 0) {  knickknacks += merchants; $('#KnickKnacks').html(knickknacks)}
  if (wizards > 0) {  mana += wizards; $('#Mana').html(mana)}
  if (docks > 0 && boats < docks*3) {boatwork += docks; if (boatwork > 500) {boatCreate();} }
  if (woodworkerWork >= 10) {
    houseUpgrade();
  }
  if (count >= buildtime-mills) {
    count = 0;
    buildComplete();
    mapBuild();
  }
  if (wealth >= 250 && uselessbutton == false) {
    uselessbutton = true;
    $("#UselessButton").show();
    logtext("Bored? Here is a useless button you can click! ^_^");
  }
  if (mana >= 500 && pausebutton == false) {
    pausebutton = true;
    $("#PauseButton").show();
    logtext("Your wizards have gained mastery over time itself.... to useless results.");
  }
  $('#ProgressBar').html(progress);
};

var gameProgress = setInterval(Increment, 1000);

// Zoom function test (not ready yet)
var asciiblocks = [[
  ['=============================='],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|'],
  ['|............................|']],

  [['=============================='],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|']],

  [['=============================='],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|'],
  ['|~~~~~~~~~~~~~~~~~~~~~~~~~~~~|']]];
function Zoom() {
  var finalmap = "";
  for (i = 1; i < workablemap.length-1; i++) {
    var cityline = ['','','','','','','','','','',''];
    for (j = 1; j < workablemap[i].length-1; j++) {
      if (workablemap[i][j] == '~') {
        asciiblock = asciiblocks[1]
      } else {
        asciiblock = asciiblocks[0]
      }
      for (k = 0; k < asciiblock.length; k++) {
        cityline[k] += asciiblock[k];
      };
    };
    for (j = 0; j < cityline.length; j++) {
      finalmap += cityline[j] + "<br>"
    }
  };
  $('#Zoom').html(finalmap)
};

// buttons
$("#MapButton").click(function(){
  $('#Map').show();
  $('#Status').hide();
  $('#FullLog').hide();
  $('#Zoom').hide();
});
$("#StatusButton").click(function(){
  $('#Map').hide();
  $('#Status').show();
  $('#FullLog').hide();
  $('#Zoom').hide();
});
$("#LogButton").click(function(){
  $('#FullLog').show();
  $('#Map').hide();
  $('#Status').hide();
  $('#Zoom').hide();
});
$("#ZoomButton").click(function(){
  $('#Map').hide();
  $('#Status').hide();
  $('#FullLog').hide();
  $('#Zoom').show();
  Zoom();
});

var on = true
$("#PauseButton").click(function(){
  if (complete == false) {
    if (!on && complete == false) {
      gameProgress = setInterval(Increment, 1000);
      on = true;
      logtext("Time has resumed it's normal pace.");
    } else {
      clearInterval(gameProgress);
      on = false;
      logtext("You cast a time stop spell.");
    };
  };
});

var buttonclick = 0;
$("#UselessButton").click(function(){
  buttonclick++;
  $('#Clicks').show();
  $("#ButtonClicks").html(buttonclick);
});

$("#CheatButton").click(function(){
  // clearInterval(gameProgress);
  var times = 10000;
  $('#Skip').show();
  if (complete == false) {
    for(var i=0; i < times; i++){
      Increment();
      $('#Skip').html(i+"/"+times);
      if (complete) { i = times}
    }
  }
  // $('#Skip').hide();
  // gameProgress = setInterval(Increment, 1000);
});

function music() {
  var audio = document.getElementById('MusicPlayer');
   audio.volume = .5;
  if (musicmute == false && musicon == false) {
    audio.play();
    musicon = true;
  } else {
    audio.pause();
    musicon = false;
  }
};
var musicmute = true;
var musicon = false;
$("#MusicButton").click(function(){
  musicmute = !musicmute
  if (musicmute == true) {logtext("You throw an apple at the bards. We are not amused! ");
} else {
  logtext("The bards serenade you. Does it please you, my lord?")
}
music();
});

$("#DeleteSaveButton").click(function(){
  deleteAllCookies();
  logtext("The save file has been deleted!")
});