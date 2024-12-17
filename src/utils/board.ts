import { DropResult } from "@hello-pangea/dnd";
import { Card, Column, KanbanBoard } from "@/types";

interface Cords {
	src: {
		startPos: number
		startColId?: string | number
	}
	dist: {
		endPos?: number
		endColId?: string | number
	}
}

export const getCoords = <TCard extends Card>(
	e: DropResult,
	board: KanbanBoard<TCard>
): Partial<Cords> => {
	if ( null === e.destination ) return {}

	const columnSrc = {
		startPos: e.source.index
	}

	const columnDist = {
		endPos: e.destination?.index
	}

	if ( 'BOARD' === e.type ) {
		return {
			src: columnSrc,
			dist: columnDist
		}
	}

	return {
		src: {
			...columnSrc,
			startColId: ''
		},
		dist: {
			...columnDist,
			endColId: ''
		}
	}
}