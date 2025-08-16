<script lang="ts">
	import RegisterForm from "$lib/components/register-form.svelte";
    import Navbar from "$lib/components/Navbar.svelte";

    import { register } from "$lib/stores/auth";
    import type { UserPayload } from "$lib/types";

    import { onMount } from "svelte";

    let registrationForm = $state<HTMLFormElement | null>(null);

    const handleRegister = async (event: Event) => {
        event.preventDefault();
        if (!registrationForm) return;

        const formData = new FormData(registrationForm);
        let userData: UserPayload = {
            email: "",
            username: "",
            password: "",
        };

        for (const [key, value] of formData.entries()) {
            if (key in userData) {
                userData[key as keyof UserPayload] = value as string;
            }
        }

        await register(userData);
    };

    onMount(() => {
        if (!registrationForm) {
            registrationForm = document.querySelector("form");
        }

        registrationForm?.addEventListener("submit", handleRegister);
    });

</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
    <div class="w-full max-w-sm md:max-w-3xl">
        <Navbar navigationStyle="login" />
        <RegisterForm bind:ref={registrationForm}/>
    </div>
</div>
