import IconCalendarTime from 'tablerIcons/calendar-time.tsx';

import CategoryLabel from './CategoryLabel.tsx';

export default function PostList(
	props: {
		image: string;
		title: string;
		categories: { title: string; color: string }[];
	},
) {
	return (
		<>
			<div class='cursor-pointer md:w-1/3 xl:w-1/4 p-6 flex flex-col'>
				<a href='#'>
					<div class='mx-auto relative overflow-hidden transition-all bg-gray-100 rounded-md max-w-300 max-h-300 w-300 h-300 hover:scale-110'>
						<img
							class='hover:shadow-lg w-full h-full object-cover'
							src={props.image}
						/>
					</div>

					<CategoryLabel categories={props.categories} />
					<h2 class='text-lg font-semibold leading-snug tracking-tight mt-2'>
						<a href='#'>
							<span class='link-underline link-underline-red'>
								{props.title}
							</span>
						</a>
					</h2>
					<div className='flex items-center mt-1 space-x-3 text-gray-500 dark:text-gray-400'>
						<div className='flex items-center gap-1'>
							<div className='relative flex-shrink-0'>
								<IconCalendarTime class='w-5 h-5' />
							</div>
							<span className='text-sm'>Open Hours</span>
						</div>
						<span className='text-xs text-gray-300 dark:text-gray-600'>
							&bull;
						</span>
						<time
							className='text-sm'
							dateTime={new Date().toISOString()}
						>
							8:00AM - 5:00PM
						</time>
					</div>
				</a>
			</div>
		</>
	);
}
