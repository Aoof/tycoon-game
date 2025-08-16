<script lang="ts">
    import Navbar from "$lib/components/Navbar.svelte";
    import LoginForm from "$lib/components/login-form.svelte";
</script>

<style>

</style>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
        <Navbar navigationStyle="login" />
        <LoginForm />
    </div>
</div>