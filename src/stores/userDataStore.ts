import { UserType } from '@/types'
import { create } from 'zustand'
import { persist } from 'zustand/middleware'

type Tokens = {
  accessToken: string;
  refreshToken: string;
}

export const userDataStore = create(
  persist(
    (set) => ({
      user: null,
      setUser: (user: UserType | null, tokens: Tokens) => {
        set({ user, tokens })
      },
    }),
    {
      name: 'user',
    },
  ),
)
