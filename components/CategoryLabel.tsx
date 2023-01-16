export default function CategoryLabel(
	{ category }: { category: { title: string; color: string } },
) {
	return (
		<a>
			<label
				class={`inline-block font-bold tracking-wider uppercase ${category.color}`}
			>
				{category.title}
			</label>
		</a>
	);
}
