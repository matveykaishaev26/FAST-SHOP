import { Button } from "@/shared/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { CheckCircle2, Link } from "lucide-react";

export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CheckCircle2 className="mx-auto text-success w-12 h-12" />
          <CardTitle className="text-2xl mt-2">Спасибо за заказ!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Мы получили ваш платёж. Скоро свяжемся с вами для подтверждения.</p>
          <Button asChild>
            <Link href="/">Вернуться на главную</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
