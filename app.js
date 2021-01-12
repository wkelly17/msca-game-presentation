// ! Significantly restructured architecture of a room;  Really could restructure to a class even more so and prevent the repetition of current room;  Or just put a var at top of file to say what is current room;   Still need to redo other walls view functions, and need to refactor the navigation util to use the render function;

/* todos

todo: today:
todo: Abstract room interaction functions (INTERACT, LIGHTSWITCH ) per example of interact and for reusability;
TODO: FOR DOM INTERACTIONS, ADD A CHECK FOR INVENTORY ITEM IN USE FXN (LIKE ON INTERACT LOCKED ITEM FUNCTION) TO RETURN EARLY IF INV ITEM DOES NOTHING... MAYBE EVEN ADD A ROOM CONTAINER LISTENER TO ELIMINATE GLOW ON CLICKS ON NOTHING;

TODO: ZOOMED IN VIEWS ON THINGS... like a keypad (WILL HAVE TO PASS SPECIFIC VIEW TO A RENDER FUNCTION)

todo: Use spare space as a message box;

todo: clean up css? 

todo:  clean up css naming
todo:  refactor main APP page here probably as a class or something;
todo:  develop Story line //puzzles
todo:  develop more artwork (focus on semantic naming in inkscape for animations;  Think about hitboxes or animations)
todo:  increase light switch hitbox (or redo SVG really;) by including switch itself in event listener (in future in inkscape, just include it on a whole group)) think hitbox, and then I can conditionally render sub-SVG groups based upon the hitbox or object state; 

todo: add another room to test going between rooms;
todo: zoomed in scenes (rooms folder ? or ... Current choose view fxn is switch;  L)
todo: deleting element from view (conditionally render something based on room state;  Have to have all the svg components in room at start though;)
todo: and then moving that item to inventory
todo: glow function on item
todo: use item functionality (e.g key to door or lockbox)
todo: timer functionality for game
todo: zoomed in room view
todo: 
todo: 

*/
//@#=============== IMPORTS  =============

import room1 from './rooms/room1.js';
// import room2 from './rooms/room2.js';
import navControls from './utils/navDefs.js';
import navigate from './utils/navigation.js';

// @# immutable DOM containers available from start

const gameContainer = document.querySelector('#gameContainer');
let roomContainer = document.querySelector('#RoomContainer');
const inventoryContainer = document.querySelector('.inventory');

// // holds nav controls;
const navBtnsContainer = document.querySelector('#navBtnsContainer');
navBtnsContainer.innerHTML += navControls;
let navArrows = [...document.querySelectorAll('[data-role = "nav-arrow"]')];

// todo: Refactor to part of main APP initializing later;
// room1.render(roomContainer);

let game = {
  gameContainer: gameContainer,
  roomContainer: roomContainer,
  navBtnsContainer: navBtnsContainer,
  navArrows: navArrows,
  inventoryContainer: inventoryContainer,

  // pieces of global game state;
  currentRoom: room1,
  inventory: {
    itemInUse: false,
    items: [],

    render: function ({ name, imgSrc, altText, selector }) {
      let img = document.createElement('img');
      img.src = imgSrc;
      img.alt = altText;
      img.title = name; //used to set current item as internal object instead of dom element since my objects have the properties already;
      // hacky id thing due to id adding another # vs. query selector needing it;
      img.id = selector.slice(1);
      img.classList.add('dVisible');
      inventoryContainer.appendChild(img);
      game.inventory.hydrateInventory();
      console.log(game.inventory);
    },
    handleInventoryClick: function (event) {
      if (!game.inventory.itemInUse) {
        event.target.classList.add('inventoryGlow');

        //setting item in use from inv;
        game.inventory.itemInUse = game.inventory.items.find(
          (item) => item.name == event.target.title
        );
      } else {
        game.inventory.clearInventoryGlow();
      }
    },
    hydrateInventory: function () {
      game.inventory.items.forEach((item) => {
        item.nodes = document.querySelectorAll(item.selector);
        item.nodes.forEach((node) =>
          node.addEventListener('click', (event) =>
            game.inventory.handleInventoryClick(event)
          )
        );
      });
    },
    clearInventoryGlow: function () {
      game.inventory.items.map((item) =>
        item.nodes.forEach((node) => node.classList.remove('inventoryGlow'))
      );
      game.inventory.itemInUse = false;
      console.log('no more glow;');
      return;
    },
  },
  timer: null,
  modalBlur: false, //
  init: function () {
    // hook up clickable navigation;
    game.navArrows.forEach((arrow) =>
      arrow.addEventListener('click', function (event) {
        navigate(event, game.currentRoom);
      })
    );
    //hook up arrow key navigation;
    document.body.addEventListener('keyup', (event) =>
      navigate(event, game.currentRoom)
    );
    //render first room
    game.currentRoom.render(game.roomContainer, game.currentRoom);
  },
  refreshArrows: function () {
    // render method of newRoom?
  },
};
console.log(game);
console.log(navArrows);

game.init();

//@#=============== EXPORTS  =============

export default game;
