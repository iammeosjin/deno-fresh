import { JSX } from 'preact';
import IconCalendarTime from 'tablerIcons/calendar-time.tsx';
import IconHomeCog from 'tablerIcons/home-cog.tsx';

export function FloatingButton(props: JSX.HTMLAttributes<HTMLButtonElement>) {
	return (
		<div id='float-button'>
			<a
				id='menu-share'
				class='float-button bg-red-500 text-white'
			>
				<IconHomeCog class='float-item mx-auto my-auto' />
			</a>
			<ul>
				<li>
					<a href='/reservation' class='bg-orange-500 text-white'>
						<IconCalendarTime class='float-item mx-auto my-auto' />
					</a>
				</li>
			</ul>
		</div>
	);
}
