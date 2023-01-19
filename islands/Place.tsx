import { Spot } from '../models/spot.ts';
import toTitleCase from '../lib/to-title-case.ts';
import CategoryLabel from '../components/CategoryLabel.tsx';
import IconMapPin from 'tablerIcons/map-pin.tsx';
import IconCoin from 'tablerIcons/coin.tsx';
import generateCategoryColors from '../lib/generate-category-colors.ts';

export default function Place(
	props: {
		spot: Spot;
	},
) {
	const { spot } = props;
	const categories = generateCategoryColors(spot.categories);

	const priceRangeLower = spot.minRoomPriceRange || spot.minCottagePriceRange;
	const priceRangeUpper = spot.maxRoomPriceRange || spot.maxCottagePriceRange;

	let priceRange = (
		<span class='leading-7 text-lg'>
			{priceRangeLower} - {priceRangeUpper}
		</span>
	);

	if (!priceRangeLower && !priceRangeUpper) {
		priceRange = (
			<span class='leading-6 text-lg'>
				{spot
					.entranceFee}
			</span>
		);

		if (!spot.entranceFee) {
			priceRange = (
				<span class='leading-6 text-base'>
					N/A
				</span>
			);
		}
	}
	return (
		<section
			class={`relative lg:pt-16 `}
		>
			<div class='container w-full mx-auto'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Details</h5>
							<h4 class='main_title'>
								Place Information
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class='mt-10 relative'>
				<div class='image-preview flex items-center justify-end'>
					<div class='image-holder bg-gray-200 rounded-md overflow-hidden hover:scale-105 '>
						<div
							id='image-preview'
							class='swiper'
							style='width:100%;height:100%'
						>
							<div class='swiper-wrapper'>
								{(spot.images || []).map((image) => (
									<div
										class='swiper-slide'
										style='width:100%'
									>
										<img
											class='object-cover'
											src={image}
										/>
									</div>
								))}
							</div>
							<div class='swiper-pagination'></div>
						</div>
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
														{toTitleCase(
															spot.name,
														)}
													</h2>
												</div>
											</div>
										</div>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-3'>
												<div className='leading-6 text-sm flex items-center gap-4 tracking-wide'>
													{categories
														.map((
															category,
														) => (
															<CategoryLabel
																category={category}
															/>
														))}
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
														{toTitleCase(
															spot.barangay,
														)} | {spot.address}
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
													{priceRange}
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
	);
}
