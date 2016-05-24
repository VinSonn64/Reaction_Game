  // Vertex shader program
  var VSHADER_SOURCE =
  'attribute vec4 a_Position;\n' +
    'void main() {\n' +
    '  gl_Position = a_Position;\n' +
    '  gl_PointSize = 30.0;\n' +             // Set the point size
    '}\n';
 
 // Fragment shader program
 var FSHADER_SOURCE =
   'precision mediump float;\n' +
   'uniform vec4 u_FragColor;\n' + // uniform variable
   'void main() {\n' +
   '  gl_FragColor = u_FragColor;\n' + 
   '}\n';

 var i = 0;
 var rng;
 var rng2;
 var score = 0.0;
 
 var g_points = []; // The array for the position of a mouse press
 
  g_points.push(0.0); g_points.push(0.8);
  

 function main() {
   // Retrieve <canvas> element
   var canvas = document.getElementById('webgl');
var scoreboard = document.getElementById('scoreboard');

   // Get the rendering context for WebGL
   var gl = getWebGLContext(canvas);
   if (!gl) {
     console.log('Failed to get the rendering context for WebGL');
     return;
   }

   // Initialize shaders
   if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
     console.log('Failed to initialize shaders.');
     return;
   }

    // Get the storage location of attribute variable
   var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
   if (a_Position < 0) {
      console.log('Failed to get the storage location of a_Position');
      return;
   }
   
     // Get the storage location of u_FragColor variable
   var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');
   if (u_FragColor < 0) {
      console.log('Failed to get the storage location of u_FragColor');
      return;
   }
   
      //Set Positions, Color, then Draw for first point
/////////////////////////////////////////////////////////////////////////////////

//Register Keyboard Event
   document.onkeydown = function(ev){ keydown(ev, gl, canvas, a_Position, u_FragColor, scoreboard); };
   
    // Pass vertex position to attribute variable
   gl.vertexAttrib3f(a_Position, g_points[0], g_points[1], 0.0);
   
   // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0);   

   // Set the color for clearing <canvas>
   gl.clearColor(0.0, 0.0, 0.0, 0.0);

   // Clear <canvas>
   gl.clear(gl.COLOR_BUFFER_BIT);
   
   gl.drawArrays(gl.POINTS, 0, 1);
   
   ////////////////////////////////////////////////////////////////////////////
 }
 
 function generateRandomNumber()
 {
  var min = -0.3;
  var max = 0.3;
  number = Math.random() * (max-min) + min;
  return number;
 }
  
 
function keydown(ev, gl, canvas, a_Position, u_FragColor, scoreboard) {
  //Check each Key Press. Compare to g_points array. Green for Correct. Red for Incorrect.
  switch (ev.keyCode) {
  case 38:
    if (g_points[i+1]==0.8) {
        gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
        score+=1;
    }
    else
    {
        gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
        score-=1;
    }
  break;

  case 37:
  if (g_points[i]==-0.8) {
        gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
       score+=1;
    }
    else
    {
        gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
        score-=1;
    }
  break;

  case 40:
  if (g_points[i+1]==-0.8) {
        gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
        score+=1;
    }
    else
    {
        gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
        score-=1;
    }
   break;

  case 39:
  if (g_points[i]==0.8) {
        gl.uniform4f(u_FragColor, 0.0, 1.0, 0.0, 1.0);
        score+=1;
    }
    else
    {
        gl.uniform4f(u_FragColor, 1.0, 0.0, 0.0, 1.0);
        score-=1;
    }
   break;

  default: return;
  }
  
  //Draw Center Point with Corresponding Color
  gl.vertexAttrib3f(a_Position, 0.0, 0.0, 0.0);
  gl.drawArrays(gl.POINTS, 0, 1);
  

  //Pick a Random Location and add to array
  while(rng==rng2){
  rng = Math.floor((Math.random() * 4) + 1);
  }
  if (rng==1) {
    g_points.push(generateRandomNumber()); g_points.push(0.8);
  }
  else if (rng==2) {
    g_points.push(-0.8); g_points.push(generateRandomNumber());
  }
  
  else if (rng==3) {
    g_points.push(generateRandomNumber()); g_points.push(-0.8);
  }
  else if (rng==4) {
    g_points.push(0.8); g_points.push(generateRandomNumber());
  }
  rng2=rng;//while loops makes sure there's no repeating locations
  
  //Move up array and draw in the pixel with new location
  i+=2;
    gl.uniform4f(u_FragColor, 0.0, 0.0, 1.0, 1.0);
  gl.vertexAttrib3f(a_Position, g_points[i], g_points[i+1], 0.0);
  gl.drawArrays(gl.POINTS, 0, 1);
  /////////////////////////////////////////////////////////////////
  //Write Score
    scoreboard.innerHTML = 'Score: ' + score; 

}