<script setup>
    import { ref, onMounted } from 'vue';
    import { RouterLink, RouterView } from 'vue-router';
    import MenuItem from './components/MenuItem.vue';
    import MusicPlayer from './components/MusicPlayer.vue';
    import ChevronUp from 'vue-material-design-icons/ChevronUp.vue';
    import ChevronDown from 'vue-material-design-icons/ChevronDown.vue';
    import ChevronRight from 'vue-material-design-icons/ChevronRight.vue';
    import ChevronLeft from 'vue-material-design-icons/ChevronLeft.vue';

    import { useSongStore } from './stores/song';
    import { storeToRefs } from 'pinia';
    import axios from 'axios';


const playlists = ref([]);
const userInfo = ref([]);
let openMenu = ref(false);
const accessToken = localStorage.getItem('token');

function logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('UserData');
    window.history.replaceState({}, document.title, '/');   
    window.location.reload();
}
async function fetchUserData() {
    if (accessToken) {
        axios.get('https://api.spotify.com/v1/me', {
            headers: {
            'Authorization': `Bearer ${accessToken}`
            }
        })
        .then(response => {
            userInfo.value = response.data
        })
        .catch(error => {
            console.error('Error fetching user data:', error);
        });
        }
    }
        onMounted(() => {
            fetchUserData();
    });

async function fetchPlaylists() {
    const response = await fetch('https://api.spotify.com/v1/me/playlists', {
        headers: {
        'Authorization': `Bearer ${accessToken}`
        }
    });
    const data = await response.json();
    playlists.value = data.items; // Assuming the data items are the playlists
    }

    onMounted(() => {
    fetchPlaylists();
});
</script>

<template>
    <div>
        <div 
          id="TopNav"
          class="
            w-[calc(100%-240px)] 
            h-[60px] 
            fixed 
            right-0 
            z-20 
            bg-[#101010] 
            bg-opacity-80 
            flex 
            items-center 
            justify-between
          "
        >
            <div class="flex items-center ml-6">
                <button type="button" class="rounded-full bg-black p-[1px] cursor-pointer">
                    <ChevronLeft fillColor="#FFFFFF" :size="30" />
                </button>
                <button type="button" class="rounded-full bg-black p-[1px] hover:bg-[#] ml-4 cursor-pointer">
                    <ChevronRight fillColor="#FFFFFF" :size="30" />
                </button>
            </div>

            <button v-if="accessToken" @click="openMenu = !openMenu" :class="openMenu ? 'bg-[#282828]' : 'bg-black'"
                class="bg-black hover:bg-[#282828] rounded-full p-0.5 mr-8 mt-0.5 cursor-pointer">
                <div class="flex items-center">
                    <img 
                      class="rounded-full" 
                      width="27"
                      src="https://yt3.ggpht.com/yti/ANjgQV9iDaKSkUZJ_WQJk7KUkXiR8p83t8xPyU1p7b6bvAS9KFI=s88-c-k-c0x00ffffff-no-rj"
                    >
                    <div class="text-white text-[14px] ml-1.5 font-semibold">{{ userInfo.display_name }}</div>
                    <ChevronDown v-if="!openMenu" @click="openMenu = true" fillColor="#FFFFFF" :size="25" />
                    <ChevronUp v-else @click="openMenu = false" fillColor="#FFFFFF" :size="25" />
                </div>
            </button>

            <span v-if="openMenu"
                class="fixed w-[190px] bg-[#282828] shadow-2xl z-50 rounded-sm top-[52px] right-[35px] p-1 cursor-pointer">
                <ul class="text-gray-200 font-semibold text-[14px]">
                    <li class="px-3 py-2.5 hover:bg-[#3E3D3D] border-b border-b-gray-600">Profile</li>
                    <RouterLink to="/">
                        <li class="px-3 py-2.5 hover:bg-[#3E3D3D]" @click="logout">Log out</li>
                    </RouterLink>
                </ul>
            </span>
        </div>


        <div id="SideNav" class="h-[100%] p-6 w-[240px] fixed z-50 bg-black">
            <RouterLink v-if='accessToken' to="/home">
              <img width="125" src="/images/icons/spotify-logo.png">
            </RouterLink>
            <RouterLink v-else to="/">
              <img width="125" src="/images/icons/spotify-logo.png">
            </RouterLink>
            <div class="my-8"></div>
            <ul>
                <RouterLink v-if='accessToken' to="/home">
                    <MenuItem class="ml-[1px]" :iconSize="23" name="Home" iconString="home" pageUrl="/" />
                </RouterLink>
                <RouterLink v-else to="/">
                    <MenuItem class="ml-[1px]" :iconSize="23" name="Home" iconString="home" pageUrl="/" />
                </RouterLink>
                <RouterLink to="/search">
                    <MenuItem class="ml-[1px]" :iconSize="24" name="Search" iconString="search" pageUrl="/search" />
                </RouterLink>
                <RouterLink to="/library">
                    <MenuItem class="ml-[2px]" :iconSize="23" name="Your Library" iconString="library" pageUrl="/library" />
                </RouterLink>
                <div class="py-3.5"></div>
                <MenuItem :iconSize="24" name="Create Playlist" iconString="playlist" pageUrl="/playlist" />
                <MenuItem class="-ml-[1px]" :iconSize="27" name="Liked Songs" iconString="liked" pageUrl="/liked" />
            </ul>
            <div class="border-b border-b-gray-700"></div>
            <ul>
                <li v-for="playlist in playlists" :key="playlist.id" class="flex items-center space-x-3 py-2">
                    <img :src="playlist.images[0].url" alt="" class="w-8 h-8 rounded-full">
                    <div>
                        <h3  class="text-white hover:text-green-600">{{ playlist.name }}</h3>
                        <p class="text-gray-300">Tracks: {{ playlist.tracks.total }}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>

    <div
        class="
            fixed
            right-0
            top-0
            w-[calc(100%-240px)]
            overflow-auto
            h-full
            bg-gradient-to-b
            from-[#1C1C1C]
            to-black
        "
    >
        <div class="mt-[70px]"></div>
        <RouterView />
        <div class="mb-[100px]"></div>
    </div>

    <MusicPlayer/>
</template>