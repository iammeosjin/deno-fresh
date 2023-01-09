import IconClockHour from 'tablerIcons/clock-hour-2.tsx';
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
			<div class='cursor-pointer md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 p-6 flex flex-col'>
				<div class='relative inline-block overflow-hidden transition-all bg-gray-100 rounded-md max-w-300 max-h-300 w-300 h-300 hover:scale-105'>
					<img
						class='z-0 hover:shadow-lg w-full h-full object-cover'
						src={props.image}
					/>
					<div class='group reserve-float z-10 absolute top-1 right-2 flex'>
						<div class='reserve-float-content rounded-sm transform scale-0 transition duration-150 ease-in-out origin-right'>
							Reserve
						</div>
						<div class='circular-icon bg-white text-white text-gray-700 min-w-min outline-none focus:outline-none border-none px-3 py-1 rounded-full flex'>
							<IconCalendarTime class='w-7 h-7' />
						</div>
					</div>
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
							<IconClockHour class='w-5 h-5' />
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
			</div>
		</>
	);
}
