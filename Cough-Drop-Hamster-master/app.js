
$('#JavascriptBlock').hide();
$('#ScoreLine').hide();

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
var highnoms = getCookie("highnoms");
var timesplayed = getCookie("timesplayed");
var hamsterslost = getCookie("hamsterslost");
var cherrydropstotal = getCookie("cherrydropstotal");
var coollemonstotal = getCookie("coollemonstotal");
var longesthamsterchain = getCookie("longesthamsterchain");
var highestlevelreached = getCookie("highestlevelreached");
var invisibilityturns = getCookie("invisibilityturns");
var bossesdefeated = getCookie("bossesdefeated");
var devilhamsterdefeated = getCookie("devilhamsterdefeated");
$("#HighScore").html(" (HighNoms: "+highnoms+" )");

function statustext() {
  textarray = [
              "-Status-<br><br>",
              "HighNoms = "+highnoms+"<br><br>",
              "Times Played = "+timesplayed+"<br><br>",
              "Hamsters Lost = "+hamsterslost+"<br><br>",
              "Cherry Drops Eatten = "+cherrydropstotal+"<br><br>",
              "Cool Lemon Parties = "+coollemonstotal+"<br><br>",
              "Longest Hamster Chain = "+longesthamsterchain+"<br><br>",
              "Invisibility Turns = "+invisibilityturns+"<br><br>",
              "Higest Level Reached = "+highestlevelreached+"<br><br>",
              "Bosses Defeated = "+bossesdefeated+"<br><br>"
            ];
  $('#StatusText').html(textarray);
};
statustext();

function achievementchecker() {
  $('.AchievementIcons').html('')
  textarray = [];
  if (highnoms > 49) {textarray.push("INomberstandThisGame")}
  if (highnoms > 99) {textarray.push("Nomageddon")}
  if (highnoms > 149) {textarray.push("OhTheNomanity")}
  if (hamsterslost > 49) {textarray.push("IveSeenTooMuchDeath")}
  if (cherrydropstotal > 249) {textarray.push("YetMyThroatStillTickles")}
  if (highestlevelreached > 2) {textarray.push("WowThisLevelIsPink")}
  if (longesthamsterchain > 3) {textarray.push("HamsterParty")}
  if (bossesdefeated > 9) {textarray.push("NotAfraidOfNoBoss")}
  if (devilhamsterdefeated > 0) {textarray.push("NoFearForTheHamsterDevil")}
  for (var i = 0; i < textarray.length; i++) {
    cur = textarray[i]
    $('.AchievementIcons').append("</img><a title="+cur+"><img src='achievements/"+cur+".jpg' style='width: 30px;height: 30px'></img></a></div> ");
  }
}
achievementchecker();


var musicmute = false;
var musicon = false;
var audio = document.getElementById('NomMusicPlayer');

function nommusic() {
  audio = document.getElementById('NomMusicPlayer');
  audio.volume = .04;
  if (musicmute == false && musicon == false) {
    audio.play();
    musicon = true;
  } else {
    audio.pause();
    musicon = false;
  }
};


var collisionlemon = 0;
var log = ["<br>","<br>","<br>","<br>","<br>"]
function logtext(text) {
  log.push(text+ "<br>");
  log.shift()
  $('#Log').html(log);
};
logtext('Hamster, go get you some cough drops!');

