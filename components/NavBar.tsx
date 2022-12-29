import { Context } from "../type.ts";


type NavBarProps = Pick<Context, 'user' | 'path'>


export default function NavBar(props: NavBarProps) {
  const navigations = [
    {
      title: 'Home',
      path: '/'
    },
    {
      title: 'About',
      path: '/about'
    },
    {
      title: 'Service',
      path: '/service'
    },
    {
      title: 'Contact',
      path: '/contact'
    },
  ]

  const theme = {
    bg: 'bg-transparent',

  }
  const bgColor = props.path === '/' ? 'bg-transparent' : 'bg-white';

	return (
		<header class="fixed w-full inset-0">
        <link rel="stylesheet" href="output.css" />
        <nav class={ "border-gray-200 py-2.5 " + theme.bg }>
            <div class="flex flex-wrap items-center justify-between max-w-screen-xl px-4 mx-auto">
                <a href="#" class="flex items-center">
                  <img src="/logo.svg" class="h-6 mr-3 sm:h-9" alt="Landwind Logo" />
                </a>
                <div class="flex items-center lg:order-2">
                    <a href="/login" class="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-4 lg:px-5 py-2 lg:py-2.5 sm:mr-2 lg:mr-0 focus:outline-none">Login</a>
                    <button data-collapse-toggle="mobile-menu-2" type="button" class="inline-flex items-center p-2 ml-1 text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200" aria-controls="mobile-menu-2" aria-expanded="false">
                        <span class="sr-only">Open main menu</span>
                        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path></svg>
                        <svg class="hidden w-6 h-6" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    </button>
                </div>
                <div class="items-center justify-between hidden w-full lg:flex lg:w-auto lg:order-1" id="mobile-menu-2">
                    <ul class="flex flex-col mt-4 font-medium lg:flex-row lg:space-x-8 lg:mt-0">
                      {
                        navigations.map(navigation => {
                          let navClass = 'text-xl lg:hover:text-red-700 font-extrabold block py-2 pl-3 pr-4 text-gray-200 border-b border-gray-100 hover:bg-gray-50 lg:hover:bg-transparent lg:border-0 lg:p-0';
                          if (props.path === navigation.path) {
                            navClass = 'text-xl font-extrabold block py-2 pl-3 pr-4 text-red bg-red-700 rounded lg:bg-transparent lg:text-red-700 lg:p-0';
                          }
                          return (
                            <li>
                                <a href={navigation.path} class={navClass} aria-current="page">{navigation.title}</a>
                            </li>
                          );
                        })
                      }
                    </ul>
                </div>
            </div>
        </nav>
        <script src="flowbite.js"></script>
    </header>
	);
}