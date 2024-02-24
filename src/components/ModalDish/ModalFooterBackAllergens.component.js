import { Button } from '@nextui-org/react'

export function ModalFooterBackAllergensComponent(props) {
	return (
		<>
			<div></div>
			<Button
				color="primary"
				variant="flat"
				onPress={props.onPress}
				className={'no-underline'}
				startContent={<i className={`fi fi-sr-arrow-left icon-button`}></i>}
			>
				Revenir en arrière
			</Button>
		</>
	)
}