$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();

	var cw = 20;
	var d;
  var gameon = false;
  var shake = [0,true,2,1];
  var bosson;
  var bosstargets = [];
  var bossmove = [0,true,2,1];
  var colorshift = [0,true,9,1]
  bosstimer = false;
	var food;
  var coollemons;
	var score;
  var level;
  var dropseatten;
  var coollemons;
  var currenthamster = "Hammy";
	var hamster_array;
  var charpreserve;
  var speed;
  var hamsterrate;
  var coollemonrate;
  var powerrate;
  var hamshield = false;
  var hamshieldpower = 0;
  var hobbitwraithturns = 0;
  var wraitharray = [];
  var titleimage = new Image();
  var instructionimg = new Image();
  var hammy = new Image();
  var coughdrop = new Image();
  var lemons = new Image();
  var coollemon = new Image();
  var doppelimg = new Image();
  var lemonstarimg = new Image();
  var notacceptableimg = new Image();
  var bosstargetimg = new Image();
  var lemonwraithimg = new Image();
  var lemonbrothersimg = new Image();
  var bossattackimg = new Image();
  var hamsterdevilimg = new Image();
  hamsterdevilimg.src = "characters/devil_hammy.png"
  titleimage.src = "Title_Background.jpg"
  instructionimg.src = "coughdropmanual.jpg"
  lemonstarimg.src = "bosses/lemon_star.png"
  hammy.src = "characters/hammy_hammy.png"
  bossattackimg.src = "bosses/boss_attack.png"
  lemonbrothersimg.src = "bosses/lemon_brothers.png"
  lemonwraithimg.src = "lemon_wraith.png"
  bosstargetimg.src = "cough_drop.png"
  notacceptableimg.src = "bosses/notacceptable_boss.png"
  doppelimg.src = "bosses/doppel_hammy.png"
  coughdrop.src = "cough_drop.png";
  lemons.src = "lemon.png";
  coollemon.src = "cool_lemon.png"

  var titlerotate = [0,true]
  function rotation(rw,rh,rotate = titlerotate[0]) {
    ctx.save();
    ctx.translate( rw, rh );
    ctx.rotate(rotate*Math.PI/180);
    ctx.translate( -rw, -rh );
  }
  function titlepage() {
    titlerotate = shakerfun(titlerotate[0],titlerotate[1],5)
    ctx.drawImage(titleimage, 0,0,w,h);
    rotation(w/2,h/2)
    ctx.drawImage(hammy, (w/2)-100,(h/2)-100,200,200);
    ctx.restore();
    rotation((w/2)-240,h/2);
    ctx.drawImage(coughdrop, (w/2)-300,(h/2)-75,120,120);
    ctx.restore();
    rotation((w/2)+220,h/2);
    ctx.drawImage(lemons, (w/2)+160,(h/2)-75,120,120);
    ctx.restore();
  }
  title_loop = setInterval(titlepage, 100);
  nommusic();


	function init()
	{
		d = "right";
    gameon = true;
    bosson = false;
    score = 0;
    level = 1;
    dropseatten = 0;
    speed = 100;
    coollemonrate = 12;
    hamsterrate = 15;
    powerrate = 20;
    wraitharray = [];
    bosstargets = [];
    bossbodyarray = [];
    bossattackarray = [];
    doppelhamsteron = false;
    notacceptableon = false;
    hyperlemonactive = false;
    lemonbrotherson = false;
    hamsterdevilbosson = false;
    lemonstaron = false;

    $("#Level").html(" Level: "+level+" ");
		createhamster();
		createfood();
    $(".CharacterButtons").hide();
    $('#ScoreLine').show();

    clearInterval(title_loop)
		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, speed);
	}

  function musicpicker(boss = false) {
    if (boss == true) {
      if (currentboss == "The Hamster Devil") {
        $("#NomMusicPlayer").attr("src", "ChurchBell.mp3");
      } else if (currenthamster == "Bard") {
        $("#NomMusicPlayer").attr("src", "BardBossMusic.mp3");
      } else if (currenthamster == "Devil") {
        $("#NomMusicPlayer").attr("src", "DevilMusic.mp3");
      } else {
        $("#NomMusicPlayer").attr("src", "BossMusic.mp3");
        // audio.playbackRate=0.5;
      }
    } else {
      if (currenthamster == "Bard") {
        $("#NomMusicPlayer").attr("src", "BardMusic.mp3");
      } else if (currenthamster == "Devil") {
        $("#NomMusicPlayer").attr("src", "DevilMusic.mp3");
      } else {
        $("#NomMusicPlayer").attr("src", "NomMusic.mp3");
        // audio.playbackRate=0.5;
      }
    }
    if (musicmute == false) {audio.play()}
  }

	function createhamster()
	{
		var length = 1;
		hamster_array = [];
		for(var i = length-1; i>=0; i--)
		{
			hamster_array.push({x: i, y:0});
		}
    honeylemon = [];
    var collisionlemon = 0;
    context = document.getElementById('canvas').getContext("2d");
    audio = document.getElementById('NomMusicPlayer');
    audio.volume = .04;
    coughdrop.src = "cough_drop.png";
    lemons.src = "lemon.png";
    food = {
      x: -1,
      y: -1,
    }
    coollemons = {
      x: -1,
      y: -1,
    }
    if (currenthamster == "Old") {
      hammy.src = "characters/old_hammy.png";
      speed = 125;
    } else if (currenthamster == "Cool") {
      hammy.src = "characters/cool_hammy.png";
      coollemonrate = 8;
    } else if (currenthamster == "Cyborg") {
      hammy.src = "characters/cyborg_hammy.png";
      powerrate = 10;
    } else if (currenthamster == "Bard") {
      hammy.src = "characters/bard_hammy.png";
    } else if (currenthamster == "Barbarian") {
      hammy.src = "characters/barbarian_hammy.png";
      speed = 80;
    } else if (currenthamster == "Ham") {
      hammy.src = "characters/ham_hammy.png";
      hamsterrate = 99;
    } else if (currenthamster == "Time") {
      hammy.src = "characters/time_hammy.png";
      hamsterrate = 12;
    } else if (currenthamster == "Baby") {
      hammy.src = "characters/baby_hammy.png";
      speed = 200;
    } else if (currenthamster == "Devil") {
      hammy.src = "characters/devil_hammy.png";
      coughdrop.src = "lemon.png";
      lemons.src = "cough_drop.png";
      coollemonrate = 99;
    } else if (currenthamster == "Thief") {
      hammy.src = "characters/thief_hammy.png";
    } else if (currenthamster == "Hobbit") {
      hammy.src = "characters/hobbit_hammy.png";
      powerrate = 1;
      hobbitwraithturns = 0;
    } else if (currenthamster == "Robo") {
      hammy.src = "characters/robo_hammy.png";
    } else {
      hammy.src = "characters/hammy_hammy.png";
      hamsterrate = 12;
    }
    charpreserve = hammy.src
    musicpicker();
	}

  // Random object maker
  function newrandom(){
    obj = {
      x: Math.round(Math.random()*(w-cw)/cw),
      y: Math.round(Math.random()*(h-cw)/cw),
    };
    return overlapchecker(obj);
  };

  function overlapchecker(obj) {
    if (food.x == obj.x && food.y == obj.y) { return newrandom()}
    if (coollemons.x == obj.x && coollemons.y == obj.y) { return newrandom()}
    for (var i = 0; i < honeylemon.length; i++) {
      if (honeylemon[i].x == obj.x && honeylemon[i].y == obj.y) { return newrandom()}
    };
    for (var i = 0; i < bosstargets.length; i++) {
      if (bosstargets[i].x == obj.x && bosstargets[i].y == obj.y) { return newrandom()}
    };
    for (var i = 0; i < bossbodyarray.length; i++) {
      if (bossbodyarray[i].x == obj.x && bossbodyarray[i].y == obj.y) { return newrandom()}
    };
    for (var i = 0; i < wraitharray.length; i++) {
      if (wraitharray[i].x == obj.x && wraitharray[i].y == obj.y) { return newrandom()}
    };
    return obj;
  };

  function newrandomobject(){
    newobject = newrandom();
    while ((newobject.x > hamster_array[0].x-5 && newobject.x < hamster_array[0].x+5) &&
     (newobject.y > hamster_array[0].y-5 && newobject.y < hamster_array[0].y+5)) {newobject = newrandom()}
     return newobject
  }

  //create the food
	function createfood() {

    food = newrandomobject();
    // add lemons
    if (currenthamster == "Bard" && dropseatten % 5 == 0 && dropseatten != 0) {
      logtext("Some honey lemon drops are jamming out to the bard's song and forget to appear.")
    } else {
      for(var i=0; i < level; i++){
        newlemon = newrandomobject();
        honeylemon.push(newlemon);
      };
    }
    // cool lemons
    if (dropseatten % coollemonrate == 0 && dropseatten != 0) {
      coollemons = newrandomobject();
    };
	}

  //paint the canvas
	function paint() {
    if (level%5 == 4 || currenthamster == "Devil" || currentboss == "The Hamster Devil") {
      colorshift = shakerfun(colorshift[0],colorshift[1],colorshift[2],colorshift[3])
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, w, h);
      context.save();
      context.globalAlpha = (colorshift[0]+10)*0.05;
      ctx.fillStyle = "#300101";
      ctx.fillRect(0, 0, w, h);
      context.restore();
    } else if (level%5 == 2) {
      ctx.fillStyle = "forestgreen";
      ctx.fillRect(0, 0, w, h);
    } else if (level%5 == 3){
      ctx.fillStyle = "fuchsia";
      ctx.fillRect(0, 0, w, h);
    } else {
      ctx.fillStyle = "grey";
      ctx.fillRect(0, 0, w, h);
    }
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);

		var nx = hamster_array[0].x;
		var ny = hamster_array[0].y;

    if (currenthamster == "Robo") {d = robohammyai(nx,ny)}

		if(d == "right") nx++;
		else if(d == "left") nx--;
		else if(d == "up") ny--;
		else if(d == "down") ny++;
    if (nx == -1) {nx = 44}
    if (nx == 45) {nx = 0}
    if (ny == -1) {ny = 22}
    if (ny == 23) {ny = 0}

    function hamsterhit(nx,ny) {
      for(var i = 0; i < honeylemon.length; i++) {
        if(honeylemon[i].x == nx && honeylemon[i].y == ny) {
          collisionlemon = honeylemon[i];
        }
      }

    if (hamster_array.length > 1) {
      hamster_array.pop();
      logtext("Barry sacrifices himself upon the lemon cough drop. Barry! Nooooooo!!!");
      secondghost = true;
      if (currenthamster == "Devil") {
        logtext("The Devil Hamster basks in the suffering of his minion. Some cough drops back away slowly.");
        honeylemon.splice(1,(6*level));
      }
      honeylemon.splice(honeylemon.indexOf(collisionlemon), 1);
      hamsterslost++;
    } else if (hamshield == true) {
      hamshield = false;
      hamshieldpower = 0;
      secondghost = true;
      hammy.src = "characters/ham_hammy.png";
      charpreserve = hammy.src;
      logtext("Ham's body absorbs the lemon drop. He is weakened for the moment. One more and he is a goner.");
    } else {
      hamsterslost++;
      logtext('Yuck! That is not a cherry cough drop! That is not a cherry cough drop at all! :( Score: '+ score);
      gameon = false;
      timesplayed++;
      if (score > highnoms) {
        if (currenthamster != "Baby" || currenthamster != "Robo") {
          logtext("Babies don't make HighNoms, they make boom booms.")
        } else {
        highnoms = score;
        $("#HighScore").html(" (HighNoms: "+highnoms+" )");
        logtext('You made a new HighNoms!');
        }
      };
      hamshield = false
      hamshieldpower = 0
      saveScores();
      statustext();
      achievementchecker();
      invisibilitypower = 0;
      $("#Invisibility").html("");
      $("#Level").html("");
      $(".CharacterButtons").show();
      $('#ScoreLine').hide();
      // audio.pause();
      clearInterval(game_loop);
      title_loop = setInterval(titlepage, 100);
      return true;
    }
    }

		if( checkcollision(nx, ny, honeylemon) || checkcollision(nx, ny, bossbodyarray) || checkcollision(nx, ny, wraitharray, true) || checkcollision(nx, ny, bossattackarray))
		{
      gameover = hamsterhit(nx,ny);
      if (gameover == true) {
        return;
      }
		}
    // if boss target hit
    if ( checkcollision(nx, ny, bosstargets, true, true)) {
      bossdamage++;
      if (currentboss == "Not Acceptable!!!") {
        notacceptable(bossdamage);
      } else if (currentboss == "Lemon Brothers") {
        lemonbrothers(bossdamage);
      } else if (currentboss == "The Lemon Star") {
        lemonstar(bossdamage);
      } else if (currentboss == "The Hamster Devil") {
        hamsterdevilboss(bossdamage);
      } else {
        doppelhamster(bossdamage);
      }
    }
    // if (bossintrotime == 0) {
    //   bossstart("The Hamster Devil");
    // }
    // if food hit
    newhamster = false;
		if(nx == food.x && ny == food.y)
		{
			score = score+level;
      dropseatten++;
      logtext('Yum! Cherry cough drop! They go in the bellies and the bellies say Yay! ^_^ Score: '+ score);
      cherrydropstotal++;
      // check for level up
      if (dropseatten/20 == level) {
        logtext("A boss is on it's way. Watch out!");
        if (currenthamster == "Barbarian") {
          logtext("'BRRRAAAAARRRRRRRRGGGG!!!!!!!' O.o says the barbarian hammy. Most of the honey lemon drops decide to give him a little bit of space.")
          honeylemon.splice(1,(15*level));
        } else {
          logtext('Lesser honey lemon cough drops flee in terror. Let them run!')
          honeylemon.splice(1,(5*level));
        }
        if (level % 3 == 0) {
          bossstart("The Hamster Devil");
        } else {
          bossstart();
        }
      }
      if (!bosson) {
        createfood();
      }
      // check for extra hamsters
      if (dropseatten % hamsterrate == 0){
        var tail = {x: nx, y: ny};
        newhamster = true;
        logtext('Another hamster with an adorable cough just joined the cough drop buffet! (His name is Barry)');
        if (hamster_array.length+1> longesthamsterchain && (currenthamster != "Baby" && currenthamster != "Robo")) {longesthamsterchain = hamster_array.length+1};
      } else {
      }

		}	else if (nx == coollemons.x && ny == coollemons.y) {
        logtext('The cool lemon invites some honey lemon cough drops out for pizza. Now that is one cool lemon! B-|');
        if (coollemonrate == 8) {
          logtext('......And the cool hamster brought the soda! Now that is one cool hamster! B-|')
          honeylemon.splice(1,(4*level));
        } else {
          honeylemon.splice(1,(2*level));
        }
        coollemons = {
          x: -1,
          y: -1,
        }
        coollemonstotal++;
  		}
    if (!newhamster) {
      var tail = hamster_array.pop();
      doppel = {x:tail.x,y:tail.y};
      tail.x = nx; tail.y = ny;
    }
    hamster_array.unshift(tail);

    // ivisibility and ham shield turn stuff
    if (invisibilityon) {
      invisibilityturns++;
      invisibilitypower -= powerrate;
      if (currenthamster == "Hobbit") {
        hobbitwraithturns++;
        if (hobbitwraithturns % 20 == 0) {
          newwraith = newrandomobject();
          wraitharray.push(newwraith);
        }
      }
      if (invisibilitypower < powerrate) {invisibility()}
    }
    invisibilitypower++;
    if (currenthamster == "Ham" && hamshield == false) {
      hamshieldpower++;
      if (hamshieldpower >= 300) {
        hamshield = true;
        hammy.src = "characters/ham_hammy_shield.png"
        charpreserve = hammy.src
        logtext("Ham's body feels strong. It could handle a honey lemon drop.... if it had to.");
      }
    }
    if (invisibilitypower > 299) { invisibilitypower = 300}
    $("#Invisibility").html("Invisibility Power: "+(invisibilitypower/powerrate).toFixed()+"")

    // draw up stuff
    function drawarray(array,img) {
      for(var i = 0; i < array.length; i++) {
        context.drawImage(img, array[i].x*cw, array[i].y*cw, cw, cw);
      }
    }
    context.save();
    if (secondghost == true) { flashing()}
    drawarray(hamster_array,hammy);
    context.restore();
    context.drawImage(coughdrop, food.x*cw, food.y*cw, cw, cw);
    drawarray(honeylemon,lemons);
    drawarray(wraitharray,lemonwraithimg)
    if (coollemons != null) {context.drawImage(coollemon, coollemons.x*cw, coollemons.y*cw, cw, cw)};
    // boss turn stuff
    if (doppelhamsteron) {
      bossbodyarray.push({x: doppel.x, y: doppel.y});
      for(var i = 0; i < bossbodyarray.length; i++){
        shake = shakerfun(shake[0],shake[1],1)
        context.drawImage(doppelimg, bossbodyarray[i].x*cw+shake[0], bossbodyarray[i].y*cw, cw, cw);
      }
    }

    if (lemonbrotherson) {
        if (lemonbrothersmove) {
          lemonbrothersimg.src = "bosses/lemon_brothers.png"
        } else {
          lemonbrothersimg.src = "bosses/lemon_brothers_flip.png"
        }
        lemonbrothersmove = !lemonbrothersmove;
        shake = shakerfun(shake[0],shake[1],1);
        if (bossbodyarray[0].x == 44) {
          lemonbrothersdir = "left";
          for (var i = 1; i < bossbodyarray[1].y; i++) {
            bossattackarray.push({x:bossbodyarray[0].x,y:i})
          }
          damage = 5-bossdamage
          targetindex = Math.floor(Math.random() * (bossattackarray.length-damage))
          bosstargets = bossattackarray.splice(targetindex, damage)
        } else if (bossbodyarray[0].x == 0) {
          lemonbrothersdir = "right";
          bossattackarray = [];
          bosstargets = [];
        };
        for(var i = 0; i < bossbodyarray.length; i++){
          if (lemonbrothersdir == "right") {
            bossbodyarray[i].x = bossbodyarray[i].x+1;
          } else {
            bossbodyarray[i].x = bossbodyarray[i].x-1;
          }
          context.drawImage(lemonbrothersimg, bossbodyarray[i].x*cw+shake[0], bossbodyarray[i].y*cw, cw, cw);
        }
        for(var i = 0; i < bossattackarray.length; i++){
          bossattackarray[i].x = bossbodyarray[0].x;
        }
        for(var i = 0; i < bosstargets.length; i++){
          bosstargets[i].x = bossbodyarray[0].x;
        }
        if (checkcollision(nx,ny,bossattackarray) || checkcollision(nx,ny,bossbodyarray)) {
          gameover = hamsterhit(nx,ny);
          if (gameover == true) {
            return;
          }
        }
        if ( checkcollision(nx, ny, bosstargets, true, true)) {
          bossdamage++;
          lemonbrothers(bossdamage);
        }
    }

    if (notacceptableon) {
        if (notacceptablemouth) {
          notacceptableimg.src = "bosses/notacceptable_boss.png"
        } else {
          notacceptableimg.src = "bosses/notacceptable_boss_closed.png"
        }
        if (bossattackarray[0] == null) {
          notacceptablemouth = !notacceptablemouth;
        }
        bossclusterattack(bosstime, bosstimeaction);
        shake = shakerfun(shake[0],shake[1],4);
        bossmove = shakerfun(bossmove[0],bossmove[1],100,2);
        context.drawImage(notacceptableimg, (w/2)-80+bossmove[0], (h/2)-80, 160-shake[0], 160+shake[0]);
        if (bossmove[0] % 20 == 0) {
          for (var i = 0; i < bossbodyarray.length; i++) {
            if (bossmove[1] == true) {
              bossbodyarray[i].x++;
            } else {
              bossbodyarray[i].x--;
            }
          }
        }
    }

    if (lemonstaron) {
        bosstime++;
        if (bosstime == bosstimeaction) {
          lemonstaropen = !lemonstaropen;
          bosstime = 0;
          lemonstarvibrate = [0,true,0,0]
          shake = [0,true,2,1]
          bossattackarray = [];
          if (lemonstaropen) {
            logtext("The Lemon Star is recharging. The exhaust port is open!")
            bosstargets = [{x:22,y:11}];
            for (var i = 0; i < honeylemon.length; i++) {
              if (honeylemon[i].x == 22 && honeylemon[i].y == 11) { honeylemon.splice(i, 1)}
            };
            bossbodyarray = [];
            bossbodymaker(15,15,4,lemonstarbodyopen);
          } else {
            bosstargets = [];
            bossbodyarray = [];
            bossbodymaker(15,15,4,lemonstarbodyclosed);
          }
        }
        lemonstarvibrate = shakerfun(lemonstarvibrate[0],lemonstarvibrate[1],lemonstarvibrate[2],lemonstarvibrate[3])
        if (bosstime == bosstimeaction-40) {lemonstarvibrate = [0,true,1,2]}
        if (bosstime == bosstimeaction-20 && lemonstaropen == false) {
          for (var i = 9; i <= 13; i++) {
            for (var j = 0; j <= 44; j++) {
                bossattackarray.push({x:j,y:i})
            }
          }
        if (lemonstarlazerswitch == false) {
          bossattackimg.src = "bosses/lemon_star_lazer2.png";
        } else {
          bossattackimg.src = "bosses/lemon_star_lazer.png";
        }
          lemonstarlazerswitch = !lemonstarlazerswitch;
        }
        drawarray(bossattackarray,bossattackimg);
        if (lemonstaropen) {
          context.drawImage(lemonstarimg, (w/2)-150+lemonstarvibrate[0], (h/2)-150, 300, 300);
          ctx.fillRect((w/2)-155, (h/2)-30, 310, 60);
          drawarray(hamster_array,hammy);
          for (var i = 0; i < honeylemon.length; i++) {
            if (honeylemon[i].y >= 10 || honeylemon[i].y <= 12) {
              context.drawImage(lemons, honeylemon[i].x*cw, honeylemon[i].y*cw, cw, cw);
            }
          }
        } else {
          shake = shakerfun(shake[0],shake[1],shake[2],shake[3]);
          context.drawImage(lemonstarimg, (w/2)-150+lemonstarvibrate[0], (h/2)-150, 300-shake[0], 300+shake[0]);
        }
    }

    // hamster devil boss
    if (hamsterdevilbosson) {
        if (lemonstarlazerswitch == false) {
          bossattackimg.src = "bosses/lemon_star_lazer2.png";
        } else {
          bossattackimg.src = "bosses/lemon_star_lazer.png";
        }
          lemonstarlazerswitch = !lemonstarlazerswitch;
        if (devilattack.includes("cluster")) {
          bossclusterattack(bosstime, bosstimeaction);
        }
        if (devilattack.includes("wall")) {
          if (bosstime == 1 || bosstime == 40 || bosstime == 60) {
            damage = 7-bossdamage
            targetindex = Math.floor(Math.random() * (22-damage))
            for (var i = 0; i <= 22; i++) {
              if (i < targetindex || i > targetindex+damage) {
                bossattackarray.push({x:0,y:i})
              }
            }
          }
          if (bosstime > 20) {
            for(var i = 0; i < bossattackarray.length; i++){
              bossattackarray[i].x++;
            }
          }
          if (bosstime >= 110) {
            devilattack = ["lazer"];
            bosstime = 0;
          } else {
            bosstime++;
          }
        }
        if (devilattack.includes("lazer")) {
          console.log(bosstime);
          if (bosstime == 0 || bosstime >= 100) {lemonstarvibrate = [0,true,0,0]}
          lemonstarvibrate = shakerfun(lemonstarvibrate[0],lemonstarvibrate[1],lemonstarvibrate[2],lemonstarvibrate[3])
          if (bosstime == 40) {lemonstarvibrate = [0,true,1,2]}
          if (bosstime == 60) {
            for (var i = 9; i <= 13; i++) {
              for (var j = 0; j <= 44; j++) {
                  bossattackarray.push({x:j,y:i})
              }
            }
          }
          drawarray(bossattackarray,bossattackimg);
          if (bosstime >= 100) {
            bosstime = 0;
            bossattackarray = [];
            bosstargets = [newrandomobject()];
            devilattack = ["cluster"];
          }
          bosstime++;
        }
        shake = shakerfun(shake[0],shake[1],4);
        titlerotate = shakerfun(titlerotate[0],titlerotate[1],15)
        rotation(w/2,h/2,titlerotate[0]/8)
        context.drawImage(hamsterdevilimg, (w/2)-150+lemonstarvibrate[0], (h/2)-150, 300+shake[0], 300-shake[0]);
        context.restore();
    }

    // draw up everything else
    context.save();
    context.globalAlpha = preattackfade;
    drawarray(prebossattackarray,bossattackimg)
    context.restore();
    if (lemonstaron == false && devilattack.includes("lazer") == false) {drawarray(bossattackarray,bossattackimg)}
    drawarray(bosstargets,bosstargetimg)
    // drawarray(bossbodyarray,doppelimg)

		var score_text = "Noms: " + score;
		$("#Score").html(score_text)

    bossintro(currentboss);

	}

	// function paintcell(x, y, color)
	// {
	// 	ctx.fillStyle = color;
	// 	ctx.fillRect(x*cw, y*cw, cw, cw);
	// 	ctx.strokeStyle = "white";
	// 	ctx.strokeRect(x*cw, y*cw, cw, cw);
	// }

	function checkcollision(x, y, array, noinvis = false, noghost = false)
	{
		for(var i = 0; i < array.length; i++)
		{
			if(array[i].x == x && array[i].y == y && (invisibilityon == false || noinvis == true) && (secondghost == false || noghost == true))
			 return true;
		}
		return false;
	}



  var secondghost = false;
  var secondghosttime = 0;
  var flash = false;
  function flashing() {
    if (flash) {
      ctx.globalAlpha = 0.4;
    };
      flash = !flash
      secondghosttime++;
    if (secondghosttime >= 30) {
      secondghost = false;
      secondghosttime = 0;
      context.restore();
    };
    };

  var invisibilityon = false
  var invisibilitypower = 0
  function invisibility() {
    if (invisibilityon) {
      logtext("Invisibility off!")
      invisibilityon = false;
      hammy.src = charpreserve;
      if (currenthamster == "Time") {
        clearInterval(game_loop);
        game_loop = setInterval(paint, speed);
      }
    } else if (invisibilitypower >= powerrate) {
      logtext("Invisibility on! Time to sneak past those cough drops!")
      invisibilityon = true;
      hammy.src = "characters/hamster_face_invisible.png";
      if (currenthamster == "Time") {
        clearInterval(game_loop);
        game_loop = setInterval(paint, 500);
        for(var i = 0; i < hamster_array.length; i++)
        {
          var c = hamster_array[i];
          context.drawImage(hammy, c.x*cw, c.y*cw, cw, cw);
        }
      }
    }
  }

  var pauseon = false;
  function pause() {
    pauseon = !pauseon
    if (gameon) {
      if (pauseon) {
        clearInterval(game_loop)
        logtext("Pause");
      } else {
        game_loop = setInterval(paint, speed);
        logtext("Unpause");
      };
    }
  };

	$(document).keydown(function(e){
		var key = e.which;
    if (!pauseon && currenthamster != "Robo") {
      if (currenthamster == "Thief" && doppelhamsteron == false) {
        if(key == "37" || key == "65") d = "left";
    		else if(key == "38" || key == "87") d = "up";
    		else if(key == "39" || key == "68") d = "right";
    		else if(key == "40" || key == "83") d = "down";
        if (key == "16") invisibility();
      } else {
    		if((key == "37" || key == "65") && d != "right") d = "left";
    		else if((key == "38" || key == "87") && d != "down") d = "up";
    		else if((key == "39" || key == "68") && d != "left") d = "right";
    		else if((key == "40" || key == "83") && d != "up") d = "down";
        if (key == "16") invisibility();
      }
    };
    if (key == "80") pause();
	});


  // Boss functions
  var bossintrotime = 0;
  var bossdamage = 0;
  var currentboss = "DoppleHamster";
  var bossnamearray = ["DoppleHamster", "Not Acceptable!!!", "Lemon Brothers", "The Lemon Star"]

  function bossstart(boss = "none") {
    if (boss == "none") {
      currentboss = bossnamearray[Math.floor(Math.random() * bossnamearray.length)];
    } else {
      currentboss = boss;
    }
    bosson = true;
    food = {
      x: -1,
      y: -1,
    }
    musicpicker(true);
  }

  function bossintro(boss) {
    if (bossintrotime < 70 && bosson == true) {
        bossintrotime++;
      if (bossintrotime < 70) {
        bosstextarray = ["Incoming"," Boss: ", boss,"!"]
        ctx.font = "50px Arial";
        ctx.fillStyle = "blue";
        ctx.textAlign = "center";
        currenttext = "";
        for (var i = 0; i < (bossintrotime/15) && i < 4; i++) {
          currenttext = currenttext + bosstextarray[i]
        }
        ctx.fillText(currenttext, w/2 ,h/2);
      } else {
        bossdamage = 0;
        if (currentboss == "DoppleHamster") {
          doppelhamster(bossdamage);
        } else if (currentboss == "Not Acceptable!!!"){
          notacceptable(bossdamage);
        } else if (currentboss == "Lemon Brothers"){
          lemonbrothers(bossdamage);
        } else if (currentboss == "The Lemon Star"){
          lemonstar(bossdamage);
        } else if (currentboss == "The Hamster Devil"){
          hamsterdevilboss(bossdamage);
        }
      }
    }
  }
