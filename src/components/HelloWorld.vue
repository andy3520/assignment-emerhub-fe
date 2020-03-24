<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h3 class="text-xl font-medum">Tailwind Cards</h3>
    <button v-on:click='isOpen = !isOpen'>Open/Close {{isOpen}}</button>
    <VacationCard
  img="https://images.unsplash.com/photo-1452784444945-3f422708fe5e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=512&q=80"
  imgAlt="Beach in Cancun"
  eyebrow="Private Villa"
  title="Relaxing All-Inclusive Resort in Cancun"
  pricing="$299 USD per night"
  url="/vacations/cancun"
  v-show="isOpen"
/>
  </div>
</template>

<script>
import VacationCard from './VacationCard.vue'

export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data: function() {
    return{
      isOpen: false
      }
    },

  components: {
    VacationCard,
  }
}
</script>
