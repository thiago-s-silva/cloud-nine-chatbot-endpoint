import { Request, Response } from "express";
import { ChatUseCase } from "./chatUseCase";

export class ChatController {
  constructor(private readonly chatUseCase: ChatUseCase) {
    if (this.chatUseCase.execute === undefined) {
      throw new Error("ChatUseCase instance is undefined");
    }
  }

  async handler(req: Request, res: Response): Promise<Response> {
    console.log("useCase instance:", this.chatUseCase.execute !== undefined);
    return res.status(200).json({ message: "alou" });
  }
}