var bosstimer = false;
var bosstime = 0;
var bosstimeaction = 100;
var preattackfade = 0.4

  function bossclusterattack(time,n,power = 15) {
      if (time == n-30) {
        preattackfade = 0.4;
        for (var i = 0; i < (bossdamage+1)*power; i++) {
          prebossattackarray.push(newrandomobject())
        };
      };
      if (time == n-20) {
        preattackfade = 0.7;
      }
      if (time == n-10) {
        bossattackarray = prebossattackarray;
        notacceptablemouth = true;
        prebossattackarray = [];
      };
      if (time > n) {
        prebossattackarray = [];
        bossattackarray = [];
        bosstime = 0;
      if (notacceptableon) {
        logtext("The pud jumps to a new location.")
        bosstargets = [newrandomobject()];
      }
      if (hamsterdevilbosson) { devilattack = ["wall"]};
      } else {
        bosstime++;
      };
  };

  function bossbodymaker(size, xoff, yoff, cutarray = []) {
    for (var i = 0; i < size; i++) {
      for (var j = 0; j < size; j++) {
        if (cutarray[i].includes(j+1) == false) {
          bossbodyarray.push({
            x: j+xoff,
            y: i+yoff,
          })
        }
      }
    }
  }

  function shakerfun(current,positive,n = 2, rate = 1) {
    if (current > n) {
      positive = false;
    } else if (current < (0-n)) {
      positive = true;
    }
    if (positive) {
      current+=rate;
    } else {
      current-=rate;
    }
    return [current, positive, n , rate]
  }

