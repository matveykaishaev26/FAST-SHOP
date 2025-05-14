import { PROFILE_URL } from "@/config/url.config";
import { Button } from "@/shared/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { CheckCircle2 } from "lucide-react";
import Link from "next/link";

export default function ThankYouPage() {
  return (
    <div className="flex items-center justify-center min-h-[70vh] px-4">
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <CheckCircle2 className="mx-auto text-success w-12 h-12" />
          <CardTitle className="text-2xl mt-2">Спасибо за заказ!</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground mb-4">Мы получили ваш платёж!</p>
          <Link  href={PROFILE_URL.root()}>
            <Button>Принять</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
