import axios, { AxiosResponse } from 'axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherService {
  async fetchWeatherData(lat: number, lon: number, part: string): Promise<any> {
    const url = `https://api.openweathermap.org/data/3.0/onecall?lat=${lat}&lon=${lon}&exclude=${part}&appid=${Math.floor(Math.random() * 10000).toString()}`;

    try {
      const response: AxiosResponse<any> = await axios.get(url);

      const weatherData = {
        sunrise: response.data.current.sunrise,
        sunset: response.data.current.sunset,
        temp: response.data.current.temp,
        feels_like: response.data.current.feels_like,
        pressure: response.data.current.pressure,
        humidity: response.data.current.humidity,
        uvi: response.data.current.uvi,
        wind_speed: response.data.current.wind_speed,
      };

      return weatherData;
    } catch (error) {
      console.log(error.message);
      throw new Error('Failed to fetch weather data');
    }
  }
}
