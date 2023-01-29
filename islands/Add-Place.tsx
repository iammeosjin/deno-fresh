// deno-lint-ignore-file no-explicit-any
import { useEffect, useState } from 'preact/hooks';
import CategoryLabel from '../components/CategoryLabel.tsx';
import IconX from 'tablerIcons/x.tsx';
import IconTrash from 'tablerIcons/trash.tsx';
import IconTag from 'tablerIcons/tag.tsx';
import values from 'ramda/source/values.js';
import uniq from 'ramda/source/uniq.js';
import reject from 'ramda/source/reject.js';
import equals from 'ramda/source/equals.js';
import { Barangay, Category } from '../type.ts';
import generateCategoryColors from '../lib/generate-category-colors.ts';
import { Button } from '../components/Button.tsx';

function toggleSpotType(option1: string, option2: string, checked: boolean) {
	const doc = document
		.getElementById(
			option1,
		);
	const doc1 = document
		.getElementById(
			option2,
		);
	if (checked) {
		doc?.classList
			.add(
				'text-white',
			);
		doc?.classList
			.remove(
				'text-gray-500',
			);
		doc1?.classList
			.remove(
				'text-white',
			);
		doc1?.classList
			.add(
				'text-gray-500',
			);
	} else {
		doc?.classList
			.remove(
				'text-white',
			);
		doc?.classList
			.add(
				'text-gray-500',
			);
		doc1?.classList
			.add(
				'text-white',
			);
		doc1?.classList
			.remove(
				'text-gray-500',
			);
	}
}

