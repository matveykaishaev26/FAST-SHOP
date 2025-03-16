import BrandFilter from "./BrandFilter";
import CategoryFilter from "./CategoryFilter";
import ColorFilter from "./ColorFilter";
import GenderFilter from "./GenderFilter";
import MaterialFilter from "./MaterialFilter";
import PriceFilter from "./PriceFilter";
import SizeFilter from "./SizeFilter";
import StyleFilter from "./StyleFilter";
export default function Filters() {
  return (
    <div className="w-[350px] space-y-5">
      <PriceFilter />
      <ColorFilter />
      <BrandFilter />
      <SizeFilter />
      <CategoryFilter />
      <GenderFilter />
      <MaterialFilter />
      <StyleFilter />
    </div>
  );
}
