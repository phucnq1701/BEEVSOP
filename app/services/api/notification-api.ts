import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetNotificationResult } from "./api.types"

const API_PAGE_SIZE = 50

export class NotificationApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getNotification(param): Promise<GetNotificationResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(
        `https://apibeehomecore.appbeesky.com/api/BeeLand/GetListNoti`,
        param,
      )

      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const notifs = response.data.data

      return { kind: "ok", notifs }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getDetailNotification(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/BeeCRM/NotificationDetail`, param)
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
