import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetRequestResult, GetRequestStatusResult } from "./api.types"

const API_PAGE_SIZE = 50

export class RequestApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getRequest(param): Promise<GetRequestResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/GetRequest`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const requests = response.data.data

      return { kind: "ok", requests }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getRequestStatus(param): Promise<GetRequestStatusResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeHomeAdmin/RequestStatus`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const requests = response.data.data

      return { kind: "ok", requests }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async createRequest(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/PostRequest`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const message = response.data.message

      return { kind: "ok", message }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
  
  async getRequestDetail(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/GetTaskProcess`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const requests = response.data.data

      return { kind: "ok", requests }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

}
