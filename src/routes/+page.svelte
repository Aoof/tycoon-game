<script lang="ts">
    import { user } from "$lib/stores/auth";
    import { goto } from "$app/navigation";

	$effect(() => {
		if (!$user?.id) {
			goto('/login');
		}
	});
</script>

<style>

</style>

<main>
</main>