// ! Significantly restructured architecture of a room;  Really could restructure to a class even more so and prevent the repetition of current room;  Or just put a var at top of file to say what is current room;   Still need to redo other walls view functions, and need to refactor the navigation util to use the render function;

/* todos

todo: Refine message box and add a random wrong message function...;

todo: clean up css naming when I redo the artwork

todo:  MicroComponentSVG when you develop in inkscape.... rotation is around biggest most object... Semantic naming... (don't have to all their own files... just copy and past micro bits into one file)

todo:  develop Story line //puzzles
todo: use item functionality for iventory items on each other??? mmm...
todo: html book?
todo: timer functionality for game
todo: 

*/
//@#=============== IMPORTS  =============

import room1 from './rooms/room1.js';
// import room2 from './rooms/room2.js';
import navControls from './utils/navDefs.js';
import navigate from './utils/navigation.js';

// @# immutable DOM containers available from start; Appended to game;

const gameContainer = document.querySelector('#gameContainer');
const roomContainer = document.querySelector('#RoomContainer');
const inventoryContainer = document.querySelector('.inventory');
const messageContainer = document.querySelector('.messageContent');

// // holds nav controls;
const navBtnsContainer = document.querySelector('#navBtnsContainer');
navBtnsContainer.innerHTML += navControls;
const navArrows = [...document.querySelectorAll('[data-role = "nav-arrow"]')];

// todo: Refactor to part of main APP initializing later;
// room1.render(roomContainer);

let game = {
  gameContainer: gameContainer,
  roomContainer: roomContainer,
  navBtnsContainer: navBtnsContainer,
  navArrows: navArrows,
  inventoryContainer: inventoryContainer,
  messageContainer: messageContainer,

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
      // debugger;
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
      // debugger;

      //preferable to just add event listener to last item;
      let newestItem = game.inventory.items[game.inventory.items.length - 1];
      // objects are reused and modified for inventory, hence qsa is used;
      newestItem.nodes = game.inventoryContainer.querySelectorAll(
        newestItem.selector
      );
      newestItem.nodes.forEach((node) =>
        node.addEventListener('click', (event) =>
          game.inventory.handleInventoryClick(event)
        )
      );
      // game.inventory.items.forEach((item) => {

      //   item.nodes = game.inventoryContainer.querySelectorAll(item.selector);
      //   item.nodes.forEach((node) =>
      //     node.addEventListener('click', (event) =>
      //       game.inventory.handleInventoryClick(event)
      //     )
      //   );
      // });
    },
    clearInventoryGlow: function () {
      if (!game.inventory.itemInUse) {
        return;
      }
      game.inventory.items.map((item) =>
        item.nodes.forEach((node) => node.classList.remove('inventoryGlow'))
      );
      game.inventory.itemInUse = false;
      console.log('no more glow;');
      return;
    },
  },
  timer: null,
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
    // Add listener for clearing inventory glow;
    game.roomContainer.addEventListener(
      'click',
      game.inventory.clearInventoryGlow
    );

    //render first room
    game.currentRoom.render(game.roomContainer, game.currentRoom);
  },
  refreshArrows: function () {
    // ? don't think i need;
  },
};

game.init();
console.log(game);

//@#=============== EXPORTS  =============

export default game;
