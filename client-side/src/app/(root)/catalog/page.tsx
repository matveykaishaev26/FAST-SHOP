import CatalogProvider from "./CatalogProvider";
type Props = {
  searchParams: Record<string, string | string[]>;
};
export default function Catalog({ searchParams }: Props) {
  return <CatalogProvider searchParams={searchParams} />;
}
