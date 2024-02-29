import { InputNameDishComponent } from '@/components/Dish/Base/ModalDish/InputNameDish.component'
import { InputDescriptionDishComponent } from '@/components/Dish/Base/ModalDish/InputDescriptionDish.component'
import { InputDropzoneImageDishComponent } from '@/components/Dish/Base/ModalDish/InputDropzoneImageDish.component'
import { InputIngredientsDishComponent } from '@/components/Dish/Base/ModalDish/InputIngredientsDish.component'
import { InputPriceDishComponent } from '@/components/Dish/Base/ModalDish/InputPriceDish.component'
import { InputCategoryDishComponent } from '@/components/Dish/Base/ModalDish/InputCategoryDish.component'
import { InputTypeDishComponent } from '@/components/Dish/Base/ModalDish/InputTypeDishComponent'

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
					value={props.lastDishClicked?.price}
					control={props.control}
					errors={props.errors}
					name={'price_dish'}
				/>
				<InputCategoryDishComponent
					value={props.lastDishClicked?.category?.id}
					control={props.control}
					errors={props.errors}
					name={'category_dish'}
					categories={props.categoriesFromStore}
				/>
				<InputTypeDishComponent
					value={props.lastDishClicked?.type_dish?.id}
					control={props.control}
					errors={props.errors}
					name={'type_dish'}
					typeDish={props.typeDishesFromStore}
				/>
			</div>
		</>
	)
}
