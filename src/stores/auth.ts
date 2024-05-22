import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { components } from '~/types'

export type Tokens = components['schemas']['UserWithTokensOutputDto']['tokens']

export type AuthStore = {
  tokens: Tokens | null
  setTokens: (tokens: Tokens) => void
  clearTokens: () => void
  logout: () => void
}

export const authStore = create<AuthStore>()(
  persist(
    (set) => ({
      tokens: null,
      setTokens: (tokens): void => set({ tokens }),
      clearTokens: (): void => set({ tokens: null }),
      logout: (): void => {
        set({ tokens: null })
        localStorage.removeItem('tokens')
      },
    }),
    {
      name: 'auth',
    }
  )
)
