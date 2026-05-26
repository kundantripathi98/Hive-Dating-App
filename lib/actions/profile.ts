"use server";
import { cookies } from "next/headers";

import { createClient } from "../supabase/server";

export async function getCurrentUserProfile() {
    const supabase = await createClient(await cookies());
    const {data: {user}} = await supabase.auth.getUser();

    if(!user){
        return null;
    }

    const {data: profile, error} = await supabase.from("users").select("*").eq("id", user.id).single();

    if(error){
        console.error("Error fetching profile:", error);
        return null;
    }

    return profile;
}