var bossbodyarray = [];
var bossattackarray = [];
var prebossattackarray = [];
var doppelhamsteron = false;
var notacceptableon = false;
var hyperlemonactive = false;
var lemonbrotherson = false;
var lemonstaron = false;
var hamsterdevilbosson = false;

  function bossdefeat() {
    doppelhamsteron = false;
    notacceptableon = false;
    lemonbrotherson = false;
    lemonstaron = false;
    if (hamsterdevilbosson) {devilhamsterdefeated++;}
    hamsterdevilbosson = false;
    bosstimer = false;
    bosstime = 0;
    bosstimeaction = 100;
    bossmove = [0,true];
    bossbodyarray = [];
    bosstargets = [];
    bossattackarray = [];
    prebossattackarray = [];
    bosson = false;
    bossattackimg.src = "bosses/boss_attack.png"
    score = score+(10*level)
    bossesdefeated++;
    level++;
    $("#Level").html(" Level: "+level+" ");
    if (level > highestlevelreached && (currenthamster != "Baby" && currenthamster != "Robo")) { highestlevelreached = level};
    bossintrotime = 0;
    createfood();
    musicpicker();
  }

  function doppelhamster(n) {
    bosstargetimg.src = "cough_drop.png"
    doppelhamsteron = true;
    bossbodyarray = [];
    bosstargets = [newrandomobject()];
    if (n > 0 && n < 3) {
      logtext("The DoppelHamster weakens from the cherry drop goodness. HHHIIISSS!")
    } else if (n >= 3) {
      logtext("DoppleHamster has been defeated!");
      bossdefeat();
    };
  };
