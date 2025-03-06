import { Checkbox } from "@/shared/components/ui/checkbox";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/components/ui/table";
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
          <TableCell>
            <Checkbox />
          </TableCell>
          {header.map((item, index) => (
            <TableHead key={index}>{item}</TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((item, index) => (
          <TableRow className="" key={index}>
            <TableCell className="w-[100px]">
              <Checkbox />
            </TableCell>
            {renderRow
              ? renderRow(item)
              : Object.values(item).map((value, i) => (
                  <TableCell key={i} className="font-medium">
                    {String(value)}
                  </TableCell>
                ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
