import Filters from "./_components/Filters/Filters";
export default function Catalog() {
  return (
    <div className="space-y-5 h-full">
      <h2 className="text-4xl font-medium tracking-widest">КАТАЛОГ</h2>
      <div className="w-full flex flex-row gap-x-10">
        <Filters />
        <div className="bg-blue-400 w-full">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quaerat ratione quae dolorum quo atque eveniet
          alias aspernatur, voluptas ea excepturi recusandae laudantium cum, animi maiores nesciunt unde ipsum
          dignissimos?Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus debitis natus quam
          consectetur at illo expedita magnam cumque necessitatibus eius atque in quae veniam fugiat magni, distinctio
          aliquam dicta esse.lorem Lorem ipsum dolor sit amet consectetur adipisicing elit. Mollitia eaque perspiciatis
          placeat! Vero in, illo perferendis corrupti exercitationem architecto qui dolorum earum repudiandae soluta
          perspiciatis eum, error rem accusantium aut!Lorem Lorem ipsum dolor sit amet consectetur adipisicing elit.
          Aperiam quas beatae tenetur exercitationem quasi architecto quos porro, error rerum labore velit omnis sunt
          dolorum minus non sed debitis sapiente libero!
        </div>
      </div>
    </div>
  );
}
