import {tmdbAxiosClient} from "../../../core/http/axiosClient";
import {TmdbAccountDetail} from "../models/profile.model";

export const fetchTmdbAccountDetail = async (
  accountId: string | number,
  accessToken: string,
): Promise<TmdbAccountDetail> => {
  const {data} = await tmdbAxiosClient.get<TmdbAccountDetail>(
    `/account/${accountId}`,
    {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    },
  );
  return data;
};
