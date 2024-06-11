import { Router } from "express";
import { chatController } from "./useCases/Chat";

const router = Router();

// Chat
router.post("/api/v1/chat", (req, res) => {
  return chatController.handler(req, res);
});

// Print all router route endpoints
console.log("Routes:");
router.stack.forEach((layer) => {
  if (layer.route) {
    const methods = Object.keys(layer.route.patch).join(", ");
    const path = layer.route.path;
    console.log(`  ${methods} ${path}`);
  }
});

export { router };
