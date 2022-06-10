import { CategoriesRepository } from '../../repositories/implementations/CategoriesRepository';
import { ListCategoriesController } from './ListCategoriesController';
import { ListCategoriesUseCase } from './ListCategoriesUseCase';

export default (): ListCategoriesController => {
  const categoriesRepository = new CategoriesRepository();

  const createCategoryUseCase = new ListCategoriesUseCase(categoriesRepository);

  const listCategoriesController = new ListCategoriesController(
    createCategoryUseCase,
  );

  return listCategoriesController;
};
