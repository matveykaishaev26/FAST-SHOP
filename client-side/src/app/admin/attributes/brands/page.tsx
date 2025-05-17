// "use client";
// import { useGetBrandsQuery } from "@/features/api/brandApi";
// import { IGetBrandsResponse } from "@/shared/types/brand.interface";
// import { useSearchParams } from "next/navigation"; // 👈 ДЛЯ URL

// import Loading from "@/shared/components/ui/Loading/Loading";
// import PaginationControl from "@/shared/components/ui/PaginationControl";
// import { useEffect } from "react";
// import { CustomTable } from "../../_components/CustomTable/CustomTable";

// const LIMIT = 5; // Количество элементов на странице

// export default function BrandsList() {
//   const searchParams = useSearchParams();
//   const page = Number(searchParams.get("page")) || 1;

//   const header = ["Название"];
// const { data, isLoading } = useGetBrandsQuery({ page, limit: LIMIT });

//   const totalItems = (data as IGetBrandsResponse)?.total || 0; // Количество всех брендов



//   return (
//     <div className="space-y-4">
//       {isLoading ? (
//         <div className="flex justify-center">
//           <Loading loading={isLoading} />
//         </div>
//       ) : (
//         <>
//           <CustomTable header={header} data={data?.brands.map((brand) => ({ title: brand.title })) || []} />
//           <PaginationControl page={page} totalPages={totalItems}  />
//         </>
//       )}
//     </div>
//   );
// }


export default function Page() {
  return (
    <div></div>
  );
}