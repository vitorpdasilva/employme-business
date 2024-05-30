import axios from 'axios'
import { GenericMutationHookResponse, components } from '~/types'
import { useMutation } from '@tanstack/react-query'
import { userStore, authStore } from '~/stores'
import { BASE_URL } from 'client'
import { enqueueSnackbar } from 'notistack'
import { useRouter } from 'next/router'

export type SignUpResponse = components['schemas']['UserWithTokensOutputDto']
export type SignUpInput = components['schemas']['RegisterUserInputDto']

export const useOnSignUp = (): GenericMutationHookResponse<SignUpResponse, SignUpInput> => {
  const { setUser } = userStore()
  const { setTokens } = authStore()
  const router = useRouter()
  const onSignUp = async ({ name, email, password, userType = 'Company' }: SignUpInput): Promise<SignUpResponse> => {
    try {
      return axios.post(`${BASE_URL}/auth/signup`, { name, email, password, userType }).then((res) => res.data)

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      console.error(error)
      throw new Error(error?.response?.data?.message ?? 'Something went wrong.')
    }
  }

  const { isPending, mutate, error } = useMutation({
    mutationFn: onSignUp,
    mutationKey: ['/auth/sign-up'],
    onSuccess: (success) => {
      if ((!success.userData && !success.tokens) || success.userData.userType !== 'Candidate') return
      setUser(success.userData)
      setTokens(success.tokens)
      router.push('/')
    },
    onError: (error) => {
      enqueueSnackbar(error.message, { variant: 'error' })
    },
  })

  return {
    loading: isPending,
    error,
    onCall: mutate,
  }
}
