import PostList from '../components/PostList.tsx';
import generateCategoryColors from '../lib/generate-category-colors.ts';
import { Category } from '../type.ts';

export default function Spots() {
	const spots = [
		{
			image: 'images/spots/2.jpg',
			title: 'Agutayan Island',
			categories: generateCategoryColors([
				Category.BEACH,
				Category.RESORT,
			]),
		},
		{
			image: 'images/spots/3.jpg',
			title: 'Brew Haa Coffee and Smoothies',
			categories: generateCategoryColors([Category.RESTAURANT]),
		},
	];
	return (
		<section class='bg-white pt-20 pb-20'>
			<div class='container w-full mx-auto'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Places</h5>
							<h4 class='main_title'>
								Checkout Jasaan Best Spots
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
				{spots.map((spot) => {
					return (
						<PostList
							image={spot.image}
							title={spot.title}
							categories={spot.categories}
						/>
					);
				})}
			</div>
		</section>
	);
}
