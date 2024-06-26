import ToggleDishComponent from '@/components/Toggle/ToggleDish.component'

export function ModalHeaderContentComponent(props) {
	return (
		<>
			<h2 className={'font-semibold'}>
				{props.allergensUpdateOpen
					? 'Modifier les allergènes'
					: props.ingredientsUpdateOpen
						? 'Modifier les ingrédients'
						: `${
								props.lastDishClicked.name
									? 'Modifier le plat ' + props.lastDishClicked.name
									: 'Créer un nouveau plat'
							} `}
			</h2>
			{!props.isAddMode && (
				<div className={'flex gap-4'}>
					<div>
						<div className={'flex items-center gap-4'}>
							{!!props.lastDishClicked.activated ? (
								<span className={'text-sm font-light'}>Plat activé !</span>
							) : (
								<span className={'text-sm font-light'}>Plat désactivé !</span>
							)}
							<ToggleDishComponent
								id={props.lastDishClicked.id}
								activated={props.lastDishClicked.activated}
							/>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
