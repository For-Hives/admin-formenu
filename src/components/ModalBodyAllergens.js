import Image from 'next/image'

export function ModalBodyAllergens({
	allergensFromStore,
	isAllergensSelected,
	onClickAllergens,
}) {
	return (
		<div className={'col-span-12 flex flex-col gap-3 px-20'}>
			<div className={'grid grid-cols-7 gap-4'}>
				{allergensFromStore.map(allergen => (
					<div key={allergen.id}>
						<button
							onClick={() => onClickAllergens(allergen.key)}
							className={
								'group relative flex flex-col items-center justify-center gap-2 no-underline'
							}
						>
							<div
								className={`pointer-events-none absolute left-0 top-0 m-2 flex h-[9px] w-[9px] items-center justify-center rounded-full border ${
									isAllergensSelected(allergen.key)
										? 'border-white'
										: 'border-slate-500'
								}`}
							>
								<div
									className={`pointer-events-none h-[3px] w-[3px] rounded-full ${
										isAllergensSelected(allergen.key)
											? 'bg-white'
											: 'bg-transparent'
									}`}
								/>
							</div>
							<div
								className={`pointer-events-none flex h-[100px] w-[100px] flex-col items-center justify-center gap-2 ${
									isAllergensSelected(allergen.key)
										? 'bg-slate-800'
										: 'bg-slate-50'
								} rounded-lg transition-all group-hover:bg-slate-800`}
							>
								<Image
									src={`/icons/allergens/${allergen.key}.svg`}
									width={40}
									height={40}
									alt={allergen.key}
								/>
							</div>
							<div
								className={`pointer-events-none max-w-[100px] text-center text-sm text-gray-800 ${
									isAllergensSelected(allergen.key)
										? 'underline'
										: 'no-underline'
								} group-hover:underline`}
							>
								{allergen.name}
							</div>
						</button>
					</div>
				))}
			</div>
		</div>
	)
}