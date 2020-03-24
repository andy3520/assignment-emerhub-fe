<template>
<div class="min-h-screen bg-gray-100">
  <NavBar />
  <div class="py-10">
    <main>
      <div class="max-w-7xl mx-auto sm:px-6 lg:px-8">
        <!-- Replace with your content -->
        <router-view></router-view>
        <!-- /End replace -->
      </div>
    </main>
  </div>
</div>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {
    NavBar,
  },
  data: function() {
    return {
    }
  },
}
</script>
