import ForgotPasswordEmailService from '@modules/users/services/ForgotPasswordEmailService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class ForgotPasswordController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { email } = request.body;
    const forgotPasswordService = container.resolve(ForgotPasswordEmailService);

    await forgotPasswordService.execute({ email });

    return response.status(204).json();
  }
}
