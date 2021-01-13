import toggleNavArrows from '../utils/toggleArrows.js';

function keypadZoomed(room) {
  function getClassNames() {
    if (room.$keypad.inspected) {
      toggleNavArrows();
      return `dVisible keypadZoomedContainer`;
    } else return ' dNone keypadZoomedContainer';
  }

  let html = `
  <div id = 'keypadZoomedContainer'  class = '${getClassNames()}'>
  <button data-role = 'keypadElement' data-fxn = 'close'> X </button>
	<div id="keypadZoomed">
	<p class="display"></p>
	<div class="keypad-controls">
		<div class="keypadBtnsContainer">
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>1</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>2</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>3</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>4</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>5</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>6</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>7</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>8</button>
			<button class="keypadButton" data-role = 'keypadElement' data-fxn = 'numeric'>9</button>
		</div>
		<div class="card-slot"></div>
	</div>
	</div>
</div>


  `;

  return html;
}

export default keypadZoomed;
