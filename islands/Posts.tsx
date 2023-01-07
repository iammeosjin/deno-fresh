import { Post } from '../type.ts';

export default function Posts(props: { posts: Post[] }) {
	const { posts } = props;
	return (
		<section class='work_area bg-gray-100 pt-7 pb-4'>
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
					<div class='swiper-wrapper'>
						{posts.map((post) => {
							const image = post.url;
							return (
								<div class='swiper-slide'>
									<div class='single-work justify-center mx-auto p-0'>
										<img
											src={image}
											alt='work'
										/>
										<div class='work-content pl-3 pt-3 relative'>
											<h4 class='work_title text-xl md:text-2xl'>
												<a href='#'>
													{post.title}
												</a>
											</h4>
											<p class='md:text-base'>
												{post.description}
											</p>
										</div>`
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
