<script lang="ts">
	import { Button } from '$lib/ui';

	type Props = {
		mode: 'save' | 'new';
		initialName: string;
		onSubmit: (name: string) => void;
		onCancel: () => void;
	};

	let { mode, initialName, onSubmit, onCancel }: Props = $props();
	let name = $state('');
	let input = $state<HTMLInputElement | null>(null);

	$effect(() => {
		name = initialName;
		input?.focus();
		input?.select();
	});

	function submit(event: SubmitEvent) {
		event.preventDefault();
		onSubmit(name);
	}
</script>

<div
	class="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4"
	role="presentation"
	onclick={(event) => {
		if (event.target === event.currentTarget) onCancel();
	}}
>
	<dialog
		open
		aria-modal="true"
		aria-labelledby="project-dialog-title"
		class="m-0 w-full max-w-sm rounded-lg border border-border bg-panel p-4 text-fg shadow-2xl"
	>
		<h2 id="project-dialog-title" class="m-0 text-base font-semibold">
			{mode === 'new' ? 'New project' : 'Save project'}
		</h2>
		<p class="mb-3 mt-1 text-ui text-muted">
			{mode === 'new'
				? 'This creates an empty project and replaces the drawing currently open.'
				: 'Save the current circuit to your project library.'}
		</p>
		<form onsubmit={submit}>
			<label for="project-name" class="mb-1 block text-ui text-strong">Project name</label>
			<input
				bind:this={input}
				bind:value={name}
				id="project-name"
				required
				maxlength="120"
				autocomplete="off"
				class="h-8 w-full rounded-control border border-border bg-control px-2 text-ui text-fg outline-none focus:border-accent"
			/>
			<div class="mt-4 flex justify-end gap-2">
				<Button type="button" variant="ghost" onclick={onCancel}>Cancel</Button>
				<Button type="submit" variant="primary">{mode === 'new' ? 'Create project' : 'Save project'}</Button>
			</div>
		</form>
	</dialog>
</div>