var lemonstarlazerswitch = false;
var lemonstaropen = false;
var lemonstarvibrate = [0,true,0,0]
var lemonstarbodyopen = [
    [1,2,3,4,12,13,14,15],
    [1,2,3,13,14,15],
    [1,2,14,15],
    [1,15],
    [1,15],
    [],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
    [],
    [1,15],
    [1,15],
    [1,2,14,15],
    [1,2,3,13,14,15],
    [1,2,3,4,12,13,14,15],
    ]
var lemonstarbodyclosed = [
    [1,2,3,4,12,13,14,15],
    [1,2,3,13,14,15],
    [1,2,14,15],
    [1,15],
    [1,15],
    [],
    [],
    [],
    [],
    [],
    [1,15],
    [1,15],
    [1,2,14,15],
    [1,2,3,13,14,15],
    [1,2,3,4,12,13,14,15],
    ]
  function lemonstar(n) {
    bosstargetimg.src = "cough_drop.png"
    bossattackimg.src = "bosses/lemon_star_lazer.png"
    lemonstaron = true;
    lemonstarvibrate = [0,true,0,0]
    bosstime = 0;
    bosstimeaction = 100-(20*n);
    bosstargets = [];
    if (n == 0) {
      lemonstaropen = false;
      bossbodymaker(15,15,4,lemonstarbodyclosed);
    } else if (n > 0 && n < 3) {
      logtext("There goes one cough drop powered reactor. ")
    } else if (n >= 3) {
      logtext("The Lemon Star explodes in some cgi action that is too awesome for your human brain to comprehend. Too bad for you.");
      bossdefeat();
    };
  };

