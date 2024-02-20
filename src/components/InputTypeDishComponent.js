import { Controller } from 'react-hook-form'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'

export function InputTypeDishComponent({
	control,
	errors,
	name,
	value,
	typeDish,
}) {
	console.log('value type dish', value)
	console.log('value types dishes', typeDish)
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est le type de plat ? (&nbsp;viande, poissons, oeufs...) ...
					?&nbsp;)
				</h2>
				<p className={'text-sm italic'}>
					{`Cela permettra de classer votre plat, et de l'afficher correctement dans l'application.`}
				</p>
			</div>
			<div>
				<Controller
					name={name ?? ''}
					control={control}
					defaultValue={value.toString()}
					render={({ field }) => (
						<Select
							{...field}
							aria-label="Type du plat"
							placeholder="Type du plat..."
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
							{typeDish?.length > 0 &&
								typeDish.map(type_dish => (
									<SelectItem
										key={type_dish.id}
										value={type_dish.id.toString()}
									>
										{type_dish.attributes.name}
									</SelectItem>
								))}
						</Select>
					)}
				/>
				<span>{value.type_dish}</span>
			</div>
		</div>
	)
}
