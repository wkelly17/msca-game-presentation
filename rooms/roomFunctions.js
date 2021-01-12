import game from '../app.js';

function hydrateDomElements(room) {
  room.DOM_Elements = gatherDomElements(room);
  room.DOM_Elements.forEach((element) => {
    element.nodes = document.querySelectorAll(element.selector);
    element.nodes.forEach((node) => {
      node.addEventListener(element.listenerType, (event) => {
        element.fxn(event, element, room);
      });
    });
  });
}

// optional abstraction for room DOM item functions... I think would work well for booleans;

function gatherDomElements(room) {
  let keys = Object.keys(room).filter((key) => key.startsWith('$'));
  let domElements = [];
  keys.forEach((key) => domElements.push(room[key]));
  return domElements;
}

function render(roomContainer, room, specificView) {
  roomContainer.innerHTML = chooseViewFxn(room, specificView);
  checkForModalBlur(roomContainer, room);
  checkLights(roomContainer, room);
  hydrateDomElements(room);
}

function checkForModalBlur(roomContainer, room) {
  if (room.modalBlur) {
    roomContainer.innerHTML += `<div class="modal-blur"></div> `;
  }
}

function checkLights(roomContainer, room) {
  if (room.lightsAreOn) {
    roomContainer.classList.remove('lightsOff');
  }
}

function chooseViewFxn(room, specificView) {
  // Will be used for zoomed in scenes perhaps?
  if (specificView) {
    return specificView;
  }
  switch (room.directionFacing) {
    case 'front':
      return room.frontHTML();
    case 'right':
      return room.rightHTML();
    case 'left':
      return room.leftHTML();
    case 'back':
      return room.backHTML();
    case 'up':
      return room.ceilingHTML();
    default:
      break;
  }
}

//=============== DOM Fxn's shared between rooms =============
function inspect(event, room, { name, inspected, ...rest }) {
  room[name].inspected = !room[name].inspected;
  room.render(game.roomContainer, room);
}

function interactLockedItem(event, { name, open, ...rest }, room) {
  if (game.inventory.itemInUse) {
    let selectedItem = game.inventory.itemInUse;

    if (selectedItem.solves == name) {
      room[name].open = true;
      game.inventory.clearInventoryGlow();
      return room.render(game.roomContainer, room);
    }
  }
  if (!open) {
    console.log('it is locked');
  } else {
    console.log('i am opened!');
  }
}

export {
  chooseViewFxn,
  render,
  hydrateDomElements,
  gatherDomElements,
  inspect,
  interactLockedItem,
};
