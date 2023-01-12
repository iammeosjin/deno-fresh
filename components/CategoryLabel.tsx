export default function CategoryLabel(
	{ categories }: { categories: { title: string; color: string }[] },
) {
	return (
		<div class='flex gap-3'>
			{categories.map((category) => (
				<a>
					<label
						class={`inline-block font-bold tracking-wider uppercase ${category.color}`}
					>
						{category.title}
					</label>
				</a>
			))}
		</div>
	);
}
