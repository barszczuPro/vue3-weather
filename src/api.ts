import axios, { AxiosInstance, AxiosPromise } from "axios";

const API_URL = "https://api.openweathermap.org/data/2.5/";
const API_ID = "66bb0f201c78a6afdac0e8c752a5b16d";

export interface WeatherResponse {
  coord: Coord;
  weather: Array<WeatherItem>;
  base: string;
  main: { [key: string]: number };
  visibility: number;
  wind: Wind;
  clouds: Clouds;
  dt: number;
  sys: Sys;
  id: number;
  name: string;
  cod: number;
}
export interface Coord {
  lon: number;
  lat: number;
}
export interface Sys {
  type: number;
  id: number;
  message: number;
  country: string;
  sunrise: number;
  sunset: number;
}
export interface WeatherItem {
  id: number;
  main: string;
  description: string;
  icon: string;
}
export interface Wind {
  speed: number;
  deg: number;
}
export interface Clouds {
  all: number;
}
const api: AxiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  params: {
    appid: API_ID,
    lang: "PL",
    units: "metric",
  },
});
function getCurrentWeatherByCity(city: string): AxiosPromise<WeatherResponse> {
  return api.get("weather", {
    params: {
      q: city,
    },
  });
}
function getCurrentWeatherByGeographicCoordinates(
  lat: string,
  lon: string
): AxiosPromise<WeatherResponse> {
  return api.get("weather", {
    params: {
      lat,
      lon,
    },
  });
}

export { getCurrentWeatherByCity, getCurrentWeatherByGeographicCoordinates };
