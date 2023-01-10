export default function Instructions(
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
							<h5 class='sub_title'>Guide</h5>
							<h4 class='main_title'>
								Steps in Creating a Reservation
							</h4>
						</div>
					</div>
				</div>
			</div>
			<div class='container pl-10 pr-10 items-center'>
				<ul>
					<li class='p-5 bg-white'>
						<h6>Step 1</h6>
						<p>
							Choose the specific resort in Jasaan where you would
							like to set a reservation. Exact location, entrance
							fee, environmental fee (if there's any) and price
							range of cottage will be displayed after choosing a
							resort.
						</p>
					</li>
					<li class='p-5 bg-gray-100'>
						<h6>Step 2</h6>
						<p>
							Provide your name, email address and mobile number.
							The Jasaan Tourist Association Center Reservation
							Online System will send a copy of your reservation
							sheet via email. You will receive a verification
							code on the email address.
						</p>
					</li>
					<li class='p-5 bg-white'>
						<h6>Step 3</h6>
						<p>
							Choose the date and time when you plan to visit your
							chosen resort in Jasaan.
						</p>
					</li>
					<li class='p-5 bg-gray-100'>
						<h6>Step 4</h6>
						<p>
							Take note of the important details of the
							reservation. Double Check the name, email address,
							and mobile number on the screen are all accurate.
							Your name should match the name of your valid ID.
							Use complete full name, no initials.
						</p>
					</li>
					<li class='p-5 bg-white'>
						<h6>Step 5</h6>
						<p>
							You will receive a copy of your reservation slip via
							email. Please save a screenshot or take a pic on
							your phone.
						</p>
					</li>
				</ul>
				<div class='flex w-full mt-10'>
					<button
						class='mx-auto font-bold text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded text-base py-3 px-8 focus:outline-none'
						onClick={props.onNext}
					>
						NEXT
					</button>
				</div>
			</div>
		</section>
	);
}
