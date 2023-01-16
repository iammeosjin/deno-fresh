import { useState } from 'preact/hooks';
import { Button } from '../components/Button.tsx';
import spots from '../models/spot.ts';
import { PostListProps } from '../components/PostList.tsx';
import CategoryLabel from '../components/CategoryLabel.tsx';
import IconMapPin from 'tablerIcons/map-pin.tsx';
import IconCoin from 'tablerIcons/coin.tsx';
import IconCameraPlus from 'tablerIcons/camera-plus.tsx';
import IconX from 'tablerIcons/x.tsx';
import IconTag from 'tablerIcons/tag.tsx';
import values from 'ramda/source/values.js';
import uniq from 'ramda/source/uniq.js';
import difference from 'ramda/source/difference.js';
import { Barangay, Category } from '../type.ts';
import generateCategoryColors from '../lib/generate-category-colors.ts';

export default function AddPlace() {
	const barangayList = values(Barangay);
	const categories: Category[] = values(
		Category,
	);

	const [state, setState] = useState<{ tags: Category[] }>({ tags: [] });

	const tags = generateCategoryColors(state.tags);

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
								Add New Place
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class='mt-10 relative'>
				<div class='image-preview flex items-center justify-end'>
					<div class='image-holder bg-gray-200 rounded-md overflow-hidden cursor-pointer'>
						<IconCameraPlus class='w-16 h-16 mx-auto flex items-center min-h-full' />
					</div>
				</div>
				<div class='container'>
					<div class='row justify-end'>
						<div class='lg:w-1/2 pl-5 pr-5 lg:mt-5'>
							<div class='flex items-center justify-center pt-5 lg:pt-0'>
								<div class='mx-auto w-full max-w-[550px]'>
									<div class='-mx-3 flex flex-wrap'>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<input
													type='text'
													name='name'
													placeholder='Name of the place'
													required={true}
													autoComplete='off'
													class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
												/>
											</div>
										</div>

										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<select
													name='barangay'
													required={true}
													class='form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
												>
													{barangayList
														.map(
															(
																barangay:
																	Barangay,
															) => (
																<option
																	value={barangay}
																>
																	{barangay}
																</option>
															),
														)}
												</select>
											</div>
										</div>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<input
													type='text'
													name='address'
													placeholder='Exact address'
													required={true}
													autoComplete='off'
													class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
												/>
											</div>
										</div>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<div class='flex'>
													<span class='inline-flex items-center px-3 text-base text-[#6B7280] bg-gray-200 border border-r-0 border-gray-300 rounded-l-md dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
														+63
													</span>
													<input
														type='text'
														name='mobileNumber'
														pattern='^[0-9]{10}$'
														required={true}
														autoComplete='off'
														class='w-full rounded-none rounded-r-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
														placeholder='Owner Mobile Number'
													/>
												</div>
											</div>
										</div>
									</div>
									<div class='px-3 sm:w-1/2 w-full mb-3'>
										<hr class='bg-gray-100' />
									</div>

									<div class='-mx-3 flex flex-wrap mb-5'>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-1'>
												<div class='flex gap-2 row'>
													<button
														type='button'
														onClick={() => {
															const modal =
																document
																	.getElementById(
																		'category-modal',
																	);
															modal?.classList
																.remove(
																	'hidden',
																);
															modal?.focus();
														}}
														class='font-semibold text-white bg-red-500 hover:bg-red-800 hover:shadow-form inline-flex items-center px-3 py-2 rounded flex gap-2 outline-none focus:outline-none'
													>
														<IconTag class='w-6 h-6' />Add
														Tag
													</button>
													<div class='flex'>
														{tags
															.map(
																(
																	category,
																) => {
																	return (
																		<div class='px-3 py-2 flex'>
																			<CategoryLabel
																				category={category}
																			/>
																			<IconX
																				onClick={() =>
																					setState(
																						{
																							...state,
																							tags:
																								state
																									.tags
																									.filter(
																										(
																											tag,
																										) => tag !==
																											category
																												.title,
																									),
																						},
																					)}
																				class='w-4 h-4 flex items-center min-h-full'
																			/>
																		</div>
																	);
																},
															)}
													</div>
												</div>
											</div>
										</div>
										<div class='w-full px-3 sm:w-1/2'>
											<div>
												<select
													id='category-modal'
													value='default'
													required={true}
													multiple={true}
													onBlur={() =>
														document.getElementById(
															'category-modal',
														)?.classList.add(
															'hidden',
														)}
													onChange={(e) => {
														state.tags.push(
															e.currentTarget
																.value as Category,
														);
														setState({
															...state,
															tags: uniq(
																state.tags,
															),
														});
													}}
													class='hidden form-multiselect w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
												>
													{(categories ||
														[])
														.map(
															(
																category:
																	string,
															) => {
																return (
																	<option
																		value={category}
																	>
																		{category}
																	</option>
																);
															},
														)}
												</select>
											</div>
										</div>
									</div>

									<div class='-mx-3 flex flex-wrap'>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<input
													type='text'
													name='entranceFee'
													placeholder='Entrance fee'
													autoComplete='off'
													class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
												/>
											</div>
										</div>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<fieldset class='flex p-5 border rounded-lg border-gray-300 '>
													<legend class='pl-2 pr-2 text-[#6B7280]'>
														Price range of rooms
													</legend>
													<input
														type='number'
														name='minCottagePriceRange'
														autoComplete='off'
														class='w-full rounded-none rounded-l-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
													<span class='inline-flex items-center px-3 text-base text-[#6B7280] bg-gray-200 border border-r-0 border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
														to
													</span>
													<input
														type='number'
														name='maxCottagePriceRange'
														autoComplete='off'
														class='w-full rounded-none rounded-r-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</fieldset>
											</div>
										</div>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<fieldset class='flex p-5 border rounded-lg border-gray-300 '>
													<legend class='pl-2 pr-2 text-[#6B7280]'>
														Price range of cottages
													</legend>
													<input
														type='number'
														name='minCottagePriceRange'
														autoComplete='off'
														class='w-full rounded-none rounded-l-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
													<span class='inline-flex items-center px-3 text-base text-[#6B7280] bg-gray-200 border border-r-0 border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
														to
													</span>
													<input
														type='number'
														name='maxCottagePriceRange'
														autoComplete='off'
														class='w-full rounded-none rounded-r-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</fieldset>
											</div>
										</div>
									</div>

									{
										/* <div class='-mx-3 flex flex-wrap'>
										<div class='w-full px-3 sm:w-1/2'>
											<div class='mb-5'>
												<div class='range'>
													<div class='range-slider'>
														<span class='range-selected'>
														</span>
													</div>
													<div class='range-input'>
														<input
															type='range'
															class='min'
															min='0'
															max='1000'
															value='300'
															step='10'
														/>
														<input
															type='range'
															class='max'
															min='0'
															max='1000'
															value='700'
															step='10'
														/>
													</div>
													<div class='range-price'>
														<label for='min'>
															Min
														</label>
														<input
															type='number'
															name='minCottagePriceRange'
															value='300'
														/>
														<label for='max'>
															Max
														</label>
														<input
															type='number'
															name='maxCottagePriceRange'
															value='700'
														/>
													</div>
												</div>
											</div>
										</div>
									</div> */
									}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
