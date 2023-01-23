// deno-lint-ignore-file no-explicit-any
import values from 'ramda/source/values.js';
import { Spot } from '../models/spot.ts';
import { Barangay } from '../type.ts';

export default function ReservationForm(
	props: {
		id?: string;
		spot?: Spot;
		availableSpots?: Spot[];
		onSubmit: (e: any) => void;
		onBarangayChange: (e: any) => void;
		onSpotChange: (e: any) => void;
		show: boolean;
		disabled: boolean;
	},
) {
	const barangayList = values(Barangay);

	const spot = props.spot;

	return (
		<section
			id={props.id}
			class={`relative lg:pt-16 ${props.show ? '' : 'hidden'}`}
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
					<div class='image-holder bg-gray-50 rounded-md overflow-hidden hover:scale-105 grid items-center justify-center'>
						<img
							class='object-cover'
							src={spot?.images[0]
								? spot.images[0]
								: '/images/logo.png'}
						/>
					</div>
				</div>
				<div class='container'>
					<div class='row justify-end'>
						<div class='lg:w-1/2 pl-5 pr-5'>
							<div class='flex items-center justify-center pt-5 lg:pt-0'>
								<div class='mx-auto w-full max-w-[550px]'>
									<form
										onSubmit={props.onSubmit}
										action=''
										method='POST'
									>
										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<select
														name='barangay'
														onChange={props.disabled
															? undefined
															: props
																.onBarangayChange}
														disabled={props
															.disabled}
														required={true}
														class='form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													>
														{props.disabled
															? (
																<option
																	value={spot
																		?.barangay}
																>
																	{spot
																		?.barangay}
																</option>
															)
															: barangayList.map(
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
													<datalist id='barangay'>
													</datalist>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<select
														name='title'
														value={props.spot
															? undefined
															: 'default'}
														onChange={props.disabled
															? undefined
															: props
																.onSpotChange}
														disabled={props
															.disabled}
														required={true}
														class='form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													>
														{props.disabled
															? (
																<option
																	value={spot
																		?.slug}
																>
																	{spot
																		?.name}
																</option>
															)
															: [
																<option value='default'>
																	Select
																	Resort or
																	Beach
																</option>,
																...(props
																	.availableSpots ||
																	[])
																	.map(
																		(
																			spot,
																		) => {
																			return (
																				<option
																					value={spot
																						.slug}
																				>
																					{spot
																						.name}
																				</option>
																			);
																		},
																	),
															]}
													</select>
												</div>
											</div>
										</div>

										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														required={true}
														type='datetime-local'
														name='schedule'
														id='date'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</div>
											</div>
										</div>

										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='text'
														name='name'
														placeholder='Full Name'
														required={true}
														autoComplete='off'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='email'
														name='email'
														placeholder='Email'
														required={true}
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
															placeholder='Mobile Number'
														/>
													</div>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<label
														for='toggle-cottage-checked'
														class='flex items-center cursor-pointer relative mb-1'
													>
														<input
															type='checkbox'
															id='toggle-cottage-checked'
															class='sr-only'
															checked={false}
															name='cottageEnabled'
															onChange={(e) => {
																if (
																	e.currentTarget
																		.checked
																) {
																	document
																		.getElementById(
																			'cottageType',
																		)?.classList
																		.remove(
																			'hidden',
																		);
																} else {
																	document
																		.getElementById(
																			'cottageType',
																		)?.classList
																		.add(
																			'hidden',
																		);
																}
															}}
														/>
														<div class='toggle-bg bg-gray-200 border-2 border-gray-200 h-6 w-11 rounded-full'>
														</div>
														<span class='ml-3 text-base font-medium text-[#6B7280]'>
															Add Cottage
														</span>
													</label>
													<select
														id='cottageType'
														name='cottageType'
														class='hidden form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													>
														<option value='SMALL'>
															Small
														</option>
														<option value='MEDIUM'>
															Medium
														</option>
														<option value='LARGE'>
															Large
														</option>
													</select>
												</div>
											</div>
										</div>

										<div>
											<button class='hover:shadow-form rounded-md font-bold text-white bg-red-500 hover:bg-red-800 py-3 px-8 text-center text-base font-semibold text-white outline-none focus:outline-none'>
												Submit
											</button>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
