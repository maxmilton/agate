import {mergeComponentMetadata} from '@enact/storybook-utils';
import {action} from '@enact/storybook-utils/addons/actions';
import {boolean, number, select} from '@enact/storybook-utils/addons/knobs';
import {storiesOf} from '@storybook/react';

import Skinnable from '@enact/agate/Skinnable';
import kind from '@enact/core/kind';
import PropTypes from 'prop-types';

import ArcPicker, {ArcPickerBase} from '@enact/agate/ArcPicker';

ArcPicker.displayName = 'ArcPicker';
const Config = mergeComponentMetadata('ArcPicker', ArcPicker, ArcPickerBase);

// Set up some defaults for colors
const prop = {
	colors: ['#444444', '#eeeeee', '#ffffff', '#986aad', '#0000ff']
};

const SkinnedArcPickerBase = kind({
	name: 'SkinnedArckPicker',
	propTypes: {
		 skin: PropTypes.string,
		 skinVariants: PropTypes.object
	},
	
	computed: {
		defaultBackgroundColor: ({skin, skinVariants}) => skin === 'silicon' && skinVariants.night === true ? '#444444' : "#eeeeee",
		defaultForegroundColor: ({skin, skinVariants}) => skin === 'silicon' && skinVariants.night === true ? '#ffffff' : "#444444",
	},
	render: ({
		defaultBackgroundColor, 
		defaultForegroundColor, 
		skin, skinVariants, ...rest}) => {
		 const itemCount = number('items', Config, {range: true, min: 0, max: 40}, 8);
		 const items = (new Array(itemCount)).fill().map((i, index) => index + 1);
		 console.log(skin);
		 console.log(skinVariants);
		 console.log(defaultBackgroundColor,defaultForegroundColor);
		//  console.log(defaultForegroundColor);
		 return (<ArcPicker
				{...rest}
				backgroundColor={select('backgroundColor', prop.colors, Config, defaultBackgroundColor)}
				foregroundColor={select('foregroundColor', prop.colors, Config, defaultForegroundColor)}
		 >{items}</ArcPicker>)
	}
});
const SkinnedArcPicker = Skinnable({prop: 'skin', variantsProp: 'skinVariants'}, SkinnedArcPickerBase);


storiesOf('Agate', module)
	.add(
		'ArcPicker',
		() => {
			// const itemCount = number('items', Config, {range: true, min: 0, max: 40}, 8);
			// const items = (new Array(itemCount)).fill().map((i, index) => index + 1);
			

			return (

				<SkinnedArcPicker
               // backgroundColor={select('backgroundColor', prop.colors, Config)}
               disabled={boolean('disabled', Config)}
               endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
               // foregroundColor={select('foregroundColor', prop.colors, Config)}
               onChange={action('onChange')}
               selectionType={select('selectionType', ['cumulative', 'single'], Config, 'cumulative')}
               startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
            />
				// <ArcPicker
				// 	backgroundColor={select('backgroundColor', prop.colors, Config)}
				// 	disabled={boolean('disabled', Config)}
				// 	endAngle={number('endAngle', Config, {range: true, min: 0, max: 360})}
				// 	foregroundColor={select('foregroundColor', prop.colors, Config)}
				// 	onChange={action('onChange')}
				// 	selectionType={select('selectionType', ['cumulative', 'single'], Config, 'cumulative')}
				// 	startAngle={number('startAngle', Config, {range: true, min: 0, max: 360})}
				// >{items}</ArcPicker>
			);
		},
		{
			text: 'The basic ArcPicker'
		}
	);
