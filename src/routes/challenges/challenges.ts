import { supabase } from '$lib/supabaseClient';

export async function post({ request }) {
    const data = await request.json();
    const { title, description, deadline, creator_id } = data;

    const { error } = await supabase
        .from('Challenges')
        .insert([{ title, description, deadline, creator_id }]);

    if (error) {
        return {
            status: 500,
            body: { error: error.message }
        };
    }

    return {
        status: 200,
        body: { message: 'Défi créé avec succès' }
    };
}