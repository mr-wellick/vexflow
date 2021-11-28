// An example of how to use VexFlow in node.
// Run: `node pdf.js`
// Saves a PDF in `score.pdf`.

/* eslint-disable no-console */

const Vex = require('../../build/vexflow-debug');
const { JSDOM } = require('jsdom');
const { jsPDF } = require('jspdf');
require('svg2pdf.js');

const { Flow, Stave, StaveNote, Formatter, Renderer } = Vex.Flow;

console.log('VexFlow Build: ' + Flow.BUILD);
Flow.setMusicFont('Gonville');

const dom = new JSDOM('<!DOCTYPE html><html><body><div id="container"></div><body></html>');
global.window = dom.window;
global.document = dom.window.document;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById('container');
const renderer = new Renderer(div, Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(200, 200);
const context = renderer.getContext();
context.setFont('Arial', 10);

const stave = new Stave(10, 0, 190);

// Add a clef and time signature.
stave.addClef('treble').addTimeSignature('4/4');

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

const notes = [
  new StaveNote({ keys: ['c/4'], duration: 'q' }),
  new StaveNote({ keys: ['d/4'], duration: 'q' }),
  new StaveNote({ keys: ['b/4'], duration: 'qr' }),
  new StaveNote({ keys: ['c/4', 'e/4', 'g/4'], duration: 'q' }),
];

// Helper function to justify and draw a 4/4 voice.
Formatter.FormatAndDraw(context, stave, notes);

const doc = new jsPDF();
const svgElement = div.childNodes[0];
doc.svg(svgElement).then(() => doc.save('score.pdf'));
console.log('Saved a PDF: score.pdf');