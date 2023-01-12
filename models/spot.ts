import { PostListProps } from '../components/PostList.tsx';
import generateCategoryColors from '../lib/generate-category-colors.ts';
import { Barangay, Category } from '../type.ts';
import chance from '../lib/chance.ts';

function generatePrices() {
	const priceRangeLower = chance.floating({ min: 10, max: 50 });
	return {
		address: chance.address(),
		entranceFee: chance.floating({ min: 10, max: 100 }).toFixed(2),
		priceRangeLower: priceRangeLower.toFixed(2),
		priceRangeUpper: chance.floating({ min: priceRangeLower, max: 100 })
			.toFixed(2),
	};
}

const spots: PostListProps[] = [
	{
		slug: 'agutayan-island',
		image: 'images/spots/2.jpg',
		title: 'Agutayan Island',
		categories: generateCategoryColors([
			Category.SWIM,
			Category.TOURIST_ATTRACTION,
		]),
		openForReservations: false,
		barangay: Barangay.DANAO,
		...generatePrices(),
	},
	{
		slug: 'brew-haa-coffee-and-smoothies',
		image: 'images/spots/3.jpg',
		title: 'Brew Haa Coffee and Smoothies',
		categories: generateCategoryColors([Category.FOOD]),
		openForReservations: true,
		barangay: Barangay.LOWER_JASAAN,
		...generatePrices(),
	},
	{
		slug: 'carloise-restaurant',
		image: 'images/spots/carloise_2.jpg',
		title: 'Carloise Restaurant',
		categories: generateCategoryColors([Category.FOOD]),
		openForReservations: true,
		barangay: Barangay.LOWER_JASAAN,
		...generatePrices(),
	},
	{
		slug: 'perys-resto-and-grill',
		image: 'images/spots/perys_2.jpg',
		title: 'Pery’s Resto and Grill',
		categories: generateCategoryColors([Category.FOOD]),
		openForReservations: false,
		barangay: Barangay.APLAYA,
		...generatePrices(),
	},
	{
		slug: 'sophie-red-hotel',
		image: 'images/spots/sophie_red_hotel_2.jpg',
		title: 'Sophie Red Hotel',
		categories: generateCategoryColors([
			Category.FOOD,
			Category.STAY,
			Category.SWIM,
		]),
		openForReservations: true,
		barangay: Barangay.BOBONTUGAN,
		...generatePrices(),
	},
	{
		slug: 'jasaan-immaculate-paris-church',
		image: 'images/spots/paris_church_1.jpg',
		title: 'Jasaan Immaculate Paris Church',
		categories: generateCategoryColors([
			Category.TOURIST_ATTRACTION,
		]),
		openForReservations: false,
		barangay: Barangay.KIMAYA,
		...generatePrices(),
	},
	{
		slug: 'sagpulon-falls',
		image: 'images/spots/sagpulon_4.jpg',
		title: 'Sagpulon Falls',
		categories: generateCategoryColors([
			Category.TOURIST_ATTRACTION,
			Category.SWIM,
		]),
		openForReservations: false,
		barangay: Barangay.LUZBANSON,
		...generatePrices(),
	},
];

export default spots;
