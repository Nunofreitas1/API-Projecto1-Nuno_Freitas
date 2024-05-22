<script setup>
import { ref, onMounted } from 'vue';
import HomeCard from '../components/HomeCard.vue';
import axios from 'axios';

const recommendations = ref([]);
const accessToken = localStorage.getItem('token');

async function fetchRecommendations() {
    try {
        const response = await fetch('https://api.spotify.com/v1/recommendations?seed_genres=classical,rock', {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        });
        const data = await response.json();
        recommendations.value = data.tracks.slice(0, 4);
    } catch (error) {
        console.error('Error fetching recommendations:', error);
    }
}
    onMounted(() => {
        fetchRecommendations();
});
const podcasts = ref([]);
async function fetchPodcasts() {
    try {
        const query = 'technology'; // Modify this query to suit your podcast topic needs
        const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=show&market=US`, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
        });
        const data = await response.json();
        podcasts.value = data.shows.items.slice(0,4);
    } catch (error) {
        console.error('Error fetching podcasts:', error);
    }
}

onMounted(fetchPodcasts);
const tracks = ref([]);
async function fetchRadioRecommendations() {
  const seedGenres = 'jazz'; // Change as needed
  try {
    const response = await fetch(`https://api.spotify.com/v1/recommendations?seed_genres=${seedGenres}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${accessToken}`
      }
    });
    const data = await response.json();
    tracks.value = data.tracks.slice(0,4);
  } catch (error) {
    console.error('Error fetching radio recommendations:', error);
  }
}

onMounted(fetchRadioRecommendations);
</script>

<template>
    <div class="p-8">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
            Podcasts to make you smarter
        </button>

        <div class="py-1.5"></div>

        <div class="flex items-center">
            <HomeCard 
                v-for="podcast in podcasts"
                :key="podcast.id"
                :image="podcast.images[0].url"
                :title="podcast.name"
                :subTitle="'by ' +  podcast.publisher "
                :type="'podcast'"
                :itemId="podcast.id"
                class="md:block"
            />
        </div>
    </div>

    <div class="p-8">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
        Recommended radio
        </button>

        <div class="py-1.5"></div>

        <div class="flex items-center">
            <HomeCard 
                v-for="track in tracks"
                :key="track.id"
                :image="track.album.images[0].url"
                :title="track.name"
                :type="'radio'"
                :itemId="track.id"
                :subTitle="'by ' + track.artists[0].name"
                class="md:block"
            />
        </div>
    </div>

    <div class="p-8">
        <button
            type="button"
            class="text-white text-2xl font-semibold hover:underline cursor-pointer"
        >
        Recommended songs
        </button>

        <div class="py-1.5"></div>

        <div class="flex items-center">
            <HomeCard 
                v-for="track in recommendations"
                :key="track.id"
                :image="track.album.images[0].url"
                :title="track.name"
                :subTitle="'by ' + track.artists[0].name"
                :type="'album'"
                :itemId="track.id"
                class="md:block"
            />
        </div>
    </div>
</template>