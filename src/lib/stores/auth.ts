import { writable } from "svelte/store";
import type { User, UserPayload } from "$lib/types";
import { toast } from "svelte-sonner";
import axios from "axios";
import { goto } from "$app/navigation";

export const user = writable<User | null>(null);

export const login = async (userData: UserPayload) => {
    try {
        const response = await axios.post("/auth/login", userData);
        const { success, message, data } = response.data;
        if (success) {
            user.set(data);
            toast.success(message);
            return true;
        } else {
            user.set(null);
            goto('/');
            toast.error("Login failed");
            return false;
        }
    } catch (error) {
        toast.error("Login failed: " + error);
        return false;
    }
};

export const register = async (userData: UserPayload) => {
    try {
        const response = await axios.post("/auth/register", userData);
        const { success, message, data } = response.data;
        let _user : User = {
            id: data.id,
            username: data.username,
            email: data.email,
            isVerified: data.isVerified
        };
        if (success) {
            user.set(_user);
            toast.success(message);
            goto('/register');
            return true;
        } else {
            user.set(null);
            toast.error("Registration failed");
            return false;
        }
    } catch (error) {
        toast.error("Registration failed: " + error);
        return false;
    }
};

export const otp = writable("");

export const processOtp = async (email: string, _otp: string) => {
    try {
        const response = await axios.post("/auth/verify-otp", { email, otp: _otp });
        const { success, message, data } = response.data;
        if (success) {
            user.set(data);
            toast.success(message);
        } else {
            user.set(null);
            toast.error("OTP verification failed");
        }
    } catch (error) {
        toast.error("OTP verification failed: " + error);
    }
};