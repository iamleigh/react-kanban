import React from "react";

interface ColumnTitleProps {
	allowRenameColumn: boolean
	onClick: React.DOMAttributes<HTMLSpanElement>['onClick']
	children: string
}

export const ColumnTitle: React.FC<ColumnTitleProps> = ({
	allowRenameColumn,
	onClick,
	children: title
}) => {
	let rendered = <span>{ title }</span>;

	if ( allowRenameColumn ) {
		rendered = (
			<span style={{ cursor: 'pointer' }} onClick={ onClick }>
				{ title }
			</span>
		);
	}

	return rendered;
}
