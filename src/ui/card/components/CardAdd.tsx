import { Card, Column } from "@/types"
import { CardEdit } from "./CardEdit"
import { useState } from "react"

interface Props<TCard extends Card> {
	column: Column<TCard>
	onConfirm: ( column: Column<TCard>, card: TCard ) => void
}

export const CardAdd = <TCard extends Card>({ column, onConfirm }: Props<TCard>) => {
	const [addCard, setAddCard] = useState<boolean>( false )

	const confirmCard = (card: TCard) => {
		onConfirm(column, card)
		setAddCard( false )
	}

	let rendered = (
		<button
			className="kanban-card-add__button"
			onClick={() => setAddCard( ! addCard )}>
			Add +
		</button>
	)

	if ( addCard ) {
		rendered = (
			<CardEdit
				onConfirm={ confirmCard }
				onCancel={ () => setAddCard( false ) }/>
		)
	}

	return rendered
}
