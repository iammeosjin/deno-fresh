// deno-lint-ignore-file no-explicit-any
import { Button } from '../components/Button.tsx';
import { Context, Post } from '../type.ts';
import IconTrash from 'tablerIcons/trash.tsx';
import values from 'ramda/source/values.js';
import equals from 'ramda/source/equals.js';
import reject from 'ramda/source/reject.js';
import { useEffect, useState } from 'preact/hooks';
import toTitleCase from '../lib/to-title-case.ts';

export default function AddPosts(
	props: Omit<Context, 'path'>,
) {
	const [images, setImages] = useState<File[]>([]);
	return (
		<section
			id='posts'
			class='w-full pt-0 lg:pt-5 lg:pb-16 relative bg-gray-100'
		>
			<div class='flex row mx-auto sm:w-full md:w-full lg:w-5/12 xl:w-2/6 sm:w-full lg:mt-0'>
				<div class={`container ${props.user ? '' : 'hidden'}`}>
					<form
						method='POST'
						action='/api/posts'
						onSubmit={async (e) => {
							e.preventDefault();
							const form = new FormData();
							for (const image of images) {
								form.append(
									image.name,
									image,
								);
							}

							const response = await fetch('/upload', {
								method: 'POST',
								body: form,
							});

							if (response.status > 300) {
								throw new Error(
									`Error in uploading file: ${await response
										.text()}`,
								);
							}

							const files = await response.json();

							const target: any = e.target;

							const input = reject(equals(''), {
								images: files.map((image: any) => image.url),
								title: target.title.value,
								description: target.description.value,
							});

							const headers = new Headers();
							headers.set('Content-Type', 'application/json');

							const addPostResponse = await fetch('/api/posts', {
								method: 'POST',
								headers,
								body: JSON.stringify(input),
							});

							if (addPostResponse.status > 300) {
								throw new Error(
									`Error adding the spot: ${await addPostResponse
										.text()}`,
								);
							}

							window.location.reload();
						}}
					>
						<div class='bg-white shadow-md border border-gray-200 rounded-lg mb-5'>
							<div class='post-image-preview rounded-t-lg w-full object-fill sm:h-72'>
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
															src={URL
																.createObjectURL(
																	image,
																)}
														/>
														<div class='group z-50 absolute top-1 right-2 flex'>
															<div
																onClick={() => {
																	swiper
																		.removeSlide(
																			index,
																		);

																	const remainingImages =
																		images
																			.filter(
																				(
																					file,
																				) => file
																					.name !==
																					image
																						.name,
																			);

																	setImages(
																		remainingImages,
																	);

																	const fileInput =
																		document
																			.getElementById(
																				'fileInput',
																			);
																	(fileInput as any)!
																		.value =
																			'';
																}}
																class='bg-gray-50 text-white text-gray-700 min-w-min outline-none focus:outline-none border-none px-1 py-1 rounded-full flex'
															>
																<IconTrash class='w-8 h-8' />
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
									class={`bg-gray-50 rounded-md overflow-hidden cursor-pointer border border-dashed border-gray-500 relative h-full ${
										images.length === 0 ? '' : 'hidden'
									}`}
								>
									<input
										id='fileInput'
										type='file'
										multiple
										name='files'
										required={true}
										accept='image/*'
										onChange={(e) => {
											setImages(
												[
													...e.currentTarget
														.files as any,
												],
											);
										}}
										class='cursor-pointer relative block opacity-0 w-full h-full p-20 z-50'
									/>
									<div class='text-center p-10 absolute top-0 bottom-0 right-0 left-0 m-auto h-full w-full'>
										<div class='w-full h-full items-center'>
											<div class='row h-full items-center'>
												<h4 class='w-full'>
													Drop files anywhere to
													upload
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
							<div class='p-5 pt-1'>
								<div class='mb-5'>
									<input
										type='text'
										name='title'
										required={true}
										autoComplete='off'
										class='w-full rounded-none rounded-lg border text-[#6B7280] font-medium focus:border-red-300 bg-white py-3 px-6 outline-none focus:shadow-md'
										placeholder='Title'
									/>
								</div>
								<div class=''>
									<textarea
										name='description'
										class='w-full rounded-none rounded-lg border text-[#6B7280] font-medium focus:border-red-300 bg-white py-3 px-6 outline-none focus:shadow-md'
										placeholder='Description'
									>
									</textarea>
								</div>
							</div>
							<div class='flex pb-3'>
								<Button class='w-full'>Submit Post</Button>
							</div>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
