import React from 'react';
import {storiesOf} from '@storybook/react';

import Keypad from '@enact/agate/Keypad';

storiesOf('Agate', module)
	.add(
		'Keypad',
		() => {
			return (
				<div>
					<Keypad />
				</div>);
		},
		{
			info: {
				text: 'Basic usage of Keypad'
			}
		}
	);
