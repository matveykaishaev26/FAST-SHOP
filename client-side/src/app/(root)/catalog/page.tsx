import { Button } from "@/shared/components/ui/button";
import Filters from "./_components/Filters/Filters";
import FiltersSheet from "./_components/Filters/FiltersSheet";
export default function Catalog() {
  return (
    <div className="h-full">
      <h2 className="text-4xl font-medium tracking-widest mb-10">КАТАЛОГ</h2>
      <div className="w-full flex flex-row gap-x-10">
        <Filters className="w-[350px] hidden lg:block" />
        <div className="w-full space-y-5">
          <div className="flex justify-between items-center  lg:hidden">
            <div>asdasdasd</div>
            <FiltersSheet />
          </div>
          <div className="bg-blue-400 w-full">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quaerat ratione quae dolorum quo atque
            eveniet alias aspernatur, voluptas ea excepturi recusandae laudantium cum, animi maiores nesciunt unde ipsum
            dignissimos?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus debitis natus quam
            consectetur at illo expedita magnam cumque necessitatibus eius atque in quae veniam fugiat magni, distinctio
            aliquam dicta esse.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eaque
            perspiciatis placeat! Vero in, illo perferendis corrupti exercitationem architecto qui dolorum earum
            repudiandae soluta perspiciatis eum, error rem accusantium aut!Lorem Lorem ipsum dolor sit amet consectetur
            adipisicing elit. Aperiam quas beatae tenetur exercitationem quasi architecto quos porro, error rerum labore
            velit omnis sunt dolorum minus non sed debitis sapiente libero!
          </div>
        </div>
      </div>
    </div>
  );
}
