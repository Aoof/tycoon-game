<script>
    import { user } from '$lib/stores/auth';
    import { theme, toggleTheme } from '$lib/stores/utils';

    // User is already logged in here
</script>

<style>

</style>

<nav>
    <div class="flex flex-row items-center justify-between">
        <div class="text-xl text-dark dark:text-white">Tycoon Game</div>
        <div class="flex flex-row">
            <span class="text-dark dark:text-white">Hello, {$user ? $user.username : 'Guest'}!</span>
            <button class="text-dark dark:text-white">Logout</button>
            <button class="cursor-pointer text-dark dark:text-white/70" aria-label="theme toggle" on:click={toggleTheme}>
                {#if $theme === 'dark'}
                    <i class="fas fa-sun"></i>
                {:else}
                    <i class="fas fa-moon"></i>
                {/if}
            </button>
        </div>
    </div>
</nav>