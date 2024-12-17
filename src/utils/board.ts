import { DropResult } from "@hello-pangea/dnd";
import { Card, Column, KanbanBoard } from "@/types";

export interface Coordinates {
	src: {
		startPos: number
		startColId?: string | number
	}
	dist: {
		endPos?: number
		endColId?: string | number
	}
}

export const getCard = <TCard extends Card>(
	board: KanbanBoard<TCard>,
	srcCoordinate: Coordinates['src']
): TCard => {
	const column = board.columns.find( ( column: any ) => column.id === srcCoordinate.startColId )

	if ( ! column ) {
		throw new Error( `Cannot find column: ${ srcCoordinate.startColId }` )
	}

	return column.cards[ srcCoordinate.startPos ]
}

export const getColumn = <TCard extends Card>(
	board: KanbanBoard<TCard>,
	droppableId: string
): Column<TCard> | undefined => {
	return board.columns.find(({ id }: any) => String( id ) === droppableId)
}

export const getColumnStrict = <TCard extends Card>(
	board: KanbanBoard<TCard>,
	droppableId: any
): Column<TCard> => {
	const column = getColumn<TCard>(board, droppableId)

	// Check if column is undefined
	if ( ! column ) {
		throw new Error( `Cannot find column with ID: ${ droppableId }` )
	}

	return column
}

export const isMovingColumn = ( type: string ) => {
	return 'BOARD' === type
}

export const isMovingColumnPosition = ( coordinates: Partial<Coordinates> ) => {
	return coordinates.src?.startPos !== coordinates.dist?.endPos
}

export const isMovingCardPosition = ( coordinates: Partial<Coordinates> ) => {
	return (
		coordinates.src?.startPos === coordinates.dist?.endPos &&
		coordinates.src?.startColId === coordinates.dist?.endColId
	)
}

export const getCoordinates = <TCard extends Card>(
	e: DropResult,
	board: KanbanBoard<TCard>
): Partial<Coordinates> => {
	if ( null === e.destination ) return {}

	const columnSrc = { startPos: e.source.index }
	const columnDist = { endPos: e.destination?.index }

	if ( 'BOARD' === e.type ) {
		return {
			src: columnSrc,
			dist: columnDist
		}
	}

	return {
		src: {
			...columnSrc,
			startColId: getColumnStrict<TCard>(board, e.source.droppableId).id
		},
		dist: {
			...columnDist,
			endColId: getColumnStrict<TCard>(board, e.destination?.droppableId).id
		}
	}
}