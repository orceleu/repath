<script lang="ts">
	import { CalendarDays, Clock3, Search, Trash2, X } from '@lucide/svelte';
	import { activateProject, deleteProject, projectLibrary } from '$lib/projects.svelte';
	import { search } from '$lib/search';
	import { app } from '$lib/state.svelte';

	let query = $state('');
	let searchInput = $state<HTMLInputElement | null>(null);

	const found = $derived(
		search(projectLibrary.projects, query, (project) => ({
			label: project.name,
			id: project.id,
			description: project.document
		}))
	);
	function formatDate(timestamp: number): string {
		return new Intl.DateTimeFormat(undefined, { dateStyle: 'medium', timeStyle: 'short' }).format(
			timestamp
		);
	}

	function open(id: string, document: string) {
		try {
			app.fromJSON(document);
			activateProject(id);
		} catch (cause) {
			app.notice = `The project could not be opened. ${cause instanceof Error ? cause.message : String(cause)}`;
		}
	}

	function remove(id: string, name: string) {
		if (!window.confirm(`Delete “${name}” from your project library? This cannot be undone.`)) return;
		try {
			deleteProject(id);
		} catch (cause) {
			app.notice = `The project could not be deleted. ${cause instanceof Error ? cause.message : String(cause)}`;
		}
	}
</script>

<div class="flex h-full min-h-0 w-full min-w-0 flex-col">
	<div class="border-b border-border p-2">
		<label
			class="flex h-7 items-center gap-1.5 rounded-control border border-border bg-control px-2 text-muted focus-within:border-accent/70"
		>
			<Search class="size-3.5 shrink-0" />
			<input
				bind:this={searchInput}
				bind:value={query}
				onkeydown={(event) => {
					if (event.key === 'Enter' && found[0]) open(found[0].id, found[0].document);
					else if (event.key === 'Escape') {
						if (query) query = '';
						else searchInput?.blur();
					}
				}}
				type="search"
				placeholder="Search projects…"
				aria-label="Search projects by name or circuit contents"
				autocomplete="off"
				spellcheck="false"
				class="h-full min-w-0 flex-1 border-0 bg-transparent p-0 text-ui text-fg outline-none [&::-webkit-search-cancel-button]:hidden"
			/>
			{#if query}
				<button
					type="button"
					class="flex cursor-pointer border-0 bg-transparent p-0 text-muted hover:text-fg"
					aria-label="Clear the search"
					onclick={() => {
						query = '';
						searchInput?.focus();
					}}
				>
					<X class="size-3.5" />
				</button>
			{/if}
		</label>
	</div>

	<div class="min-h-0 flex-1 overflow-y-auto p-2">
		{#if found.length === 0}
			<p class="m-0 px-1 py-4 text-center text-2xs text-muted">
				{projectLibrary.projects.length === 0
					? 'No projects yet. Use “New project” or “Save project” above.'
					: `No project matches “${query.trim()}”.`}
			</p>
		{:else}
			<ul class="m-0 flex list-none flex-col gap-1 p-0">
				{#each found as project (project.id)}
					<li class="group flex items-start gap-1 rounded-md {project.id === projectLibrary.activeId ? 'bg-hover' : ''}">
						<button
							type="button"
							onclick={() => open(project.id, project.document)}
							class="min-w-0 flex-1 cursor-pointer border-0 bg-transparent px-1.5 py-1.5 text-left hover:bg-hover"
							title="Open {project.name}"
						>
							<span class="block truncate text-ui font-medium text-fg">{project.name}</span>
							<span class="mt-1 flex flex-col gap-0.5 text-[0.62rem] leading-snug text-muted">
								<span class="flex items-center gap-1">
									<CalendarDays class="size-3 shrink-0" /> Created {formatDate(project.createdAt)}
								</span>
								<span class="flex items-center gap-1">
									<Clock3 class="size-3 shrink-0" /> Modified {formatDate(project.updatedAt)}
								</span>
								{#if project.id === projectLibrary.activeId}
									<span class="mt-0.5 text-accent">Current project</span>
								{/if}
							</span>
						</button>
						<button
							type="button"
							class="mt-1 flex size-7 shrink-0 cursor-pointer items-center justify-center rounded border-0 bg-transparent text-muted hover:bg-hover hover:text-danger"
							aria-label="Delete {project.name}"
							title="Delete project"
							onclick={() => remove(project.id, project.name)}
						>
							<Trash2 class="size-3.5" />
						</button>
					</li>
				{/each}
			</ul>
		{/if}
	</div>
</div>
