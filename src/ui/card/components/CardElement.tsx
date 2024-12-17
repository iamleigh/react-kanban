import React, { JSX } from "react";
import { Draggable } from "@hello-pangea/dnd";
import { Card } from "@/types";

type RenderCard = ( isDragging: boolean ) => JSX.Element

interface Props {
	children: Card
	index: number
	renderCard: RenderCard
	disableCardDrag: boolean
}

export const CardElement: React.FC<Props> = ({
	children: card,
	index,
	renderCard,
	disableCardDrag
}) => {
	return (
		<Draggable
			draggableId={ String( card.id ) }
			index={ index }
			isDragDisabled={ disableCardDrag }>
			{( provided, { isDragging } ) => (
				<div
					ref={ provided.innerRef }
					{ ...provided.draggableProps }
					{ ...provided.dragHandleProps }
					data-testid={ `card-${ card.id }` }>
					<div style={{ display: 'inline-block', whiteSpace: 'normal' }}>
						{ renderCard( isDragging ) }
					</div>
				</div>
			)}
		</Draggable>
	)
}
