import { Context } from '../type.ts';

type NavBarProps = Pick<Context, 'user' | 'path'>;

export default function NavBar(props: NavBarProps) {
	const navigations = [
		{
			title: 'Home',
			path: '/',
		},
		{
			title: 'About',
			path: '/about',
		},
		{
			title: 'Services',
			path: '/services',
		},
		{
			title: 'Contact',
			path: '/contact',
		},
	];

	const theme = {
		bg: 'bg-transparent',
	};

	const fixInset = ['/', '/test', '/login', '/reset'].includes(props.path);

	if (!fixInset) {
		theme.bg = 'bg-white';
	}

	return (
		<header class={fixInset ? 'fixed w-full inset-0' : 'w-full'}>
			<nav class={'border-gray-200 py-2.5 ' + theme.bg}>
				<div class='flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto'>
					<a href='#' class='flex items-center'>
						<img
							src='/logo.svg'
							class='h-6 mr-3 sm:h-9'
							alt='Landwind Logo'
						/>
					</a>
					<div class='flex items-center lg:order-2'>
						{props.user
							? (
								<div class='group inline-block lg:mr-0 '>
									<button class='min-w-min bg-red-600 hover:bg-red-700 outline-none focus:outline-none border-none px-3 py-1 rounded-full flex items-center'>
										<span>
											<svg
												class='h-8 w-8 text-white'
												fill='none'
												viewBox='0 0 24 24'
												stroke='currentColor'
											>
												<path
													stroke-linecap='round'
													stroke-linejoin='round'
													stroke-width='2'
													d='M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z'
												/>
											</svg>
										</span>
									</button>
									<ul class='bg-transparent rounded-sm transform scale-0 group-hover:scale-100 absolute
                    transition duration-150 ease-in-out origin-top'>
										<li class='text-gray-400 font-extrabold rounded-sm px-1 border-b border-gray-100 py-1 hover:bg-red-700'>
											Add New Spot
										</li>
										<a href='/reset'>
											<li class='text-gray-400 font-extrabold rounded-sm px-1 border-b border-gray-100 py-1 hover:bg-red-700'>
												Change Password
											</li>
										</a>
										<a href='/login?logout=true'>
											<li class='text-gray-400 font-extrabold rounded-sm px-1 border-b border-gray-100 py-1 hover:bg-red-700'>
												Logout
											</li>
										</a>
									</ul>
								</div>
							)
							: (
								<a
									href='/login'
									class='text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none'
								>
									Login
								</a>
							)}

						<button
							data-collapse-toggle='mobile-menu-2'
							type='button'
							class='inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200'
							aria-controls='mobile-menu-2'
							aria-expanded='false'
						>
							<span class='sr-only'>Open main menu</span>
							<svg
								class='w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fill-rule='evenodd'
									d='M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z'
									clip-rule='evenodd'
								>
								</path>
							</svg>
							<svg
								class='hidden w-6 h-6'
								fill='currentColor'
								viewBox='0 0 20 20'
								xmlns='http://www.w3.org/2000/svg'
							>
								<path
									fill-rule='evenodd'
									d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
									clip-rule='evenodd'
								>
								</path>
							</svg>
						</button>
					</div>
					<div
						class='items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1'
						id='mobile-menu-2'
					>
						<ul class='flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0'>
							{navigations.map((navigation) => {
								let navClass =
									`text-xl lg:hover:text-red-700 font-extrabold block py-2 pl-3 pr-4 text-gray-${
										props.path === '/' ? '200' : '400'
									} border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0`;
								if (props.path === navigation.path) {
									navClass =
										'text-xl font-extrabold block py-2 pl-3 pr-4 text-red bg-red-700 rounded lg:bg-transparent lg:text-red-700 lg:p-0';
								}
								return (
									<li>
										<a
											href={navigation.path}
											class={navClass}
										>
											{navigation.title}
										</a>
									</li>
								);
							})}
						</ul>
					</div>
				</div>
			</nav>
		</header>
	);
}
