import { isAxiosError } from "axios"
import api from "@/lib/axios"
import { UserLoginFormData } from "@/types/index"


export async function loginUser({ formData }: { formData: UserLoginFormData }) {
    try {
        const { data } = await api.post<{ accessToken: string }>('/auth/login', formData)
        return data
    } catch (error) {
      console.log('loginUserError: ', error)
        if (isAxiosError(error) && error.response) {
            throw new Error(error.response.data.message)
        }
    }
}

export async function logOutUser() {
  try {
      const { data } = await api.post<{ accessToken: string }>('/auth/logout')
      return data
  } catch (error) {
      if (isAxiosError(error) && error.response) {
          throw new Error(error.response.data.message)
      }
  }
}