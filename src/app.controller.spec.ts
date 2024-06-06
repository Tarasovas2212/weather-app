import { Test, TestingModule } from '@nestjs/testing';
import { WeatherService } from './weather/weather.service';
import { HttpModule } from '@nestjs/axios';
import { WeatherController } from './weather/weather.controller';
import { WeatherRepository } from './weather/weather.repository';
import { CreateWeatherDto } from './weather/create-weather.dto';

describe('WeatherService', () => {
  let service: WeatherService;
  let controller: WeatherController;
  let repository: WeatherRepository;

  const weatherData = {
    sunrise: 1622972193,
    sunset: 1623023652,
    temp: 25.6,
    feels_like: 26.2,
    pressure: 1013,
    humidity: 70,
    uvi: 6.48,
    wind_speed: 4.5,
  };

  const weatherEntity = {
    id: 1,
    lat: 0,
    lon: 0,
    part: 'current',
    data: weatherData,
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [WeatherController],
      providers: [WeatherService, WeatherRepository],
    }).compile();

    service = module.get<WeatherService>(WeatherService);
    controller = module.get<WeatherController>(WeatherController);
    repository = module.get<WeatherRepository>(WeatherRepository);
  });

  it('should create weather data', async () => {
    const createWeatherDto: CreateWeatherDto = {
      lat: 0,
      lon: 0,
      part: 'current',
    };

    jest.spyOn(service, 'fetchWeatherData').mockResolvedValue(weatherData);
    jest.spyOn(repository, 'create').mockReturnValue(weatherEntity);
    jest.spyOn(repository, 'save').mockResolvedValue(weatherEntity);

    const result = await controller.create(createWeatherDto);

    expect(result).toEqual(weatherEntity);
    expect(service.fetchWeatherData).toHaveBeenCalledWith(0, 0, 'current');
    expect(repository.create).toHaveBeenCalledWith({
      lat: 0,
      lon: 0,
      part: 'current',
      data: weatherData,
    });
    expect(repository.save).toHaveBeenCalledWith(weatherEntity);
  });

  it('should find weather data by lat, lon, and part', async () => {
    jest.spyOn(repository, 'findOne').mockResolvedValue(weatherEntity);

    const result = await controller.findOne(0, 0, 'current');

    expect(result).toEqual(weatherEntity);
    expect(repository.findOne).toHaveBeenCalledWith({
      where: { lat: 0, lon: 0, part: 'current' },
    });
  });
});
