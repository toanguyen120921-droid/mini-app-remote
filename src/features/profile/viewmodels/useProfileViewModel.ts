import {useQuery} from "@tanstack/react-query";
import {useEffect, useState} from "react";
import {buildTmdbAvatarUrl, PROFILE_COPY} from "../models/profile.model";
import {ProfileScreenProps} from "../models/profile.types";
import {fetchTmdbAccountDetail} from "../services/tmdbAccount.service";
import {useProfileStore} from "../store/profileStore";

const DEFAULT_ACCOUNT_ID = "23007028";

export const useProfileViewModel = ({
  accountId = DEFAULT_ACCOUNT_ID,
  accessToken,
  onAuthMissingPress,
  onLoadComplete,
}: ProfileScreenProps) => {
  const {account, setAccount} = useProfileStore();

  // const [isLoading, setIsLoading] = useState(false);
  // const [error, setError] = useState<Error | null>(null);

  const {isLoading, error, data, refetch} = useQuery({
    queryKey: ["tmdb-account", accountId, accessToken],
    queryFn: () => {
      if (!accessToken) {
        onAuthMissingPress?.();
        throw new Error(PROFILE_COPY.missingTokenMessage);
      }
      return fetchTmdbAccountDetail(accountId, accessToken);
    },
  });

  // useEffect(() => {
  //   if (data) {
  //     setAccount(data);
  //     onLoadComplete?.();
  //   }
  // }, [data]);

  const loadAccountDetail = async () => {
    console.log("accessToken", accessToken);

    if (!accessToken) {
      onAuthMissingPress?.();
      return;
    }
    try {
      // setIsLoading(true);
      // setError(null);
      // HARDCODED MOCK TO AVOID AXIOS
      // const data = await fetchTmdbAccountDetail(accountId, accessToken);
      const data = {
        id: Number(accountId),
        name: "Mock User",
        username: "mockuser",
        avatar: {
          tmdb: {
            avatar_path: null,
          },
        },
      } as any;

      setAccount(data);
      onLoadComplete?.();
    } catch (err) {
      // setError(err as Error);
    } finally {
      // setIsLoading(false);
    }
  };

  return {
    account,
    accountId,
    avatarUrl: buildTmdbAvatarUrl(account),
    errorMessage:
      error instanceof Error ? error.message : error ? "Unknown error" : null,
    isLoading,
    loadAccountDetail,
  };
};
