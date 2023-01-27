import IconChevronsRight from 'tablerIcons/chevrons-right.tsx';
import PostList, { PostListProps } from '../components/PostList.tsx';

export default function Resorts(props: { spots: PostListProps[] }) {
	return (
		<section id='places' class='bg-white pt-10 pb-20'>
			<div class='container w-full mx-auto'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Resorts</h5>
							<h4 class='main_title'>
								Checkout Jasaan Best Resorts
							</h4>
						</div>
						<div class='mb-1 order-2 md:order-3 flex flex-wrap items-center justify-end mr-0 md:mr-4'>
							<a
								href='/spots?type=resort'
								class='flex text-red-500 leading-relaxed tracking-wider font-extrabold'
							>
								See All <IconChevronsRight />
							</a>
						</div>
					</div>
				</div>
			</div>

			<div class='container'>
				<div
					class='mx-auto flex items-center justify-end'
					style='width=100%;height: auto'
				>
					<div
						class='bg-gray-100 rounded-md overflow-hidden'
						style='width: 100%;max-width: 100%;height: 460px;'
					>
						<div
							id='resorts'
							class='swiper'
							style='width:100%;height:100%'
						>
							<div class='swiper-wrapper'>
								{props.spots.map((spot) => {
									return (
										<div class='swiper-slide max-w-sm'>
											<div class='rounded-xl overflow-hidden my-3 bg-white shadow mx-3'>
												<PostList
													spot={spot}
												/>
											</div>
										</div>
									);
								})}
							</div>
						</div>
					</div>
				</div>
			</div>
			{
				/*<div class='container mx-auto flex items-center flex-wrap pt-4 pb-12'>
				{props.spots.map((spot) => {
					return <PostList spot={spot} />;
				})}
			</div> */
			}
		</section>
	);
}
