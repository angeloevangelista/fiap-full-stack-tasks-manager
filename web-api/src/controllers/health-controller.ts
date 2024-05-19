import { Request, Response } from 'express';

import packageJson from '../../package.json';

import { ApiResponse } from './shared';

class HealthController {
  public static handleCheckHealth(request: Request, response: Response) {
    const apiResponse: ApiResponse<any> = {
      success: true,
      data: {
        app: `${packageJson.name}@${packageJson.version}`,
        message: `Healthy - ${new Date().toUTCString()}`,
      },
    };

    return response.status(200).json(apiResponse);
  }
}

export { HealthController };
