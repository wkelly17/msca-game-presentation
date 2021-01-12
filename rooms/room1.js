import game from '../app.js';
import room2 from './room2.js';
import {
  interactLockedItem,
  render,
  hydrateDomElements,
} from './roomFunctions.js';
import defaultRoom from './defaultRoom.js';
import ceilingView from './defaultCeilingView.js';
import bedSVG from '../game-components/bed.js';
import lightSwitchSVG from '../game-components/lightswitch.js';
import filingCabinetSVG from '../game-components/filingCabinet.js';
import doorSVG from '../game-components/door.js';
import keySVG from '../game-components/key.js';

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
    selector: '#filingCabinet',
    listenerType: 'click',
    open: false,
    isSolvedBy: 'key',
    fxn: interactLockedItem,
  },
};

function goToRoom2() {
  debugger;
  console.log(game);
  game.currentRoom = room2;
  console.log(game);
  room2.render(game.roomContainer, room2);
}

function addtoInventory(
  event,
  { name, node, imgSrc, selector, ...rest },
  room
) {
  room[name].found = !room[name].found;
  room1.render(game.roomContainer, room1);
  //   render to remove
  game.inventory.items.push(room[name]);
  game.inventory.render(room[name]);
}

function inspect(event, { name, inspected, ...rest }, room) {
  //   debugger;
  //? abstract out into shared functions by passing room param?
  //   boolean below; maybe use value for non boolean above this line;
  console.log(rest);
  console.log('inspected');
  room1[name].inspected = !room1[name].inspected;
  room1.render(game.roomContainer, room1);
  //   let inspectedState = event.target.class;
}

function switchLights(event, { name, audio, ...rest }) {
  //   Room state change
  room1.lightsAreOn = !room1.lightsAreOn;

  //   Object property state change
  room1[name].lightsOff = !room1[name].lightsOff;

  let lightsAreOff = room1.lightsAreOn == false;
  lightsAreOff
    ? game.roomContainer.classList.add('lightsOff')
    : game.roomContainer.classList.remove('lightsOff');

  room1.render(game.roomContainer, room1);
}

//@# --------  ROOM HTML VIEWS; ------------

room1.frontHTML = function frontHTML() {
  //@% inline works for boolean styles for classnames;;   May need more complicated logic in dedicated rendering functions here (for d - none is used or something like that)
  // May need to see about changing modal blur
  let html = `
  ${defaultRoom}
  ${bedSVG(room1)}
  ${keySVG(room1)}
${lightSwitchSVG(room1)}
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
