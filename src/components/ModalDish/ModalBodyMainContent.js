import { InputNameDish } from '@/components/InputNameDish'
import { InputDescriptionDish } from '@/components/InputDescriptionDish'
import { InputDropzoneImageDish } from '@/components/InputDropzoneImageDish'
import { InputIngredientsDish } from '@/components/InputIngredientsDish'
import { InputPriceDish } from '@/components/InputPriceDish'

export function ModalBodyMainContent(props) {
	return (
		<>
			<div className={'col-span-6 flex flex-col gap-6'}>
				<InputNameDish
					value={props.lastDishClicked.name}
					control={props.control}
					errors={props.errors}
					name={'name_dish'}
				/>
				<InputDescriptionDish
					value={props.lastDishClicked.description}
					control={props.control}
					errors={props.errors}
					name={'description_dish'}
				/>
				<InputDropzoneImageDish
					control={props.control}
					errors={props.errors}
					name={'image_dish'}
					session={props.session}
					uploadedImage={props.uploadedImage}
					setUploadedImage={props.setUploadedImage}
				/>
			</div>
			<div className={'col-span-6 flex flex-col gap-6'}>
				<InputIngredientsDish
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
				<InputPriceDish
					value={props.lastDishClicked.price}
					control={props.control}
					errors={props.errors}
					name={'price_dish'}
				/>
			</div>
		</>
	)
}
