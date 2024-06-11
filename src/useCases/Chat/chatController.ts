import { Request, Response } from "express";
import { ChatUseCase } from "./chatUseCase";

export class ChatController {
  constructor(private readonly chatUseCase: ChatUseCase) {
    if (this.chatUseCase.execute === undefined) {
      throw new Error("ChatUseCase instance is undefined");
    }
  }

  async handler(req: Request, res: Response): Promise<Response> {
    try {
      const { data, statusCode } = await this.chatUseCase.execute();
      return res.status(statusCode).json(data);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
