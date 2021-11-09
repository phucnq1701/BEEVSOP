import { ApiResponse } from "apisauce"
import { Api } from "./api"
import { getGeneralApiProblem } from "./api-problem"
import { GetInvoiceResult } from "./api.types"

const API_PAGE_SIZE = 50

export class InvoiceApi {
  private api: Api

  constructor(api: Api) {
    this.api = api
  }

  async getInvoice(param): Promise<GetInvoiceResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/Debt`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const invoices = response.data.data

      return { kind: "ok", invoices }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async getInvoiceComplete(param): Promise<GetInvoiceResult> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/DebtComplete`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }

      const invoices = response.data.data

      return { kind: "ok", invoices }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }

  async createInvoice(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/PostResident`, param)
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

  async deleteInvoice(param): Promise<any> {
    try {
      // make the api call
      const response: ApiResponse<any> = await this.api.apisauce.post(`/DeleteResident`, param)
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
  
  async getInvoiceDetail(param): Promise<any> {
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
