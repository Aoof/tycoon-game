<script lang="ts">
    import { user } from '$lib/stores/auth';
    import { toggleMode } from "mode-watcher";

    import SunIcon from "@lucide/svelte/icons/sun";
    import MoonIcon from "@lucide/svelte/icons/moon";
    import { Button } from "$lib/components/ui/button";

    export let navigationStyle : "login" | "dashboard" = "login";
</script>

<style>

</style>

<nav class={"w-full bg-muted flex flex-col items-center justify-center py-8 " + (navigationStyle === "dashboard" ? "" : "mb-8")}>
    <div class="flex flex-row items-center justify-between max-w-md md:max-w-xl w-full">
        <a class="text-3xl font-bold text-dark dark:text-white m-auto" href="/">Tycoon Game</a>
        <div class="flex flex-row m-auto">
            <Button onclick={toggleMode} variant="outline" size="icon">
                <SunIcon
                    class="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 !transition-all dark:-rotate-90 dark:scale-0"
                />
                <MoonIcon
                    class="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 !transition-all dark:rotate-0 dark:scale-100"
                />
                <span class="sr-only">Toggle theme</span>
            </Button>
        </div>
    </div>
</nav>