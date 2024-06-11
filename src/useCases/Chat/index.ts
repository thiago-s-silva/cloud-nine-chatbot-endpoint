import { OpenWeatherAPI } from "../../services/openWeatherApi";
import OpenWeatherGeocodingAPI from "../../services/openWeatherGeocodingApi";
import { Utils } from "../../utils";
import { ChatController } from "./chatController";
import { ChatUseCase } from "./chatUseCase";

const utils = Utils.getInstance();
const openWeatherGeocodingApi = OpenWeatherGeocodingAPI.getInstance(utils);
const openWeatherApi = OpenWeatherAPI.getInstance(utils);
const chatUseCase = new ChatUseCase(utils, openWeatherGeocodingApi, openWeatherApi);
const chatController = new ChatController(chatUseCase);

export { chatController };
