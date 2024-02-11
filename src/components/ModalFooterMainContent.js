import { Button } from '@nextui-org/react'
import Image from 'next/image'

export function ModalFooterMainContent({
	openAllergensUpdate,
	dietsFromStore,
	onClickDiet,
	isDietSelected,
	resetAll,
	onClose,
	handleSubmit,
}) {
	return (
		<>
			<div>
				<Button
					color="primary"
					variant="flat"
					onPress={openAllergensUpdate}
					className={'no-underline'}
					startContent={<i className={`fi fi-br-wheat-slash icon-button`}></i>}
				>
					Modifier les allergènes
				</Button>
			</div>
			<div className={'grid grid-cols-3 gap-2'}>
				{dietsFromStore.map(diet => (
					<button
						key={diet.key}
						onClick={() => onClickDiet(diet.key)}
						className={`group relative flex flex-col items-center justify-center gap-2 rounded p-2 no-underline ${
							isDietSelected(diet.key)
								? 'bg-slate-800'
								: 'bg-slate-50 opacity-65'
						}`}
					>
						<div
							className={`pointer-events-none flex flex-col items-center justify-center gap-2`}
						>
							<Image
								src={`/icons/diets/${diet.key}.svg`}
								width={30}
								height={30}
								alt={diet.key}
							/>
						</div>
						<div
							className={`pointer-events-none max-w-[100px] text-center text-sm text-gray-800 ${
								isDietSelected(diet.key)
									? '!text-white underline'
									: 'no-underline'
							} group-hover:underline`}
						>
							{diet.name}
						</div>
					</button>
				))}
			</div>
			<div className={'flex items-center gap-4'}>
				<Button
					color="danger"
					variant="flat"
					onPress={() => {
						// reset
						resetAll()
						// close
						onClose()
					}}
					className={'no-underline'}
					startContent={<i className={`fi fi-sr-arrow-left icon-button`}></i>}
				>
					Annuler & fermer
				</Button>
				<Button
					color="primary"
					onPress={() => {
						handleSubmit(data => console.log(data))()
					}}
					className={'no-underline'}
					startContent={<i className={`fi fi-sr-disk icon-button`}></i>}
				>
					Enregistrer & fermer
				</Button>
			</div>
		</>
	)
}