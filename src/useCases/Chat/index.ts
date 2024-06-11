import { Utils } from "../../utils";
import { ChatController } from "./chatController";
import { ChatUseCase } from "./chatUseCase";

const utils = Utils.getInstance();
const chatUseCase = new ChatUseCase(utils);
const chatController = new ChatController(chatUseCase);

export { chatController };
