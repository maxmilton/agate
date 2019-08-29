/**
 * Agate styled item with an icon and a label below.
 *
 * @example
 * <IconItem icon="plus" label="Label">Hello IconItem</IconItem>
 *
 * @module agate/IconItem
 * @exports IconItem
 * @exports IconItemBase
 */

import compose from 'ramda/src/compose';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';
import {MarqueeController} from '@enact/ui/Marquee';
import Pure from '@enact/ui/internal/Pure';
import React from 'react';
import Spottable from '@enact/spotlight/Spottable';
import Touchable from '@enact/ui/Touchable';

import Icon from '../Icon';
import {LabeledItemBase} from '../LabeledItem';
import Skinnable from '../Skinnable';
import SlotItem from '../SlotItem';

import componentCss from './IconItem.module.less';

/**
 * A focusable component that combines marquee-able text content with a synchronized
 * marquee-able text label.
 *
 * @class IconItemBase
 * @memberof agate/IconItem
 * @extends agate/Item.ItemBase
 * @mixes spotlight/Spottable.Spottable
 * @mixes ui/Touchable.Touchable
 * @mixes agate/Marquee.MarqueeController
 * @ui
 * @public
 */
const IconItemBase = kind({
	name: 'IconItem',

	propTypes: /** @lends agate/IconItem.IconItemBase.prototype */ {
		/**
		 * The node to be displayed as the main content of the item.
		 *
		 * @type {Node}
		 * @required
		 * @public
		 */
		children: PropTypes.node.isRequired,

		/**
		 * Customizes the component by mapping the supplied collection of CSS class names to the
		 * corresponding internal Elements and states of this component.
		 *
		 * The following classes are supported:
		 *
		 * * `labeledItem` - The root class name
		 * * `icon` - Applied to the icon
		 * * `label` - Applied to the label
		 *
		 * @type {Object}
		 * @public
		 */
		css: PropTypes.object,

		/**
		 * The icon to be displayed on the left.
		 *
		 * @type {String}
		 * @public
		 */
		iconAfter: PropTypes.string,

		/**
		 * The icon to be displayed on the left.
		 *
		 * @type {String}
		 * @public
		 */
		iconBefore: PropTypes.string,

		/**
		 * The label to be displayed along with the text.
		 *
		 * @type {Node}
		 * @public
		 */
		label: PropTypes.node
	},

	styles: {
		css: componentCss,
		className: 'iconItem',
		publicClassNames: true
	},

	computed: {
		slotBefore: ({css, iconBefore}) => iconBefore ? <Icon size="small" className={css.iconBefore}>{iconBefore}</Icon> : null,
		slotAfter: ({css, iconAfter}) => iconAfter ? <Icon size="small" className={css.iconAfter}>{iconAfter}</Icon> : null
	},

	render: ({children, css, label, ...rest}) => {
		delete rest.iconBefore;
		delete rest.iconAfter;

		return (
			<SlotItem
				{...rest}
			>
				<LabeledItemBase
					css={css}
					label={label}
				>
					{children}
				</LabeledItemBase>
			</SlotItem>
		);
	}
});

const IconItemDecorator = compose(
	Spottable,
	Pure,
	Touchable,
	MarqueeController({marqueeOnFocus: true}),
	Skinnable
);

/**
 * A Agate styled labeled item with built-in support for marqueed text.
 *
 * @class IconItem
 * @memberof agate/IconItem
 * @extends agate/IconItem.IconItemBase
 * @ui
 * @public
 */
const IconItem = IconItemDecorator(IconItemBase);

export default IconItem;
export {IconItem, IconItemBase};
