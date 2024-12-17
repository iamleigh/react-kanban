import React, { useState } from "react";
import { Card, Column } from "@/types";
import { ColumnTitle } from "./ColumnTitle";

interface Props<TCard extends Card> {
	children: Column<TCard>
	allowRemoveColumn: boolean
	onColumnRemove?: (column: Column<TCard>) => void
	allowRenameColumn: boolean
	onColumnRename?: (column: Column<TCard>, titleInput: string) => void
}

const useRenameColumn = <TCard extends Card>({
	onColumnRename,
	children: column
}: Props<TCard>) => {
	const [rename, setRename] = useState<boolean>(false)
	const [title, setTitle] = useState( '' );

	const toggleRename = () => {
		setRename( currentRename => ! currentRename )
	}

	const handleRenameColumn: React.DOMAttributes<HTMLFormElement>['onSubmit'] = ( e ) => {
		onColumnRename?.( column, title )
		toggleRename()

		e.preventDefault();
	}

	const handleRename = () => {
		setTitle( column.title )
		toggleRename()
	}

	const handleTitleChange: React.InputHTMLAttributes<HTMLInputElement>['onChange'] = ({
		target: { value }
	}) => setTitle( value )

	return {
		titleBind: {
			value: title,
			onChange: handleTitleChange
		},
		rename,
		handleRenameColumn,
		handleRename
	}
}

export const DefaultColumn = <TCard extends Card>(props: Props<TCard>) => {
	const { children: column, allowRemoveColumn, allowRenameColumn, onColumnRemove } = props;
	const { rename, handleRename, titleBind, handleRenameColumn } = useRenameColumn( props );

	let rendered = (
		<div className="kanban-column-header__spacer">
			<ColumnTitle allowRenameColumn={ allowRenameColumn } onClick={ handleRename }>
				{ column.title }
			</ColumnTitle>
			{ allowRemoveColumn && <span onClick={ onColumnRemove ? () => onColumnRemove( column ) : undefined }>X</span> }
		</div>
	);

	if ( rename ) {
		rendered = (
			<form onSubmit={ handleRenameColumn }>
				<span>
					<input type="text" { ...titleBind } autoFocus />
				</span>

				<span>
					<button type="submit" className="kanban-column-header__button">
						Rename
					</button>

					<button type="button" className="kanban-column-header__button" onClick={ handleRename }>
						Cancel
					</button>
				</span>
			</form>
		);
	}

	return (
		<div className="kanban-column-header">
			{ rendered }
		</div>
	);
}
