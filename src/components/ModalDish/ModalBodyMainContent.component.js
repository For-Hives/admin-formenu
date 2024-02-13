import { InputNameDishComponent } from '@/components/InputNameDish.component'
import { InputDescriptionDishComponent } from '@/components/InputDescriptionDish.component'
import { InputDropzoneImageDishComponent } from '@/components/InputDropzoneImageDish.component'
import { InputIngredientsDishComponent } from '@/components/InputIngredientsDish.component'
import { InputPriceDishComponent } from '@/components/InputPriceDish.component'

export function ModalBodyMainContentComponent(props) {
	return (
		<>
			<div className={'col-span-6 flex flex-col gap-6'}>
				<InputNameDishComponent
					value={props.lastDishClicked.name}
					control={props.control}
					errors={props.errors}
					name={'name_dish'}
				/>
				<InputDescriptionDishComponent
					value={props.lastDishClicked.description}
					control={props.control}
					errors={props.errors}
					name={'description_dish'}
				/>
				<InputDropzoneImageDishComponent
					control={props.control}
					errors={props.errors}
					name={'image_dish'}
					session={props.session}
					uploadedImage={props.uploadedImage}
					setUploadedImage={props.setUploadedImage}
				/>
			</div>
			<div className={'col-span-6 flex flex-col gap-6'}>
				<InputIngredientsDishComponent
					ingredientsFromStore={props.ingredientsFromStore}
					selectedKeys={props.selectedKeys}
					lastDishClicked={props.lastDishClicked}
					isIngredientSelected={props.ingredientSelected}
					onSelectionChange={props.onSelectionChange}
					onInputChange={props.onInputChange}
					inputValue={props.inputValue}
					openIngredientsUpdate={props.openIngredientsUpdate}
					closeIngredientsUpdate={props.closeIngredientsUpdate}
					control={props.control}
					errors={props.errors}
					name={'ingredients_dish'}
				/>
				<InputPriceDishComponent
					value={props.lastDishClicked.price}
					control={props.control}
					errors={props.errors}
					name={'price_dish'}
				/>
			</div>
		</>
	)
}
