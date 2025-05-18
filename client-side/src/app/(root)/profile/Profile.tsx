"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useProfile } from "@/hooks/useProfile";
import { Button } from "@/shared/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { MailIcon } from "lucide-react";
import Image from "next/image";
import { useGetOrdersQuery } from "@/features/api/orderApi";
import { IOrder } from "@/shared/types/order.interface";
import { Skeleton } from "@/shared/components/ui/Skeleton/Skeleton";
import { useEffect } from "react";
import { saveTokenStorage } from "@/services/auth/auth-token.service";

export default function Profile() {
  const { user, isLoading } = useProfile();
  const router = useRouter();
  const { data: orders, isLoading: isOrdersLoading } = useGetOrdersQuery();

  const isLoadingAll = isLoading || isOrdersLoading;
  const searchParams = useSearchParams();
  useEffect(() => {
    const accessToken = searchParams.get("accessToken");

    if (accessToken) {
      saveTokenStorage(accessToken);
    }
  }, [searchParams]);
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between gap-4">
          <div>
            <CardTitle className="text-xl">
              {isLoading ? <Skeleton className="h-6 w-40" /> : user?.name ?? "Нет имени"}
            </CardTitle>
            <div className="flex items-center text-sm text-muted-foreground gap-2 mt-1">
              {isLoading ? (
                <Skeleton className="h-10 w-10 rounded-full" />
              ) : (
                <Image
                  src={user?.picture || "/no-image.png"}
                  alt={"user-avatar"}
                  height={40}
                  width={40}
                  className="rounded-full"
                />
              )}
              <MailIcon className="w-4 h-4" />
              {isLoading ? <Skeleton className="h-4 w-32" /> : <span>{user?.email}</span>}
            </div>
          </div>
          <Button>Выйти</Button>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Мои заказы</h2>

        {isOrdersLoading ? (
          // Скелетон для заказов
          Array.from({ length: 2 }).map((_, idx) => (
            <Card key={idx} className="rounded-xl shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <Skeleton className="h-5 w-48" />
                  <Skeleton className="h-5 w-16" />
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {Array.from({ length: 2 }).map((_, i) => (
                  <div key={i} className="flex items-center gap-4">
                    <Skeleton className="w-16 h-16 rounded-md" />
                    <div className="flex flex-col gap-1">
                      <Skeleton className="h-4 w-40" />
                      <Skeleton className="h-4 w-24" />
                      <Skeleton className="h-4 w-32" />
                      <Skeleton className="h-4 w-28" />
                      <Skeleton className="h-4 w-24" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        ) : orders?.length === 0 ? (
          <div className="text-muted-foreground">Нет заказов</div>
        ) : (
          orders.map((order: IOrder) => (
            <Card key={order.id} className="rounded-xl shadow-sm">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle className="text-md">
                    Заказ #{order.id.slice(0, 8)} • {new Date(order.createdAt).toLocaleDateString()}
                  </CardTitle>
                  <span className="text-lg font-medium text-muted-foreground">{order.total} ₽</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                {order.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <Image
                      src={item.image || "/no-image.png"}
                      alt={item.title}
                      width={64}
                      height={64}
                      className="rounded-md object-cover"
                    />
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">{item.title}</span>
                      <span className="text-muted-foreground">Бренд: {item.brand}</span>
                      <span className="text-muted-foreground">Размер: {item.size.title}</span>
                      <span className="text-muted-foreground">Цвета: {item.colors.join(", ")}</span>
                      <span className="text-muted-foreground">
                        Кол-во: {item.quantity} × {item.price} ₽
                      </span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
