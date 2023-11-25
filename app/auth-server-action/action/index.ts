"use server";

import createSupabaseServerClient from "@/utils/supabase";


export async function signUp(data: {
    email: string;
    password: string;
}) {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.auth.signUp({email: data.email, password: data.password});


    return JSON.stringify(result);
}


export async function signIn(data: {
    email: string;
    password: string;
}) {
    const supabase = await createSupabaseServerClient();

    const result = await supabase.auth.signInWithPassword({email: data.email, password: data.password});

    return JSON.stringify(result);
}