var notacceptablemouth = false;
  function notacceptable(n) {
    bosstargetimg.src = "bosses/notacceptable_target.png"
    notacceptableon = true;
    prebossattackarray = [];
    bossattackarray = [];
    bosstimer = true;
    bosstime = 0;
    bosstimeaction = 60-(n*10);
    bosstargets = [newrandomobject()];
    if (n == 0) {
      a = [
          [1,2,3,4,6,7,8],
          [1,2,3,6,7,8],
          [1,2,3,5,6,7,8],
          [1,2,6,7,8],
          [1,2,7,8],
          [1,8],
          [],
          [],
          ]
      bossbodymaker(8,18,7,a);
      bosstargets = [newrandomobject()];
    } else if (n > 0 && n < 3) {
      logtext("The Not Acceptable Honey Lemon exclaims 'No, not my pud! NOT ACCEPTABLE!!!!'")
    } else if (n >= 3) {
      logtext("'Not Acceptab......' The Not Acceptable Honey Lemon collapses")
      bossdefeat();
    };
  };

  var devilhamsterbody = [
      [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],
      [3,4,5,6,7,8,9,10,11],
      [],
      [15],
      [15],
      [15],
      [1,15],
      [1,15],
      [],
      [],
      [],
      [],
      [1,15],
      [1,2,14,15],
      [1,2,3,13,14,15],
      ]
  var devilattack = ["cluster"]

    function hamsterdevilboss(n) {
      bosstargetimg.src = "characters/robo_hammy.png"
      hamsterdevilbosson = true;
      prebossattackarray = [];
      bossattackarray = [];
      devilattack = ["cluster"]
      bosstime = 0;
      bosstimeaction = 50;
      bosstargets = [];
      if (n == 0) {
        bossbodymaker(15,15,4,devilhamsterbody);
        $("#NomMusicPlayer").attr("src", "DevilMusic.mp3");
        if (musicmute == false) {audio.play()};
      } else if (n > 0 && n < 3) {
        logtext("Robot Hamster Laser!!!!!!!!! That will show the devil!")
      } else if (n >= 3) {
        logtext("You have defeated the hamster devil!")
        bossdefeat();
      };
    };

  // function hyperlemon(n) {
  //   bosstargetimg.src = "cough_drop.png"
  //   hyperlemonactive = true;
  //   bossbodyarray = [newrandomobject()];
  //   bosstargets = [newrandomobject()];
  //   if (n > 0 && n < 3) {
  //     logtext("The DoppelHamster weakens from the cherry drop goodness. HHHIIISSS!")
  //   } else if (n >= 3) {
  //     logtext("DoppleHamster has been defeated!");
  //     bossdefeat();
  //   };
  // };

