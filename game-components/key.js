function key(room) {
  if (room.$key?.found) {
    return '';
  }

  function getClassNames() {
    if (room.$blanket?.inspected && !room.$key?.found) {
      return `key dVisible`;
    } else {
      return 'key';
    }
  }

  let html = `
  <svg
	  id="${room.name + 'key'}"
	  class = '${getClassNames()}' 
   width="9.1752234"
   height="25.451254"
   viewBox="0 0 2.4276113 6.7339776"
   >
  <defs
     id="defs2936" />
  <g
     id="layer1"
     transform="translate(-27.540645,-118.22328)">
    <g
       id="Key"
       transform="translate(-146.29479,35.612746)">
      <ellipse
         style="fill:#d4aa00;stroke:none;stroke-width:0.13605"
         id="path252"
         cx="175.04924"
         cy="88.110504"
         rx="1.2138056"
         ry="1.2340049" />
      <path
         id="rect1077"
         style="fill:#d4aa00;stroke:none;stroke-width:0.177446"
         d="m 174.50667,83.960398 c 0.088,-0.254692 0.16814,-0.50395 0.24239,-0.717515 0.13419,-0.385701 0.25193,-0.655199 0.37286,-0.630822 0.12623,0.02542 0.22594,0.267853 0.33892,0.639297 0.0615,0.202697 0.12729,0.443829 0.20366,0.70904 l -0.2355,0.3446 0.2355,0.4614 -0.2355,0.357627 0.1413,0.382415 0.23551,0.414475 -0.21196,0.303182 -0.1413,0.471573 0.21195,0.489777 v 0.805652 h -0.57918 -0.57865 v -0.805951 -0.806499 -0.806151 -0.806399 -0.805701" />
      <path
         style="fill:#aa8800;stroke:#554400;stroke-width:0.13605px;stroke-linecap:butt;stroke-linejoin:miter;stroke-opacity:1"
         d="m 174.77972,83.995096 0.0236,2.899796"
         id="path1113" />
      <ellipse
         style="fill:#ffffff;stroke:none;stroke-width:0.169076"
         id="path1115"
         cx="175.02615"
         cy="88.931969"
         rx="0.58163917"
         ry="0.24505746" />
    </g>
  </g>
</svg>

		 `;
  return html;
}

export default key;
