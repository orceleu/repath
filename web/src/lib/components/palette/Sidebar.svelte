<script lang="ts">
	import Examples from './Examples.svelte';
	import Palette from './Palette.svelte';
	import Projects from './Projects.svelte';

	/**
	 * The left panel: parts to draw with, or whole circuits to start from.
	 *
	 * Both are things taken from a shelf and put on the drawing, so they share
	 * the panel rather than one of them living in a menu. The tab is remembered
	 * per browser, like the folded shelves.
	 */
	type Tab = 'parts' | 'examples' | 'projects';
	const KEY = 'repath.sidebarTab';

	function load(): Tab {
		try {
			const saved = localStorage.getItem(KEY);
			return saved === 'examples' || saved === 'projects' ? saved : 'parts';
		} catch {
			return 'parts';
		}
	}

	let tab = $state<Tab>(load());

	function choose(next: Tab) {
		tab = next;
		try {
			localStorage.setItem(KEY, next);
		} catch {
			// The choice still holds for this tab.
		}
	}

	const TABS: Array<{ id: Tab; label: string }> = [
		{ id: 'parts', label: 'Components' },
		{ id: 'examples', label: 'Examples' },
		{ id: 'projects', label: 'Projects' }
	];
</script>

<div class="flex h-full min-h-0 w-full min-w-0 flex-col">
	<div role="tablist" aria-label="Sidebar" class="flex shrink-0 gap-1 border-b border-border px-2 pt-2">
		{#each TABS as { id, label } (id)}
			<button
				type="button"
				role="tab"
				id="sidebar-tab-{id}"
				aria-selected={tab === id}
				aria-controls="sidebar-panel"
				onclick={() => choose(id)}
				class="-mb-px cursor-pointer border-0 border-b-2 bg-transparent px-1.5 pb-1.5 text-ui {tab === id
					? 'border-accent text-fg'
					: 'border-transparent text-muted hover:text-fg'}"
			>
				{label}
			</button>
		{/each}
	</div>
	<div id="sidebar-panel" role="tabpanel" aria-labelledby="sidebar-tab-{tab}" class="min-h-0 flex-1">
		{#if tab === 'parts'}
			<Palette />
		{:else if tab === 'examples'}
			<Examples />
		{:else}
			<Projects />
		{/if}
	</div>
</div>
