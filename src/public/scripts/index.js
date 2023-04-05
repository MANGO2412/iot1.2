const loginElement = document.querySelector('#login-form');
const contentElement = document.querySelector("#content-sign-in");
const userDetailsElement = document.querySelector('#user-details');
const authBarElement = document.querySelector("#authentication-bar");

// Elements for sensor readings
const tempElement = document.getElementById("temp");
const humElement = document.getElementById("hum");
const presElement = document.getElementById("pres");
const ledElement = document.getElementById("led");
const alarm=document.getElementById("alarm"); 
const alElement = document.getElementById("dar-state");


var dbPathLed;
var dbPathLed1;
var dbPathal;

// MANAGE LOGIN/LOGOUT UI
const setupUI = (user) => {
  if (user) {
    //toggle UI elements
    loginElement.style.display = 'none';
    contentElement.style.display = 'block';
    authBarElement.style.display ='block';
    userDetailsElement.style.display ='block';
    userDetailsElement.innerHTML = user.email;

    // get user UID to get data from database
    var uid = user.uid;
    console.log(uid);

    // Database paths (with user UID)
    var dbPathTemp = 'home/weather/temperature';
    var dbPathHum = 'home/weather/humidity1';
    //var dbPathLed = 'home/light/led';
    //var dbPathLed1 = 'home/light/led1';
    dbPathLed = 'home/light/led';
    dbPathLed1 = 'home/light/led1';
    dbPathal = 'home/alarm/state';


    console.log(uid.toString());


    // Database references
    var dbRefTemp = firebase.database().ref().child(dbPathTemp);
    var dbRefHum = firebase.database().ref().child(dbPathHum);
    //var dbRefPres = firebase.database().ref().child(dbPathPres);
    //var dbRefLed = firebase.database().ref().child(dbPathLed);
    //var dbRefLed1 = firebase.database().ref().child(dbPathLed1);

    // Update page with new readings
    dbRefTemp.on('value', snap => {

      tempElement.innerText = snap.val().toFixed(2);
      var x = (new Date()).getTime(),
      y= parseFloat(snap.val().toFixed(2));

         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
    });

    dbRefHum.on('value', snap => {
      humElement.innerText = snap.val().toFixed(2);
    });

    // dbRefPres.on('value', snap => {
    //   presElement.innerText = snap.val().toFixed(2);
    // });

  // if user is logged out
  } else{
    // toggle UI elements
    loginElement.style.display = 'block';
    authBarElement.style.display ='none';
    userDetailsElement.style.display ='none';
    contentElement.style.display = 'none';
  }
}

// Este es el codigo de los Leds
function toggleLed() {
  console.log("Toggle");
  if (ledElement.checked) 
  {
    console.log("led ON");
    firebase.database().ref(dbPathLed).set("ON");
  }
  else{
    console.log("led OFF");
    firebase.database().ref(dbPathLed).set("OFF");
  }
}

function toggleal2() {
  console.log("Toggle");
  if (alarm.checked) 
  {
    console.log("al on");
    firebase.database().ref(dbPathal).set("ON");
  }
  else{
    console.log("al OFF");
    firebase.database().ref(dbPathal).set("OFF");
  }
}

/*setInterval(function ( ) {
 
      var x = (new Date()).getTime(),
      y=5;
         // y = parseFloat(this.responseText);
      //console.log(this.responseText);
      if(chartT.series[0].data.length > 40) {
        chartT.series[0].addPoint([x, y], true, true, true);
      } else {
        chartT.series[0].addPoint([x, y], true, false, true);
      }
    
 
 
}, 1000 ) ;*/