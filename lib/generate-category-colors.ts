import { Category, CategoryColor } from '../type.ts';

export default function generateCategoryColors(categories: Category[]) {
	return categories.map((category) => {
		return {
			title: category,
			color: CategoryColor[category],
		};
	});
}
