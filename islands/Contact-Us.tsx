// deno-lint-ignore-file no-explicit-any
import { Button } from '../components/Button.tsx';

export default function ContactUs() {
	return (
		<section class='relative lg:pt-120 pb-120'>
			<div
				id='message-modal'
				class='hidden bg-gray-50 bg-opacity-50 flex justify-center items-center absolute top-0 right-0 bottom-0 left-0 z-50'
			>
				<div class='bg-white px-12 py-12 rounded-md text-center'>
					<h1 class='text-xl mb-4 font-bold text-slate-500'>
						Message has been sent!
					</h1>
					<Button
						onClick={() => {
							document.getElementById('message-modal')?.classList
								.add('hidden');
						}}
						class='px-7 py-2 ml-2 rounded-md text-md text-white font-semibold'
					>
						Ok
					</Button>
				</div>
			</div>
			<div class='contact_image flex items-center justify-end'>
				<div class='grid items-center justify-center h-full'>
					<img src='images/contact.svg' alt='about' />
				</div>
			</div>

			<div class='container'>
				<div class='row justify-end'>
					<div class='lg:w-1/2 pl-1 pr-1'>
						<div class='contact_wrapper mt-11'>
							<div class='section_title pb-4'>
								<h5 class='sub_title'>Contact</h5>
								<h4 class='main_title'>Get In Touch</h4>
								<p>
									Send your feedbacks or recommendations
								</p>
							</div>

							<div class='contact_form'>
								<form
									id='contact-form'
									action='/messages'
									method='POST'
									onSubmit={async (e) => {
										e.preventDefault();
										const target = e.target as any;
										await fetch(
											'/messages',
											{
												method: 'POST',
												body: JSON.stringify({
													name: target.name.value,
													email: target.email.value,
													message:
														target.message.value,
												}),
											},
										);
										document.getElementById('message-modal')
											?.classList.remove('hidden');
									}}
								>
									<div class='row'>
										<div class='md:w-1/2'>
											<div class='mx-3'>
												<div class='single_form mt-8'>
													<input
														name='name'
														id='name'
														type='text'
														placeholder='Name'
														required={true}
														class='w-full rounded-md py-4 px-6 border border-solid border-body-color'
													/>
												</div>
											</div>
										</div>
										<div class='md:w-1/2'>
											<div class='mx-3'>
												<div class='single_form mt-8'>
													<input
														name='email'
														id='email'
														type='email'
														placeholder='Email'
														required={true}
														class='w-full rounded-md py-4 px-6 border border-solid border-body-color'
													/>
												</div>
											</div>
										</div>
										<div class='w-full'>
											<div class='mx-3'>
												<div class='single_form mt-8'>
													<textarea
														name='message'
														id='message'
														placeholder='Message'
														rows='5'
														class='w-full rounded-md py-4 px-6 border border-solid border-body-color resize-none'
													>
													</textarea>
												</div>
											</div>
										</div>
										<p class='form-message mx-3'></p>
										<div class='w-full'>
											<div class='mx-3'>
												<div class='single_form mt-8'>
													<button
														type='submit'
														class='main-btn contact-btn'
													>
														Submit
													</button>
												</div>
											</div>
										</div>
									</div>
								</form>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
