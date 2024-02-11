import ToggleDishComponent from '@/components/Toggle/ToggleDish.component'

export function ModalHeaderContent(props) {
	return (
		<>
			<h2 className={'font-semibold'}>
				{props.allergensUpdateOpen
					? 'Modifier les allergènes'
					: props.ingredientsUpdateOpen
						? 'Modifier les ingrédients'
						: `Modifier le plat ${props.lastDishClicked.name}`}
			</h2>
			<div className={'flex gap-4'}>
				<p>
					<div className={'flex items-center gap-4'}>
						{props.lastDishClicked.activated ? (
							<span className={'text-sm font-light'}>Plat activé !</span>
						) : (
							<span className={'text-sm font-light'}>Plat désactivé !</span>
						)}
						<ToggleDishComponent
							id={props.lastDishClicked.id}
							activated={props.lastDishClicked.activated}
						/>
					</div>
				</p>
			</div>
		</>
	)
}
