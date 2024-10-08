<script>
    import { supabase } from '$lib/supabaseClient';
    import { onMount } from 'svelte';
    import '@skeletonlabs/skeleton';

    let challenges = [];
    let loading = true;
    let errorMessage = '';

    // Récupération des défis depuis la base de données lors du montage du composant
    async function fetchChallenges() {
        try {
            const { data, error } = await supabase
                .from('challenges')
                .select('*');

            if (error) {
                throw new Error('Erreur lors de la récupération des défis : ' + error.message);
            }

            challenges = data;
        } catch (error) {
            errorMessage = error.message;
            console.error(errorMessage);
        } finally {
            loading = false;
        }
    }

    // Appel de la fonction fetchChallenges lors de la création (montage) du composant
    onMount(() => {
        fetchChallenges();
    });
</script>

<!-- Affichage de l'état de chargement, des erreurs et des défis -->
{#if loading}
    <p>Chargement des défis...</p>
{:else if errorMessage}
    <p class="error">Une erreur est survenue : {errorMessage}</p>
{:else if challenges.length === 0}
    <p>Aucun défi disponible pour le moment.</p>
{:else}
    <ul>
        {#each challenges as challenge}
            <li>{challenge.title}: {challenge.description} : {challenge.created_at}</li>
        {/each}
    </ul>
{/if}