import { Heart } from "lucide-react";

export default function FavoriteComponent() {
  return (
    <div className={`border exclude-hover z-20 transition-all cursor-pointer group/favorite-light  bg-background shadow-md p-2 rounded-full  `}>
      {" "}
      <Heart className={`transition-colors  group-hover/favorite-light:text-primary`} size={18} />
    </div>
  );
}
