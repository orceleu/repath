<script lang="ts">
	import { FilePlus2, Save, Search } from '@lucide/svelte';
	import { Button, ToolbarSeparator } from '$lib/ui';
	import AnalysisControls from './AnalysisControls.svelte';
	import DocumentControls from './DocumentControls.svelte';
	import ProjectNameDialog from './ProjectNameDialog.svelte';
	import { createProject, projectLibrary, saveProject } from '$lib/projects.svelte';
	import { app } from '$lib/state.svelte';
	import { toasts } from '$lib/ui/toast/toasts.svelte';

	type Props = {
		share: () => Promise<string>;
		/** Open the command palette. */
		onFind: () => void;
	};

	let { share, onFind }: Props = $props();
	let projectDialog = $state<'save' | 'new' | null>(null);

	const activeProject = $derived(
		projectLibrary.projects.find((project) => project.id === projectLibrary.activeId)
	);
	const suggestedName = $derived(activeProject?.name ?? `Project ${projectLibrary.projects.length + 1}`);

	function submitProjectName(name: string) {
		try {
			if (projectDialog === 'new') {
				const emptyDocument = JSON.stringify({
					version: 1,
					schematic: { instances: [], wires: [], subcircuits: [], blocks: [], groups: [] },
					stopTime: 0.001,
					probes: [],
					settings: {}
				});
				createProject(name, emptyDocument);
				app.fromJSON(emptyDocument);
				toasts.show(`Created project “${name.trim()}”`);
			} else {
				saveProject(name, app.toJSON());
				toasts.show(`Saved project “${name.trim()}”`);
			}
			projectDialog = null;
		} catch (cause) {
			app.notice = `The project could not be saved. ${cause instanceof Error ? cause.message : String(cause)}`;
		}
	}
</script>

<!--
	Two halves: what the simulation is set up to do on the left, and what
	happens to the document on the right. Run itself is under the drawing, with
	the rest of the transport. On a phone the row scrolls sideways rather than
	wrapping into a wall of controls.
-->
<header
	class="flex items-center gap-4 border-b border-border bg-panel px-3 py-1.5 max-[900px]:gap-2 max-[900px]:px-2.5"
>
	<strong class="shrink-0 text-base tracking-tight">circuitskill</strong>

	<div
		class="relative flex min-w-0 flex-1 items-center gap-1.5 [scrollbar-width:none] max-[900px]:overflow-x-auto max-[900px]:p-0.5"
	>
		<AnalysisControls />

		<Button
			variant="primary"
			onclick={() => (projectDialog = 'save')}
			aria-label="Save project"
			title="Save the current circuit to your project library"
		>
			<Save /> <span class="max-[1200px]:hidden">Save project</span>
		</Button>
		<Button
			onclick={() => (projectDialog = 'new')}
			aria-label="New project"
			title="Create and open an empty project"
		>
			<FilePlus2 /> <span class="max-[1200px]:hidden">New project</span>
		</Button>

		<span class="flex-1"></span>
		<!-- Where everything else is: every part, every command, by name. -->
		<Button
			class="w-44 justify-start text-muted max-[1200px]:w-auto"
			onclick={onFind}
			title="Find a part or a command (Ctrl+K)"
		>
			<Search />
			<span class="max-[1200px]:hidden">Find anything…</span>
			<kbd class="ml-auto font-mono text-[0.6rem] max-[1200px]:hidden">Ctrl K</kbd>
		</Button>
		<ToolbarSeparator />

		<DocumentControls {share} />
	</div>
</header>

{#if projectDialog}
	<ProjectNameDialog
		mode={projectDialog}
		initialName={suggestedName}
		onSubmit={submitProjectName}
		onCancel={() => (projectDialog = null)}
	/>
{/if}
