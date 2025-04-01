export default function Footer() {
    return (
        <footer className="bg-accent text-foreground py-6 mt-10 hidden lg:block">
            <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-4">
                <p className="text-sm">&copy; {new Date().getFullYear()} Все права защищены.</p>
                <nav className="flex space-x-4">
                    <a href="#" className="hover:underline">О нас</a>
                    <a href="#" className="hover:underline">Контакты</a>
                    <a href="#" className="hover:underline">Политика конфиденциальности</a>
                </nav>
            </div>
        </footer>
    );
}
