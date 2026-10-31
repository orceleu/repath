export interface SavedProject {
	id: string;
	name: string;
	createdAt: number;
	updatedAt: number;
	document: string;
}

interface StoredProjects {
	version: 1;
	activeId: string | null;
	projects: SavedProject[];
}

const STORAGE_KEY = 'circuitskill.projects';

export const projectLibrary = $state<{
	projects: SavedProject[];
	activeId: string | null;
	ready: boolean;
}>({
	projects: [],
	activeId: null,
	ready: false
});

function validProject(value: unknown): value is SavedProject {
	if (!value || typeof value !== 'object') return false;
	const project = value as Partial<SavedProject>;
	return (
		typeof project.id === 'string' &&
		typeof project.name === 'string' &&
		typeof project.document === 'string' &&
		typeof project.createdAt === 'number' &&
		Number.isFinite(project.createdAt) &&
		typeof project.updatedAt === 'number' &&
		Number.isFinite(project.updatedAt)
	);
}

function persist(projects: SavedProject[], activeId: string | null): void {
	const stored: StoredProjects = { version: 1, activeId, projects };
	localStorage.setItem(STORAGE_KEY, JSON.stringify(stored));
	projectLibrary.projects = projects;
	projectLibrary.activeId = activeId;
}

export function loadProjects(): void {
	if (projectLibrary.ready || typeof localStorage === 'undefined') return;
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const stored = JSON.parse(raw) as Partial<StoredProjects>;
			if (stored.version !== 1 || !Array.isArray(stored.projects) || !stored.projects.every(validProject)) {
				throw new Error('The saved project library has an invalid format.');
			}
			projectLibrary.projects = [...stored.projects].sort((a, b) => b.updatedAt - a.updatedAt);
			projectLibrary.activeId =
				typeof stored.activeId === 'string' &&
				projectLibrary.projects.some((project) => project.id === stored.activeId)
					? stored.activeId
					: null;
		}
		projectLibrary.ready = true;
	} catch (cause) {
		projectLibrary.ready = true;
		throw cause;
	}
}

export function saveProject(name: string, document: string): SavedProject {
	const cleanName = name.trim();
	if (!cleanName) throw new Error('Enter a name for the project.');

	const now = Date.now();
	const existing = projectLibrary.projects.find((project) => project.id === projectLibrary.activeId);
	const project: SavedProject = existing
		? { ...existing, name: cleanName, document, updatedAt: now }
		: {
				id: `p${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
				name: cleanName,
				createdAt: now,
				updatedAt: now,
				document
			};
	const next = [project, ...projectLibrary.projects.filter((item) => item.id !== project.id)].sort(
		(a, b) => b.updatedAt - a.updatedAt
	);
	persist(next, project.id);
	return project;
}

export function createProject(name: string, document: string): SavedProject {
	const cleanName = name.trim();
	if (!cleanName) throw new Error('Enter a name for the project.');

	const now = Date.now();
	const project: SavedProject = {
		id: `p${now.toString(36)}${Math.random().toString(36).slice(2, 8)}`,
		name: cleanName,
		createdAt: now,
		updatedAt: now,
		document
	};
	persist([project, ...projectLibrary.projects], project.id);
	return project;
}

export function activateProject(id: string | null): void {
	if (id !== null && !projectLibrary.projects.some((project) => project.id === id)) {
		throw new Error('That project is no longer in the library.');
	}
	persist(projectLibrary.projects, id);
}

export function deleteProject(id: string): void {
	const next = projectLibrary.projects.filter((project) => project.id !== id);
	const activeId = projectLibrary.activeId === id ? null : projectLibrary.activeId;
	persist(next, activeId);
}
