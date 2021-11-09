import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetRequestTypeResult } from "./api.types"

const API_PAGE_SIZE = 50

export class RequestTypeApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getRequestType(param): Promise<GetRequestTypeResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/RequestType`, param)
      console.log(response)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const requestTypes = response.data.data

      return { kind: "ok", requestTypes }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
