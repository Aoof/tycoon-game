<script lang="ts">
    import { io } from 'socket.io-client';

    const socket = io();
</script>

<main class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 class="text-2xl font-bold">Welcome to the Tycoon Game</h1>
    <p class="mt-4">Get ready to build your empire!</p>
</main>

<style lang="postcss">
    @reference "tailwindcss";

    :global(html) {
        background-color: theme('--color-gray-900');
    }
</style>