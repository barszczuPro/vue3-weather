<template>
  <div class="weather_container">
    <weather-component
      v-if="currentWeather"
      :current-weather="currentWeather"
      @reset="resetWeather"
    />
    <search-component v-else @update-search="setCurrentWeather" />
  </div>
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent, ref } from "vue";
import { WeatherResponse } from "@/api.ts";

export default defineComponent({
  name: "App",
  components: {
    SearchComponent: defineAsyncComponent(
      () => import("@/components/SearchComponent.vue")
    ),
    WeatherComponent: defineAsyncComponent(
      () => import("@/components/WeatherComponent.vue")
    ),
  },
  setup() {
    const currentWeather = ref<WeatherResponse | null>(null);
    const setCurrentWeather = (payload: WeatherResponse) => {
      currentWeather.value = payload;
    };
    const resetWeather = () => {
      currentWeather.value = null;
    };
    return { currentWeather, setCurrentWeather, resetWeather };
  },
});
</script>

<style lang="scss">
@import url("https://fonts.googleapis.com/css2?family=Poppins:wght@300&display=swap");
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
body {
  font-family: "Poppins", sans-serif;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  .container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
}
button {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  cursor: pointer;
}
.weather_container {
  width: 60vw;
  height: 60vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background: AntiqueWhite;
  border-radius: 10px;
  box-shadow: 1px 1px 5px Bisque;
  padding: 20px;
}
</style>
