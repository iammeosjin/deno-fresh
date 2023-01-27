// deno-lint-ignore-file no-explicit-any
import IconCalendarTime from 'tablerIcons/calendar-time.tsx';
import IconMapPin from 'tablerIcons/map-pin.tsx';

import CategoryLabel from './CategoryLabel.tsx';
import { Spot } from '../models/spot.ts';
import toTitleCase from '../lib/to-title-case.ts';

export type PostListProps = Omit<Spot, 'categories'> & {
	categories: { title: string; color: string }[];
};

export default function PostList(
	props: Record<string, any> & {
		spot: PostListProps;
		hideReservations?: boolean;
		redirectionLink?: string;
	},
) {
	const { spot, hideReservations } = props;
	return (
		<>
			<div
				{...props}
				class='w-full cursor-pointer md:w-full lg:w-1/2 xl:w-1/3 2xl:w-1/4 p-6 flex flex-col'
			>
				<div class='relative inline-block overflow-hidden transition-all bg-gray-100 rounded-md max-w-300 max-h-300 w-300 h-300 hover:scale-105'>
					<a
						href={props.redirectionLink
							? props.redirectionLink
							: `/places/${spot.slug}`}
					>
						<img
							class='z-0 hover:shadow-lg w-full h-full object-cover'
							src={spot.images[0]}
						/>
					</a>
					{hideReservations ? <></> : (
						<a
							href={`/reservation/${spot.slug}`}
							class={`${
								spot.openForReservations ? '' : 'hidden'
							}`}
						>
							<div class='group reserve-float z-10 absolute top-1 right-2 flex'>
								<div class='reserve-float-content rounded-sm transform scale-0 transition duration-150 ease-in-out origin-right'>
									Reserve
								</div>
								<div class='circular-icon bg-white text-white text-gray-700 min-w-min outline-none focus:outline-none border-none px-3 py-1 rounded-full flex'>
									<IconCalendarTime class='w-7 h-7' />
								</div>
							</div>
						</a>
					)}
				</div>

				<div class='text-xs mt-2'>
					<div class='flex gap-4'>
						{spot.categories.map((category) => (
							<CategoryLabel category={category} />
						))}
					</div>
				</div>
				<h2 class='text-lg font-semibold leading-snug tracking-tight mt-2'>
					<a
						href={props.redirectionLink
							? props.redirectionLink
							: `/places/${spot.slug}`}
					>
						<span class='link-underline link-underline-red'>
							{toTitleCase(spot.name)}
						</span>
					</a>
				</h2>
				<div className='flex items-center mt-1 space-x-3 text-gray-500 dark:text-gray-400'>
					<div className='flex items-center gap-1'>
						<div className='relative flex-shrink-0'>
							<IconMapPin class='w-5 h-5' />
						</div>
						<span className='text-sm'>
							{toTitleCase(spot.barangay)}
						</span>
					</div>
				</div>
			</div>
		</>
	);
}
