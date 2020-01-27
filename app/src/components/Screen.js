import React, { useState, useEffect } from 'react';

const Screen = () => {
	useEffect(() => {
		const render = () => {
		    gl.clearColor(0, 0, 0, 1);
		    gl.clear(gl.COLOR_BUFFER_BIT);
		    window.requestAnimationFrame(render);
		}

		const canvas = document.getElementById('master');
		if(!canvas){
			console.log("Canvas element with specified ID ('master') cannot be found.");
		}

    	const gl = canvas.getContext('webgl2');
	    if(!gl) {
			console.log("No WebGL")
	    }

	    window.requestAnimationFrame(render);
	}, []);

	return (
		<canvas id='master' style={ canvasStyle }></canvas>
	);
}

const canvasStyle = {
	width: '1500px',
	height: '700px',
	border: '1px solid black'
}

export default Screen;