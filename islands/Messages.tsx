// deno-lint-ignore-file no-explicit-any
import { Button } from '../components/Button.tsx';
import { Context, Message, Post } from '../type.ts';
import IconTrash from 'tablerIcons/trash.tsx';
import values from 'ramda/source/values.js';
import equals from 'ramda/source/equals.js';
import reject from 'ramda/source/reject.js';
import { useEffect, useState } from 'preact/hooks';
import toTitleCase from '../lib/to-title-case.ts';

export default function Messages(
	props: Omit<Context, 'path'> & { messages: Message[] },
) {
	const [messages, setMessages] = useState<Message[]>(props.messages);
	return (
		<section class='relative lg:pt-110 pb-120'>
			<div class='container'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Contact</h5>
							<h4 class='main_title'>Received Messages</h4>
						</div>
					</div>
				</div>
				<div class='max-w-2xl mx-auto'>
					{messages.map((message) => {
						return (
							<div class='flex justify-center mb-2'>
								<div class='rounded-xl border p-5 shadow-md w-9/12 bg-white'>
									<div class='flex w-full items-center justify-between border-b pb-3'>
										<div class='flex items-center space-x-3'>
											<div class='cursor-pointer text-lg font-bold text-slate-700'>
												{toTitleCase(message.name)}
											</div>
											<button class='rounded-2xl border px-3 py-1 text-xs font-semibold focus:outline-none'>
												{message.email}
											</button>
										</div>
										<div class='flex items-center space-x-8'>
											<button
												onClick={async () => {
													try {
														await fetch(
															'/messages',
															{
																method:
																	'DELETE',
																body: JSON
																	.stringify({
																		id: message
																			.id,
																	}),
															},
														);
														setMessages(
															messages.filter((
																m,
															) => m.id !==
																message.id
															),
														);
													} catch (error) {
														console.warn(error);
														throw error;
													}
												}}
												class='p-1 focus:outline-none hover:text-red-300 hover:scale-110'
											>
												<IconTrash />
											</button>
										</div>
									</div>

									<div class='mt-4 mb-6'>
										<div class='text-sm text-neutral-600'>
											{message.message}
										</div>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</section>
	);
}
