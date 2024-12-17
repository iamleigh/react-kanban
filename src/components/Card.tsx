import { Card } from "@/types"

interface Props<TCard extends Card> {
	children: TCard
	dragging: boolean
	allowRemoveCard: boolean
	onCardRemove?: (card: TCard) => void
}

export const DefaultCard = <TCard extends Card>({
	children: card,
	dragging,
	allowRemoveCard,
	onCardRemove
}: Props<TCard>) => {
	return (
		<div className={`kanban-card ${dragging ? 'kanban-card--dragging' : ''}`}>
			<span>
				<div className="react-kanban-card__title">
					<span>{ card.title }</span>
					{ allowRemoveCard && (
						<span style={{ cursor: 'pointer' }} onClick={onCardRemove ? () => onCardRemove( card ) : undefined}>X</span>
					)}
				</div>
			</span>

			<div className="kanban-card__description">{ card.description }</div>
		</div>
	);
}
