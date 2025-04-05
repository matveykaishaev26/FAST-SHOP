
import { Button } from "@/shared/components/ui/button";
import { Separator } from "@radix-ui/react-dropdown-menu";
import { 
  Facebook, 
  Instagram, 
  Twitter, 
  Mail, 
  Phone, 
  MapPin, 
  Clock 
} from "lucide-react";
import { Input } from "@/shared/components/ui/input";
export default function Footer() {
  return (
    <footer className="bg-background border-t border-muted hidden lg:block">
      <div className="container mx-auto px-4 py-12">
        {/* Основные разделы */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          
          {/* Контакты */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Контакты</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2">
                <MapPin className="h-5 w-5 text-muted-foreground" />
                <span>г. Москва, ул. Обувная, 12</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-5 w-5 text-muted-foreground" />
                <span>+7 (495) 123-45-67</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <span>info@fastshop.ru</span>
              </li>
              <li className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-muted-foreground" />
                <span>Ежедневно 10:00 - 22:00</span>
              </li>
            </ul>
          </div>

          {/* Меню */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Магазин</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:underline">Каталог</a></li>
              <li><a href="#" className="hover:underline">Новинки</a></li>
              <li><a href="#" className="hover:underline">Распродажа</a></li>
              <li><a href="#" className="hover:underline">Бренды</a></li>
              <li><a href="#" className="hover:underline">О нас</a></li>
            </ul>
          </div>

          {/* Помощь */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Помощь</h3>
            <ul className="space-y-3">
              <li><a href="#" className="hover:underline">Доставка и оплата</a></li>
              <li><a href="#" className="hover:underline">Возврат и обмен</a></li>
              <li><a href="#" className="hover:underline">Размеры</a></li>
              <li><a href="#" className="hover:underline">FAQ</a></li>
              <li><a href="#" className="hover:underline">Контакты</a></li>
            </ul>
          </div>

          {/* Рассылка */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Подписка</h3>
            <p className="text-muted-foreground mb-4">
              Подпишитесь на новости и получите скидку 10% на первый заказ!
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Ваш email" 
                className="bg-muted/50 border-muted-foreground/30"
              />
              <Button variant="secondary">Подписаться</Button>
            </div>
          </div>
        </div>

        <Separator className="my-6 bg-muted-foreground/20" />

        {/* Нижняя часть */}
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} FastShop. Все права защищены.
          </div>
          
          <div className="flex items-center gap-4">
            <a href="#" aria-label="Facebook">
              <Facebook className="h-5 w-5 hover:text-primary transition-colors" />
            </a>
            <a href="#" aria-label="Instagram">
              <Instagram className="h-5 w-5 hover:text-primary transition-colors" />
            </a>
            <a href="#" aria-label="Twitter">
              <Twitter className="h-5 w-5 hover:text-primary transition-colors" />
            </a>
          </div>

          <div className="flex gap-4 text-sm">
            <a href="#" className="hover:underline">Политика конфиденциальности</a>
            <a href="#" className="hover:underline">Условия использования</a>
          </div>
        </div>
      </div>
    </footer>
  );
}