<template>
  <div class="container">
    <div class="container" v-if="!state.isProcess">
      <h1>Sprawdź pogode:</h1>
      <input
        v-model="state.search"
        placeholder="Podaj nazwe miasta..."
      /><button @click="fetchWeather">Sprawdź pogode</button>
    </div>
    <div class="error" v-if="state.error">Nie udało się pobrać danych</div>
    <div class="error" v-if="state.geolocationError">
      Nie udało się pobrać danych na podstawie lokalizacji
    </div>
    <div class="loader" v-if="state.isProcess">
      <div class="loader_spinner"></div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  getCurrentWeatherByCity,
  getCurrentWeatherByGeographicCoordinates,
} from "@/api";
import { defineComponent, reactive, SetupContext } from "vue";

export default defineComponent({
  name: "SearchComponent",
  emits: "updateSearch",
  setup(_, { emit }: SetupContext) {
    const state = reactive({
      search: "",
      error: false,
      geolocationError: false,
      isProcess: false,
    });
    const fetchWeather = async () => {
      state.error = false;
      state.isProcess = true;
      try {
        await getCurrentWeatherByCity(state.search).then(({ data }) => {
          emit("update-search", data);
        });
      } catch (e) {
        state.error = true;
        console.warn(e);
      } finally {
        state.isProcess = false;
      }
    };
    const getLocation = async () => {
      state.error = false;
      state.geolocationError = false;
      state.isProcess = true;
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async ({ coords }) => {
            const payload = { lat: coords.latitude, lon: coords.longitude };
            try {
              await getCurrentWeatherByGeographicCoordinates(payload).then(
                ({ data }) => {
                  emit("update-search", data);
                }
              );
            } catch (e) {
              state.error = true;
              console.warn(e);
            } finally {
              state.isProcess = false;
            }
          },
          (error) => {
            state.geolocationError = true;
            state.isProcess = false;
            console.log(
              "Nie masz uprawnień do sprawdzania geolokalizacji",
              error
            );
          }
        );
      } else {
        console.log("Twoja przeglądarka nie wspiera geolokalizacji");
      }
    };
    getLocation();
    return { state, fetchWeather, getLocation };
  },
});
</script>
<style lang="scss">
.error {
  background: DarkRed;
  color: #fff;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
}
.container {
  h1 {
    text-transform: uppercase;
  }
  input {
    width: 100%;
    padding: 12px 20px;
    margin: 8px 0;
    display: inline-block;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-sizing: border-box;
  }
}
.loader_spinner {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background: DarkSalmon;
  animation: blinker 1s linear infinite;
}
@-moz-keyframes blinker {
  50% {
    opacity: 0;
  }
}
@-webkit-keyframes blinker {
  50% {
    opacity: 0;
  }
}
@-o-keyframes blinker {
  50% {
    opacity: 0;
  }
}
@keyframes blinker {
  50% {
    opacity: 0;
  }
}
</style>
