import values from 'ramda/source/values.js';
import { PostListProps } from '../components/PostList.tsx';
import { Barangay, Reservation } from '../type.ts';

export default function ReservationForm(
	props: {
		id?: string;
		spot?: PostListProps;
		onNext: (reservation?: Reservation) => void;
		show: boolean;
	},
) {
	const barangayList = values(Barangay);
	const spot = props.spot;

	const onSubmit = (e: any) => {
		e.preventDefault();

		props.onNext({
			spot: e.target.title.value,
			email: e.target.email.value,
		});
	};

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
					<div class='grid items-center justify-center h-full rounded-md overflow-hidden hover:scale-105'>
						<img
							src={spot?.image
								? `/${spot.image}`
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
										onSubmit={onSubmit}
										action=''
										method='POST'
									>
										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<select
														name='barangay'
														disabled={!!spot
															?.barangay}
														class='form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													>
														{spot?.barangay
															? (
																<option
																	value={spot
																		.barangay}
																>
																	{spot
																		.barangay}
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
														required={true}
														disabled={!!spot
															?.title}
														class='form-select w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													>
														{spot?.title
															? (
																<option
																	value={spot
																		.slug}
																>
																	{spot
																		.title}
																</option>
															)
															: (
																<option>
																	Select
																	Resort or
																	Beach
																</option>
															)}
													</select>
												</div>
											</div>
										</div>

										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='date'
														name='date'
														id='date'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='time'
														name='time'
														id='time'
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
														name='fName'
														placeholder='Full Name'
														required={true}
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
															class='w-full rounded-none rounded-r-lg border text-[#6B7280] font-medium focus:border-blue-500 bg-white py-3 px-6 outline-none focus:border-[#6A64F1] focus:shadow-md'
															placeholder='Mobile Number'
														/>
													</div>
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
