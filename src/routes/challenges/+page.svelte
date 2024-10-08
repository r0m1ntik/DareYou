<script>
    import { supabase } from '$lib/supabaseClient';
    let challenges = [];

    // Fetch challenges from the database on page load
    async function fetchChallenges() {
        const { data, error } = await supabase
            .from('Challenges')
            .select('*');

        if (error) {
            console.log('Error fetching challenges:', error);
        } else {
            challenges = data;
        }
    }

    fetchChallenges();
</script>

<h1>Défis du Quotidien</h1>

<ul>
    {#each challenges as challenge}
        <li>{challenge.title}: {challenge.description}</li>
    {/each}
</ul>