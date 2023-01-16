import { HEAD_CONTEXT, HeadProps } from '$fresh/runtime.ts';
import { useContext } from 'preact/hooks';
import { ComponentChildren } from 'preact';

export function Head(props: HeadProps) {
	let context: ComponentChildren[];
	try {
		context = useContext(HEAD_CONTEXT);
	} catch (err) {
		console.log('err', err);
		throw new Error(
			'<Head> component is not supported in the browser, or during suspense renders.',
			{ cause: err },
		);
	}
	context.push(props.children);
	return null;
}
