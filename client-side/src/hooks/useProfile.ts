import { useGetProfileQuery } from "@/features/api/userApi";
export function useProfile() {
  const { data: user, isLoading, error } = useGetProfileQuery();

  return {
    user,
    isLoading,
    error,
  };
}
