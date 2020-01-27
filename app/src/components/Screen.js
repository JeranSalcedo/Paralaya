import React, { useState, useEffect } from 'react';

const Screen = () => {
	useEffect(() => {
		/*
			Taken from a webGL file for educational purposes by Sir Clinton Poserio, referenced from: 
				CMSC 161 Resources by James Plaras
				https://www.webglfundamentals.org
				https://www.khronos.org/registry/webgl/sdk/devtools/src/debug/webgl-debug.js
		 */
		const initShader = (type, source) => {
			const shader = gl.createShader(type);

			if(shader === null){
				console.log('Failed to create shader.');

				return null;
			}

			gl.shaderSource(shader, source);
			gl.compileShader(shader);

			const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
			if(success){
				return shader;
			}

			const error = gl.getShaderInfoLog(shader);
			console.log('Failed to compile shader:' + error);
			gl.deleteShader(shader);

			return null;
		}

		const initProgram = (vertexShader, fragmentShader) => {
			const program = gl.createProgram();

			gl.attachShader(program, vertexShader);
			gl.attachShader(program, fragmentShader);
			gl.linkProgram(program);

			const success = gl.getProgramParameter(program, gl.LINK_STATUS);
			if(success){
				return program;
			}

			const error = gl.getProgramInfoLog(program);
			console.log('Failed to link program:' + error);
			gl.deleteProgram(program);

			return null;
		}

		//-------------------------------------------------------------------

		const render = () => {
		    gl.clearColor(0, 0, 0, 1);
		    gl.clear(gl.COLOR_BUFFER_BIT);

		    const vertexBuffer = gl.createBuffer();
		    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
		    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
		    gl.vertexAttribPointer(aPositionPointer, 2, gl.FLOAT, false, 12, 0);
		    
		    const indexBuffer = gl.createBuffer();
		    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
		    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
			gl.drawElements(gl.TRIANGLES, indices, gl.UNSIGNED_BYTE, 0)

		    gl.bindBuffer(gl.ARRAY_BUFFER, null);
		    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null);
		    
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

	    const vertexShaderSource = `#version 300 es
	    	in vec4 a_position;

	    	void main() {
	    		gl_Position = a_position;
	    		gl_PointSize = 9.0;
	    	}
	    `;

	    const fragmentShaderSource = `#version 300 es
    		precision mediump float;

    		out vec4 outColor;
    
    		void main() {
      			outColor = vec4(1, 0, 0.5, 1);
    		}
	    `;

		const vertexShader = initShader(gl.VERTEX_SHADER, vertexShaderSource);
		const fragmentShader = initShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
		const program = initProgram(vertexShader, fragmentShader);

		gl.useProgram(program);

		const aPositionPointer = gl.getAttribLocation(program, 'a_position');
		gl.enableVertexAttribArray(aPositionPointer);

		gl.enable(gl.DEPTH_TEST);

	    const vertices = [
	    	.5, .5, 1,
	    	0, .5, -1,
	    	.5, 0, 1
	    ];

	    const indices = [
	    	0, 1,
	    	0, 2,
	    	1, 2
	    ];

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