export interface ICategory {
  id: string;
  title: string;
}

export interface ICategoryInput extends Pick<ICategory, "title"> {}
