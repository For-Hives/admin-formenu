import { Controller } from 'react-hook-form'
import { Select, SelectItem } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'

export function InputCategoryDishComponent({
	control,
	errors,
	name,
	value,
	categories,
}) {
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est la catégorie de votre plat ? (&nbsp;entrée / plat / dessert
					... ?&nbsp;)
				</h2>
				<p className={'text-sm italic'}>
					Ici vous pouvez choisir la catégorie de votre plat. Vous la
					retrouverez dans la carte directement ici !
				</p>
			</div>
			<div>
				<Controller
					name={name ?? ''}
					control={control}
					defaultValue={!!value ? value.toString() : ''}
					render={({ field }) => (
						<Select
							{...field}
							aria-label="Catégorie du plat"
							placeholder="Catégorie du plat..."
							classNames={customInput}
							color="primary"
							variant="bordered"
							selectedKeys={field.value.toString()}
							radius="sm"
							data-cy={name}
							id={name}
							name={name}
							size="sm"
							isInvalid={!!errors[name]}
							errorMessage={errors[name]?.message}
						>
							{categories?.length > 0 &&
								categories.map(category => (
									<SelectItem key={category.id} value={category.id.toString()}>
										{category.attributes.name}
									</SelectItem>
								))}
						</Select>
					)}
				/>
			</div>
		</div>
	)
}
