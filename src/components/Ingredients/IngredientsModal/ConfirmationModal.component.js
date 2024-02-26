import {
	Modal,
	Button,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
} from '@nextui-org/react'
import { forwardRef, useImperativeHandle } from 'react'

const ConfirmationModal = forwardRef(({ message, onConfirm }, ref) => {
	const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

	useImperativeHandle(ref, () => ({
		open: () => onOpen(),
		close: () => onClose(),
	}))

	return (
		<Modal open={isOpen} onClose={onClose} closeButton>
			<ModalHeader>Confirmation</ModalHeader>
			<ModalBody>
				<p>{message}</p>
			</ModalBody>
			<ModalFooter>
				<Button auto flat color="error" onClick={onClose}>
					Annuler
				</Button>
				<Button
					auto
					onClick={() => {
						onConfirm()
						onClose()
					}}
				>
					Confirmer
				</Button>
			</ModalFooter>
		</Modal>
	)
})

export default ConfirmationModal
