import { Repository } from 'typeorm';
import { Weather } from './weather.entity';
import { Injectable } from '@nestjs/common';

@Injectable()
export class WeatherRepository extends Repository<Weather> {
  async createWeather(weatherData: Partial<Weather>): Promise<Weather> {
    const weather = this.create(weatherData);
    return this.save(weather);
  }

  async findOneByLatLonAndPart(
    lat: number,
    lon: number,
    part: string,
  ): Promise<Weather | undefined> {
    return this.findOne({ where: { lat, lon, part } });
  }
}
