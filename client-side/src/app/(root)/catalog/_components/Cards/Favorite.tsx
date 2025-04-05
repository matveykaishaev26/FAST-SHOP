import { Heart } from "lucide-react";

interface IFavoriteProps {
  className?: string;
}
export default function Favorite({ className }: IFavoriteProps) {
  return (
    <div
      className={`z-10 transition-all cursor-pointer absolute top-2 right-2 bg-background shadow-md p-2 rounded-full group/heart-light lg:opacity-0 lg:group-hover/heart:opacity-100 ${
        className ? className : ""
      }`}
    >
      <Heart className="text-muted-foreground group-hover/heart-light:text-primary" size={18} />
    </div>
  );
}
