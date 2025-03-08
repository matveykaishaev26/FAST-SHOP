export interface ITechnology {
  id: string;
  title: string;
}

export interface ITechnologyInput extends Pick<ITechnology, "title"> {}
