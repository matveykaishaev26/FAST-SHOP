import { PUBLIC_URL } from "@/config/url.config";
import { useRouter } from "next13-progressbar";

export default function usePushToProductPage() {
  const router = useRouter();

  const pushToProductPage = (id: string) => {
    router.push(PUBLIC_URL.catalog(`/${id}`));
  };

  return { pushToProductPage };
}
