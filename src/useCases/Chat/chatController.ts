import { Request, Response } from "express";
import { ChatUseCase } from "./chatUseCase";
import { Utils } from "../../utils";

export class ChatController {
  constructor(private readonly chatUseCase: ChatUseCase, private readonly utils: Utils) {
    if (this.chatUseCase.execute === undefined) {
      throw new Error("ChatUseCase instance is undefined");
    }
  }

  async handler(req: Request, res: Response): Promise<Response> {
    try {
      // Get the message property from the body
      const { message } = req.body;

      // Refuse the request if the message is empty or undefined
      if (!message) {
        return res.status(this.utils.HttpStatus.BAD_REQUEST).json({ error: "The `message` body property is required" });
      }

      const { data, statusCode } = await this.chatUseCase.execute(message);

      return res.status(statusCode).json(data);
    } catch (error) {
      console.error("\n", error);
      return res.status(this.utils.HttpStatus.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
  }
}
