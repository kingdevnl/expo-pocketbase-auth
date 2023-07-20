import PocketBase from "pocketbase";
import AsyncAuthStore from "./AsyncAuthStore";

export const pb = new PocketBase(process.env.EXPO_PUBLIC_POCKETBASE_URL, new AsyncAuthStore());
