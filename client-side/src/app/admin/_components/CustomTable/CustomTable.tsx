import { Checkbox } from "@/shared/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
import { Trash2, PenLine } from "lucide-react";
interface ITableProps<T> {
  header: string[];
  data: T[];
  renderRow?: (item: T) => React.ReactNode;
}

export function CustomTable<T extends Record<string, any>>({ header, data, renderRow }: ITableProps<T>) {
  return (
    <Table>
      <TableHeader className="bg-muted/70">
        <TableRow>
          {header.map((item, index) => (
            <TableHead key={index}>{item}</TableHead>
          ))}
            <TableHead>Удалить</TableHead>
            <TableHead>Изменить</TableHead>

        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow className="" key={index}>
            {renderRow
              ? renderRow(item)
              : Object.values(item).map((value, i) => (
                  <TableCell key={i} className="font-medium">
                    {String(value)}
                  </TableCell>
                ))}
            <TableCell>
              <Trash2 className="text-destructive cursor-pointer" size={20} />
            </TableCell>
            <TableCell>
              <PenLine className="text-blue-500 cursor-pointer" size={20} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
