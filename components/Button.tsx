import { JSX } from 'preact';
import { IS_BROWSER } from '$fresh/runtime.ts';

export function Button(props: JSX.HTMLAttributes<HTMLButtonElement>) {
	return (
		<button
			{...props}
			disabled={!IS_BROWSER || props.disabled}
			class='mx-auto font-bold text-white bg-red-500 hover:bg-red-800 focus:ring-4 focus:ring-red-300 rounded text-base py-3 px-8 focus:outline-none'
		/>
	);
}
