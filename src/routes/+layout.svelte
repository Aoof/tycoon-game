<script lang="ts">
	import '../app.css';
	import { user } from '$lib/stores/auth';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import { ModeWatcher } from 'mode-watcher';
	import { Toaster } from 'svelte-sonner';
	import { goto } from '$app/navigation';

	const NO_AUTH_ROUTES = ['/', '/register', '/login', '/otp', '/forgot-password', '/terms-of-service', '/privacy-policy', '/page-not-found'];

	let { children } = $props();

	$effect(() => {
		if (!$user?.id) {
			goto('/login');
		}
	});
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
<Toaster />
{#if $user?.id || NO_AUTH_ROUTES.includes(page.url.pathname)}
	{@render children?.()}
{/if}
