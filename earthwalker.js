var latitude = 43.59283;
var longitude = -116.28839;

var controlX = 0;
var controlY = 0;
var animating = false;

var controlState = [false,false,false,false];
var controlStateName = ["left","up","right","down"];
var CONTROL_LEFT  = 0;
var CONTROL_UP    = 1;
var CONTROL_RIGHT = 2;
var CONTROL_DOWN  = 3;

var ARROW_LEFT_KEY_CODE  = 37;
var ARROW_UP_KEY_CODE    = 38;
var ARROW_RIGHT_KEY_CODE = 39;
var ARROW_DOWN_KEY_CODE  = 40;

var keyControlMap = {};
keyControlMap[ARROW_LEFT_KEY_CODE]  = CONTROL_LEFT;
keyControlMap[ARROW_UP_KEY_CODE]    = CONTROL_UP;
keyControlMap[ARROW_RIGHT_KEY_CODE] = CONTROL_RIGHT;
keyControlMap[ARROW_DOWN_KEY_CODE]  = CONTROL_DOWN;



function move()
{
    if(controlX < 0) {
        longitude -= .0001;
    } else if(controlX > 0) {
        longitude += .0001;
    }
    
    if(controlY < 0) {
        latitude -= .0001;
    } else if(controlY > 0) {
        latitude += .0001;
    }
}
function render()
{
    document.getElementById('LatLongDiv').innerHTML =
        '<div>Latitude: '  + latitude  + '</div>' +
        '<div>Longitude: ' + longitude + '</div>' ;
}

function animate()
{
    console.log("animate function called");
    if(animating && (controlX != 0 || controlY != 0)) {
        move();
        render();
        requestAnimationFrame(animate);
    } else {
        console.log("animation done");
        animating = false;
    }
}

function controlsChanged()
{
    controlX = 0;
    controlY = 0;
    if(controlState[CONTROL_LEFT]) {
        if(!controlState[CONTROL_RIGHT]) {
            controlX = -1;
        }
    } else if(controlState[CONTROL_RIGHT]) {
        controlX = 1;
    }
    if(controlState[CONTROL_UP]) {
        if(!controlState[CONTROL_DOWN]) {
            controlY = -1;
        }
    } else if(controlState[CONTROL_DOWN]) {
        controlY = 1;
    }
    
    if(controlX == 0 && controlY == 0) {
        document.getElementById('ControlStatusDiv').innerHTML = "stopped";
    } else {
        document.getElementById('ControlStatusDiv').innerHTML = "x: " + controlX + ", y: " + controlY;
        if(!animating) {
            requestAnimationFrame(animate);
            animating = true;
        }
    }
}




$(document).ready(function() {
    
    
}).keydown(function(event) {
    if(event.keyCode in keyControlMap) {
      var control = keyControlMap[event.keyCode];
      if(!controlState[control]) {
        controlState[control] = true;
        console.log("control '" + controlStateName[control] + "' down");
        controlsChanged();
      }
    } else {
        console.log("unhandled key '" + event.key + "' (code=" + event.keyCode + ")")
    }
}).keyup(function(event) {
    if(event.keyCode in keyControlMap) {
      var control = keyControlMap[event.keyCode];
      if(controlState[control]) {
        controlState[control] = false;
        console.log("control '" + controlStateName[control] + "' up");
        controlsChanged();
      }
    } else {
        console.log("unhandled key '" + event.key + "' (code=" + event.keyCode + ")")
    }
});
