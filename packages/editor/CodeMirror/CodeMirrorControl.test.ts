import { ViewPlugin } from '@codemirror/view';
import createEditorControl from './testUtil/createEditorControl';
import { EditorCommandType } from '../types';
import pressReleaseKey from './testUtil/pressReleaseKey';

describe('CodeMirrorControl', () => {
	it('clearHistory should clear the undo/redo history', () => {
		const controls = createEditorControl('');

		const insertedText = 'Testing... This is a test...';
		controls.insertText(insertedText);

		const fullInsertedText = insertedText;
		expect(controls.getValue()).toBe(fullInsertedText);

		// Undo should work before clearing history
		controls.undo();
		expect(controls.getValue()).toBe('');

		controls.redo();
		controls.clearHistory();

		expect(controls.getValue()).toBe(fullInsertedText);

		// Should not be able to undo cleared changes
		controls.undo();
		expect(controls.getValue()).toBe(fullInsertedText);

		// Should be able to undo new changes
		controls.insertText('!!!');
		expect(controls.getValue()).toBe(`${fullInsertedText}!!!`);

		controls.undo();
		expect(controls.getValue()).toBe(fullInsertedText);
	});

	it('should support adding CodeMirror 6 extensions', () => {
		const control = createEditorControl('');

		const updateFn = jest.fn();
		control.addExtension([
			ViewPlugin.fromClass(class {
				public update = updateFn;
			}),
		]);

		// Verify that the extension has been loaded
		updateFn.mockReset();
		control.insertText('Test...');
		expect(updateFn).toHaveBeenCalled();
	});

	it('should support adding custom editor commands', () => {
		const control = createEditorControl('');
		const command = jest.fn(() => 'test');
		control.registerCommand('myTestCommand', command);

		expect(control.supportsCommand('myTestCommand')).toBe(true);
		expect(control.execCommand('myTestCommand')).toBe('test');
		expect(command).toHaveBeenCalledTimes(1);
	});

	it('should support overriding default keybindings', () => {
		const control = createEditorControl('test');
		control.execCommand(EditorCommandType.SelectAll);

		const testCommand = jest.fn(() => true);
		const keybindings = control.prependKeymap([
			// Override the default binding for ctrl-d (search)
			{ key: 'Ctrl-d', run: testCommand },
		]);

		// Should call the override command rather than the default handler
		const keyData = {
			key: 'd',
			code: 'KeyD',
			ctrlKey: true,
		};
		pressReleaseKey(control.editor, keyData);
		expect(testCommand).toHaveBeenCalledTimes(1);

		// Calling keybindings.remove should deregister the override.
		keybindings.remove();
		pressReleaseKey(control.editor, keyData);
		expect(testCommand).toHaveBeenCalledTimes(1);
	});

	it('should toggle comments', () => {
		const control = createEditorControl('Hello\nWorld\n');
		control.select(1, 5);

		control.execCommand('toggleComment');
		expect(control.getValue()).toBe('<!-- Hello -->\nWorld\n');

		control.execCommand('toggleComment');
		expect(control.getValue()).toBe('Hello\nWorld\n');
	});

	it('should delete line', () => {
		const control = createEditorControl('Hello\nWorld\n');
		control.setCursor(1, 0);

		control.execCommand('deleteLine');
		expect(control.getValue()).toBe('Hello\n');
	});
});
