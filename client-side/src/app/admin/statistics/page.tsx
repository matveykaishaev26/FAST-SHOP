'use client';


import { Card, CardContent, CardHeader, CardTitle } from '@/shared/components/ui/card';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';

const salesData = [
  { month: 'Янв', sales: 1200 },
  { month: 'Фев', sales: 2100 },
  { month: 'Мар', sales: 800 },
  { month: 'Апр', sales: 1600 },
  { month: 'Май', sales: 2500 },
  { month: 'Июн', sales: 2000 },
];

const categoryData = [
  { category: 'Кроссовки', count: 120 },
  { category: 'Туфли', count: 80 },
  { category: 'Ботинки', count: 45 },
  { category: 'Сандалии', count: 35 },
];

const brandData = [
  { name: 'Nike', value: 400 },
  { name: 'Adidas', value: 300 },
  { name: 'Puma', value: 200 },
  { name: 'Reebok', value: 100 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff7f50'];

export default function DashboardPage() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3 p-4">
      {/* Продажи по месяцам */}
      <Card className="col-span-1 md:col-span-2">
        <CardHeader>
          <CardTitle>Продажи по месяцам</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={salesData}>
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="sales" stroke="#8884d8" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Категории товаров */}
      <Card>
        <CardHeader>
          <CardTitle>Категории товаров</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={categoryData}>
              <XAxis dataKey="category" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Популярность брендов */}
      <Card>
        <CardHeader>
          <CardTitle>Популярные бренды</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={brandData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={90}
                label
              >
                {brandData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