var lemonbrothersmove = false;
var lemonbrothersdir = "right";
  function lemonbrothers(n) {
    bosstargetimg.src = "cough_drop.png"
    lemonbrotherson = true;
    bossattackarray = [];
    bosstargets = [];
    if (n > 0 && n < 3) {
      logtext("Ouch! 'This is all your fault!' one brother says to the other.")
    } else if (n >= 3) {
      logtext("The lemon brothers run away");
      bossdefeat();
    } else if (n == 0) {
      bossbodyarray = [{x:0,y:0},{x:0,y:22}];
    };
  };


  // Buttons
    $("#StartButton").click(function(){
      if (!gameon) {
        init();
        logtext("Time to drop it! Cough Drops that is! ;) ")
      };
    });

    $("#MuteButton").click(function(){
      musicmute = !musicmute
      if (musicmute == true) {logtext("God, that gets annoying! ");
    } else {
      logtext("Nom on, baby!")
    }
    nommusic();
    });

    $("#PauseButton").click(function(){
      pause();
    });

  var instructionson = false
    $("#InstructionsButton").click(function(){
      instructionson = !instructionson;
      if (instructionson == true) {
        clearInterval(title_loop);
        ctx.drawImage(instructionimg, 0,0,w,h);
      } else {
        title_loop = setInterval(titlepage, 100);
      }
    });
  // character select
      $("#Hammy").click(function(){
        currenthamster = "Hammy";
        logtext("You have selected Hammy. Such a cute hamster makes hamster friends more easily")
      });

      $("#OldHammy").click(function(){
        currenthamster = "Old";
        logtext("You have selected Old Man Hammy. Takes it easy and moves 25% slower.")
      });

      $("#CoolHammy").click(function(){
        currenthamster = "Cool";
        logtext("You have selected Cool Hammy. This cool guy makes cool lemons more frequent and powerful.")
      });

      $("#CyborgHammy").click(function(){
        currenthamster = "Cyborg";
        logtext("You have selected Cyborg Hammy. Faster gaining and more max power. All cough drops will be assimilated... in my belly!")
      });

      $("#BardHammy").click(function(){
        currenthamster = "Bard";
        logtext("You have selected Bard Hammy. He plays copyright free music and slows the rate of new lemon cough drops.")
      });

      $("#BarbarianHammy").click(function(){
        currenthamster = "Barbarian";
        logtext("You have selected Barbarian Hammy. He moves faster and his rage will scare all the pathetic lemon drops on level up.")
      });

      $("#HamHammy").click(function(){
        currenthamster = "Ham";
        logtext("You have selected Ham Hammy. Ham cannot make friends (the hamsters are vegetarian), but can handle the occational lemon drop.")
      });

      $("#TimeHammy").click(function(){
        currenthamster = "Time";
        logtext("You have selected Time Hammy. Slows down time while invisible. He lives in a big blue box. (It's a shoe box ^_^)")
      });

      $("#BabyHammy").click(function(){
        currenthamster = "Baby";
        logtext("You have selected Baby Hammy. Moves at half speed but is too young to accumulate many stats. So cute for casuals.")
      });

      $("#DevilHammy").click(function(){
        currenthamster = "Devil";
        logtext("You have selected The Hamster Devil. Basks in the suffering of others. Also is colorblind. Cool lemons are not cool with the devil. ")
      });

      $("#ThiefHammy").click(function(){
        currenthamster = "Thief";
        logtext("You have selected Thief Hammy. This cunning hamster figured out how to move backwards. 'Just turn around, you guys.' -Thief Hammy")
      });

      $("#HobbitHammy").click(function(){
        currenthamster = "Hobbit";
        logtext("You have selected Hobbit Hammy. Unlimited invisibility but it's use summons wraith honey lemons that are immune to invisibility.")
      });

      $("#RoboHammy").click(function(){
        currenthamster = "Robo";
        logtext("Robo Hammy automatically collects cough drops. 'What.is.my.propose?' 'To collect cough drops' 'Oh.my.god!'")
      });

