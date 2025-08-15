<script lang="ts">

</script>

<div id="login-container">
    <h1 class="text-4xl font-bold text-left text-white">Welcome back</h1>

    <form class="flex flex-col justify-end py-4 min-w-xl">
        <div class="w-full text-left flex flex-col">
            <label for="username" class="text-white/70 mb-2">Username:</label> 
            <input type="text" name="username" placeholder="Username" class="p-2 mb-4 rounded border border-white/40 dark:text-white/80 bg-inherit dark:bg-inherit" />
        </div>
        <div class="w-full text-left flex flex-col">
            <label for="password" class="text-white/70 mb-2">Password:</label>
            <input type="password" name="password" placeholder="Password" class="p-2 mb-4 border border-white/40 dark:text-white/80 rounded bg-inherit dark:bg-inherit" />
        </div>
        <button type="submit" class="cursor-pointer w-fit ml-auto bg-gradient-to-br from-emerald-400 to-cyan-400 text-purple-700 hover:opacity-80 transition-all duration-300 rounded-xl px-4 py-2">Login</button>
    </form>
</div>

<style lang="postcss">
    @reference 'tailwindcss';

    #login-container {
        @apply bg-gradient-to-br via-violet-200 from-violet-200 to-pink-200;
        @apply dark:via-indigo-500/40 dark:from-indigo-500/40 dark:to-indigo-700/40;
        @apply px-8 py-14 rounded-xl shadow-xl;
    }
</style>