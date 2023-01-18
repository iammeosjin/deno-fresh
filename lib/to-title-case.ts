import converge from 'ramda/source/converge.js';
import concat from 'ramda/source/concat.js';
import compose from 'ramda/source/compose.js';
import toUpper from 'ramda/source/toUpper.js';
import head from 'ramda/source/head.js';
import tail from 'ramda/source/tail.js';
import join from 'ramda/source/join.js';
import map from 'ramda/source/map.js';
import split from 'ramda/source/split.js';
import toLower from 'ramda/source/toLower.js';

const capitalize = converge(
	concat(),
	[
		compose(
			toUpper,
			head,
		),
		tail,
	],
);

export default function toTitleCase(title: string) {
	return compose(
		join(' '),
		map(capitalize),
		split(' '),
		toLower,
	)(title);
}
