import { AppType, SettingSectionSource } from '@joplin/lib/models/Setting';
import * as React from 'react';
import Setting from '@joplin/lib/models/Setting';
import { _ } from '@joplin/lib/locale';
const styled = require('styled-components').default;

// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied;
type StyleProps = any;

interface Props {
	selection: string;
	// eslint-disable-next-line @typescript-eslint/ban-types -- Old code before rule was applied
	onSelectionChange: Function;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied;
	sections: any[];
}

export const StyledRoot = styled.div`
	display: flex;
	background-color: ${(props: StyleProps) => props.theme.backgroundColor2};
	flex-direction: column;
	overflow-x: hidden;
	overflow-y: auto;
`;

export const StyledListItem = styled.a`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	padding: ${(props: StyleProps) => props.theme.mainPadding}px;
	background: ${(props: StyleProps) => props.selected ? props.theme.selectedColor2 : 'none'};
	transition: 0.1s;
	text-decoration: none;
	cursor: default;
	opacity: ${(props: StyleProps) => props.selected ? 1 : 0.8};
	padding-left: ${(props: StyleProps) => props.isSubSection ? '35' : props.theme.mainPadding}px;

	&:hover {
		background-color: ${(props: StyleProps) => props.theme.backgroundColorHover2};
	}
`;

export const StyledDivider = styled.div`
	box-sizing: border-box;
	display: flex;
	flex-direction: row;
	color: ${(props: StyleProps) => props.theme.color2};
	padding: ${(props: StyleProps) => props.theme.mainPadding}px;
	padding-top: ${(props: StyleProps) => props.theme.mainPadding * .8}px;
	padding-bottom: ${(props: StyleProps) => props.theme.mainPadding * .8}px;
	border-top: 1px solid ${(props: StyleProps) => props.theme.dividerColor};
	border-bottom: 1px solid ${(props: StyleProps) => props.theme.dividerColor};
	background-color: ${(props: StyleProps) => props.theme.selectedColor2};
	font-size: ${(props: StyleProps) => Math.round(props.theme.fontSize)}px;
	opacity: 0.5;
`;

export const StyledListItemLabel = styled.span`
	font-size: ${(props: StyleProps) => Math.round(props.theme.fontSize * 1.2)}px;
	font-weight: 500;
	color: ${(props: StyleProps) => props.theme.color2};
	white-space: nowrap;
	display: flex;
	flex: 1;
	align-items: center;
	user-select: none;
`;

export const StyledListItemIcon = styled.i`
	font-size: ${(props: StyleProps) => Math.round(props.theme.fontSize * 1.4)}px;
	color: ${(props: StyleProps) => props.theme.color2};
	margin-right: ${(props: StyleProps) => props.theme.mainPadding / 1.5}px;
`;

export default function Sidebar(props: Props) {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied;
	const buttons: any[] = [];

	// eslint-disable-next-line @typescript-eslint/no-explicit-any -- Old code before rule was applied;
	function renderButton(section: any) {
		const selected = props.selection === section.name;
		return (
			<StyledListItem
				key={section.name}
				href='#'
				role='tab'
				aria-selected={selected}
				isSubSection={Setting.isSubSection(section.name)}
				selected={selected}
				onClick={() => { props.onSelectionChange({ section: section }); }}
			>
				<StyledListItemIcon
					className={Setting.sectionNameToIcon(section.name, AppType.Desktop)}
				/>
				<StyledListItemLabel>
					{Setting.sectionNameToLabel(section.name)}
				</StyledListItemLabel>
			</StyledListItem>
		);
	}

	function renderDivider(key: string) {
		return (
			<StyledDivider key={key}>
				{_('Plugins')}
			</StyledDivider>
		);
	}

	let pluginDividerAdded = false;

	for (const section of props.sections) {
		if (section.source === SettingSectionSource.Plugin && !pluginDividerAdded) {
			buttons.push(renderDivider('divider-plugins'));
			pluginDividerAdded = true;
		}

		buttons.push(renderButton(section));
	}

	return (
		<StyledRoot role='tablist'>
			{buttons}
		</StyledRoot>
	);
}
