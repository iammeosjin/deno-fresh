export default function Agreement(
	props: { id?: string; onNext: () => void; show: boolean },
) {
	return (
		<section
			id={props.id}
			class={`relative lg:pt-16 ${props.show ? '' : 'hidden'}`}
		>
			<div class='container w-full mx-auto'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Privacy Notice</h5>
							<h4 class='main_title'>
								Terms and Agreement
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class='container pl-10 pr-10 items-center'>
				<section class='shadow row'>
					<div class='tabs w-full'>
						<div class='border-b tab'>
							<div class='border-l-2 border-transparent relative'>
								<input
									class='w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6'
									type='checkbox'
									id='chck1'
								/>
								<header
									class='flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label'
									for='chck1'
								>
									<span class='text-grey-darkest font-thin text-xl'>
										Rights of the Data Subject
									</span>
									<div class='ml-5 rounded-full border border-grey w-7 h-7 flex items-center justify-center test'>
										<svg
											aria-hidden='true'
											class=''
											data-reactid='266'
											fill='none'
											height='24'
											stroke='#606F7B'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<polyline points='6 9 12 15 18 9'>
											</polyline>
										</svg>
									</div>
								</header>
								<div class='tab-content'>
									<div class='pl-8 pr-8 pb-5 text-grey-darkest'>
										<ul class='pl-4'>
											<li class='pb-2'>
												As a Data Subject, the applicant
												has the right under the Data
												Privacy Act of 2012.
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='tabs w-full'>
						<div class='border-b tab bg-gray-100'>
							<div class='border-l-2 border-transparent relative'>
								<input
									class='w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6'
									type='checkbox'
									id='chck2'
								/>
								<header
									class='flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label'
									for='chck2'
								>
									<span class='text-grey-darkest font-thin text-xl'>
										Personal Information that are Collected
									</span>
									<div class='ml-5 rounded-full border border-grey w-7 h-7 flex items-center justify-center test'>
										<svg
											aria-hidden='true'
											class=''
											data-reactid='266'
											fill='none'
											height='24'
											stroke='#606F7B'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<polyline points='6 9 12 15 18 9'>
											</polyline>
										</svg>
									</div>
								</header>
								<div class='tab-content'>
									<div class='pl-8 pr-8 pb-5 text-grey-darkest'>
										<ul class='pl-4'>
											<li class='pb-2'>
												1. Name
											</li>
											<li class='pb-2'>
												2. Email Address
											</li>
											<li class='pb-2'>
												3. Mobile Number
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='tabs w-full'>
						<div class='border-b tab'>
							<div class='border-l-2 border-transparent relative'>
								<input
									class='w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6'
									type='checkbox'
									id='chck3'
								/>
								<header
									class='flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label'
									for='chck3'
								>
									<span class='text-grey-darkest font-thin text-xl'>
										Purpose of Collected Information
									</span>
									<div class='ml-5 rounded-full border border-grey w-7 h-7 flex items-center justify-center test'>
										<svg
											aria-hidden='true'
											class=''
											data-reactid='266'
											fill='none'
											height='24'
											stroke='#606F7B'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<polyline points='6 9 12 15 18 9'>
											</polyline>
										</svg>
									</div>
								</header>
								<div class='tab-content'>
									<div class='pl-8 pr-8 pb-5 text-grey-darkest'>
										<ul class='pl-4'>
											<li class='pb-2'>
												All Personal Data collected is
												necessary to be able to process
												the reservation. If any of the
												above Personal Data is not
												available, the reservation will
												not be processed.
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='tabs w-full'>
						<div class='border-b tab bg-gray-100'>
							<div class='border-l-2 border-transparent relative'>
								<input
									class='w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6'
									type='checkbox'
									id='chck4'
								/>
								<header
									class='flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label'
									for='chck4'
								>
									<span class='text-grey-darkest font-thin text-xl'>
										Location of Personal Information
									</span>
									<div class='ml-5 rounded-full border border-grey w-7 h-7 flex items-center justify-center test'>
										<svg
											aria-hidden='true'
											class=''
											data-reactid='266'
											fill='none'
											height='24'
											stroke='#606F7B'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<polyline points='6 9 12 15 18 9'>
											</polyline>
										</svg>
									</div>
								</header>
								<div class='tab-content'>
									<div class='pl-8 pr-8 pb-5 text-grey-darkest'>
										<ul class='pl-4'>
											<li class='pb-2'>
												Personal Data is stored in a
												secured database inside of the
												Jasaan Tourist Association
												Center Reservation Online System
												that is protected and secured
												behind a firewall. The collected
												data will not be used nor
												disclosed to any other party.
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='tabs w-full'>
						<div class='border-b tab'>
							<div class='border-l-2 border-transparent relative'>
								<input
									class='w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6'
									type='checkbox'
									id='chck5'
								/>
								<header
									class='flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label'
									for='chck5'
								>
									<span class='text-grey-darkest font-thin text-xl'>
										Third-Party Transfer
									</span>
									<div class='ml-5 rounded-full border border-grey w-7 h-7 flex items-center justify-center test'>
										<svg
											aria-hidden='true'
											class=''
											data-reactid='266'
											fill='none'
											height='24'
											stroke='#606F7B'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<polyline points='6 9 12 15 18 9'>
											</polyline>
										</svg>
									</div>
								</header>
								<div class='tab-content'>
									<div class='pl-8 pr-8 pb-5 text-grey-darkest'>
										<ul class='pl-4'>
											<li class='pb-2'>
												No Personal Data gets
												transmitted to third parties.
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div class='tabs w-full'>
						<div class='border-b tab bg-gray-100'>
							<div class='border-l-2 border-transparent relative'>
								<input
									class='w-full absolute z-10 cursor-pointer opacity-0 h-5 top-6'
									type='checkbox'
									id='chck6'
								/>
								<header
									class='flex justify-between items-center p-5 pl-8 pr-8 cursor-pointer select-none tab-label'
									for='chck6'
								>
									<span class='text-grey-darkest font-thin text-xl'>
										Retention Period
									</span>
									<div class='ml-5 rounded-full border border-grey w-7 h-7 flex items-center justify-center test'>
										<svg
											aria-hidden='true'
											class=''
											data-reactid='266'
											fill='none'
											height='24'
											stroke='#606F7B'
											stroke-linecap='round'
											stroke-linejoin='round'
											stroke-width='2'
											viewBox='0 0 24 24'
											width='24'
											xmlns='http://www.w3.org/2000/svg'
										>
											<polyline points='6 9 12 15 18 9'>
											</polyline>
										</svg>
									</div>
								</header>
								<div class='tab-content'>
									<div class='pl-8 pr-8 pb-5 text-grey-darkest'>
										<ul class='pl-4'>
											<li class='pb-2'>
												Once the Personal Data has
												served its purpose, data will be
												anonymized and can be used for
												the next transaction.
											</li>
										</ul>
									</div>
								</div>
							</div>
						</div>
					</div>
				</section>

				{
					/* <ul>
					<li class='p-5 bg-white'>
						<h4>
							&bull; Rights of the Data Subject
							<ul>
								<li>
									test
								</li>
							</ul>
						</h4>
					</li>
					<li class='p-5 bg-gray-100'>
						<h4>
							&bull; Personal Information that are Collected
						</h4>
					</li>
					<li class='p-5 bg-white'>
						<h4>
							&bull; Purpose of Collected Information
						</h4>
					</li>
					<li class='p-5 bg-gray-100'>
						<h4>
							&bull; Location of Personal Information
						</h4>
					</li>
					<li class='p-5 bg-white'>
						<h4>
							&bull; Third-Party Transfer
						</h4>
					</li>
					<li class='p-5 bg-gray-100'>
						<h4>
							&bull; Retention Period
						</h4>
					</li>
					<li class='p-5 bg-white'>
						<h4>
							&bull; Participation of Data Subject
						</h4>
					</li>
				</ul> */
				}
				<div class='flex w-full mt-10'>
					<button
						class='mx-auto font-bold text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded text-base py-3 px-8 focus:outline-none'
						onClick={props.onNext}
					>
						I Agree
					</button>
				</div>
			</div>
		</section>
	);
}
