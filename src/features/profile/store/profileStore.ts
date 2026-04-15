import {create} from 'zustand';
import {TmdbAccountDetail} from '../models/profile.model';


interface ProfileState {
  account: TmdbAccountDetail | null;
  setAccount: (account: TmdbAccountDetail | null) => void;
  clearAccount: () => void;
}
export const useProfileStore = create<ProfileState>(set => ({
  account: null,
  setAccount: account => set({account}),
  clearAccount: () => set({account: null}),
}));
