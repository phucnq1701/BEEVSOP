import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetWithdrawResult } from "./api.types"

const API_PAGE_SIZE = 50

export class WithdrawApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getWithdraw(param): Promise<GetWithdrawResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeCRM/LichSuTruDiem`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const withdraws = response.data.data

      return { kind: "ok", withdraws }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getPayin(param): Promise<GetWithdrawResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeCRM/LichSuTichDiem`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const withdraws = response.data.data

      return { kind: "ok", withdraws }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getDetailWithdraw(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/WithdrawDetail`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      return { kind: "ok", data: response.data.data }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
