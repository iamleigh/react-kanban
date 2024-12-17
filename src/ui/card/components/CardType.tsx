import { JSX } from "react"
import { Card, Column } from "@/types"

export type CardType<TCard extends Card> = (
	column: Column<TCard>,
	card: TCard,
	dragging: boolean
) => JSX.Element
