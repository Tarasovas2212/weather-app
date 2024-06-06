import { Controller, Post, Get, Body, Query } from '@nestjs/common';
import { WeatherService } from './weather.service';
import { CreateWeatherDto } from './create-weather.dto';
import { WeatherRepository } from './weather.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { UseInterceptors } from '@nestjs/common';
import { ResponseFormatInterceptor } from './response-format.interceptor';

@Controller('weather')
export class WeatherController {
  constructor(
    private readonly weatherService: WeatherService,
    @InjectRepository(WeatherRepository)
    private readonly weatherRepository: WeatherRepository,
  ) {}

  @Post()
  async create(@Body() createWeatherDto: CreateWeatherDto) {
    const data = await this.weatherService.fetchWeatherData(
      createWeatherDto.lat,
      createWeatherDto.lon,
      createWeatherDto.part,
    );

    const weather = this.weatherRepository.create({
      lat: createWeatherDto.lat,
      lon: createWeatherDto.lon,
      part: createWeatherDto.part,
      data,
    });

    return this.weatherRepository.save(weather);
  }

  @UseInterceptors(ResponseFormatInterceptor)
  @Get()
  async findOne(
    @Query('lat') lat: number,
    @Query('lon') lon: number,
    @Query('part') part: string,
  ) {
    return this.weatherRepository.findOne({ where: { lat, lon, part } });
  }
}
