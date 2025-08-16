<script lang="ts">
	import '../app.css';
	import { user } from '$lib/stores/auth';
	import { page } from '$app/state';
	import favicon from '$lib/assets/favicon.svg';
	import Navbar from '$lib/components/Navbar.svelte';
	import LoginForm from "$lib/components/login-form.svelte";
	import { ModeWatcher } from 'mode-watcher';

	const NO_AUTH_ROUTES = ['/register', '/forgot-password', '/terms-of-service', '/privacy-policy', '/page-not-found'];

	let { children } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
</svelte:head>

<ModeWatcher />
{#if $user || NO_AUTH_ROUTES.includes(page.url.pathname)}
	{@render children?.()}
{:else}
	<div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
		<div class="w-full max-w-sm md:max-w-3xl">
			<Navbar navigationStyle="login" />
			<LoginForm />
		</div>
	</div>
{/if}
