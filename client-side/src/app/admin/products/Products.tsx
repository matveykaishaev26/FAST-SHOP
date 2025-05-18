"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/shared/components/ui/card";
import { TableCaption, TableHeader, TableRow, TableHead, TableBody, TableCell } from "@/shared/components/ui/table";
import { Table } from "lucide-react";



type Sneaker = {
  id: number;
  name: string;
  brand: string;
  price: number;
  inStock: boolean;
};

const sneakers: Sneaker[] = [
  { id: 1, name: "Nike Air Max 90", brand: "Nike", price: 119.99, inStock: true },
  { id: 2, name: "Adidas Ultraboost", brand: "Adidas", price: 149.99, inStock: false },
  { id: 3, name: "Puma RS-X", brand: "Puma", price: 99.99, inStock: true },
  { id: 4, name: "New Balance 990v5", brand: "New Balance", price: 174.99, inStock: true },
];

export default function SneakersTable() {
  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle>Список кроссовок</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableCaption>Актуальный список моделей кроссовок</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Название</TableHead>
              <TableHead>Бренд</TableHead>
              <TableHead>Цена</TableHead>
              <TableHead className="text-center">В наличии</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sneakers.map((sneaker) => (
              <TableRow key={sneaker.id}>
                <TableCell>{sneaker.name}</TableCell>
                <TableCell>{sneaker.brand}</TableCell>
                <TableCell>{sneaker.price.toFixed(2)} ₽</TableCell>
                <TableCell className="text-center">
                  {sneaker.inStock ? "✅" : "❌"}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
