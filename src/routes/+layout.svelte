<script lang="ts">
	import '../app.css';
	import { theme } from '$lib/stores/utils';
	import { user } from '$lib/stores/auth';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import Login from '$lib/components/Login.svelte';

	let { children } = $props();

	import { onMount } from 'svelte';

	onMount(() => {
		document.documentElement.classList.toggle(
			"dark",
			localStorage.theme === "dark" ||
			(!("theme" in localStorage) && window.matchMedia("(prefers-color-scheme: dark)").matches),
		);

		theme.subscribe(value => {
			document.documentElement.classList.toggle("dark", value === 'dark');
			localStorage.theme = value;
		});
	});

	// // Settings for the themes
	// // Whenever the user explicitly chooses light mode
	// localStorage.theme = "light";
	// // Whenever the user explicitly chooses dark mode
	// localStorage.theme = "dark";
	// // Whenever the user explicitly chooses to respect the OS preference
	// localStorage.removeItem("theme");
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

{#if $user}
	<main class=''>
		<Navbar />
		{@render children?.()}
	</main>
{:else}
	<main class='flex flex-col items-center justify-center min-h-screen'>
		<Login />
	</main>
{/if}
