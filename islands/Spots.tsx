import { FloatingButton } from '../components/Floating-Button.tsx';
import PostList, { PostListProps } from '../components/PostList.tsx';

export default function Spots() {
	return (
		<section id='places' class='bg-white pt-10 pb-10'>
			<div class='container w-full mx-auto'>
				<div class='row justify-center'>
					<div class='w-full lg:w-1/2'>
						<div class='section_title text-center pb-6'>
							<h5 class='sub_title'>Places</h5>
							<h4 class='main_title'>
								Search for Jasaan Places
							</h4>
						</div>
					</div>
				</div>
			</div>
			<FloatingButton />

			<div class='max-w-md w-full mx-auto'>
				<div class='relative'>
					<form action='' method='GET'>
						<input
							type='text'
							name='search'
							placeholder='Enter keywords'
							class='w-full px-3 py-2 border rounded-md outline-none focus:border-gray-300 focus:shadow-sm'
						/>
						<div class='absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none'>
							<svg
								xmlns='http://www.w3.org/2000/svg'
								fill='none'
								viewBox='0 0 24 24'
								stroke-width='2'
								stroke='currentColor'
								aria-hidden='true'
								class='w-4 h-4 text-gray-400'
							>
								<path
									stroke-linecap='round'
									stroke-linejoin='round'
									d='M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z'
								>
								</path>
							</svg>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
}