export default function AddPlace() {
	const barangayList = values(Barangay);
	const categories: Category[] = values(
		Category,
	);

	const [state, setState] = useState<{ tags: Category[]; files: File[] }>(
		{ tags: [], files: [] },
	);

	const [images, setImages] = useState<{ name: string; url: string }[]>([]);

	const tags = generateCategoryColors(state.tags);
	useEffect(() => {
		setImages(state.files.map((file) => {
			return {
				name: file.name,
				url: URL.createObjectURL(file),
			};
		}));
	}, [state.files]);

	return (
		<form
			method='POST'
			action='/places'
			onSubmit={async (e) => {
				e.preventDefault();

				const form = new FormData();
				for (const file of state.files) {
					form.append(
						file.name,
						file,
					);
				}

				const response = await fetch('/upload', {
					method: 'POST',
					body: form,
				});

				if (response.status > 300) {
					throw new Error(
						`Error in uploading file: ${await response.text()}`,
					);
				}

				const images = await response.json();

				const target: any = e.target;

				const input = reject(equals(''), {
					images: images.map((image: any) => image.url),
					barangay: target.barangay.value,
					name: target.placeName.value,
					address: target.address.value,
					owner: target.mobileNumber.value,
					categories: state.tags,
					openForReservations: target.openForReservation.checked,
					entranceFee: target.entranceFee?.value,
					minCottagePriceRange: target.minCottagePriceRange?.value,
					maxCottagePriceRange: target.maxCottagePriceRange?.value,
					cottageEnabled: target.cottageEnabled.checked,
					type: target.spotType.value || 'RESORT',
					description: target.description?.value,
				});

				const headers = new Headers();
				headers.set('Content-Type', 'application/json');

				const addPlaceResponse = await fetch('/places', {
					method: 'POST',
					headers,
					body: JSON.stringify(input),
				});

				if (addPlaceResponse.status > 300) {
					throw new Error(
						`Error adding the spot: ${await addPlaceResponse
							.text()}`,
					);
				}

				window.location.href = '/services';
			}}
		>
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
						<div
							class={`image-holder rounded-md overflow-hidden cursor-pointer ${
								images.length === 0 ? 'hidden' : ''
							}`}
						>
							<div
								id='image-preview'
								class='swiper'
								style='width:100%;height:100%'
							>
								<div class='swiper-wrapper'>
									{images.map((image, index) => {
										return (
											<div
												class='swiper-slide'
												style='width:100%'
											>
												<img
													class='object-fill'
													src={image.url}
												/>
												<div class='group z-50 absolute top-1 right-2 flex'>
													<div
														onClick={() => {
															swiper.removeSlide(
																index,
															);
															setState({
																...state,
																files: [
																	...state
																		.files
																		.filter(
																			(
																				file,
																			) => file
																				.name !==
																				image
																					.name,
																		),
																],
															});
														}}
														class='bg-gray-50 text-white text-gray-700 min-w-min outline-none focus:outline-none border-none px-1 py-1 rounded-full flex'
													>
														<IconTrash class='w-10 h-10' />
													</div>
												</div>
											</div>
										);
									})}
								</div>
								<div class='swiper-pagination'></div>
							</div>
						</div>

						<div
							class={`image-holder bg-gray-50 rounded-md overflow-hidden cursor-pointer border border-dashed border-gray-500 relative ${
								images.length === 0 ? '' : 'hidden'
							}`}
						>
							<input
								type='file'
								multiple
								name='files'
								required={true}
								accept='image/*'
								onChange={(e) => {
									setState({
										...state,
										files: [
											...e.currentTarget.files as any,
										],
									});
								}}
								class='cursor-pointer relative block opacity-0 w-full h-full p-20 z-50'
							/>
							<div class='text-center p-10 absolute top-0 bottom-0 right-0 left-0 m-auto h-full '>
								<div class='w-full h-full items-center'>
									<div class='row h-full items-center'>
										<h4 class='w-full'>
											Drop files anywhere to upload
											<br />or
											<p class='text-base font-normal text-gray-500'>
												Select Files
											</p>
										</h4>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='container'>
						<div class='row justify-end'>
							<div class='lg:w-1/2 pl-5 pr-5'>
								<div class='flex items-center justify-center pt-5 lg:pt-0'>
									<div class='mx-auto w-full max-w-[550px]'>
										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mx-auto flex flex-col items-center'>
													<div class='flex w-full relative mb-5'>
														<input
															type='radio'
															id='option0'
															name='spotType'
															class='hidden'
															value='RESORT'
															onChange={(
																e,
															) => {
																toggleSpotType(
																	'option0Label',
																	'option1Label',
																	e.currentTarget
																		.checked,
																);
															}}
														/>
														<label
															for='option0'
															id='option0Label'
															class='cursor-pointer w-1/2 flex items-center justify-center truncate uppercase select-none font-semibold text-base rounded-full py-2 text-white'
														>
															Resort
														</label>

														<input
															type='radio'
															id='option1'
															name='spotType'
															class='hidden'
															value='TOURIST_SPOT'
															onChange={(
																e,
															) => {
																toggleSpotType(
																	'option1Label',
																	'option0Label',
																	e.currentTarget
																		.checked,
																);
															}}
														/>
														<label
															for='option1'
															id='option1Label'
															class='cursor-pointer w-1/2 flex items-center justify-center truncate uppercase select-none font-semibold text-base rounded-full py-2 text-gray-500'
														>
															Tourist Spot
														</label>

														<div class='w-1/2 flex items-center justify-center truncate uppercase select-none font-semibold text-lg rounded-full p-0 h-full bg-red-500 absolute transform transition-transform tab-anim'>
														</div>
													</div>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='text'
														name='placeName'
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
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<textarea
														type='text'
														name='description'
														placeholder='Description'
														required={false}
														autoComplete='off'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
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
														name='tags'
														value='default'
														multiple={true}
														onBlur={() =>
															document
																.getElementById(
																	'category-modal',
																)?.classList
																.add(
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
													<label
														for='toggle-example-checked'
														class='flex items-center cursor-pointer relative'
													>
														<input
															type='checkbox'
															name='openForReservation'
															id='toggle-example-checked'
															class='sr-only'
															checked={false}
														/>
														<div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'>
														</div>
														<span class='ml-3 text-base font-medium text-[#6B7280]'>
															Open for
															Reservations
														</span>
													</label>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='number'
														name='entranceFee'
														placeholder='Entrance fee'
														autoComplete='off'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<label
														for='toggle-cottage-checked'
														class='flex items-center cursor-pointer relative'
													>
														<input
															type='checkbox'
															id='toggle-cottage-checked'
															class='sr-only'
															checked={false}
															name='cottageEnabled'
															onChange={() => {
																document
																	.getElementById(
																		'cottagePrices',
																	)?.classList
																	.toggle(
																		'hidden',
																	);
															}}
														/>
														<div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'>
														</div>
														<span class='ml-3 text-base font-medium text-[#6B7280]'>
															Cottages Available
														</span>
													</label>
												</div>
											</div>
											<div
												id='cottagePrices'
												class='hidden w-full px-3 sm:w-1/2'
											>
												<div class='mb-5'>
													<fieldset class='flex p-5 border rounded-lg border-gray-300 '>
														<legend class='pl-2 pr-2 text-[#6B7280]'>
															Price range of
															cottages
														</legend>
														<input
															type='number'
															name='minRoomPriceRange'
															autoComplete='off'
															class='w-full rounded-none rounded-l-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
														/>
														<span class='inline-flex items-center px-3 text-base text-[#6B7280] bg-gray-200 border border-r-0 border-l-0 border-gray-300 dark:bg-gray-600 dark:text-gray-400 dark:border-gray-600'>
															to
														</span>
														<input
															type='number'
															name='maxRoomPriceRange'
															autoComplete='off'
															class='w-full rounded-none rounded-r-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
														/>
													</fieldset>
												</div>
											</div>
										</div>
										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<Button>
														Add New Place
													</Button>
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
		</form>
	);
}
