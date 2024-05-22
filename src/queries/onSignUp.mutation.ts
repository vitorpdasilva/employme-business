import axios from 'axios'
import { GenericMutationHookResponse, components } from '~/types'
import { useMutation } from '@tanstack/react-query'
import { userStore, authStore } from '~/stores'
import { BASE_URL } from 'client'
import { useRouter } from 'next/router'

export type SignUpResponse = components['schemas']['UserWithTokensOutputDto']
export type SignUpInput = components['schemas']['SignUpDto']

export const onSignUp = (): GenericMutationHookResponse<SignUpResponse, SignUpInput> => {
  const { setUser } = userStore()
  const { setTokens } = authStore()
  const router = useRouter()
  const onSignUp = async ({ name, email, password }: SignUpInput): Promise<SignUpResponse> => {
    const input = { name, email, password, type: 'Company' }
    return axios.post(`${BASE_URL}/auth/sign-up`, input).then((res) => res.data)
  }

  const { isPending, mutate, error } = useMutation({
    mutationFn: onSignUp,
    mutationKey: ['/auth/sign-up'],
    onSuccess: (success) => {
      if (!success.userData && !success.tokens) {
        throw new Error('Something went wrong.')
      }
      setTokens(success.tokens)
      setUser(success.userData)
      router.push('/')
    },
  })

  return {
    loading: isPending,
    error,
    onCall: mutate,
  }
}
