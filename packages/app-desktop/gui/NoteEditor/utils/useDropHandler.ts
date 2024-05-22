import { useCallback } from 'react';
import Note from '@joplin/lib/models/Note';
import { DragEvent as ReactDragEvent } from 'react';

interface HookDependencies {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied
	editorRef: any;
}

// Returns true if Joplin handled the event
export type DropHandler = (event: DragEvent|ReactDragEvent)=> boolean;

export default function useDropHandler(dependencies: HookDependencies): DropHandler {
	const { editorRef } = dependencies;

	return useCallback((event: DragEvent|ReactDragEvent) => {
		if (!event.dataTransfer) return false;

		const dt = event.dataTransfer;
		const createFileURL = event.altKey;

		if (dt.types.indexOf('text/x-jop-note-ids') >= 0) {
			const noteIds = JSON.parse(dt.getData('text/x-jop-note-ids'));

			const dropNotes = async () => {
				const noteMarkdownTags = [];
				for (let i = 0; i < noteIds.length; i++) {
					const note = await Note.load(noteIds[i]);
					noteMarkdownTags.push(Note.markdownTag(note));
				}

				editorRef.current.execCommand({
					name: 'dropItems',
					value: {
						type: 'notes',
						markdownTags: noteMarkdownTags,
					},
				});
			};
			void dropNotes();

			return true;
		}

		const files = dt.files;
		if (files && files.length) {
			const paths = [];
			for (let i = 0; i < files.length; i++) {
				const file = files[i];
				if (!file.path) continue;
				paths.push(file.path);
			}

			editorRef.current.execCommand({
				name: 'dropItems',
				value: {
					type: 'files',
					paths: paths,
					createFileURL: createFileURL,
				},
			});
			return true;
		}

		return false;
		// eslint-disable-next-line @seiyab/react-hooks/exhaustive-deps -- Old code before rule was applied
	}, []);
}
