export default function ReservationForm(
	props: { id?: string; onNext: () => void; show: boolean },
) {
	const barangayList = [
		'Aplaya',
		'Bobontugan',
		'Corrales',
		'Danao',
		'Jampason',
		'Kimaya',
		'Lower Jasaan',
		'Luzbanson',
		'Natubo',
		'San Antonio',
		'San Nicolas',
		'Upper Jasaan',
	];
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
							src='images/spots/2.jpg'
							alt='about'
						/>
					</div>
				</div>
				<div class='container'>
					<div class='row justify-end'>
						<div class='lg:w-1/2 pl-5 pr-5'>
							<div class='flex items-center justify-center pt-5 lg:pt-0'>
								<div class='mx-auto w-full max-w-[550px]'>
									<form
										action=''
										method='POST'
									>
										<div class='-mx-3 flex flex-wrap'>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='text'
														name='barangay'
														list='barangay'
														placeholder='Select barangay in Jasaan '
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
													<datalist id='barangay'>
														{barangayList.map(
															(barangay) => (
																<option
																	value={barangay}
																/>
															),
														)}
													</datalist>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='text'
														name='spot'
														placeholder='Select Resort or Beach'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
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
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</div>
											</div>
											<div class='w-full px-3 sm:w-1/2'>
												<div class='mb-5'>
													<input
														type='text'
														name='mobileNumber'
														placeholder='Mobile Number'
														class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
													/>
												</div>
											</div>
										</div>

										<div>
											<button
												onClick={(e) => {
													e.preventDefault();
													props.onNext();
												}}
												class='hover:shadow-form rounded-md font-bold text-white bg-red-500 hover:bg-red-800 py-3 px-8 text-center text-base font-semibold text-white outline-none focus:outline-none'
											>
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
