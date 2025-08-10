<script lang="ts">
    import { onMount } from 'svelte';
    import { io } from 'socket.io-client';

    const socket = io();

    onMount(() => {
        socket.on('eventFromServer', (data) => {
            appendMessage(data);
        });
    });

    const appendMessage = (message: { userId: string; timestamp: number; content: string }) => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.textContent = `${message.content} (User: ${message.userId}, Time: ${new Date(message.timestamp).toLocaleTimeString()})`;

        document.getElementById('messages')?.appendChild(messageElement);
    };
</script>

<main class="bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
    <h1 class="text-2xl font-bold">Welcome to the Tycoon Game</h1>
    <p class="mt-4">Get ready to build your empire!</p>

    <div class="mt-6">
        <h2 class="text-xl font-semibold">Messages from Server:</h2>
        <div id="messages" class="mt-2 p-4 bg-white dark:bg-gray-800 rounded shadow">
        </div>
    </div>

    <div class="mt-6 flex flex-row">
        <input type="text" id="clientMessage" placeholder="Type your message here" class="mt-4 p-2 border bg-gray-200 dark:bg-gray-800 rounded w-full" />
        <button
            class="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-fit"
            on:click={() => socket.emit('eventFromClient', { content: (document.getElementById('clientMessage') as HTMLInputElement).value })}
        >
            Send Message
        </button>
    </div>
</main>

<style lang="postcss">
    @reference "tailwindcss";

    :global(html) {
        background-color: theme('--color-gray-900');
    }
</style>