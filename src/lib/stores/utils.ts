import { writable } from "svelte/store";

export const theme = writable<'light' | 'dark'>('light');

export const toggleTheme = () => {
    theme.update(current => current === 'dark' ? 'light' : 'dark');
};