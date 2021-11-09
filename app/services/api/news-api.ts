import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GeBeehomeNotiResult, GetNewsResult } from "./api.types"

const API_PAGE_SIZE = 50

export class NewsApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getNews(param): Promise<GetNewsResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeCRM/News`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const news = response.data.data

      return { kind: "ok", news }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getBeehomeNews(param): Promise<GeBeehomeNotiResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/Notification`, param)

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const news = response.data.data

      return { kind: "ok", news }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getDetailNews(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeCRM/NewsDetail`, param)
      console.log(response)
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

  async getDetailBeehomeNews(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/NotificationDetail`, param)
      console.log(response)
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
