import { userStore } from '~/stores'

type UseIsAuthenticatedReturn = {
  isAuthenticated: boolean
}
export const useIsAuthenticated = (): UseIsAuthenticatedReturn => {
  const user = userStore((state) => state.user)

  return {
    isAuthenticated: !!user,
  }
}
