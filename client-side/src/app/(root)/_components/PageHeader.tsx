interface IPageHeader {
  header: string;
  cardsCount?: number;
}

export default function PageHeader({ header, cardsCount }: IPageHeader) {
  return (
    <h1 className="font-medium  mb-10 sm:text-4xl">
      <span className="text-2xl uppercase font-medium tracking-widest sm:text-4xl">{header}</span>
      <span className="text-[12px] text-muted-foreground sm:text-[16px]">
        {" "}
        {cardsCount !== 0  && cardsCount + " товаров"}{" "}
      </span>
    </h1>
  );
}
