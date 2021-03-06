import * as constants from './constants';
import { Dictionary } from './interfaces';
declare const global: any;

const verticalWrapperClass = {
	'overflow': 'hidden',
	'display': 'block'
}

const horizontalWrapperClass = {
	'height': '100%',
	'display': 'table-cell',
	'vertical-align': 'top',
}

const stretcherElementHorizontalClass = {
	'display': 'inline-block'
}

const css = {
	[`.${constants.containerClass}`]: {
		'position': 'relative',
		'min-height': '30px',
		'min-width': '30px'
	},
	[`.${constants.containerClass}.horizontal`]: {
		'display': 'table',
	},
	[`.${constants.containerClass}.horizontal > .${constants.stretcherElementClass}`]: stretcherElementHorizontalClass,
	[`.${constants.containerClass}.horizontal > .${constants.wrapperClass}`]: horizontalWrapperClass,
	[`.${constants.containerClass}.vertical > .${constants.wrapperClass}`]: verticalWrapperClass,
	[`.${constants.wrapperClass}`]: {
		'box-sizing': 'border-box'
	},
	[`.${constants.wrapperClass}.horizontal`]: horizontalWrapperClass, 
	[`.${constants.wrapperClass}.vertical`]: verticalWrapperClass, 
	[`.${constants.wrapperClass}.animated`]: {
		'transition': 'transform ease'
	},
	[`.${constants.ghostClass}.animated`]: {
		'transition': 'all ease-in-out'
	},
	[`.${constants.ghostClass} *`]: {
		'pointer-events': 'none'
	},
	[`.${constants.disbaleTouchActions} *`]: {
		'touch-actions': 'none',
		'-ms-touch-actions': 'none'
	},
	[`.${constants.noUserSelectClass}`]: {
		'-webkit-touch-callout': 'none',
		'-webkit-user-select': 'none',
		'-khtml-user-select': 'none',
		'-moz-user-select': 'none',
		'-ms-user-select': 'none',
		'user-select': 'none'
	}
};

function convertToCssString(css: Dictionary): string {
	return Object.keys(css).reduce((styleString, propName) => {
		const propValue = css[propName];
		if (typeof (propValue) === 'object') {
			return `${styleString}${propName}{${convertToCssString(propValue)}}`;
		}
		return `${styleString}${propName}:${propValue};`;
	}, '');
}

function addStyleToHead() {
	if (typeof (window) !== 'undefined') {
		const head = global.document.head || global.document.getElementsByTagName("head")[0];
		const style = global.document.createElement("style");
		style.id = 'smooth-dnd-style-definitions';
		const cssString = convertToCssString(css);
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = cssString;
		} else {
			style.appendChild(global.document.createTextNode(cssString));
		}

		head.appendChild(style);
	}
}

function addCursorStyleToBody(cursor: string) {
	if (cursor && typeof (window) !== 'undefined') {
		const head = global.document.head || global.document.getElementsByTagName("head")[0];
		const style = global.document.createElement("style");
		const cssString = convertToCssString({
			'body *': {
				cursor: `${cursor} !important`
			}
		});
		style.type = 'text/css';
		if (style.styleSheet) {
			style.styleSheet.cssText = cssString;
		} else {
			style.appendChild(global.document.createTextNode(cssString));
		}

		head.appendChild(style);

		return style;
	}

	return null;
}

function removeStyle(styleElement: HTMLStyleElement) {
	if (styleElement && typeof (window) !== 'undefined') {
		const head = global.document.head || global.document.getElementsByTagName("head")[0];
		head.removeChild(styleElement);
	}
}

export {
	addStyleToHead,
	addCursorStyleToBody,
	removeStyle
};