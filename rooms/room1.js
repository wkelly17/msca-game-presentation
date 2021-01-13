import game from '../app.js';
import room2 from './room2.js';
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
import defaultRoom from './defaultRoom.js';
import ceilingView from './defaultCeilingView.js';
import bedSVG from '../game-components/bed.js';
import lightSwitchSVG from '../game-components/lightswitch.js';
import filingCabinetSVG from '../game-components/filingCabinet.js';
import keypadSVG from '../game-components/keypad.js';
import keypadZoomed from '../game-components/keypadZoomed.js';

import doorSVG from '../game-components/door.js';
import keySVG from '../game-components/key.js';
import toggleNavArrows from '../utils/toggleArrows.js';

/* 
html interactive components?

#switchToggle

*/

let room1 = {
  // @# CORE PIECES OF GLOBAL ROOM STATE;
  name: 'room1',
  lightsAreOn: true,
  directionFacing: 'front',
  returnFromCeiling: null,
  modalBlur: false,

  // @# CORE RENDERING METHODS

  //   todo: maybe refactor to use object.keys to auto-collect DOM elements via filter and using a naming convention with $for DOM or something;
  hydrateDomElements: hydrateDomElements,

  render: render,

  //   DOM ELEMENTS DEFINED BELOW
  //   nodes used even for singluar items to query Select ALL on items that will be plural;
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
  $door: {
    name: '$door',
    nodes: null,
    selector: '#Door',
    listenerType: 'click',
    fxn: goToRoom2,
  },
  $key: {
    name: '$key',
    nodes: null,
    selector: '#room1Key',
    listenerType: 'click',
    found: false,
    solves: '$filingCabinet',
    imgSrc: './Media/SVG-Components/key.svg',
    altText: 'key',
    fxn: addtoInventory,
  },
  $filingCabinet: {
    name: '$filingCabinet',
    nodes: null,
    //  subnodes are affected when the main node is solved;
    affectedNodes: [
      {
        selector: '.filingCabinetLock',
        class: 'rotatedLock',
      },
    ],
    selector: '#filingCabinet',
    listenerType: 'click',
    open: false,
    isSolvedBy: 'key',
    solvedMessage:
      'You feel the key catch and give it a turn;  The drawer pops open',
    fxn: interactLockedItem,
  },
  $keypad: {
    name: '$keypad',
    nodes: null,
    selector: '#keypad',
    listenerType: 'click',
    inspected: false,
    fxn: focusView,
  },
  $keypadBtns: {
    name: '$keypadBtns',
    nodes: null,
    selector: '[data-role = "keypadElement"]',
    listenerType: 'click',
    inspected: false,
    fxn: manageKeypad,
  },
};

function goToRoom2() {
  if (notALockedItem()) {
    return;
  }
  console.log(game);
  game.currentRoom = room2;
  console.log(game);
  room2.render(game.roomContainer, room2);
}

// Will abstract out if needed in more than one room;
function manageKeypad(event, obj, room) {
  //room for abstraction;
  let display = document.querySelector('.display');
  let btnPressed = event.target;
  if (btnPressed.dataset.fxn == 'close') {
    room1.modalBlur = false; //room1
    room1.$keypad.inspected = false; //updating state;
    toggleNavArrows();
    room1.render(game.roomContainer, room1);
    //   call a re-render to reflect state
  } else {
    display.textContent += event.target.textContent;
    //  checkForSolved()    //doesn't exist yet;
  }
}

//@# --------  ROOM HTML VIEWS; ------------

room1.frontHTML = function frontHTML() {
  let html = `
  ${defaultRoom}
  ${bedSVG(room1)}
  ${keySVG(room1)}
${lightSwitchSVG(room1)}
${keypadSVG(room1)}
${keypadZoomed(room1)}
${doorSVG(room1)}
${filingCabinetSVG(room1)}
	`;
  return html;
};

room1.rightHTML = function () {
  let html = `
	${defaultRoom}
	<p>I'M THE RIGHT! </p>
	`;
  return html;
};

room1.leftHTML = function leftHTML() {
  let html = `
	${defaultRoom}

	<p>I'M THE Left! </p>
	
	`;
  return html;
};

room1.backHTML = function backHTML() {
  let html = `
	${defaultRoom}

	<p>I'M THE back! </p>
	`;
  return html;
};

room1.ceilingHTML = function backHTML() {
  let html = `
	${ceilingView}
	<p>I'M THE ceiling!!! </p>
	`;
  return html;
};

export default room1;