// Robo Hammy AI functions
var coughdropmap = [];
  function makemap() {
    coughdropmap = [];
    for (var i = 0; i <= 22; i++) {
      line = [];
      for (var j = 0; j <= 44; j++) {
        line.push("-")
      }
      coughdropmap.push(line)
    }
    for (var i = 0; i < honeylemon.length; i++) {
      coughdropmap[honeylemon[i].y][honeylemon[i].x] = "L";
    }
    for (var i = 0; i < bossbodyarray.length; i++) {
      coughdropmap[bossbodyarray[i].y][bossbodyarray[i].x] = "L";
    }
    for (var i = 0; i < bossattackarray.length; i++) {
      coughdropmap[bossattackarray[i].y][bossattackarray[i].x] = "L";
    }
  }
  function findroutes(gx,gy) {
    distance = 0;
    coughdropmap[gy][gx] = 0;
    checkingarray = [{x:gx,y:gy}];
    i = 0
    while (checkingarray.length > 0) {
        i++;
        nextspace = checkingarray.shift();
        cx = nextspace.x;
        cy = nextspace.y;
        distance = coughdropmap[cy][cx];
        dx = cx-1;
        if (dx == -1) {dx = 44}
        if (coughdropmap[cy][dx] == "-" || coughdropmap[cy][dx] > distance+1) {
          coughdropmap[cy][dx] = distance+1;
          checkingarray.push({x:dx,y:cy});
        }
        dx = cx+1;
        if (dx == 45) {dx = 0}
        if (coughdropmap[cy][dx] == "-" || coughdropmap[cy][dx] > distance+1) {
          coughdropmap[cy][dx] = distance+1;
          checkingarray.push({x:dx,y:cy});
        }
        dy = cy-1;
        if (dy == -1) {dy = 22}
        if (coughdropmap[dy][cx] == "-" || coughdropmap[dy][cx] > distance+1) {
          coughdropmap[dy][cx] = distance+1;
          checkingarray.push({x:cx,y:dy});
        }
        dy = cy+1;
        if (dy == 23) {dy = 0}
        if (coughdropmap[dy][cx] == "-" || coughdropmap[dy][cx] > distance+1) {
          coughdropmap[dy][cx] = distance+1;
          checkingarray.push({x:cx,y:dy});
        }
    }
    // console.log(i);
    // stringshow = ""
    // for (var i = 0; i < coughdropmap.length; i++) {
    //   stringshow += coughdropmap[i].join(" ") +"<br>"
    // }
    // $("#MapTest").html(stringshow);
  }
// var robostay = false
  function robohammyai(rx,ry) {
    goal = {x:rx,y:ry}
    if (coollemons.x != -1) {
      goal = coollemons;
    } else if (food.x != -1) {
      goal = food;
    } else if (bosstargets.length != 0){
      goal = bosstargets[0]
    } else {
      for (var i = 20; i < 44; i++) {
        if (coughdropmap[3][i] != "L" && coughdropmap[3][i+1] != "L") {
          goal = {x:i,y:3};
          i = 44;
        }
      }
    }
    makemap();
    findroutes(goal.x,goal.y);
    distance = coughdropmap[ry][rx]
    if (distance == "-" || distance == "L") {return directrobohammyai(rx,ry)}
    if (invisibilityon) {invisibility()}

    dy = ry+1;
    if (dy == 23) {dy = 0}
    if (coughdropmap[dy][rx] < distance) {
      ry = dy;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "down"
    }
    dy = ry-1;
    if (dy == -1) {dy = 22}
    if (coughdropmap[dy][rx] < distance) {
      ry = dy;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "up"
    }
    dx = rx+1;
    if (dx == 45) {dx = 0}
    if (coughdropmap[ry][dx] < distance) {
      rx = dx;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "right"
    }
    dx = rx-1;
    if (dx == -1) {dx = 44}
    if (coughdropmap[ry][dx] < distance) {
      rx = dx;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "left"
    }
    return "right"
  }
  function directrobohammyai(rx,ry) {
    if (coollemons.x != -1) {
      goal = coollemons;
    } else if (food.x != -1) {
      goal = food;
    } else if (bosstargets.length != 0){
      goal = bosstargets[0]
    } else {
      for (var i = 5; i < 44; i++) {
        if (coughdropmap[5][i] != "L" && coughdropmap[5][i+1] != "L") {
          goal = {x:i,y:5};
          i = 44;
        }
      }
    }
    distance = Math.abs(rx-goal.x) + Math.abs(ry-goal.y);
    if (invisibilityon) {invisibility()}
    if (Math.abs(rx-goal.x) + Math.abs((ry+1)-goal.y) < distance) {
      ry++;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "down"
    }
    if (Math.abs(rx-goal.x) + Math.abs((ry-1)-goal.y) < distance) {
      ry--;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "up"
    }
    if (Math.abs((rx+1)-goal.x) + Math.abs(ry-goal.y) < distance) {
      rx++;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "right"
    }
    if (Math.abs((rx-1)-goal.x) + Math.abs(ry-goal.y) < distance) {
      rx--;
      if ((checkcollision(rx,ry,honeylemon) || checkcollision(rx,ry,bossbodyarray) || checkcollision(rx,ry,bossattackarray)) && secondghost == false) {invisibility()}
      return "left"
    }
  }



// cookies
  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function saveScores() {
    setCookie("highnoms", highnoms, 365);
    setCookie("timesplayed", timesplayed, 365);
    setCookie("hamsterslost", hamsterslost, 365);
    setCookie("cherrydropstotal", cherrydropstotal, 365);
    setCookie("coollemonstotal", coollemonstotal, 365);
    setCookie("longesthamsterchain", longesthamsterchain, 365);
    setCookie("invisibilityturns", invisibilityturns, 365);
    setCookie("highestlevelreached", highestlevelreached, 365);
    setCookie("bossesdefeated", bossesdefeated, 365);
    setCookie("devilhamsterdefeated", devilhamsterdefeated, 365);
  };
})
