import game from '../app.js';

function hydrateDomElements(roomContainer, room) {
  room.DOM_Elements = gatherDomElements(room);
  room.DOM_Elements.forEach((element) => {
    element.nodes = roomContainer.querySelectorAll(element.selector);
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
  hydrateDomElements(roomContainer, room);
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
function inspect(event, { name, inspected, ...rest }, room) {
  if (notALockedItem()) {
    return;
  }
  room[name].inspected = !room[name].inspected;
  room.render(game.roomContainer, room);
}

function switchLights(event, { name, audio, ...rest }, room) {
  if (notALockedItem()) {
    return;
  }
  //   Room state change
  room.lightsAreOn = !room.lightsAreOn;

  //   Object property state change
  room[name].lightsOff = !room[name].lightsOff;

  let lightsAreOff = room.lightsAreOn == false;
  lightsAreOff
    ? game.roomContainer.classList.add('lightsOff')
    : game.roomContainer.classList.remove('lightsOff');

  room.render(game.roomContainer, room);
}

function interactLockedItem(
  event,
  { name, open, solvedMessage, affectedNodes, ...rest },
  room
) {
  debugger;
  console.log(rest);
  if (game.inventory.itemInUse) {
    let selectedItem = game.inventory.itemInUse;

    if (selectedItem.solves == name) {
      debugger;
      //setting room dom object state;
      room[name].open = true;

      //dom Node  styling;
      selectedItem.nodes.forEach((node) => {
        node.classList.add('inventoryItemUsed');
        node.removeEventListener('click', game.inventory.handleInventoryClick);
      });

      //set correct message
      game.messageContainer.textContent = room[name].solvedMessage;

      //styling affectedNodes;
      if (affectedNodes) {
        affectedNodes.forEach((affectedNode) => {
          let DomSubnode = document.querySelector(affectedNode.selector);
          DomSubnode.classList.add(affectedNode.class);
        });
      }
    }
  }
  // return if you want person to click adn then click again;  Keep like so if you want to trigger something else; (preferred;)
  if (open) {
    //   Probably some sort of additional logic if it's already open.. trigerr a view?
    //   Trriger a re-render to new view or just add an item to inventory or ?... need to see;
    //if causes re-render... re-render.  else add to Inventory obj.addsToInventory?. prop?
    console.log('i am opened!');
  } else {
    game.messageContainer.textContent = "I can't seem to get into that now";
  }
}

function notALockedItem() {
  if (game.inventory.itemInUse) {
    game.inventory.clearInventoryGlow();
    game.messageContainer.textContent = "Hmm.. that doesn't work";
    return true;
  }
}

function focusView(event, { name, inspected, ...rest }, room) {
  // activate room modal blur;
  room.modalBlur = true;
  // update inspected status to true
  room[name].inspected = true;

  //   rendering conditionally rendered zoomView already in room Direction function;
  render(game.roomContainer, room);
}

function addtoInventory(
  event,
  { name, node, imgSrc, selector, ...rest },
  room
) {
  if (notALockedItem()) {
    return;
  }
  room[name].found = !room[name].found;
  room.render(game.roomContainer, room);
  //   render to remove
  game.inventory.items.push(room[name]);
  game.inventory.render(room[name]);
}

export {
  render,
  chooseViewFxn,
  hydrateDomElements,
  gatherDomElements,
  inspect,
  switchLights,
  addtoInventory,
  interactLockedItem,
  notALockedItem,
  focusView,
};
