export default function CategoryLabel(
	{ categories }: { categories: { title: string; color: string }[] },
) {
	return (
		<div class='flex gap-3'>
			{categories?.length &&
				categories.slice(0).map((category) => (
					<a href='#'>
						<label
							class={`inline-block text-xs font-bold tracking-wider uppercase mt-5  ${category.color}`}
						>
							{category.title}
						</label>
					</a>
				))}
		</div>
	);
}
