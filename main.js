// ==UserScript==
// @name         Youtube fast & slow buttons
// @namespace    https://www.youtube.com
// @version      0.0.0
// @description  Adds a faster and slower button to YT videos.
// @author       Raúl Lozano Martin
// @include      http*://*.youtube.com/*
// @include      http*://youtube.com/*
// @include      http*://*.youtu.be/*
// @include      http*://youtu.be/*
// @run-at       document-end
// ==/UserScript==

function createCallback(speed){
  return function(){
    document.getElementsByTagName("video")[0].playbackRate = speed;
  }
}

function run(){
    /* Create button */
    var buttonDiv = document.createElement("div");
    buttonDiv.style.width = "100%";
    buttonDiv.style.marginTop = "5px";
    buttonDiv.id = "fastButton";

    var slowButton = document.createElement("button");
    slowButton.style.backgroundColor = "hsl(0, 0%, 93.3%)";
    slowButton.style.borderRadius = "2px";
    slowButton.style.color = "hsla(0, 0%, 6.7%, .6)";
    slowButton.style.outlineWidth = "0";
    slowButton.style.marginRight = "2px";
    slowButton.appendChild(document.createTextNode("<<"));
    slowButton.style.height = "18px";
    slowButton.style.width = "30px";
    slowButton.onclick = function () {
      document.getElementsByTagName("video")[0].playbackRate *= 0.9;
    };
    buttonDiv.appendChild(slowButton);

    var fastButton = document.createElement("button");
    fastButton.style.backgroundColor = "hsl(0, 0%, 93.3%)";
    fastButton.style.borderRadius = "2px";
    fastButton.style.color = "hsla(0, 0%, 6.7%, .6)";
    fastButton.style.outlineWidth = "0";
    fastButton.style.marginRight = "2px";
    fastButton.appendChild(document.createTextNode(">>"));
    fastButton.style.height = "18px";
    fastButton.style.width = "30px";
    fastButton.onclick = function () {
        document.getElementsByTagName("video")[0].playbackRate *= 1.1;
    };
    buttonDiv.appendChild(fastButton);

    for (var speed = 1.5; speed <= 3; speed += 0.5) {
      var button = document.createElement("button");
      button.style.backgroundColor = "hsl(0, 0%, 93.3%)";
      button.style.borderRadius = "2px";
      button.style.color = "hsla(0, 0%, 6.7%, .6)";
      button.style.outlineWidth = "0";
      button.style.marginRight = "2px";
      button.appendChild(document.createTextNode(speed));
      button.style.height = "18px";
      button.style.width = "30px";
      button.onclick = createCallback(speed);
      buttonDiv.appendChild(button);
    }


    /* Inject button */
    var targetElement = document.querySelectorAll("[id='subscribe-button']");
    for(var i = 0; i < targetElement.length; i++){
      if(targetElement[i].className.indexOf("ytd-video-secondary-info-renderer") > -1){
        targetElement[i].appendChild(buttonDiv);
      }
    }
}

if (document.getElementById("polymer-app") ||
    document.getElementById("masthead") ||
    window.Polymer)
{
  setInterval(function(){
    if (window.location.href.indexOf("watch?v=") < 0) {
      return false;
    }

    if (document.getElementById("count") &&
      document.getElementById("fastButton") === null)
    {
      run();
    }
  }, 100);
}
