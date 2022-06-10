import { Request, Response } from 'express';

import { ImportCategoryUseCase } from './ImportCategoryUseCase';

class ImportCategoryController {
  private importCategoryUseCase: ImportCategoryUseCase;
  constructor(importCategoryUseCase: ImportCategoryUseCase) {
    this.importCategoryUseCase = importCategoryUseCase;
  }

  async handle(request: Request, response: Response): Promise<Response> {
    const { file } = request;

    await this.importCategoryUseCase.execute(file);
    return response.send();
  }
}
export { ImportCategoryController };
