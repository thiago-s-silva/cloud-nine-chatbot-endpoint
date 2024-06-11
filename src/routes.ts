import { Router, Request, Response } from "express";

const router = Router();

router.get("/api/v1", (req: Request, res: Response) => {
  return res.send("Hello World!");
});

export { router };
