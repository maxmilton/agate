import {Cell, Layout} from '@enact/ui/Layout';
import Group from '@enact/ui/Group';
import kind from '@enact/core/kind';
import LabeledIconButton from '@enact/agate/LabeledIconButton';
import PropTypes from 'prop-types';
import React from 'react';
import Slottable from '@enact/ui/Slottable';

import Panels from './Panels';

import componentCss from './TabbedPanels.less';

const Tab = kind({
	name: 'Tab',
	render: ({labelPosition, onClick, title}) => {
		return (
			<Cell
				component={LabeledIconButton}
				icon="star"
				labelPosition={labelPosition}
				onClick={onClick}
			>
				{title}
			</Cell>
		);
	}
});

const TabGroup = kind({
	name: 'TabGroup',
	computed: {
		labelPosition: ({orientation, tabPosition}) => {
			//TODO: this keeps the label always between the icon and the panels, is it necessary?
			if (orientation === 'vertical') {
				if (tabPosition === 'before') {
					return 'after';
				} else {
					return 'before';
				}
			} else {
				if (tabPosition === 'before') {
					return 'below';
				} else {
					return 'above';
				}
			}
		}
	},
	render: ({labelPosition, ...rest}) => {
		return(
			<Layout
				{...rest}
				childComponent={Tab}
				childSelect='onClick'
				component={Group}
				itemProps={{
					labelPosition
				}}
				select="radio"
			/>
		);
	}
});

TabGroup.defaultSlot = 'tabs';

const TabbedPanelsBase = kind({
	name: 'TabbedPanels',
	propTypes: {
		index: PropTypes.number,
		// tabs: PropTypes.oneOfType([TabGroup])
	},
	defaultProps: {
		index: 0
	},
	styles: {
		css: componentCss,
		className: 'tabbed-panels enact-fit'
	},
	computed: {
		children: ({children, tabs}) => {
			// if there are children use them
			if (children) {
				return children;
			}
			// otherwise try to make children from the tabs' view and viewProps
			else if (tabs) {
				return tabs.map((tab, index) => {
					const {view: View, viewProps} = tab;
					return <View key={index} {...viewProps} />;
				});
			}
		},
		tabOrientation: ({orientation}) => orientation === 'vertical' ? 'horizontal' : 'vertical'
	},
	render: ({children, css, index, onSelect, tabOrientation, tabPosition, tabs, ...rest}) => {
		return (
			<Layout {...rest}>
				<Cell
					className={css.tabs}
					component={TabGroup}
					onSelect={onSelect}
					orientation={tabOrientation}
					tabPosition={tabPosition}
					selected={index}
					shrink
				>
					{tabs}
				</Cell>
				<Cell
					className={css.panels}
					component={Panels}
					index={index}
				>
					{children}
				</Cell>
			</Layout>
		);
	}
});

const TabbedPanels = Slottable({slots: ['tabs']}, TabbedPanelsBase);

export default TabbedPanels;
export {TabbedPanels, TabbedPanelsBase};
