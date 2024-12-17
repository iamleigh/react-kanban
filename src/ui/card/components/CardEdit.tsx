import React, { useRef } from "react";
import { Card } from "@/types";
import { when } from "@/utils/global";

interface Props<TCard extends Card> {
	onConfirm: ( card: TCard ) => void
	onCancel: React.MouseEventHandler<HTMLButtonElement>
}

export const CardEdit = <TCard extends Card>({ onConfirm, onCancel }: Props<TCard>) => {
	const inputCardTitle = useRef( null )
	const inputCardDescription = useRef( null )

	const addCard = (e: any) => {
		// @ts-expect-error TS(2532): Object is possibly 'undefined'
		when( inputCardTitle.current.value )(( value: any ) => {
			// @ts-expect-error TS(2532): Object is possibly 'undefined'
			onConfirm({ title: value, description: inputCardDescription.current.value })
		})

		e.preventDefault()
	}

	const titleElement = <input
		name="title"
		defaultValue="Title"
		className="kanban-card-add-form__title"
		autoFocus
		ref={ inputCardTitle } />

	const descElement = <input
		name="description"
		defaultValue="Description"
		className="kanban-card-add-form__desc"
		autoFocus
		ref={ inputCardDescription } />

	const btnContainerStyles = {
		display: 'flex',
		justifyContent: 'space-between',
		marginTop: 5,
	}

	return (
		<div className="kanban-card-add-form">
			<form onSubmit={ addCard }>
				{ titleElement }
				{ descElement }

				<div style={ btnContainerStyles }>
					<button type="submit"
						className="kanban-card-add-form__button">
						Add
					</button>

					<button type="button"
						className="kanban-card-add-form__button"
						onClick={ onCancel }>
						Cancel
					</button>
				</div>
			</form>
		</div>
	)
}
