<template>
    <div class="flex flex-col gap-4 items-center justify-center h-full">
        <h1 class="text-[48px] font-bold text-white">Ligue a sua conta Spotify</h1>
      <button @click="login" class="bg-[#1BD760] text-[#282828] font-medium py-2 px-8 rounded-full">Login to Spotify</button>
    </div>
  </template>
  
  <script>
  export default {
  data() {
    return {
      loggedIn: false,
      userData: null,
      token: null
    };
  },
  methods: {
    login() {
      const clientId = '440f1af43b6649678a695feffa55991f';
        const redirectUri = encodeURIComponent('http://localhost:5173/home');
        const scopes = encodeURIComponent('user-read-private user-read-email');
        const token = 'BQAMJ6DIgKDkrsUqnem_smvWmuPzProwUt0zfHopul0qhT_RxR6cxWBFvB6sYjduOywcKdtyWuyxN-g50qGpGoK22hFvq-qvJ1l4Hm1Z_w7VCWhm8NbmaEtORyE_uhInIsq_Npr4NdIyPNbJEzWvo5W4qWvNA0ghzTPhP5Mqs04Y-5r6pxHj6U9FfK2f3sa1DRdWOsJYxy4X4rZ7sHJJQ9WLQSKGeLqEpnTXw0PVt1iah74WfrY9AWFuuv-Px_rDXuzDLph9oCnOK7sgskKHCbWA';
        localStorage.setItem('token', token);
        const responseType = 'token';

      window.location.href = `https://accounts.spotify.com/authorize?client_id=${clientId}&response_type=${responseType}&redirect_uri=${redirectUri}&scope=${encodeURIComponent(scopes)}`;
    },
  }
};
</script>

  