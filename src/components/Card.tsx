import React from "react"

interface CardProps {
	title?: string
	description?: string
	dragging: boolean
	allowRemoveCard: boolean
	onCardRemove?: () => void
}

export const Card: React.FC<CardProps> = ({
	title,
	description,
	dragging,
	allowRemoveCard,
	onCardRemove
}) => {
	return (
		<div className={`kanban-card ${dragging ? 'kanban-card--dragging' : ''}`}>
			<span>
				<div className="react-kanban-card__title">
					<span>{title}</span>
					{ allowRemoveCard && (
						<span style={{ cursor: 'pointer' }} onClick={onCardRemove ? () => onCardRemove() : undefined}>X</span>
					)}
				</div>
			</span>

			<div className="kanban-card__description">{ description }</div>
		</div>
	);
}
