// deno-lint-ignore-file no-explicit-any
import { Context, Post } from '../type.ts';
import toTitleCase from '../lib/to-title-case.ts';

export default function Posts(
	props: Omit<Context, 'path'> & { posts: Post[] },
) {
	const { posts } = props;
	return (
		<section
			id='posts'
			class='w-full pt-0 lg:pt-5 lg:pb-16 relative bg-gray-100'
		>
			<div class='flex row mx-auto sm:w-full md:w-full lg:w-5/12 xl:w-2/6 sm:w-full lg:mt-0'>
				<div class='container w-full mx-auto'>
					<div class='row justify-center'>
						<div class='w-full lg:w-1/2'>
							<div class='section_title text-center pb-6'>
								<h5 class='sub_title'>Discover</h5>
								<h4 class='main_title'>
									Recent Posts
								</h4>
							</div>
						</div>
					</div>
				</div>
				<div class='container'>
					{posts.map((post) => {
						return (
							<div style=''>
								<div
									class='image-preview-swiper swiper'
									style='width:100%;'
								>
									<div
										class='swiper-wrapper'
										style='height:100%'
									>
										{post.images.map((image) => {
											return (
												<a
													href='#'
													style='width:100%;'
													class='swiper-slide'
												>
													<img
														class='rounded-t-lg w-full object-fill sm:h-72'
														src={image}
														alt=''
														style='height:28rem'
													/>
												</a>
											);
										})}
									</div>
								</div>
								<div class='bg-white shadow-md border border-gray-200 rounded-b-lg mb-5'>
									<div class='p-5'>
										<a>
											<h5 class='text-gray-900 font-bold text-2xl tracking-tight mb-2'>
												{toTitleCase(post.title)}
											</h5>
										</a>
										<p class='font-normal text-gray-700 mb-3'>
											{post.description}
										</p>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
