<template>
  <v-app>
    <!-- <Navbar/> -->
    <Navbar v-if="this.$route.path !== '/login' && this.$route.path !== '/register'" />
    <v-content class="grey lighten-4 mx-4 mb-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Navbar from '@/components/Navbar'

export default {
  name: 'App',
  components: { Navbar },
  data: () => ({
    //
  }),
};
</script>
