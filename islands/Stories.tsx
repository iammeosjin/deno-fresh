import { Post } from '../type.ts';

export default function Stories(props: { posts: Post[] }) {
	const { posts } = props;
	return (
		<section class='bg-gray-100 pt-7 pb-4'>
			<div class='row justify-center'>
				<div class='w-full'>
					<div class='section_title text-center pb-6'>
						<h5 class='sub_title'>Posts</h5>
						<h4 class='main_title'>Some of Our Recent Posts</h4>
					</div>
				</div>
			</div>
			<div class='mx-auto container h-full'>
				<div class='swiper mySwiper'>
					<div class='swiper-wrapper '>
						{posts.map((post) => {
							const image = post.url;
							return (
								<div class='swiper-slide'>
									<div class='h-full min-h-full story-item relative hover:opacity-90 cursor-pointer transition duration-200 ease-in-out'>
										<img
											src={image}
											class='block absolute rounded-xl h-full min-h-full object-cover'
										/>
										{
											/* <div class='absolute flex flex-col justify-between h-full w-full top-0 left-0 py-0 z-10'>
											<div class='text-center absolute bottom-0 w-full text-white p-0 h-16'>
												{post.title}
											</div>
										</div> */
										}
									</div>
								</div>
							);
						})}
					</div>
					<div class='swiper-button-next'></div>
					<div class='swiper-button-prev'></div>
					<div class='swiper-pagination'></div>
				</div>
			</div>
		</section>
	);
}
