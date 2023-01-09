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
				<ul>
					<li class='p-5 bg-white'>
						<h4>
							&bull; Rights of the Data Subject
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
				</ul>
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
