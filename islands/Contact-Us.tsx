export default function ContactUs() {
	return (
		<section id='contact' class='relative lg:pt-120 pb-120'>
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
									Lorem ipsum dolor sitrg amet, consetetur
									sadipscing elitr sed diam nonumy eirmod
									tempor invidunt ut labore et dolore magna.
								</p>
							</div>

							<div class='contact_form'>
								<form
									id='contact-form'
									action='/contact'
									method='POST'
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
