import {
	Controls,
	MathUtils,
	Spherical,
	Vector3,
	Vector2,
	ConstantColorFactor
} from 'three';


/** 
 * A better first person controller than the
 * official "first person controller" addons,
 * one with cam controls that you might expect,
*/
class FPSCam extends Controls {
	constructor( object, domElement = null, screen_size = new Vector2() ) {
		super( object, domElement );

		// @TODO
		// I wonder if I can grab these sizes from the domElement instead?
		this._screenWidth = screen_size.x;
		this._screenHeight = screen_size.y;

		this._onKeyDown = onKeyDown.bind( this );
		this._onKeyUp = onKeyUp.bind( this );
		this._onPointerMove = onPointerMove.bind( this );

		this.movementSpeed = 1.0;
		this.sprintMultiplier = 2.0;
		this.lookSpeed = 0.005;

		this._moveForward = false;
		this._moveBackward = false;
		this._moveLeft = false;
		this._moveRight = false;
		this._isSprinting = false;
		this._camera = object.children[0];

		this._pointerX = 0.0;
		this._pointerY = 0.0;
		this._pointerLastX = this._screenWidth / 2.0;
		this._pointerLastY = this._screenHeight / 2.0;
		
		// @TODO
		// For when the window size is resized
		// Can be ignored for now, but should
		// be handled properly later
		this._viewHalfX = 0;
		this._viewHalfY = 0;

		if ( domElement !== null ) {
			this.connect( domElement );
			// this.handleResize();
		}

	}

	connect( element ) {
		super.connect( element );

		window.addEventListener( 'keydown', this._onKeyDown );
		window.addEventListener( 'keyup', this._onKeyUp );

		this.domElement.addEventListener( 'pointermove', this._onPointerMove );
		// this.domElement.addEventListener( 'pointerdown', this._onPointerDown );
		// this.domElement.addEventListener( 'pointerup', this._onPointerUp );
		// this.domElement.addEventListener( 'contextmenu', this._onContextMenu );

	}

	update( delta ) {
		// WASD
		let actualMoveSpeed = delta * this.movementSpeed;

		if ( this._isSprinting )
			actualMoveSpeed *= this.sprintMultiplier;

		if ( this._moveForward ) this.object.translateZ( - actualMoveSpeed );
		if ( this._moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this._moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this._moveRight ) this.object.translateX( actualMoveSpeed );

		// Mouse Movement
		// console.log(this._pointerLastX);
	}
}

function onKeyDown( event ) {
	switch ( event.code ) {
		case 'ArrowUp':
		case 'KeyW': this._moveForward = true; break;

		case 'ArrowLeft':
		case 'KeyA': this._moveLeft = true; break;

		case 'ArrowDown':
		case 'KeyS': this._moveBackward = true; break;

		case 'ArrowRight':
		case 'KeyD': this._moveRight = true; break;

		case 'ShiftLeft':
		case 'ShiftRight': this._isSprinting = true; break;
	}
}

function onKeyUp( event ) {
	switch ( event.code ) {
		case 'ArrowUp':
		case 'KeyW': this._moveForward = false; break;

		case 'ArrowLeft':
		case 'KeyA': this._moveLeft = false; break;

		case 'ArrowDown':
		case 'KeyS': this._moveBackward = false; break;

		case 'ArrowRight':
		case 'KeyD': this._moveRight = false; break;

		case 'ShiftLeft':
		case 'ShiftRight': this._isSprinting = false; break;
	}
}

function onPointerMove( event ) {
	let xOffset = 0.0;
	let yOffset = 0.0;

	if ( this.domElement === document ) {
		this._pointerX = event.pageX - this._viewHalfX;
		this.xOffset = this._pointerX - this._pointerLastX;
		this._pointerLastX = this._pointerX;

		this._pointerY = event.pageY - this._viewHalfY;
		this.yOffset = this._pointerY - this._pointerLastY;
		this._pointerLastY = this._pointerY;

	} else {
		this._pointerX = event.pageX - this.domElement.offsetLeft - this._viewHalfX;
		this.xOffset = this._pointerX - this._pointerLastX;
		this._pointerLastX = this._pointerX;

		this._pointerY = event.pageY - this.domElement.offsetTop - this._viewHalfY;
		this.yOffset = this._pointerY - this._pointerLastY;
		this._pointerLastY = this._pointerY;
	}

	// console.log(new Vector2(this._pointerX, this._pointerLastX));
	// console.log(new Vector2(this.xOffset, this.yOffset));
	// console.log(event.pageX);
	this.object.rotateY( this.xOffset * 0.0001 );
	this.object.rotateX( this.yOffset * 0.0001 );
}

export { FPSCam };