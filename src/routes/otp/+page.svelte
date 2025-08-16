<script lang="ts">
	import RegisterForm from "$lib/components/register-form.svelte";
    import OtpForm from "$lib/components/otp-form.svelte";
    import Navbar from "$lib/components/Navbar.svelte";
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
        <Navbar navigationStyle="login" />
        <RegisterForm id="register-form" />
    </div>
</div>
