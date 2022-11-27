import { combineRgb } from '@companion-module/base'

/**
 * Get the available feedbacks.
 *
 * !!! Utilized by bmd-multiview16 !!!
 *
 * @returns {Object[]} the available feedbacks
 * @access public
 * @since 1.2.0
 */
export function getFeedbacks() {
	const feedbacks = {}

	feedbacks['input_bg'] = {
		label: 'Change background color by destination',
		description: 'If the input specified is in use by the output specified, change background color of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: combineRgb(0, 0, 0),
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: combineRgb(255, 255, 0),
			},
			{
				type: 'dropdown',
				label: 'Input',
				id: 'input',
				default: '0',
				choices: this.CHOICES_INPUTS,
			},
			{
				type: 'dropdown',
				label: 'Output',
				id: 'output',
				default: '0',
				choices: this.CHOICES_OUTPUTS,
			},
		],
		callback: (feedback) => {
			if (this.getOutput(parseInt(feedback.options.output)).route == parseInt(feedback.options.input)) {
				return {
					color: feedback.options.fg,
					bgcolor: feedback.options.bg,
				}
			}
		},
	}

	if (this.serialCount > 0) {
		feedbacks['serial_bg'] = {
			label: 'Change background color by serial route',
			description: 'If the input specified is in use by the output specified, change background color of the bank',
			options: [
				{
					type: 'colorpicker',
					label: 'Foreground color',
					id: 'fg',
					default: combineRgb(0, 0, 0),
				},
				{
					type: 'colorpicker',
					label: 'Background color',
					id: 'bg',
					default: combineRgb(255, 255, 0),
				},
				{
					type: 'dropdown',
					label: 'Input',
					id: 'input',
					default: '0',
					choices: this.CHOICES_SERIALS,
				},
				{
					type: 'dropdown',
					label: 'Output',
					id: 'output',
					default: '0',
					choices: this.CHOICES_SERIALS,
				},
			],
			callback: (feedback) => {
				if (this.getSerial(parseInt(feedback.options.output)).route == parseInt(feedback.options.input)) {
					return {
						color: feedback.options.fg,
						bgcolor: feedback.options.bg,
					}
				}
			},
		}
	}

	feedbacks['selected_destination'] = {
		label: 'Change background color by selected destination',
		description: 'If the output specified is selected, change background color of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: combineRgb(0, 0, 0),
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: combineRgb(255, 255, 0),
			},
			{
				type: 'dropdown',
				label: 'Output',
				id: 'output',
				default: '0',
				choices: this.CHOICES_OUTPUTS,
			},
		],
		callback: (feedback) => {
			if (parseInt(feedback.options.output) == this.selected) {
				return {
					color: feedback.options.fg,
					bgcolor: feedback.options.bg,
				}
			}
		},
	}

	feedbacks['selected_source'] = {
		label: 'Change background color by route to selected destination',
		description: 'If the input specified is in use by the selected output, change background color of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: combineRgb(0, 0, 0),
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: combineRgb(255, 255, 255),
			},
			{
				type: 'dropdown',
				label: 'Input',
				id: 'input',
				default: '0',
				choices: this.CHOICES_INPUTS,
			},
		],
		callback: (feedback) => {
			if (this.getOutput(this.selected).route == parseInt(feedback.options.input)) {
				return {
					color: feedback.options.fg,
					bgcolor: feedback.options.bg,
				}
			}
		},
	}

	feedbacks['take'] = {
		label: 'Change background color if take has a route queued',
		description: 'If a route is queued for take, change background color of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: combineRgb(255, 255, 255),
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: combineRgb(255, 0, 0),
			},
		],
		callback: (feedback) => {
			if (this.queue != '') {
				return {
					color: feedback.options.fg,
					bgcolor: feedback.options.bg,
				}
			}
		},
	}

	feedbacks['take_tally_source'] = {
		label: 'Change background color if the selected source is queued in take',
		description: 'If the selected source is queued for take, change background color of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: combineRgb(255, 255, 255),
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: combineRgb(255, 0, 0),
			},
			{
				type: 'dropdown',
				label: 'Input',
				id: 'input',
				default: '0',
				choices: this.CHOICES_INPUTS,
			},
		],
		callback: (feedback) => {
			if (parseInt(feedback.options.input) == this.queuedSource && this.selected == this.queuedDest) {
				return {
					color: feedback.options.fg,
					bgcolor: feedback.options.bg,
				}
			}
		},
	}

	feedbacks['take_tally_dest'] = {
		label: 'Change background color if the selected destination is queued in take',
		description: 'If the selected destination is queued for take, change background color of the bank',
		options: [
			{
				type: 'colorpicker',
				label: 'Foreground color',
				id: 'fg',
				default: combineRgb(255, 255, 255),
			},
			{
				type: 'colorpicker',
				label: 'Background color',
				id: 'bg',
				default: combineRgb(255, 0, 0),
			},
			{
				type: 'dropdown',
				label: 'Output',
				id: 'output',
				default: '0',
				choices: this.CHOICES_OUTPUTS,
			},
		],
		callback: (feedback) => {
			if (parseInt(feedback.options.output) == this.queuedDest) {
				return {
					color: feedback.options.fg,
					bgcolor: feedback.options.bg,
				}
			}
		},
	}

	return feedbacks
}
