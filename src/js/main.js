import { createScene } from './threejs.js';

document.addEventListener("DOMContentLoaded", () => {
    const container = document.getElementById('threejs-container');
    createScene(container);
});