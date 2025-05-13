"use client";
import { useGetBasketCardsQuery, useDeleteFromBasketMutation } from "@/features/api/basketApi";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/components/ui/card";
import { useSearchParams } from "next/navigation";
import { IBasketCardItem } from "@/shared/types/card.interface";
import { Trash2 } from "lucide-react";
import Image from "next/image";
import PaginationControl from "@/shared/components/ui/PaginationControl";
import { Button } from "@/shared/components/ui/button";
import BasketQuantityChanger from "@/shared/components/Cards/BasketQuantityChanger";
import { useEffect, useRef, useState } from "react";
import { Checkbox } from "@/shared/components/ui/checkbox";
import { useRouter } from "next13-progressbar";
import { PUBLIC_URL } from "@/config/url.config";
import { usePlaceOrderMutation } from "@/features/api/orderApi";
import usePushToProductPage from "@/hooks/usePushToProductPage";
import { productApi } from "@/features/api/productApi";

const LIMIT = 120;

export default function Basket() {
  const params = useSearchParams();
  const page = params.get("page") || 1;
  const [mutate] = useDeleteFromBasketMutation();
  const [wholePrice, setWholePrice] = useState<number>(0);
  const [wholeQuantity, setWholeQuantity] = useState<number>(0);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [placeOrder, { isLoading: isOrderLoading }] = usePlaceOrderMutation();
  const router = useRouter()
  const initialized = useRef(false);
  const {
    data,
    isLoading: isBasketLoading,
    isFetching,
    error,
  } = useGetBasketCardsQuery({
    page: Number(page) || 1,
    limit: LIMIT,
  });
  const { items, totalPages, currentPage } = data || {};

  const handleCheckout = async () => {
    try {
      const filteredItems = items?.filter((item) => selectedItems.includes(item.id));
      const response = await placeOrder({
        items: filteredItems.map((item) => ({
          productVariantId: item.productVariantId,
          quantity: item.quantity,
          price: item.price,
          sizeId: item.size.id,
        })),
      }).unwrap();
      // console.log(confirmation);
      if (response.url) {
       router.push(response.url);
      } else {
        console.error("Stripe URL not найден");
      }
    } catch (e) {
      console.error("Ошибка при создании заказа:", e);
    }
  };
  const { pushToProductPage } = usePushToProductPage();
  useEffect(() => {
    if (data && !initialized.current) {
      setSelectedItems(data.items.map((item) => item.id));
      initialized.current = true;
    }
  }, [data]);

  useEffect(() => {
    if (data) {
      const filteredItems = data.items.filter((item) => selectedItems.includes(item.id));
      const priceSum = filteredItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
      const quantitySum = filteredItems.reduce((sum, item) => sum + item.quantity, 0);

      setWholePrice(priceSum);
      setWholeQuantity(quantitySum);
    }
  }, [data, selectedItems]);

  if (isBasketLoading || isFetching) {
    return <div className="text-center py-8 text-gray-500">Загрузка...</div>;
  }

  if (error) {
    return <div className="text-center py-8 text-red-500">Ошибка загрузки данных корзины</div>;
  }

  return (
    <div className="space-y-4">
      {data && (
        <>
          <div className="flex items-center gap-x-2">
            <Checkbox
              checked={data?.items?.length > 0 && selectedItems.length === data.items.length}
              onCheckedChange={(checked) => {
                if (checked) {
                  setSelectedItems(data.items.map((item) => item.id));
                } else {
                  setSelectedItems([]);
                }
              }}
            />
            <span>Выбрать все</span>
          </div>

          <div className="grid grid-cols-3 gap-x-5">
            <div className="space-y-4 col-span-2">
              {items?.map((item: IBasketCardItem) => (
                <Card key={item.id} className="grid grid-cols-3 shadow-none p-2 rounded-lg">
                  <div className="flex items-center gap-4 w-full md:w-auto">
                    <Checkbox
                      onCheckedChange={(checked) => {
                        setSelectedItems((prev) =>
                          checked ? [...prev, item.id] : prev.filter((id) => id !== item.id)
                        );
                      }}
                      checked={selectedItems.includes(item.id)}
                    />
                    <Image
                      onClick={() => pushToProductPage(item.productVariantId)}
                      width={100}
                      height={100}
                      src={item.image}
                      alt={item.title}
                      className="h-full object-cover rounded-md border cursor-pointer"
                    />
                    <div>
                      <CardHeader className="p-0 mb-2">
                        <span className="text-sm text-muted-foreground">{item.brand}</span>
                        <CardTitle
                          onClick={() => pushToProductPage(item.productVariantId)}
                          className="text-lg cursor-pointer font-semibold hover:text-primary"
                        >
                          {item.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="p-0 text-sm text-muted-foreground space-y-2">
                        <p>
                          <span className="font-medium">Размер:</span> {item.size.title}
                        </p>
                        <p>
                          <span className="font-medium">Цвет:</span> {item.colors.join(" / ")}
                        </p>
                        <Trash2
                          onClick={() =>
                            mutate({
                              productVariantId: item.productVariantId,
                              sizeId: item.size.id,
                            })
                          }
                          size={22}
                          className="text-muted-foreground cursor-pointer hover:text-destructive"
                        />
                      </CardContent>
                    </div>
                  </div>
                  <div className="flex items-center justify-center">
                    <BasketQuantityChanger
                      productVariantId={item.productVariantId}
                      sizeId={item.size.id}
                      initialQuantity={item.quantity}
                    />
                  </div>
                  <div className="flex items-center justify-center">
                    <p className="text-lg font-bold">{item.price.toLocaleString()} ₽</p>
                  </div>
                </Card>
              ))}
              <PaginationControl page={currentPage ?? 1} totalPages={totalPages ?? 1} />
            </div>

            <Card className="sticky w-full self-start flex items-center top-[calc(theme(spacing.mainHeader)+theme(spacing.pagePadding))]">
              <CardContent className="w-full space-y-2">
                <div className="font-bold text-2xl">Итого: {wholePrice.toLocaleString()} ₽</div>
                <div className="text-muted-foreground text-md">Количество: {wholeQuantity}</div>
                <Button disabled={isOrderLoading} onClick={handleCheckout} className="w-full">
                  Заказать
                </Button>
              </CardContent>
            </Card>
          </div>
        </>
      )}
    </div>
  );
}
