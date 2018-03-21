
$('#JavascriptBlock').hide();
$("#PageText").hide();
$('#GameHide').css("visibility", "visible")
// $('#DebugOptions').hide();


$(document).ready(function(){
//Canvas stuff
  var log = [""]
	var canvas = $("#canvas")[0];
	var ctx = canvas.getContext("2d");
	var w = $("#canvas").width();
	var h = $("#canvas").height();
	var cw = 10;
  var xmax = (w/cw)-1
  var ymax = (h/cw)-1
	var d;
  var div;
  var s;
  var musicmute = false;
  var soundmute = false;
  var musicon = false;
  var pauseon = false;
  var audio = document.getElementById('MusicPlayer');
  function musicpicker(game = false) {
    $("#MusicPlayer").attr("src", "I_Swear_Im_Trying.mp3");
    audio.volume = 0.5;
    if (musicmute == false) {audio.play()}
  }
  // musicpicker();
// game stuff
	var restoresave = false;
  var gamewin = false;
  var level = 1;
  var transitioning;
  var flash = false;
  var game_loop
  var gamelength = "Average"
  var gameon = false;
  var shake = [0,true,0,1];
  var animateturns;
  var playtime;
  var alarmtime;
  var speed;
  var damageicons;
  var screenclickicons = [];
  var lightmax;
  var sprinklerrate = 0;
  var sprinkly = 20;
  var levelscreen = false;
  var curlight = 0;
  var iconrotate = 0;
  var punchvariation = 0;
  var punchdamage = 0;
  var target = {}
  var goalammount = 4000;
  // var bossstats = {}
  var bulletarray = []
  var bullets;
  var playeroffset = {x: 0, y: 0}
  var playerdirect = {x: 0, y: 0}
  var movementrange = 50;
  var redattack;
  var redattackarray = [];
  var playershakearray = [0,true,0,1];
  var boss = {};
  var ko = 0;
  var speedcheck = 0;
  var playerlevel;
  var introtime = 0;
// images
  var titlepageimg = new Image();
  var arrowimg = new Image();
  var intropageimg = new Image();
  var levelbackimg = new Image();
  var treeimg = new Image();
  var rightfistimg = new Image();
  var leftfistimg = new Image();
  var rightfistpunchimg = new Image();
  var leftfistpunchimg = new Image();
  var greenlightimg = new Image();
  var yellowlightimg = new Image();
  var redlightimg = new Image();
  var bossimg = new Image();
  var redattackimg = new Image();
  var redleftimg = new Image();
  var redrightimg = new Image();
  var redupimg = new Image();
  var reddownimg = new Image();
  var bluelightimg = new Image();
  var whitelightimg = new Image();
  var placeholderimg = new Image();
  var introimg = new Image();
  introimg.src = "images/Intro.png"
  placeholderimg.src = "images/Placeholder.png"
  whitelightimg.src = "images/White_Light.png"
  bluelightimg.src = "images/Blue_Light.png"
  redleftimg.src = "images/Red_Left.png";
  redrightimg.src = "images/Red_Right.png";
  redupimg.src = "images/Red_Up.png";
  reddownimg.src = "images/Red_Down.png";
  redattackimg.src = "images/Red_Light.png"
  bossimg.src = "images/Cyber_Squirrel.png"
  redlightimg.src = "images/Red_Light.png"
  yellowlightimg.src = "images/Yellow_Light.png"
  greenlightimg.src = "images/Green_Light.png"
  rightfistpunchimg.src = "images/Right_Punch_Fist.png"
  leftfistpunchimg.src = "images/Left_Punch_Fist.png"
  rightfistimg.src = "images/Right_Fist.png"
  leftfistimg.src = "images/Left_Fist.png"
  treeimg.src = "images/Tree_Holder.png"
  arrowimg.src = "images/Next_Arrow.png"
  titlepageimg.src = "images/Title_Page.png"
  // intropageimg.src = "images/intro/intro1.png"
  levelbackimg.src = "images/Level_Back.png"
  var redcolors = [redleftimg,redrightimg,redupimg,reddownimg,redlightimg]
  // level images
  var levelarray = [];
  var bossimgarray = [];
  var road1img = new Image();
  var road2img = new Image();
  var road3img = new Image();
  road1img.src = "images/Level_Road1.png";
  road2img.src = "images/Level_Road2.png";
  road3img.src = "images/Level_Road3.png";
  var roadarray = [road1img,road2img,road3img]
  var hall1img = new Image();
  hall1img.src = "images/Hall1.png";
  var hallarray = [hall1img,hall1img,hall1img]
  var space1img = new Image();
  space1img.src = "images/Space1.png";
  var spacearray = [space1img,space1img,space1img]
  var squirrel1img = new Image();
  var squirrel2img = new Image();
  squirrel1img.src = "images/Squirrel1.png"
  squirrel2img.src = "images/Squirrel2.png"
  var squirrelimgarray = [squirrel1img,squirrel2img]
  var cyber1img = new Image();
  var cyber2img = new Image();
  cyber1img.src = "images/Cyber_Squirrel.png"
  cyber2img.src = "images/Cyber_Squirrel2.png"
  var cyberimgarray = [cyber1img,cyber2img]
  var square1img = new Image();
  var square2img = new Image();
  square1img.src = "images/Square.png"
  square2img.src = "images/Square2.png"
  var squareimgarray = [square1img,square2img]
  var levelanimate = 0;
  var bossanimate = 0;
// sounds
  var punchsounds = ["Right_Punch.wav", "Left_Punch.wav", "Deflect.wav", "Deflect2.wav"]
  function clicksound(select = 0) {
    var snd = new Audio();
    snd.src = punchsounds[punchvariation+select];
    snd.volume = 0.5;
    if (!soundmute) {snd.play();}
  };
  var attacksoundarray = ["Red_Warning.wav", "Bullet_Shoot.wav", "Player_Hit.wav", "White_Out.wav"]
  function attacksound(select = 0) {
    var snd = new Audio();
    snd.src = attacksoundarray[select];
    snd.volume = 0.5;
    if (!soundmute) {snd.play();}
  };
// Restore save button
	var cookiecheck = getCookie('level')
	if (cookiecheck > 0) {
		$('#Log').html("<button id='ContinueButton'>Continue your last game? Click me!</button>")
	}
// Full Screen
  function requestFullScreen(element) {
      // Supports most browsers and their versions.
      var requestMethod = element.requestFullScreen || element.webkitRequestFullScreen || element.mozRequestFullScreen || element.msRequestFullScreen;

      if (requestMethod) { // Native full screen.
          requestMethod.call(element);
      } else if (typeof window.ActiveXObject !== "undefined") { // Older IE.
          var wscript = new ActiveXObject("WScript.Shell");
          if (wscript !== null) {
              wscript.SendKeys("{F11}");
          }
      }
  }
  function toggleFullScreen() {
    if (!document.fullscreenElement &&    // alternative standard method
        !document.mozFullScreenElement && !document.webkitFullscreenElement && !document.msFullscreenElement ) {  // current working methods
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }
//titlepage
  var titlerotate = [0,true]
  function shaker(current,positive,n = 2, rate = 1) {
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
  function rotation(rw,rh,rotate = titlerotate[0]) {
    ctx.save();
    ctx.translate( rw, rh );
    ctx.rotate(rotate*Math.PI/180);
    ctx.translate( -rw, -rh );
  }
  function titleaction() {
    ctx.drawImage(titlepageimg, 0,0,w,h);
    if (introtime <= 30) {
      introtime++;
      ctx.drawImage(introimg, 0,0,w,h);
    } else {
      ctx.drawImage(titlepageimg, 0,0,w,h);
    }
    if (introtime == 30) {musicpicker()}
  }
  attacksound(0);
  // musicpicker();
  var titleloop = setInterval(titleaction, 100);
  // var introloop = setInterval(pretitlepage, 100);
// click logger
  context = document.getElementById('canvas').getContext("2d");
  function getClickPosition(e) {
    if (true) {
      xp = (e.clientX-(document.getElementById('canvas').offsetLeft)) | 0;
      yp = (e.clientY-(document.getElementById('canvas').offsetTop)) | 0;
      console.log(xp+" "+yp);
      if (levelscreen) {
        levelscreen = false;
      } else if (gameon && !pauseon) {
        screenclick(xp+playeroffset.x,yp+playeroffset.y);
      }
      if (!gameon) {
        if (gamewin) {
          endpages();
        } else {
          clearInterval(titleloop);
          instructionpageshow();
        }
      }
    }
  }
  // document.getElementById('canvas').prototype.relMouseCoords = relMouseCoords;
  document.getElementById('canvas').addEventListener("click", getClickPosition, false);
// log text stuff
  function logtext(text, alert = false) {
    log.push(text);
    log.shift()
    $('#Log').html(log);
  };
  var randomnews = []
  var rotatelog = 0;
// instruction page
  function instructionpageshow(){
    introtext = "Story:The year is 40XX and Cyborg squirrels have taken over the world. Now one stereotypical badass 80’s video game guy will defeat them the only way he knows how… with punches! Filled with unbeatable spirit, their advanced squirrel tech can only slow him down and enrage him. He is determined to punch as many squirrels as he can before he is overwhelmed by pure squirrel might, with their nasty, big, pointy, teeth!"
    introtext += "<br><br>Instructions: Run through waves of squirrels and take down as many as you can. As time goes on, the Alarm number goes up, the game gets faster and harder. Getting hit and defeating squirrels will also make it rise. When it reaches a point, the number in the () below, the game will end and you can see your score."
    introtext += "<br><br><img src='images/Squirrel1.png' style='width: 20px;height: 20px'>Click on the screen to punch that location."
    introtext += "<br><br><img src='images/Blue_Light.png' style='width: 20px;height: 20px'>Rapidly punch blue spots when they appear to do damage to the squirrel."
    introtext += "<br><br><img src='images/Yellow_Light.png' style='width: 20px;height: 20px'>Punch yellow bullets to block them or you will get hit."
    introtext += "<br><br><img src='images/Red_Light.png' style='width: 20px;height: 20px'>Use arrow keys (or WADS) to move out of the  way of flashing red sides of the screen or get hit. (Staying in the center will also mean you get hit)."
    // introtext += "<br><br>(No Upgrades yet, this is a lie :-P )Over time you get upgrades that can be accessed by the pause button (hotkey P). Pausing the game will stop the action but NOT the alarm from going up, so don’t take too long."
    introtext += "<br><br><button class='DifficultyButtons' title='Estimated good run time: ~6-7 minutes' id='QuickGameButton'>Punch Small!(1000)</button>"
    introtext += "<button class='DifficultyButtons' title='Estimated good run time: ~12-14 minutes' id='RegularGameButton'>Punch Average!(2000)</button>"
    introtext += "<button class='DifficultyButtons' title='Estimated good run time: ~20 minutes' id='MaxGameButton'>Punch To the Max!(4000)</button>"
    introtext += "<br><br><br>(This game is pretty basic, being a 48 hour Ludum Compo Game, mostly just a concept. Fun is still to be had, enjoy. :-) )"
    textpage(introtext)
  }
// final page
  function finalpageshow(){
		restoresave = false;
    transitioning = false;
    clearInterval(time_loop);
    text = "Story: After many a punch, the squirrels numbers become too great. The stereotypical badass 80’s video game guy is forced to retreat and tend to his many bite wounds. \"Not Bad\" he says while lighting a cigarette. \"I bet I can do better with some more practice\". For now, however, he rests. "
    text += "<br><br>Score: "+ko+" KO's | Run Time "+timemaker(playtime)+""
    text += "<br><br>Thanks for playing. I know that these Compo games are incomplete and buggy, but if you could leave feedback and ratings that would be awesome."
    text += "<br><br>(<img src='images/Squirrel1.png' style='width: 20px;height: 20px'></img>Rate it at: <a href='https://ldjam.com/events/ludum-dare/40/squirrel-puncher-4000'>https://ldjam.com/events/ludum-dare/40/squirrel-puncher-4000</a>)"
    text += "<br><br>Play Again?"
    introtext += "<br><br><button class='DifficultyButtons' title='Estimated good run time: ~6-7 minutes' id='QuickGameButton'>Punch Small!(1000)</button>"
    introtext += "<button class='DifficultyButtons' title='Estimated good run time: ~12-14 minutes' id='RegularGameButton'>Punch Average!(2000)</button>"
    introtext += "<button class='DifficultyButtons' title='Estimated good run time: ~20 minutes' id='MaxGameButton'>Punch To the Max!(4000)</button>"
    textpage(text)
  }
// text page function
	function textpage(text) {
		$("#canvas").hide();
		$("#PageText").show();
		$("#PageText").html(text);
	}
//game start
	function init()
	{
    transitioning = false;
    gameon = true;
    playerlevel = 0;
    level = 1;
    s = 50;
    div = 0.1;
    lightmax = 250;
    speed = 120;
    playtime = 0;
    alarmtime = 0;
    animateturns = 1;
    playtime = 0;
    gameon = true;
    pauseon = false;
    damageicons = [];
    screenclickicons = [];
    sprinklericons = [];
    sprinkly = 30;
    sprinklerrate = 0;
    gamewin = false;
    levelscreen = false;
    iconrotate = 1;
    randomnews = [];
    punchdamage = 100;
    bulletarray = [];
    redattackarray = [];
    bosspicker();
    playershake = 13;
    playershakearray = [0,true,0,1];
    ko = 0;
// Continue Save
		if (restoresave) {}
    statustext()
    $('#ScoreLine').show();
    upgradechecker();

		if(typeof game_loop != "undefined") clearInterval(game_loop);
		game_loop = setInterval(paint, speed);
    time_loop = setInterval(secondsturn, 1000)
    musicpicker();
	}
// click actions
  function screenclick(x,y) {
    if (punchvariation == 0) {
      rightfistimg.src = "images/Right_Punch_Fist.png"
      leftfistimg.src = "images/Left_Fist.png"
      punchvariation = 1;
    } else {
      rightfistimg.src = "images/Right_Fist.png"
      leftfistimg.src = "images/Left_Punch_Fist.png"
      punchvariation = 0;
    }
    if (checkhit(target.area, x, y)) {
      if (!soundmute) {clicksound();}
      statustext();
      spread = Math.floor(Math.random() * 20)-10
      screenclickicons.push({x: x, y: y,t: 0,spread: spread})
      boss.health -= punchdamage;
      if (boss.health <= 0 && !transitioning) {
        transitioning = true;
        bulletarray = [];
        redattackarray = [];
        attacksound(3);
      }
    }
    for (var i = 0; i < bulletarray.length; i++) {
      if (checkhit(bulletarray[i], x, y)) {
        bulletarray.splice(i,1);
        clicksound(2);
      }
    }
  }
// create stuff
  function createrandombullet(spd,type = 0,area = createarea((h*0.6),(w*0.5),(h*0.5))) {
    area = createtarget(area, 5)
    area.speed = spd;
    area.type = type;
    area.t = 0;
    return area;
  }

  function createarea(size, x, y) {
    return { sizex: size, sizey: size, xmin: x-(size*0.5) , ymin: y-(size*0.5) }
  }

  function createtarget(area,size = 50) {
    nx = randomnumber(area.xmin+(size/2),(area.xmin+area.sizex)-(size/2))
    ny = randomnumber(area.ymin+(size/2),(area.ymin+area.sizey)-(size/2))
    return createarea(size, nx, ny)
  }
  var redattackoptions = ["left","right","up","down"]
  function createrandomredattack(ammount = 1) {
    found = 0
    while (found < ammount) {
      n = randomnumber(0,3);
      if (redattackarray.length >= 3) { break };
      checkarray = []
      for (var i = 0; i < redattackarray.length; i++) {
        checkarray.push(redattackarray[i].dir);
      }
      if (checkarray.includes(n) == false) {
        redattackarray.push({dir: n,t: 0});
        found++;
      }
    }
  }

  function randomnumber(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }


  function checkhit(loc, x, y) {
    if (x >= loc.xmin && x <= loc.xmin+loc.sizex && y >= loc.ymin && y <= loc.ymin+loc.sizey) {
      return true
    } else {
      return false
    }
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
// Every second actions
  function secondsturn() {
    playtime++;
    alarmtime++;
    if (playerlevel < Math.floor(alarmtime/40)) {
      playerlevel = Math.floor(alarmtime/40);
      // adjustspeed();
    }
    rotatelog++;
    if (rotatelog >= 30 ) {
      rotatelog = 0
			rot = Math.ceil(Math.random() * randomnews.length)
			console.log(randomnews.length);
			console.log(rot);
      $('#Log').html(randomnews[Math.ceil(Math.random() * randomnews.length)])
    }
    if (alarmtime >= goalammount) {
      transitioning = true;
      gamewin = true;
    }
    statustext();
  }

//paint and animate the canvas
	function paint() {
    playermovement();
    shake = flickering(shake[0],shake[1],Math.ceil(div*5.0),Math.ceil(div*5.0));
    ctx.drawImage(levelarray[levelanimate], 0,0,w,h)
    if (animateturns % 2 == 0) {levelanimate++;}
    if (levelanimate > 2) {levelanimate = 1};
    animateturns++;
    if (animateturns >= 13) {
      animateturns = 1
    }
    if (animateturns <= 6) { bossanimate = 0 } else { bossanimate = 1 }
    ctx.drawImage(bossimgarray[bossanimate], (w*0.5)-(boss.size*0.5)-playeroffset.x,(h*0.5)-(boss.size*0.5)-playeroffset.y,boss.size,boss.size)
    sh = shake[0];
    target.rotate++;
    if (target.rotate >= target.rotaterate) {
      if (target.on && boss.name != "Square-irrel") {
        target.area = createtarget(boss.area, boss.size);
        if (boss.name == "Cyber Squirrel") {target.rotaterate = 50}
      } else if (boss.name != "Square-irrel"){
        target.area = createarea(1, -1, -1)
        if (boss.name == "Cyber Squirrel") {target.rotaterate = 150}
      } else {
        target.area = createtarget(boss.area, 80-Math.floor(playerlevel/2));
      }
      target.on = !target.on;
      target.rotate = 0;
    }
      context.drawImage(bluelightimg, target.area.xmin+sh-playeroffset.x, target.area.ymin+sh-playeroffset.y, target.area.sizex-sh, target.area.sizey-sh);
    redattack.time++;
    if (redattack.time >= redattack.rate+(bullets.shot*bullets.delay) && redattackarray.length == 0) {
      redattack.shot++;
      createrandomredattack(redattack.volley);
      if (redattack.shot >= redattack.ammount) {
        redattack.time = 0;
        redattack.shot = 0;
      }
    }
    bullets.time++;
    if (bullets.time >= bullets.rate+(bullets.shot*bullets.delay)) {
      bullets.shot++;
      attacksound(1);
      bulletarray.push(createrandombullet(bullets.speed))
      // console.log(bulletarray[0]);
      if (bullets.shot >= bullets.ammount) {
        bullets.time = 0;
        bullets.shot = 0;
      }
    }
    // drawhasharray(bulletarray,yellowlightimg);
    rediconmovement();
    damageiconmovement();
    if (animateturns <= 6) { fm = 0 } else { fm = 5 }
    if (playershake <= 12) {
      playershake++;
      psh = sh*15;
    } else {
      psh = 0;
    }
    ctx.drawImage(rightfistimg, (w*0.3)+(w*0.21)+playeroffset.x+psh,(h*0.61)+fm+playeroffset.y,(w*0.4),(h*0.45))
    ctx.drawImage(leftfistimg, (w*0.3)-(w*0.21)+playeroffset.x+psh,(h*0.61)+fm+playeroffset.y,(w*0.4),(h*0.45))
    rightfistimg.src = "images/Right_Fist.png"
    leftfistimg.src = "images/Left_Fist.png"
    bulleticonmovement();
    // if (playershake == 2) {
    //   context.drawImage(redlightimg, (w/2)-w, (h/2)-h, w*2, h*2);
    // }
    if (!gameon) {
      clearInterval(game_loop)
      return
    }
    if (transitioning) {
      if (gamewin) {
        transition("end");
      } else {
        transition();
      }
    }
	}
  function adjustspeed(mod = 1) {
    nspd = ((120 - Math.floor(playerlevel/2)) * mod);
    clearInterval(game_loop);
    game_loop = setInterval(paint, nspd);
  }
// graphical functions
  function drawarray(array,img,sx = 20, sy = 20) {
    for(var i = 0; i < array.length; i++) {
      context.drawImage(img, array[i].x, array[i].y, sx, sy);
    }
  }
  function drawhasharray(array,img) {
    for(var i = 0; i < array.length; i++) {
      context.drawImage(img, array[i].xmin, array[i].ymin, array[i].sizex, array[i].sizey);
    }
  }
  function flashing() {
    if (flash) {
      ctx.globalAlpha = 0.8;
    };
      flash = !flash
  };
  function transition(type = "level"){
    s *= 1.40;
    if (type == "level") {
      context.drawImage(whitelightimg, boss.x-(s/2), boss.y-(s/2), s, s);
    } else {
      context.drawImage(whitelightimg, (w/2)-(s/2), (h/2)-(s/2), s, s);
    }
    if (s >= 3000) {
      transitioning = false;
      s = 50;
      if (type == "level") {
        level++;
        bosspicker();
        ko++;
        alarmtime += 60;
      } else if (type == "end"){
        clearInterval(game_loop);
        gameon = false;
        gamewin = true;
        finalpageshow();
      }
    }
  }
// sprinkler and click animation
  function sprinkler(){
    sprinklerrate++;
    if (sprinklerrate >= sprinkly) {
      sprinklerrate = 0;
      spread = Math.floor(Math.random() * 20)-10
      screenclickicons.push({x: 250, y: 125,t: 0,spread: spread})
    }
  }
	// too late, hacky, get it done!
  function damageiconmovement(){
    found = true;
    while (found) {
      found = false;
      for (var i = 0; i < screenclickicons.length; i++) {
        cur = screenclickicons[i]
        cur.t++
        if (cur.t > 10) {
          screenclickicons.splice(i,1)
          found = true;
          continue
        } else if (cur.t < 5) {
          cur.x += cur.spread;
          cur.y -= 10;
        } else {
          cur.x += cur.spread;
          cur.y += 20;
        }
      }
    }
    for(var i = 0; i < screenclickicons.length; i++) {
      ctx.textAlign = "center"
      ctx.fillStyle = "red"
      ctx.font = "12px Comic Sans MS";
      ctx.fillText(punchdamage, screenclickicons[i].x-playeroffset.x ,screenclickicons[i].y-playeroffset.y);
    }
  }
// bullet movement
  function bulleticonmovement(){
    for (var i = 0; i < bulletarray.length; i++) {
      cur = bulletarray[i];
      cur.t++;
      cur.x -= (cur.speed*0.5)
      cur.y -= (cur.speed*0.5)
      cur.sizex = cur.t*cur.speed;
      cur.sizey = cur.t*cur.speed;
    }
    found = true;
    while (found) {
      found = false;
      for (var i = 0; i < bulletarray.length; i++) {
        cur = bulletarray[i];
        if (cur.sizex > 100) {
          bulletarray.splice(i,1)
          found = true;
          if (playershake > 12) { playerdamage(boss.damage,"Yellow") };
          continue
        }
      }
    }
    drawhasharray(bulletarray,yellowlightimg);
  }
// red attack
  // var redattackoptions = ["left","right","up","down","center"]
  function rediconmovement(){
    redattackoptions = ["left","right","up","down","center"]
    playerdirarray = []
    if (playerdirect.x == -50) { playerdirarray.push("left") }
    if (playerdirect.x == 50) { playerdirarray.push("right") }
    if (playerdirect.y == -50) { playerdirarray.push("up") }
    if (playerdirect.y == +50) { playerdirarray.push("down") }
    if (playerdirect.x == 0 && playerdirect.y == 0) { playerdirarray.push("center") }
    found = true;
    while (found) {
      found = false;
      for (var i = 0; i < redattackarray.length; i++) {
        cur = redattackarray[i];
        if (cur.t >= 5) {
          rdir = redattackoptions[cur.dir]
          if (playerdirarray.includes(rdir) || playerdirarray.includes("center")) {
            if (playershake > 12) { playerdamage() };
          }
          redattackarray.splice(i,1)
          found = true;
          continue
        }
      }
    }
    if ((animateturns+1) % redattack.speed == 0 && redattackarray.length > 0) {
      if (!soundmute) {attacksound(0);}
      for (var i = 0; i < redattackarray.length; i++) {
        cur = redattackarray[i];
        cur.t++;
        // redattackimg.src = redcolors[cur.dir];
        if (cur.dir == 4) {
          context.drawImage(redlightimg, w*0.35, h*0.35, w*0.3, h*0.3);
        } else {
          context.drawImage(redcolors[cur.dir], 0, 0, w, h);
        }
      }
    }
  }
// player animations
  function playermovement() {
    move = 0;
    if (playeroffset.x > playerdirect.x) {
      move = -25;
    } else if (playeroffset.x < playerdirect.x) {
      move = 25;
    }
    playeroffset.x += move;
    move = 0;
    if (playeroffset.y > playerdirect.y) {
      move = -25;
    } else if (playeroffset.y < playerdirect.y) {
      move = 25;
    }
    playeroffset.y += move;
  }
// damage
  function playerdamage(dam = boss.damage,type = "red") {
    alarmtime += dam;
    attacksound(2);
    playershake = 0;
    statustext();
    if (type == "red") {
      context.drawImage(redlightimg, (w/2)-w, (h/2)-h, w*2, h*2);
    } else {
      context.drawImage(yellowlightimg, (w/2)-w, (h/2)-h, w*2, h*2);
    }
  }

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
        clearInterval(game_loop);
        logtext("Pause");
      } else {
        game_loop = setInterval(paint,speed)
        // adjustspeed();
        logtext("Unpause");
      };
    }
  };
  function musictoggle() {
    musicmute = !musicmute
    audio = document.getElementById('MusicPlayer');
    if (musicmute) { logtext("Music off")}
    if (!musicmute && !musicon) {
      audio.volume = 0.5;
      audio.play();
      musicon = true;
      logtext("Music on")
    } else {
      audio.pause();
      musicon = false;
    }
  };
// keystrokes
  var moving = false;
	$(document).keydown(function(e){
		var key = e.which;
    if (key == "32") pause();
    if (key == "77") musictoggle();

    if (key == "37" || key == "65") playerdirect.x = 0-movementrange;
    if (key == "38" || key == "87") playerdirect.y = 0-movementrange;
    if (key == "39" || key == "68") playerdirect.x = movementrange;
    if (key == "40" || key == "83") playerdirect.y = movementrange;
    // console.log(key);
	});
  $(document).keyup(function(e){
    var key = e.which;
    if (key == "37" || key == "65") playerdirect.x = 0;
    if (key == "38" || key == "87") playerdirect.y = 0;
    if (key == "39" || key == "68") playerdirect.x = 0;
    if (key == "40" || key == "83") playerdirect.y = 0;
    // console.log(key);
  });
  var ar=[33,34,35,36,37,38,39,40];
  $(document).keydown(function(e) {
       var key = e.which;
        //console.log(key);
        //if(key==35 || key == 36 || key == 37 || key == 39)
        if($.inArray(key,ar) > -1) {
            e.preventDefault();
            return false;
        }
        return true;
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
      clearInterval(titleloop);
      init();
    };
  });
	$(document).on('click','#ContinueButton',function(){
		restoresave = true;
		$("#canvas").show();
		$("#PageText").hide();
		init();
	});
  $(document).on('click','#QuickGameButton',function(){
    goalammount = 1000;
    $("#canvas").show();
    $("#PageText").hide();
    init();
  });
  $(document).on('click','#RegularGameButton',function(){
    goalammount = 2000;
    $("#canvas").show();
    $("#PageText").hide();
    init();
  });
  $(document).on('click','#MaxGameButton',function(){
    goalammount = 4000;
    $("#canvas").show();
    $("#PageText").hide();
    init();
  });
  $(document).on('click','#HelpButton',function(){
    helpshow();
  });
  $(document).on('click','#CheatButton',function(){
    $('#DebugOptions').show();
    $("#canvas").show();
    $("#PageText").hide();
  });
  $(document).on('click','#NotCheatButton',function(){
    $("#canvas").show();
    $("#PageText").hide();
  });
  $("#MuteButton").click(function(){
    musictoggle();
  });
  $("#SoundMuteButton").click(function(){
    soundmute = !soundmute;
  });
  $("#PauseButton").click(function(){
    pause();
  });
  $("#FullScreenButton").click(function(){
    toggleFullScreen();
    // requestFullScreen(document.body);
  });
// Status text
  function statustext(aninum = 0) {
    $('#TimeKeeper').html(" "+timemaker(playtime)+" ");
    $('#Score').html(" "+boss.name+": "+Math.ceil(100 * (boss.health/boss.max))+"%" );
    $("#Alarm").html(""+ alarmtime);
  };
// add upgradebuttons
  function buttonmaker(upgrade) {
    // return "<button title='' class='UpgradeButtons' id='"+upgrade.value+"Button' value='"+upgrade.value+"'><div center='right'>("+upgrade.level+")"+upgrade.name+"</div> "+numbercleanup(upgrade.cost*amountarray[currentammount].multi)+" <img src='images/Mole_Color.png' style='width: 15px;height: 15px'></img></button><br><br>"
  }
  function upgradechecker(array = []) {
    // array += "<a id='SubMoleLine'>"+numbercleanup(molerate)+" a sec|"+numbercleanup(clickrate)+" a click</a>"
    // Object.keys(up).forEach(function(key) {
    //   array += buttonmaker(up[key])
    // });
    // array += "<button id='ThresholdButton'>Thres-mole-d: "+numbercleanup(threshold)+"</button>"
    // $('#StatusText').html(array)
    // if (level < 2) { $('#moledatingButton').hide() }
    // if (level < 2) { $('#moletiplicationButton').hide() }
    // if (level < 3) { $('#moleblehomesButton').hide() }
    // if (level < 4) { $('#moleassesButton').hide() }
    // if (level < 4) { $('#moleionareButton').hide() }
    // if (level < 5) { $('#molehawksButton').hide() }
    // if (level < 6) { $('#guacamoleButton').hide() }
    // if (level < 6) { $('#molecularButton').hide() }
    // if (level < 7) { $('#molearchyButton').hide() }
    // if (level < 8) { $('#punishmentButton').hide() }
    // $( function() {
    //   $(document).tooltip();
    //   $('#molemoneyButton').tooltip({content: up['molemoney'].tooltip});
    //   $('#moledatingButton').tooltip({content: up['moledating'].tooltip});
    //   $('#moletiplicationButton').tooltip({content: up['moletiplication'].tooltip});
    //   $('#moleblehomesButton').tooltip({content: up['moleblehomes'].tooltip});
    //   $('#molehawksButton').tooltip({content: up['molehawks'].tooltip});
    //   $('#molecularButton').tooltip({content: up['molecular'].tooltip});
    //   $('#moleionareButton').tooltip({content: up['moleionare'].tooltip});
    //   $('#molearchyButton').tooltip({content: up['molearchy'].tooltip});
    //   $('#punishmentButton').tooltip({content: up['punishment'].tooltip});
    //   $('#guacamoleButton').tooltip({content: up['guacamole'].tooltip});
    //   $('#moleassesButton').tooltip({content: up['moleasses'].tooltip});
    //   $(".ui-helper-hidden-accessible").hide();
    //  });
  }
//tooltips
  $( function() {
    $(document).tooltip();
    $(".ui-helper-hidden-accessible").hide();
   });
	 function tooltipupdate(name){
		//  return "<div>"+name.name+" (owned:"+name.level+")"
		//  +"<br>"+name.description+""
		//  +"<br>"+numbercleanup(name.cost)+"<img src='images/Mole_Color.png' height='20px' width='20px'></img> to upgrade"
		//  +"<br>"+numbercleanup(name.rate*megamoletiplier)+"<img src='images/Mole_Color.png' height='20px' width='20px'></img> per second for each "+name.name+""
		//  +"<br>"+numbercleanup(name.rate*name.level*megamoletiplier)+"<img src='images/Mole_Color.png' height='20px' width='20px'></img> per second total</div>"
	 }
// time translation
  function timemaker(n) {
    seconds = (n%60).toString();
    minutes = (Math.floor(n/60.0)%60).toString();
    hours = (Math.floor(n/3600.0)).toString();
    if (seconds.length == 1) {seconds = "0"+ seconds }
    if (minutes.length == 1) {minutes = "0"+ minutes }
    if (hours.length == 1) {hours = "0"+ hours }
    return hours+":"+minutes+":"+seconds
  }
// boss picking
  function bosspicker() {
    bulletarray = [];
    redattackarray = [];
    // adjustspeed();
    if (level % 3 == 1) {
      bullets = {
        time: 0,
        rate: 80-Math.floor(playerlevel/2),
        ammount: 4+Math.floor(playerlevel/15),
        damage: 60,
        delay: 20-Math.floor(playerlevel/8),
        shot: 0,
        speed: 6+Math.floor(playerlevel/15),
        volley: 1,
      }
      redattack = {
        time: 0,
        rate: 130-Math.floor(playerlevel/1.5),
        ammount: 1+Math.floor(playerlevel/15),
        damage: 60,
        delay: 30,
        shot: 0,
        speed: 6-Math.floor(playerlevel/20),
        volley: 3,
      }
      boss = {
        name: "Squirrel",
        health: 6000+(playerlevel*100),
        img: squirrelimgarray,
        max: 6000+(playerlevel*100),
        damage: 60+playerlevel,
        level: roadarray,
        size: 100+(playerlevel*2),
        x: w*0.5,
        y: h*0.5,
      }
      boss.area = createarea(boss.size, (w*0.5), (h*0.5))
      target.area = createarea(1, -1, -1)
      target.rotate = 0;
      target.rotaterate = 40;
      target.on = false;
      levelarray = boss.level;
      bossimgarray = boss.img;
    } else if (level % 3 == 2) {
      bullets = {
        time: 0,
        rate: 80-Math.floor(playerlevel/1.5),
        ammount: 7+Math.floor(playerlevel/10),
        damage: 100,
        delay: 5,
        shot: 0,
        speed: 7+Math.floor(playerlevel/15),
        volley: 1,
      }
      redattack = {
        time: 0,
        rate: 100-Math.floor(playerlevel/1.5),
        ammount: 2+Math.floor(playerlevel/20),
        damage: 100,
        delay: 20,
        shot: 0,
        speed: 4-Math.floor(playerlevel/20),
        volley: 3,
      }
      boss = {
        name: "Cyber Squirrel",
        health: 4000+(playerlevel*100),
        img: cyberimgarray,
        max: 4000+(playerlevel*100),
        damage: 60+(playerlevel),
        level: hallarray,
        size: 100+(playerlevel*2),
        x: w*0.5,
        y: h*0.5,
      }
      boss.area = createarea(boss.size, (w*0.5), (h*0.5))
      target.area = createarea(1, -1, -1)
      target.rotate = 0;
      target.rotaterate = 150;
      target.on = true;
      levelarray = boss.level;
      bossimgarray = boss.img;
  } else if (level % 3 == 0) {
      bullets = {
        time: 0,
        rate: 200-Math.floor(playerlevel/1.5),
        ammount: 9+Math.floor(playerlevel/10),
        damage: 100,
        delay: 7,
        shot: 0,
        speed: 6+Math.floor(playerlevel/15),
        volley: 1,
      }
      redattack = {
        time: 0,
        rate: 110-playerlevel,
        ammount: 4+Math.floor(playerlevel/20),
        damage: 100,
        delay: 20-Math.floor(playerlevel/20),
        shot: 0,
        speed: 3-Math.floor(playerlevel/20),
        volley: 3,
      }
      boss = {
        name: "Square-irrel",
        health: 12000+(playerlevel*150),
        img: squareimgarray,
        max: 12000+(playerlevel*150),
        damage: 60+playerlevel,
        level: roadarray,
        size: 300,
        x: w*0.5,
        y: h*0.5,
      }
      boss.area = createarea(boss.size, (w*0.5), (h*0.5))
      // target.area = createtarget(boss.area, boss.size);
      target.rotate = 0;
      target.rotaterate = 50-Math.floor(playerlevel/4);
      target.on = true;
      levelarray = roadarray;
      bossimgarray = boss.img;
    }
  }
// debug options
  function skipturns(n) {
    for (var i = 0; i < n; i++) {
      secondsturn();
    }
  }
  $("#HourSkipButton").click(function(){
    skipturns(3600);
  });
  $("#MinuteSkipButton").click(function(){
    skipturns(60);
  });
  $("#TransitionButton").click(function(){
    transitioning = true;
  });
//   $("#SimulateGameButton").click(function(){
//     simulation();
//   });
//   $("#OptimumGameButton").click(function(){
//     simulation(true);
//   });
// // game simulation estimates
//   function simulation(opt = false) {
//     init();
//     clearInterval(game_loop);
//     thresbreak = [0]
// 		megamolerate = 12;
//     for (var i = 0; i < 345600; i++) {
//       secondsturn();
//       totalmoles += clickrate;
//       nextthres = Math.ceil((threshold-totalmoles)/molerate)
//       if (totalmoles >= 602214129000000000000000) {break;};
//       if (totalmoles >= threshold) {
//         thresbreak.push(i);
//         levelup();
//       };
//       Object.keys(up).forEach(function(key) {
//         newthres = Math.ceil((threshold-(totalmoles-up[key].cost))/(molerate+(up[key].rate*megamoletiplier)))
//         practical = Math.ceil(up[key].cost/(up[key].rate*megamoletiplier))
//         sixhours = 21600
//         if (opt) {
//           practical = newthres;
//           sixhours = nextthres;
//         }
//         if (totalmoles >= up[key].cost && practical <= sixhours) {
//           totalmoles -= up[key].cost;
//           array = buyupgrade(up[key].level,up[key].cost)
//           up[key].level = array[0];
//           up[key].cost = array[1];
//           moleratecal();
//         };
//       });
//     };
//     array = ["Moles = "+numbercleanup(totalmoles,true)+" ("+numbercleanup(molerate)+" per sec) Clickrate:"+numbercleanup(clickrate)]
//     for (var i = 0; i < thresbreak.length; i++) {
//       array.push("<br><br>"+(i)+" = "+timemaker(thresbreak[i])+"(+"+timemaker(thresbreak[i]-thresbreak[i-1])+")")
//     };
//     $('#Score').html(array)
//   };

// Cookies
  function setCookie(cname, cvalue, exdays) {
      var d = new Date();
      d.setTime(d.getTime() + (exdays*24*60*60*1000));
      var expires = "expires="+d.toGMTString();
      document.cookie = cname + "=" + cvalue + "; " + expires;
  };

  function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for(var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        };
        if (c.indexOf(name) == 0) {
            return parseInt(c.substring(name.length, c.length));
        };
    };
    return 0;
  };
  function saveScores() {
  //   Object.keys(up).forEach(function(key) {
  //     setCookie((key).toString(), up[key].level, 365);
  //   })
  //   setCookie("level", level, 365);
  //   setCookie("playtime", playtime, 365);
  //   setCookie("totalmoles", totalmoles, 365);
	// 	setCookie("megamolerate", megamolerate, 365);
  };
});
