import defaultRoom from './defaultRoom.js';
import ceilingView from './defaultCeilingView.js';
import game from '../app.js';
import bedSVG from '../game-components/bed.js';
import lightSwitchSVG from '../game-components/lightswitch.js';
import doorSVG from '../game-components/door.js';
import {
  interactLockedItem,
  render,
  hydrateDomElements,
  notALockedItem,
  focusView,
  inspect,
  switchLights,
  addtoInventory,
} from './roomFunctions.js';

let room2 = {
  // @# CORE PIECES OF GLOBAL ROOM STATE;
  name: 'room2',
  lightsAreOn: true,
  directionFacing: 'front',
  returnFromCeiling: null,
  modalBlur: false,

  // @# CORE RENDERING METHODS
  hydrateDomElements: hydrateDomElements,

  //object composition of functions shared between rooms;  render chooses the correct view; 3 params;  Where(gameContainer, room to render, and optional Specific view (for zoomed in views))
  render: render,

  //   DOM ELEMENTS DEFINED BELOW
  $blanket: {
    name: '$blanket',
    nodes: null,
    selector: '#Blanket',
    inspected: false,
    className: 'inspected',
    listenerType: 'click',
    fxn: inspect,
  },
  $lightSwitch1: {
    name: '$lightSwitch1',
    nodes: null,
    selector: '#lightSwitchHitbox',
    lightsOff: false,
    audio: null,
    className: 'switched',
    listenerType: 'click',
    fxn: switchLights,
  },
};

//@# =============== ROOM UNIQUE dom elements functions  =============

//@# --------  ROOM HTML VIEWS; ------------

room2.frontHTML = function frontHTML() {
  let html = `
  <p>IM THE FRONT OF ROOM 2 </p>
	${defaultRoom}
 ${bedSVG(room2)}

	 `;
  return html;
};

room2.rightHTML = function () {
  let html = `
	 ${defaultRoom}
	 ${doorSVG(room2)}
	 ${lightSwitchSVG(room2)}
	 <p>I'M THE RIGHT! OF ROOM 2 </p>
	 `;
  return html;
};

room2.leftHTML = function leftHTML() {
  let html = `
	 ${defaultRoom}
 
	 <p>I'M THE Left! OF ROOM 2 </p>
	 
	 `;
  return html;
};

room2.backHTML = function backHTML() {
  let html = `
	 ${defaultRoom}
 
	 <p>I'M THE back! OF ROOM 2 </p>
	 `;
  return html;
};

room2.ceilingHTML = function backHTML() {
  let html = `
	 ${ceilingView}
	 <p>I'M THE ceiling!!! OF ROOM 2  </p>
	 `;
  return html;
};

export default room2;
