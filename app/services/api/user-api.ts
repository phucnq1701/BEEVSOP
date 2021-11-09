import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { GetUserBeehomeResult, GetUserResult, GetUsersResult } from "./api.types"
import { getGeneralApiProblem } from "./api-problem"

const API_PAGE_SIZE = 50

export class UserApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getUser(param): Promise<GetUsersResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeCRM/CardList`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const users = response.data.data

      return { kind: "ok", users }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getUserInfo(param): Promise<GetUserBeehomeResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/UserInfo`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const users = response.data.data

      return { kind: "ok", users }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
