import {mergeComponentMetadata} from '@enact/storybook-utils';
import {select} from '@enact/storybook-utils/addons/knobs';
import React from 'react';
import {storiesOf} from '@storybook/react';
import WindDirectionControl from '@enact/agate/WindDirectionControl';

WindDirectionControl.displayName = 'WindDirectionControl';
const Config = mergeComponentMetadata('WindDirectionControl', WindDirectionControl);

storiesOf('Agate', module)
	.add(
		'WindDirectionControl',
		() => (
			<div style={{marginTop: '40px'}}>
				<WindDirectionControl
					airDirection={select('airDirection', ['', 'airDown', 'airRight', 'airUp'], Config, '')}
				/>
			</div>
		),
		{
			text: 'The basic WindDirectionControl'
		}
	);
