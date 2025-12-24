import {
	Controls,
	MathUtils,
	Spherical,
	Vector3
} from 'three';


class FPSCam extends Controls {
	constructor( object, domElement = null ) {
		super( object, domElement );

		this._onKeyDown = onKeyDown.bind( this );
		this._onKeyUp = onKeyUp.bind( this );

		this.movementSpeed = 1.0;
		this.lookSpeed = 0.005;

		this._moveForward = false;
		this._moveBackward = false;
		this._moveLeft = false;
		this._moveRight = false;

		if ( domElement !== null ) {
			this.connect( domElement );
			// this.handleResize();
		}

	}

	connect( element ) {

		super.connect( element );

		window.addEventListener( 'keydown', this._onKeyDown );
		window.addEventListener( 'keyup', this._onKeyUp );

		// this.domElement.addEventListener( 'pointermove', this._onPointerMove );
		// this.domElement.addEventListener( 'pointerdown', this._onPointerDown );
		// this.domElement.addEventListener( 'pointerup', this._onPointerUp );
		// this.domElement.addEventListener( 'contextmenu', this._onContextMenu );

	}

	update( delta ) {
		const actualMoveSpeed = delta * this.movementSpeed;

		if ( this._moveForward ) this.object.translateZ( - actualMoveSpeed );
		if ( this._moveBackward ) this.object.translateZ( actualMoveSpeed );

		if ( this._moveLeft ) this.object.translateX( - actualMoveSpeed );
		if ( this._moveRight ) this.object.translateX( actualMoveSpeed );
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
	}
}

export { FPSCam };