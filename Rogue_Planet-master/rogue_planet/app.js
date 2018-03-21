
$('#JavascriptBlock').hide();
$("#PageText").hide();

var log = ["<br>"]
function logtext(text) {
  log.push(text+ "<br>");
  log.shift()
  $('#Log').html(log);
};

// function beep() {
//   var snd = new Audio();
//   snd.src = "movement_sound.mp3";
//   snd.play();
// };

$(document).ready(function(){
	//Canvas stuff
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var cw = 10;
  var xmax = (w/cw)-1
  var ymax = (h/cw)-1
	var d;
  var musicmute = true;
  var musicon = false;
  var audio = document.getElementById('MusicPlayer');
  // game stuff
  var gamedifficulty = "Easy"
  var gameon = false;
  var shake = [0,true,0,1];
  var resourcerate;
  var crystalrate;
  var totalturns;
  var newbaseresources;
  var curresources;
  var curcrystals;
  var curcolonists;
	var clusterspaces = [];
  var revdangerspaces = [];
  var beaconspaces = [];
	var score;
  var level;
  var animateturns;
  var gameturns;
	var guides_array;
  var speed;
  var collisionspace;
  var curpage = "Status"
  var worldmap = [];
  var basespaces = [];
  var beaconfound = false;
  // guide creation
  var deploying = 0;
  var newtarget
  var newlight
  var newnav
  var newsurvival
  var newspeed
  var newsenses
  var newlightrate
  var lightuse
  var deflight
  var defnav
  var defsurvival
  var defspeed
  var defsenses
  var newoneway
  var newcaution
  // images
  var titleimage = new Image();
  var guideimg = new Image();
  var targetimg = new Image();
  var dangerimg = new Image();
  var basecircleimg = new Image();
  var lightimg = new Image();
  var beaconimg = new Image();
  beaconimg.src = "beacon.png"
  lightimg.src = "light.png"
  titleimage.src = "Title_Background.png"
  basecircleimg.src = "base_circle.png"
  guideimg.src = "light.png"
  targetimg.src = "target.png";
  dangerimg.src = "danger.png";

  ctx.drawImage(titleimage, 0,0,w,h);

  musictoggle();

  ctx.drawImage(titleimage, 0,0,w,h);

	function init()
	{
    gameon = true;
    // score = 0;
    level = 1;
    speed = 100;
    animateturns = 0;
    gameturns = 0;
    totalturns = 1500;
    deploying = 0;
    if (gamedifficulty == "Unlimited") {
      curresources = 99999;
      curcrystals = 99999;
      curcolonists = 99999;
      newbaseresources = 99999;
      resourcerate = 0;
      crystalrate = 20;
      totalturns = 99999999999;
    } else if (gamedifficulty == "Easy") {
      curresources = 750;
      curcrystals = 1000;
      curcolonists = 100;
      newbaseresources = 500;
      crystalrate = 3;
      resourcerate = 1;
    } else if (gamedifficulty == "Hard") {
      curresources = 500;
      curcrystals = 500;
      curcolonists = 70;
      newbaseresources = 400;
      crystalrate = 2;
      resourcerate = 1;
    }
    basespaces = [];
    clusterspaces = [];
    guides_array = [];
    dangerspaces = [];
    beaconspaces = [];
    context = document.getElementById('canvas').getContext("2d");
    function getClickPosition(e) {
      if (curpage == "Guide") {
        xp = (e.clientX-document.getElementById('canvas').offsetLeft)/cw | 0;
        yp = (e.clientY-document.getElementById('canvas').offsetTop)/cw | 0;
        newtarget = {x:xp,y:yp};
        createguide();
      }
    }
    document.getElementById('canvas').addEventListener("click", getClickPosition, false);

    $("#Level").html(" Level: "+level+" ");
		createlevel();
    $(".CharacterButtons").hide();
    statustext()
    $('#ScoreLine').show();

		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, speed);
    musicpicker();
	}

  function musicpicker(boss = false) {
    $("#MusicPlayer").attr("src", "background_sound.mp3");
    // audio.playbackRate=0.5;
    if (musicmute == false) {audio.play()}
  }

  // Random object maker
  function newrandom(){
    obj = {
      x: Math.round(Math.random()*(xmax-1)),
      y: Math.round(Math.random()*(ymax-1)),
    };
    return overlapchecker(obj);
  };

  function overlapchecker(obj) {
    for (var i = 0; i < dangerspaces.length; i++) {
      if (dangerspaces[i].x == obj.x && dangerspaces[i].y == obj.y) { return newrandom()}
    };
    for (var i = 0; i < basespaces.length; i++) {
      if (basespaces[i].x == obj.x && basespaces[i].y == obj.y) { return newrandom()}
    };
    for (var i = 0; i < clusterspaces.length; i++) {
      if (clusterspaces[i].x == obj.x && clusterspaces[i].y == obj.y) { return newrandom()}
    };
    return obj;
  };

  function newrandomobject() {
    newobject = newrandom();
     return newobject
  }

  function newrandomcluster() {
    rand = newrandomobject();
    clusterarea = createarea(rand.x,rand.y,4)
    for (i = 0;i < clusterarea.length; i++) {
      nodex = clusterarea[i].x
      nodey = clusterarea[i].y
      if ((nodex > 20-level && nodex < 29+level) || (nodey > 20-level && nodey < 29+level)) { return newrandomcluster() }
      if ((nodex < 14-level || nodex > 43+level) || (nodey < 14-level || nodey > 43+level)) { return newrandomcluster() }
    }
    return clusterarea
  }

  //create the area
  function createarea(sx,sy,size) {
    array = []
    for (i = sx;i < sx+size; i++) {
      for (j = sy;j < sy+size; j++) {
        array.push({x:i,y:j});
      }
    }
    return array
  }
	function createlevel() {
    beaconfound = false;
    revdangerspaces = [];
    basespaces = [];
    clusterspaces = [];
    dangerspaces = [];
    beaconspaces = [];
    guides_array = [];
    basespaces = createarea(23,23,4)
    clusterspaces = newrandomcluster()
    // add danger
    for(var i=0; i < (level*80); i++){
      newdanger = newrandomobject();
      dangerspaces.push(newdanger);
    };
	}
  // stats checker
  function statschecker(stat) {
    n = Math.random()*100
    if (n <= stat) {
      return true
    } else {
      return false
    }
  }
  // game turn
  function gameturn() {
    // increment Resources
    gameturns++;
    if (curresources < resourcerate) {
      curresources = 0;
      curcolonists--;
      logtext("Your colonists are starving!")
    } else {
      curresources -= resourcerate;
    }
    if (curcolonists <= 0) {
      gameon = false;
      pause("pause");
      textpage("The last of you colonists has surcumed to starvation. All alone you end up taking your own life before the creatures have a chance. (Thanks for playing, click start to play again)")
      return
    }
    if (gameturns >= totalturns) {
      gameon = false;
      pause("pause");
      textpage("A ship appears through the mist. It apears that they have recived your signal. You and the other colonists are saved! (Thanks for playing, click start to play again)")
      return
    }
    if (deploying > 0) {deploying--}
    curcrystals += crystalrate
    var statusbartext = "Resources: " + curresources + " Crystals: " + curcrystals + " colonists: " + curcolonists ;
    $("#Score").html(statusbartext)
    if (curpage == "Status") {
      statustext()
    } else if (curpage == "Guide") {
      createguide()
    }
    // guide turns
    splice_array = []
    for (g = 0;g < guides_array.length; g++) {
      guides_array[g].turns++;
      navagate = 100
      if( !checkcollision(guides_array[g].x, guides_array[g].y, basespaces) ) {
        // light
        if (guides_array[g].light > 0) {
          guides_array[g].light -= guides_array[g].lightrate;
          if (guides_array[g].light <= 0) {
            if (guides_array[g].dead) {
              logtext("A guide's light just went out. We can infer from thier lack of movement recently that they are dead.");
              revdangerspaces.push({x:guides_array[g].x, y:guides_array[g].y});
            } else {
              logtext("A guide's light just went out.");
              if (guides_array[g].lightrate == 1) {
                guides_array[g].navagate -= 20;
                guides_array[g].senses -= 20;
                guides_array[g].survival -= 20
              } else if (guides_array[g].lightrate == 2) {
                guides_array[g].navagate -= 30;
                guides_array[g].senses -= 40;
                guides_array[g].survival -= 30;
              } else if (guides_array[g].lightrate == 3) {
                guides_array[g].navagate -= 40;
                guides_array[g].senses -= 70;
                guides_array[g].survival -= 50;
              }
            }
          }
        }
        // creatures
        if (guides_array[g].turns == guides_array[g].spd) {
          if (statschecker(level/2.0)) {
            if (!statschecker(guides_array[g].survival)) {
              guides_array[g].dead = true;
              guides_array[g].light = 0;
              logtext("A guide's light suddenly went out.");
              splice_array.push(guides_array[g]);
            }
          }
        }
        navagate = guides_array[g].navagate
      }
      // movement
      if (!guides_array[g].dead) {
        if (guides_array[g].oneway == "Attempt to Return" && guides_array[g].light <= guides_array[g].startlight/2 && !guides_array[g].returning) {
          logtext("A guide turns back before the point of no return.");
          guides_array[g].returning = true;
          guides_array[g].tx = xmax/2 | 0;
          guides_array[g].ty = ymax/2 | 0;
        }
        if (guides_array[g].turns == guides_array[g].spd) {
          // if (!musicmute) {beep()}
          guides_array[g].turns = 0
          var nx = guides_array[g].x;
          var ny = guides_array[g].y;
          var tx = guides_array[g].tx;
          var ty = guides_array[g].ty;
          // sense danger spaces
          for (var ix = (nx-1); ix <= (nx+1); ix++) {
            for (var iy = (ny-1); iy <= (ny+1); iy++) {
              if (statschecker(guides_array[g].senses) && checkcollision(ix,iy, dangerspaces)) {
                guides_array[g].founddanger.push({x:ix, y:iy})
                // console.log("danger found");
              }
            }
          }
          // pathfinding
          d = pathfindingai(nx,ny,tx,ty, guides_array[g].founddanger, navagate)
          nx = d[0]
          ny = d[1]
          guides_array[g].x = nx
          guides_array[g].y = ny
          // if danger hit
          if( checkcollision(nx, ny, dangerspaces) ) {
            if (!statschecker(guides_array[g].survival)) {
              guides_array[g].dead = true
            } else {
              guides_array[g].founddanger.push({x:nx, y:ny})
            }
          }
          // if cluster hit
          if (checkcollision(nx,ny, clusterspaces)) {
            logtext("A guide just set off their beacon. They must have found a cluster!")
            beaconspaces.push(guides_array[g]);
            splice_array.push(guides_array[g]);
            beaconfound = true;
          }
          // if target is hit
          if (nx == tx && ny == ty) {
            if (guides_array[g].returning) {
              if (guides_array[g].light <= 0) {
                logtext("A guide just made it back dispite running out of light")
              } else {
                logtext('A guide has returned to base camp.');
              }
              splice_array.push(guides_array[g])
              dangers = guides_array[g].founddanger
              for (dn = 0; dn < dangers.length; dn++) {
                revdangerspaces.push(dangers[dn]);
              }
              curcrystals += guides_array[g].light;
              curcolonists++;
            } else {
              if (guides_array[g].light > 0 ) {logtext('A guide reached their target. Attempting to return to base camp.')};
              guides_array[g].returning = true;
              guides_array[g].tx = xmax/2 | 0;
              guides_array[g].ty = ymax/2 | 0;
            }
          }
        }
      }
      if (guides_array[g].dead && guides_array[g].light <= 0) {
        splice_array.push(guides_array[g]);
      }
    }
    for (g = 0; g < splice_array.length;g++) {
      guides_array.splice(guides_array.indexOf(splice_array[g]), 1)
    }
  }

  //paint and animate the canvas
	function paint() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, w, h);
		ctx.strokeStyle = "black";
		ctx.strokeRect(0, 0, w, h);
    animateturns++;
    if (animateturns >= 10) {
      animateturns = 0
      gameturn();
    }
    if (!gameon) {
      clearInterval(game_loop)
      return
    }

    // draw up stuff
    function drawarray(array,img) {
      for(var i = 0; i < array.length; i++) {
        context.drawImage(img, array[i].x*cw, array[i].y*cw, cw, cw);
      }
    }
    shake = flickering(shake[0],shake[1],shake[2],shake[3]);
    context.drawImage(lightimg, (w/2)-25+shake[0], (h/2)-25+shake[0], 50-shake[0], 50-shake[0]);
    context.drawImage(basecircleimg, (w/2)-20, (h/2)-20, 40, 40);
    drawarray(beaconspaces,beaconimg);
    context.save();
    flashing();
    // drawarray(dangerspaces,dangerimg);
    // drawarray(clusterspaces,targetimg);
    drawarray(revdangerspaces,dangerimg);
    if (curpage == "Guide") {context.drawImage(targetimg, newtarget.x*cw, newtarget.y*cw, cw-shake[0], cw-shake[0]);}
    for(var i = 0; i < guides_array.length; i++) {
      dimming = Math.ceil(cw * (guides_array[i].light/guides_array[i].startlight))
      context.drawImage(guideimg, guides_array[i].x*cw, guides_array[i].y*cw, dimming, dimming);
    }
    context.restore();

	}

  var flash = false;
  function flashing() {
    if (flash) {
      ctx.globalAlpha = 0.8;
    };
      flash = !flash
  };

	function checkcollision(x, y, array)
	{
		for(var i = 0; i < array.length; i++) {
			if(array[i].x == x && array[i].y == y) {return true};
		}
		return false;
	}

  var pauseon = false;
  function pause(force = false) {
    if (!force) {
      pauseon = !pauseon
    } else if (force = "pause") {
      pauseon = true
    } else {
      pauseon = false
    }
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
  function musictoggle() {
    musicmute = !musicmute
    audio = document.getElementById('MusicPlayer');
    // audio.volume = .04;
    if (musicmute) { logtext("Sound off")}
    if (!musicmute && !musicon) {
      audio.play();
      musicon = true;
      logtext("Sound on")
    } else {
      audio.pause();
      musicon = false;
    }
  };

	$(document).keydown(function(e){
		var key = e.which;
    if (key == "32") pause();
    if (key == "77") musictoggle();
	});

  function flickering(current,positive,n = 2, rate = 1) {
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

  // Buttons
    $("#StartButton").click(function(){
      if (!gameon) {
        $("#InstructionsButton").hide();
        introtext = "Our colony ship has crash landed on a small rogue planet far away from the light of any star. Fortunately, the atmosphere is breathable (with some minimal filters) and the temperature is above freezing thanks to volcanic activity. However, the mist that covers this planet blocks even the brightest of our conventional lights and unknown creatures roam the darkness. We lost many before a few of us stumbled across a cluster of large crystals that radiate a strange green light that cuts through the darkness and keeps the creatures at bay. There are a few resources we can use around but it is not enough. We gathered what and who we could and set off a distress signal. We will need to keep moving to survive til rescue."
        introtext += "<br><br><img src='light.png' style='width: 20px;height: 20px'></img> - Green lights indicate the base and guides"
        introtext += "<br><br><img src='target.png' style='width: 20px;height: 20px'></img> - Red lights are for picking new guide targets (click map to change)"
        introtext += "<br><br><img src='danger.png' style='width: 20px;height: 20px'></img> - Orange lights indicate found dangerous areas;guides will now avoid"
        introtext += "<br><br><img src='beacon.png' style='width: 20px;height: 20px'></img> - [!] Marks indicate a cluster was found; base camp may be moved"
        introtext += "<br><br><button id='SuperEasyButton'>Unlimited</button><button id='EasyButton'>Easy</button><button id='HardButton'>Hard</button>"
        textpage(introtext)
      };
    });
    $(document).on('click','#SuperEasyButton',function(){
      gamedifficulty = "Unlimited"
      $("#canvas").show();
      $("#PageText").hide();
      init();
    });
    $(document).on('click','#EasyButton',function(){
      gamedifficulty = "Easy"
      $("#canvas").show();
      $("#PageText").hide();
      init();
    });
    $(document).on('click','#HardButton',function(){
      gamedifficulty = "Hard"
      $("#canvas").show();
      $("#PageText").hide();
      init();
    });
    $("#MuteButton").click(function(){
      musictoggle();
    });

    $("#PauseButton").click(function(){
      pause();
    });

    function textpage(text) {
      pause("pause");
      $("#canvas").hide();
      $("#PageText").show();
      $("#PageText").html(text);
    }

  var instructionson = false
    $("#InstructionsButton").click(function(){
      instructionson = !instructionson;
      if (instructionson == true) {
        textpage("==General==<br>"+"-collect crystals around camp <br>"
+"-send out guides into the darkness, looking for other crystal clusters. Find them and move your base before you run out of resources.<br>"
+"-guides will set off a beacon only if a cluster is found. If their light goes out, you can assume they are probably dead. (though they might surprise you)<br>"
+"-research til you can a distress signal through the mist, then continue to survive till rescue. (research not implement in time for Ludum Dare, distress signal is automatic)<br>"
+""
+"==Guide Stats==<br>"
+"Senses- odds of detecting a dangerous areas next to them.<br>"
+"Speed- rate at which the guide moves, saving time and light. lower numbers are faster<br>"
+"Survival- odds of surviving danger, either from areas or creatures in the dark<br>"
+"Navigation- reduce chance of getting lost (lost guides move in a random direction for a while)<br>"
+""
+"==Tips==<br>"
+"-Infer information. If a light stops moving, the guide probably fell into a crevasse and is dead. If a strong light suddenly goes out some creature got them.<br>"
+"-if a guide returns, they will report any dangerous areas they ran across.<br>"
+"-if a guide hits a cluster, they will set off their beacon and remain there.<br>"
+"-guides do not use light, get lost, or attacked by creatures while moving through camp.<br>")
      } else {
        pause();
        $("#canvas").show();
        $("#PageText").hide();
        if (!gameon) {
          ctx.drawImage(titleimage, 0,0,w,h);
        }
      }
    });
// main page
    function statustext() {
      textarray = [
                  "-Status-<br><br>",
                  "Resources = "+curresources+"<br><br>",
                  "Crystals = "+curcrystals+"<br><br>",
                  "Colonists = "+curcolonists+"<br><br>",
                  "Time Since Distress Signal = "+gameturns+"<br><br>",
                  "<button id='CreateGuideButton'>Send out a guide</button><br><br>",
                ];
      if (beaconfound) {textarray.push("<button id='MoveCampButton'>Move Base Camp</button>")}
      $('#StatusText').html(textarray);
    };

// send out guide page
    function createguide() {
      curpage = "Guide"
      textarray = [
                  "-Send out a guide-<br><br>",
                  "Trip = "+newoneway+" <button id='ChangeTripButton'>change</button><br><br>",
                  "Caution = "+newcaution+" <button id='ChangeCautionButton'>change</button><br><br>",
                  "Light Power = "+lightuse+" <button id='ChangeLightButton'>change</button><br><br>",
                  "Crystals = "+newlight+" <button id='ChangeCrystalsButton'>change</button><br><br>",
                  "Light Use Rate = "+newlightrate+"<br><br>",
                  "Navigation = "+newnav+"<br><br>",
                  "Speed = "+newspeed+"<br><br>",
                  "Senses = "+newsenses+"<br><br>",
                  "Survival = "+newsurvival+"<br><br>",
                  "(Click on the map to change coordinates)<br>",
                  "Target Coordinates = "+newtarget.x+","+newtarget.y+"<br><br>",
                ];
        if (deploying == 0) {
          textarray.push("<button id='SubmitGuideButton'>Deploy Guide</button>")
        } else {
          dtext = "Deploying"
          for (var i = 3; i > deploying; i--) {
            dtext += "."
          }
          textarray.push(dtext);
        }
        textarray.push("<br><br><button id='MainPageButton'>Return</button>")
        $('#StatusText').html(textarray);
    }
    $(document).on('click','#ChangeTripButton',function(){
      if (newoneway == "Attempt to Return") {
        newoneway = "One Way Trip";
      } else {
        newoneway = "Attempt to Return";
      }
      createguide();
    });
    $(document).on('click','#ChangeCrystalsButton',function(){
      if (newlight >= 200) {
        newlight = 0;
      } else {
        newlight += 10;
      }
      createguide();
    });
    $(document).on('click','#ChangeCautionButton',function(){
      if (newcaution == "Careful") {
        newcaution = "Rushed";
        newspeed -= 4;
        newsenses -= 40;
        newsurvival -= 20;
        newnav -= 20;
      } else if (newcaution == "Rushed") {
        newcaution = "Aware";
        newspeed += 2;
        newsenses += 20;
        newsurvival += 10;
        newnav += 10;
      } else {
        newcaution = "Careful";
        newspeed += 2;
        newsenses += 20;
        newsurvival += 10;
        newnav += 10;
      }
      createguide();
    });
    $(document).on('click','#ChangeLightButton',function(){
      if (lightuse == "Minimal") {
        lightuse = "Glowing";
        newlightrate++;
        newsenses += 20;
        newnav += 10;
        newsurvival += 10;
      } else if (lightuse == "Glowing") {
        lightuse = "Radiant";
        newlightrate++;
        newsenses += 30;
        newnav += 10;
        newsurvival += 20;
      } else if (lightuse == "Radiant") {
        lightuse = "None";
        newlightrate = 0;
        newsenses -= 60;
        newnav -= 40;
        newsurvival -= 50;
      } else {
        lightuse = "Minimal";
        newlightrate++;
        newnav += 20;
        newsenses += 20;
        newsurvival += 20;
      }
      createguide();
    });
    $(document).on('click','#CreateGuideButton',function(){
      newoneway = "Attempt to Return"
      newcaution = "Aware"
      lightuse = "Minimal"
      newlightrate = 1;
      newlight = 60;
      newnav = 80;
      newspeed = 4;
      newsenses = 30;
      newsurvival = 40;
      newtarget = {
        x: Math.round(Math.random()*(xmax-1)),
        y: Math.round(Math.random()*(ymax-1)),
      };
      createguide();
    });
    $(document).on('click','#SubmitGuideButton',function(){
      if (curcrystals >= newlight) {
        newguide = {
          x: xmax/2 | 0,
          y: ymax/2 | 0,
          tx: newtarget.x,
          ty: newtarget.y,
          turns: 0,
          light: newlight,
          lightrate: newlightrate,
          startlight: newlight,
          nav: newnav,
          survival: newsurvival,
          spd: newspeed,
          senses: newsenses,
          oneway: newoneway,
          founddanger: [],
          dead: false,
          returning: false,
        }
        curcolonists--;
        guides_array.push(newguide);
        curcrystals -= newlight;
        deploying = 3;
        createguide();
        logtext("A new guide was sent into the unknown");
      } else {
        logtext("Not enough crystals available")
      }
    });
    $(document).on('click','#MainPageButton',function(){
      curpage = "Status";
      statustext();
    });

// move camp to next level
    $(document).on('click','#MoveCampButton',function(){
      level++;
      crystalrate++;
      curcolonists++;
      curresources += newbaseresources;
      createlevel();
      logtext("We moved the camp to a new area and found more resources. The landscape is shifting, we have no idea where the next cluster is.");
    });

// Pathfinding AI functions
  function makemap(guidefound = []) {
    worldmap = [];
    for (var i = 0; i <= ymax; i++) {
      line = [];
      for (var j = 0; j <= xmax; j++) {
        line.push("-")
      }
      worldmap.push(line)
    }
    for (var i = 0; i < revdangerspaces.length; i++) {
      worldmap[revdangerspaces[i].y][revdangerspaces[i].x] = "L";
    }
    for (var i = 0; i < guidefound.length; i++) {
      worldmap[guidefound[i].y][guidefound[i].x] = "L";
    }
  }
  function findroutes(gx,gy) {
    distance = 0;
    worldmap[gy][gx] = 0;
    checkingarray = [{x:gx,y:gy}];
    i = 0
    while (checkingarray.length > 0) {
        i++;
        nextspace = checkingarray.shift();
        cx = nextspace.x;
        cy = nextspace.y;
        distance = worldmap[cy][cx];
        dx = cx-1;
        if (dx > -1) {
          if (worldmap[cy][dx] == "-" || worldmap[cy][dx] > distance+1) {
            worldmap[cy][dx] = distance+1;
            checkingarray.push({x:dx,y:cy});
          }
          dy = cy-1;
          if (dy > -1) {
            if (worldmap[dy][dx] == "-" || worldmap[dy][dx] > distance+1) {
              worldmap[dy][dx] = distance+1;
              checkingarray.push({x:dx,y:dy});
            }
          }
          dy = cy+1;
          if (dy < ymax+1) {
            if (worldmap[dy][dx] == "-" || worldmap[dy][dx] > distance+1) {
              worldmap[dy][dx] = distance+1;
              checkingarray.push({x:dx,y:dy});
            }
          }
        }
        dx = cx+1;
        if (dx < xmax+1) {
          if (worldmap[cy][dx] == "-" || worldmap[cy][dx] > distance+1) {
            worldmap[cy][dx] = distance+1;
            checkingarray.push({x:dx,y:cy});
          }
          dy = cy-1;
          if (dy > -1) {
            if (worldmap[dy][dx] == "-" || worldmap[dy][dx] > distance+1) {
              worldmap[dy][dx] = distance+1;
              checkingarray.push({x:dx,y:dy});
            }
          }
          dy = cy+1;
          if (dy < ymax+1) {
            if (worldmap[dy][dx] == "-" || worldmap[dy][dx] > distance+1) {
              worldmap[dy][dx] = distance+1;
              checkingarray.push({x:dx,y:dy});
            }
          }
        }
        dy = cy-1;
        if (dy > -1) {
          if (worldmap[dy][cx] == "-" || worldmap[dy][cx] > distance+1) {
            worldmap[dy][cx] = distance+1;
            checkingarray.push({x:cx,y:dy});
          }
        }
        dy = cy+1;
        if (dy < ymax+1) {
          if (worldmap[dy][cx] == "-" || worldmap[dy][cx] > distance+1) {
            worldmap[dy][cx] = distance+1;
            checkingarray.push({x:cx,y:dy});
          }
        }
    }
    // stringshow = ""
    // for (var i = 0; i < worldmap.length; i++) {
    //    stringshow += worldmap[i].join(" ") +"<br>"
    // }
    // $("#MapTest").html(stringshow);
  }

  function pathfindingai(rx,ry,gx,gy, guidedanger = [], nav = 100) {
    goal = {x:gx,y:gy}
    makemap(guidedanger);
    findroutes(goal.x,goal.y);
    distance = worldmap[ry][rx]
    if (distance == "-" || distance == "L" || !statschecker(nav)) {distance = 100}
    dy = ry+1;
    if (dy < ymax+1) {
      if (worldmap[dy][rx] < distance) {
        ry = dy;
        return [rx,ry]
      }
    }
    dy = ry-1;
    if (dy > -1) {
      if (worldmap[dy][rx] < distance) {
        ry = dy;
        return [rx,ry]
      }
    }
    dx = rx+1;
    if (dx < xmax+1) {
      if (worldmap[ry][dx] < distance) {
        rx = dx;
        return [rx,ry]
      }
    }
    dx = rx-1;
    if (dx > -1) {
      if (worldmap[ry][dx] < distance) {
        rx = dx;
        return [rx,ry]
      }
    }
    dy = ry+1;
    if (dy < ymax+1) {
      dx = rx+1;
      if (dx < xmax+1) {
        if (worldmap[dy][dx] < distance) {
          return [dx,dy]
        }
      }
      dx = rx-1;
      if (dx > -1) {
        if (worldmap[dy][dx] < distance) {
          return [dx,dy]
        }
      }
    }
    dy = ry-1;
    if (dy > -1) {
      dx = rx+1;
      if (dx < xmax+1) {
        if (worldmap[dy][dx] < distance) {
          return [dx,dy]
        }
      }
      dx = rx-1;
      if (dx > -1) {
        if (worldmap[dy][dx] < distance) {
          return [dx,dy]
        }
      }
    }
    return [rx,ry]
  }



// cookies (not used)
  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toUTCString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  }

  function saveScores() {

  };
})

