import { Controller } from 'react-hook-form'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'

export function InputCategoryCategoryComponent({
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
					Quel est la catégorie de la catégorie ?
				</h2>
				<p className={'text-sm italic'}>
					{`Cela permettra de savoir à quel catégorie appartient cette catégorie.`}
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
							aria-label="Categorie"
							placeholder="Categorie..."
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