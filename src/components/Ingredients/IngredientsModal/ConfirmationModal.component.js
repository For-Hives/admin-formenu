import {
	Modal,
	Button,
	ModalHeader,
	ModalBody,
	ModalFooter,
	useDisclosure,
	ModalContent,
} from '@nextui-org/react'
import { forwardRef, useImperativeHandle } from 'react'

const ConfirmationModal = forwardRef(({ message, onConfirm }, ref) => {
	const { isOpen, onClose, onOpenChange, onOpen } = useDisclosure()

	useImperativeHandle(ref, () => ({
		open() {
			onOpen()
		},
		close() {
			onClose()
		},
	}))

	return (
		<Modal
			isOpen={isOpen}
			onClose={onClose}
			onOpenChange={onOpenChange}
			closeButton
		>
			<ModalContent>
				<ModalHeader>Confirmation</ModalHeader>
				<ModalBody>
					<p>{message}</p>
				</ModalBody>
				<ModalFooter>
					<Button auto flat color="error" onClick={onClose}>
						Annuler
					</Button>
					<Button
						color={'primary'}
						onClick={() => {
							onConfirm()
							onClose()
						}}
					>
						Confirmer
					</Button>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
})

ConfirmationModal.displayName = 'ConfirmationModal'

export default ConfirmationModal
