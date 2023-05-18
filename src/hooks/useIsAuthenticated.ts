import { userDataStore } from '@/stores'

export const useIsAuthenticated = () => {
  const user = userDataStore((state: any) => state.user)
  console.log({ user })
  return ({
    isAuthenticated: !!user,
    user,
  })
}
