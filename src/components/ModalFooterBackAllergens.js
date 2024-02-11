import { Button } from '@nextui-org/react'

export function ModalFooterBackAllergens(props) {
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