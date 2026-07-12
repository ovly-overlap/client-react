import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../api/profile";

export function useProfile(userId) {
  const result = useQuery({
    queryKey: ["profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
    retry: false,
  });
  console.log("useProfile: ", result);
  return result;
}
