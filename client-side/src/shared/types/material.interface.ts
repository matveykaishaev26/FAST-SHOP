export interface IMaterial {
  id: string;
  title: string;
}

export interface ITechnologyInput extends Pick<IMaterial, "title"> {}
