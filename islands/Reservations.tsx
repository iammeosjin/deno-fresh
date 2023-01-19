import { Spot } from '../models/spot.ts';
import { DateTime } from 'https://cdn.skypack.dev/luxon?dts';
import { Reservation } from '../type.ts';
import IconTrash from 'tablerIcons/trash.tsx';
import toTitleCase from '../lib/to-title-case.ts';
import { useEffect, useState } from 'preact/hooks';

export default function Reservations(
	props: {
		reservations: (Omit<Reservation, 'spot'> & { spot: Spot | null })[];
	},
) {
	const [reservations, setReservations] = useState<
		(Omit<Reservation, 'spot'> & { spot: Spot | null })[]
	>(props.reservations);
	return (
		<div class='container mx-auto flex items-center flex-wrap pt-4 pb-12 gap-3'>
			{reservations.map((reservation) => {
				return (
					<a class='w-[30rem] border-2 border-b-4 border-gray-200 rounded-xl hover:bg-gray-50'>
						<div class='grid grid-cols-6 p-5 gap-y-2'>
							<div>
								<img
									src={reservation.spot
										?.images[0]}
									class='w-16 h-16 rounded-full'
								/>
							</div>

							<div class='col-span-5 md:col-span-4 ml-4'>
								<p class='text-sky-500 font-bold text-xs'>
									{reservation.email}
								</p>

								<p class='text-gray-600 font-bold'>
									{toTitleCase(
										reservation.spot!.name,
									)}
								</p>

								<p class='text-gray-400'>
									{DateTime.fromJSDate(
										new Date(reservation.schedule),
									).setZone('utc+8').toFormat(
										'MMM dd, yyyy ccc hh:mm a',
									)}
								</p>

								<p class='text-gray-400'>
									{toTitleCase(reservation.name)}
								</p>
							</div>

							<div class='flex col-start-2 ml-4 md:col-start-auto md:ml-0 md:justify-end'>
								<p class='rounded-lg text-sky-500 font-bold bg-sky-100  py-1 px-3 text-sm w-fit h-fit'>
									<div
										class='w-7 h-7'
										onClick={async () => {
											await fetch('/api/reservation', {
												method: 'DELETE',
												body: JSON.stringify({
													id: reservation.id,
												}),
											});
											setReservations(
												reservations.filter((index) =>
													reservation.id !== index.id
												),
											);
										}}
									>
										<IconTrash class='w-full h-full' />
									</div>
								</p>
							</div>
						</div>
					</a>
				);
			})}
		</div>
	);
}
