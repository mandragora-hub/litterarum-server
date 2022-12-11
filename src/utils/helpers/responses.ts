import { Response } from "express";
import { HttpMessageHandler } from '~/types/common';

type ResponseMessage = HttpMessageHandler & Partial<{
  data: string
}>

const serverResponse = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  sendSuccess: (res: Response, message: HttpMessageHandler, data: any = null) => {
    const responseMessage: ResponseMessage = {
      code: message.code ? message.code : 500,
      success: message.success,
      message: message.message,
    };
    if (data) {
      responseMessage.data = data;
    }
    return res.status(message.code).json(responseMessage);
  },
  sendError: (res: Response, error: HttpMessageHandler) => {
    const responseMessage: ResponseMessage = {
      code: error.code ? error.code : 500,
      success: false,
      message: error.message,
    };
    return res.status(error.code ? error.code : 500).json(responseMessage);
  },
};

export default serverResponse;
