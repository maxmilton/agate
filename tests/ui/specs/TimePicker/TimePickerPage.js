'use strict';
const {element, Page} = require('@enact/ui-test-utils/utils');

class PickerInterface {
	constructor (id) {
		this.id = id;
	}

	focus () {
		return browser.execute((el) => el.focus(), $(`#${this.id}>div`));
	}

	get self () {
		return element(`#${this.id}`, browser);
	}

	get hour () {
		return element('.TimePicker_TimePicker_hourPicker', this.self);
	}
	get meridiem () {
		return element('.TimePicker_TimePicker_meridiemPicker', this.self);
	}
	get minute () {
		return element('.TimePicker_TimePicker_minutePicker', this.self);
	}

	decrementer (picker) {
		return element('.internal_Picker_Picker_itemDecrement', picker);
	}
	incrementer (picker) {
		return element('.internal_Picker_Picker_itemIncrement', picker);
	}
	active (picker) {
		return element('.internal_Picker_Picker_active', picker);
	}
}

class TimePickerPage extends Page {
	constructor () {
		super();
		this.title = 'TimePicker Test';
		this.components = {};
		this.components.timePickerDefault = new PickerInterface('timePickerDefault');
		this.components.timePickerWithDefaultValue = new PickerInterface('timePickerWithDefaultValue');
		this.components.timePickerDisabled = new PickerInterface('timePickerDisabled');
		this.components.timePickerDisabledWithDefaultValue = new PickerInterface('timePickerDisabledWithDefaultValue');
	}

	open (urlExtra) {
		super.open('TimePicker-View', urlExtra);
		this.delay(1000);
	}
}

module.exports = new TimePickerPage();
