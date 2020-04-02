// import ApiDecorator from '@enact/core/internal/ApiDecorator';
import {ScrollbarBase as UiScrollbarBase} from '@enact/ui/useScroll/Scrollbar';
import PropTypes from 'prop-types';
import React, {forwardRef, memo, useImperativeHandle, useRef} from 'react';

import ScrollButtons from './ScrollButtons';
import ScrollThumb from './ScrollThumb';
// import Skinnable from '../Skinnable';

import componentCss from './Scrollbar.module.less';

/**
 * An Agate-styled scroller base component.
 *
 * @class ScrollbarBase
 * @memberof agate/useScroll
 * @extends ui/ScrollbarBase
 * @ui
 * @private
 */
const ScrollbarBase = memo(forwardRef((props, ref) => {
	// Refs
	const scrollbarRef = useRef();
	const scrollButtonsRef = useRef();
	// render
	const {cbAlertThumb, clientSize, corner, vertical, ...rest} = props;

	useImperativeHandle(ref, () => {
		const {getContainerRef, showThumb, startHidingThumb, update: uiUpdate} = scrollbarRef.current;
		const {focusOnButton, isOneOfScrollButtonsFocused, updateButtons} = scrollButtonsRef.current;

		return {
			focusOnButton,
			get uiScrollbarContainer () {
				return getContainerRef();
			},
			isOneOfScrollButtonsFocused,
			showThumb,
			startHidingThumb,
			uiUpdate,
			update: (bounds) => {
				updateButtons(bounds);
				uiUpdate(bounds);
			}
		};
	}, [scrollbarRef, scrollButtonsRef]);

	return (
		<UiScrollbarBase
			clientSize={clientSize}
			corner={corner}
			css={componentCss}
			ref={scrollbarRef}
			vertical={vertical}
			childRenderer={({thumbRef}) => { // eslint-disable-line react/jsx-no-bind
				return (
					<ScrollButtons
						{...rest}
						ref={scrollButtonsRef}
						vertical={vertical}
						thumbRenderer={() => { // eslint-disable-line react/jsx-no-bind
							return (
								<ScrollThumb
									cbAlertThumb={cbAlertThumb}
									key="thumb"
									ref={thumbRef}
									vertical={vertical}
								/>
							);
						}}
					/>
				);
			}}
		/>
	);
}));

ScrollbarBase.displayName = 'ScrollbarBase';

ScrollbarBase.propTypes = /** @lends agate/useScroll.Scrollbar.prototype */ {
	/**
	 * Called when [ScrollThumb]{@link agate/useScroll.ScrollThumb} is updated.
	 *
	 * @type {Function}
	 * @private
	 */
	cbAlertThumb: PropTypes.func,

	/**
	 * Client size of the container; valid values are an object that has `clientWidth` and `clientHeight`.
	 *
	 * @type {Object}
	 * @property {Number}    clientHeight    The client height of the list.
	 * @property {Number}    clientWidth    The client width of the list.
	 * @public
	 */
	clientSize: PropTypes.shape({
		clientHeight: PropTypes.number.isRequired,
		clientWidth: PropTypes.number.isRequired
	}),

	/**
	 * Adds the corner between vertical and horizontal scrollbars.
	 *
	 * @type {Booelan}
	 * @default false
	 * @public
	 */
	corner: PropTypes.bool,

	/**
	 * `true` if rtl, `false` if ltr.
	 *
	 * @type {Boolean}
	 * @private
	 */
	rtl: PropTypes.bool,

	/**
	 * Registers the ScrollButtons component with an
	 * {@link core/internal/ApiDecorator.ApiDecorator}.
	 *
	 * @type {Function}
	 * @private
	 */
	// setApiProvider: PropTypes.func,

	/**
	 * The scrollbar will be oriented vertically.
	 *
	 * @type {Boolean}
	 * @default true
	 * @public
	 */
	vertical: PropTypes.bool
};

ScrollbarBase.defaultProps = {
	corner: false,
	vertical: true
};

/**
 * An Agate-styled scroll bar.
 *
 * @class Scrollbar
 * @memberof agate/useScroll
 * @ui
 * @private
 */
/* TODO: Is it possible to use ApiDecorator?
const Scrollbar = ApiDecorator(
	{api: [
		'focusOnButton',
		'getContainerRef',
		'isOneOfScrollButtonsFocused',
		'showThumb',
		'startHidingThumb',
		'update'
	]}, Skinnable(ScrollbarBase)
);
*/
const Scrollbar = ScrollbarBase;

Scrollbar.displayName = 'Scrollbar';

export default Scrollbar;
export {
	Scrollbar,
	Scrollbar as ScrollbarBase
};