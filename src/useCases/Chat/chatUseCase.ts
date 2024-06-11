import { IChatUseCaseResponseDTO } from "./chatDTO";
import { Utils } from "../../utils";

export class ChatUseCase {
  constructor(private readonly utils: Utils) {
    if (!this.utils) {
      throw new Error("Utils is required");
    }
  }

  public async execute(): Promise<IChatUseCaseResponseDTO> {
    return {
      statusCode: this.utils.HttpStatus.OK,
      data: {
        message: "Hello, World! from use case",
      },
    };
  }
}
