import { OpenAiService } from "../../services/openAI";
import { OpenWeatherAPI } from "../../services/openWeatherApi";
import OpenWeatherGeocodingAPI from "../../services/openWeatherGeocodingApi";
import { Utils } from "../../utils";
import { WeatherUseCase } from "../Weather/weatherUseCase";
import { ChatController } from "./chatController";
import { ChatUseCase } from "./chatUseCase";

// External Dependencies
const utils = Utils.getInstance();
const openAiService = new OpenAiService();
const openWeatherApi = OpenWeatherAPI.getInstance(utils);
const openWeatherGeocodingApi = OpenWeatherGeocodingAPI.getInstance(utils);

// Internal Dependencies
const weatherUseCase = new WeatherUseCase(openWeatherApi, openWeatherGeocodingApi);
const chatUseCase = new ChatUseCase(utils, openAiService, weatherUseCase);
const chatController = new ChatController(chatUseCase, utils);

export { chatController };
