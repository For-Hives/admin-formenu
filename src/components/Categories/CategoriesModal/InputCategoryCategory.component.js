import { Controller } from 'react-hook-form'
import { Input, Select, SelectItem } from '@nextui-org/react'
import { customInput } from '@/styles/customConfNextui'

export function InputMenuCategoryComponent({
	control,
	errors,
	name,
	value,
	menus,
}) {
	return (
		<div className={'flex flex-col gap-3'}>
			<div className={'flex flex-col gap-1'}>
				<h2 className={'font-kanit text-lg font-medium'}>
					Quel est le menu de la catégorie ?
				</h2>
				<p className={'text-sm italic'}>
					{`Cela permettra de savoir à quel menu appartient cette catégorie.`}
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
							aria-label="Menu"
							placeholder="Menu..."
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
							{menus?.length > 0 &&
								menus.map(menu => (
									<SelectItem key={menu.id} value={menu.id.toString()}>
										{menu.attributes.name}
									</SelectItem>
								))}
						</Select>
					)}
				/>
			</div>
		</div>
	)
}
