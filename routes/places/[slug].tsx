import { Handlers, PageProps } from '$fresh/server.ts';
import { getCookies } from 'std/http/cookie.ts';
import NavBar from '../../components/NavBar.tsx';
import { Account, Context } from '../../type.ts';
import AccountModel from '../../models/account.ts';
import spots from '../../models/spot.ts';
import { PostListProps } from '../../components/PostList.tsx';
import CategoryLabel from '../../components/CategoryLabel.tsx';
import IconMapPin from 'tablerIcons/map-pin.tsx';
import IconCoin from 'tablerIcons/coin.tsx';

export const handler: Handlers<Context & { spot: PostListProps }> = {
	async GET(req, ctx) {
		const cookies = getCookies(req.headers);
		let user: Account | undefined | null = undefined;
		if (cookies.user) {
			user = await AccountModel.findById(parseInt(cookies.user, 10));
		}
		const url = new URL(req.url);

		const { slug } = ctx.params;

		const spot = await Promise.resolve(
			spots.find((index) => index.slug === slug),
		);

		return ctx.render({ user, path: url.pathname, spot: spot! });
	},
};

export default function Places(
	props: PageProps<Context & { spot: PostListProps }>,
) {
	const data = props.data || {};
	const { spot } = data;
	return (
		<>
			<title>
				Jasaan Tourist Association Center Reservation Online System
			</title>

			<body>
				<link rel='stylesheet' href='/css/output.css' />
				<link rel='stylesheet' href='/css/common.css' />
				<NavBar user={data.user} path={data.path} />
				<section
					class={`relative lg:pt-16 `}
				>
					<div class='container w-full mx-auto'>
						<div class='row justify-center'>
							<div class='w-full lg:w-1/2'>
								<div class='section_title text-center pb-6'>
									<h5 class='sub_title'>Details</h5>
									<h4 class='main_title'>
										Reservation Information
									</h4>
								</div>
							</div>
						</div>
					</div>
					<div class='mt-10 relative'>
						<div class='image-preview flex items-center justify-end'>
							<div class='image-holder bg-gray-200 rounded-md overflow-hidden hover:scale-105 '>
								<img
									src={`/${spot?.image}`}
								/>
							</div>
						</div>
						<div class='container '>
							<div class='row justify-end'>
								<div class='lg:w-1/2 pl-5 pr-5 lg:mt-5'>
									<div class='flex items-center justify-center pt-5 lg:pt-0'>
										<div class='mx-auto w-full max-w-[550px]'>
											<div class='-mx-3 flex flex-wrap'>
												<div class='w-full px-3 sm:w-1/2'>
													<div class='mb-1'>
														<div className='flex items-center gap-1 tracking-wide'>
															<h2 class='leading-6 text-2xl'>
																{spot.title}
															</h2>
														</div>
													</div>
												</div>
												<div class='w-full px-3 sm:w-1/2'>
													<div class='mb-3'>
														<div className='flex items-center gap-1 tracking-wide'>
															<span class='leading-6 text-sm'>
																<CategoryLabel
																	categories={spot
																		.categories}
																/>
															</span>
														</div>
													</div>
												</div>
												<div class='px-3 sm:w-1/2 mb-3'>
													<hr class='bg-gray-100' />
												</div>
												<div class='w-full px-3 sm:w-1/2'>
													<div class='mb-3'>
														<div className='flex items-center gap-1 tracking-wide'>
															<div className='relative flex-shrink-0 text-lg'>
																<IconMapPin class='w-6 h-6' />
															</div>
															<span class='leading-6 text-lg'>
																{spot.barangay}
																{' '}
																| {spot.address}
															</span>
														</div>
													</div>
												</div>
												<div class='w-full px-3 sm:w-1/2'>
													<div class='mb-5'>
														<div className='flex items-center gap-1 tracking-wide'>
															<div className='relative flex-shrink-0 text-lg'>
																<IconCoin class='w-6 h-6' />
															</div>
															<span class='leading-6 text-lg'>
																{spot
																	.priceRangeLower}
																{' '}
																- {spot
																	.priceRangeUpper}
															</span>
														</div>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>
				<script src='/js/flowbite.js' />
			</body>
		</>
	);
}
