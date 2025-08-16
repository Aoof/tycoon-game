import { writable } from "svelte/store";
import type { User, UserPayload } from "$lib/types";
import axios from "axios";

export const user = writable<User | null>(null);

export const login = async (userData: UserPayload) => {
    try {
        const response = await axios.post("/auth/login", userData);
        user.set(response.data);
    } catch (error) {
        console.error("Login failed:", error);
    }
};

export const register = async (userData: UserPayload) => {
    try {
        const response = await axios.post("/auth/register", userData);
        user.set(response.data);
        console.log("Missing OTP");
    } catch (error) {
        console.error("Registration failed:", error);
    }
};