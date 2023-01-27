import { FloatingButton } from '../components/Floating-Button.tsx';
import PostList, { PostListProps } from '../components/PostList.tsx';

export default function Places(
	props: {
		type: 'RESORT' | 'TOURIST_SPOT' | 'SEARCH';
		spots: PostListProps[];
	},
) {
	return (
		<section id='places' class='bg-white pb-10'>
			{props.type === 'SEARCH'
				? ''
				: (
					<div class='container w-full mx-auto'>
						<div class='row justify-center'>
							<div class='w-full lg:w-1/2'>
								<div class='section_title text-center'>
									<h5 class='sub_title'>Places</h5>
									<h4 class='main_title'>
										{props.type === 'RESORT'
											? 'Checkout Jasaan Best Resorts'
											: 'Checkout Jasaan Best Spots'}
									</h4>
								</div>
							</div>
						</div>
					</div>
				)}
			<FloatingButton />
			<div class='container mt-5'>
				<div class='mx-auto flex items-center flex-wrap pb-10'>
					{props.spots.map((spot) => {
						return (
							<div class='max-w-md'>
								<div class='mx-3'>
									<PostList
										spot={spot}
									/>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
