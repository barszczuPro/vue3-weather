<template>
  <div class="container">
    <template v-for="(el, idx) in currentWeatherTemplate">
      <template v-if="el.infoType">
        <div class="element" :key="idx">
          <h3>{{ el.label }}</h3>
          <img :src="el.img" />
        </div>
        <hr :key="idx" />
      </template>
      <template v-else>
        <div class="element" :key="idx">
          <p>{{ el.label }}</p>
          <p>{{ el.value }}</p>
        </div>
        <hr :key="idx" />
      </template>
    </template>
    <button @click="$emit('reset')">Resetuj</button>
  </div>
</template>
<script lang="ts">
import { computed, defineComponent } from "vue";
import { WeatherResponse } from "@/api.ts";

export default defineComponent({
  name: "WeatherComponent",
  props: {
    currentWeather: {
      type: Object as () => WeatherResponse,
      require: true,
    },
  },
  setup(props) {
    const currentWeatherTemplate = computed(() => [
      {
        infoType: true,
        label: `Miejscowość: ${props.currentWeather?.name} / ${props.currentWeather?.sys.country}`,
        img: `http://openweathermap.org/img/wn/${props.currentWeather?.weather[0].icon}@2x.png`,
      },
      {
        label: "Temperatura",
        value: `${props.currentWeather?.main.temp} \u2103`,
      },
      {
        label: "Wilgotność",
        value: `${props.currentWeather?.main.humidity} %`,
      },
      {
        label: "Niebo",
        value: props.currentWeather?.weather[0].description,
      },
    ]);

    return { currentWeatherTemplate };
  },
});
</script>
<style lang="scss">
.container {
  .element {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
  }
  hr {
    border: 1px solid black;
    width: 100%;
  }
}
</style>
