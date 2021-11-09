import { ApisauceInstance, create, ApiResponse } from "apisauce"
import { getGeneralApiProblem } from "./api-problem"
import { ApiConfig, DEFAULT_API_CONFIG } from "./api-config"
import * as Types from "./api.types"

/**
 * Manages all requests to the API.
 */
export class Api {
  /**
   * The underlying apisauce instance which performs the requests.
   */
  apisauce: ApisauceInstance

  /**
   * Configurable options.
   */
  config: ApiConfig

  /**
   * Creates the api.
   *
   * @param config The configuration to use.
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.config = config
  }

  /**
   * Sets up the API.  This will be called during the bootup
   * sequence and will happen before the first React component
   * is mounted.
   *
   * Be as quick as possible in here.
   */
  setup() {
    // construct the apisauce instance
    this.apisauce = create({
      baseURL: this.config.url,
      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
        "x-api-key": "dtOevEfTqTh0fV7CHpbFtp3omZ7yZGx1",
      },
    })
  }

  async uploadImage(CompanyCode, param): Promise<any> {
    try {
      // make the api call
      this.apisauce.setHeaders({
        CompanyCode,
        Type: "YeuCau",
        'Content-Type': 'multipart/form-data',
      })
      const response: ApiResponse<any> = await this.apisauce.post(`/BeeHomeAdmin/uploadFile`, param)
      // the typical ways to die when calling an api
      if (!response.ok) {
        const problem = getGeneralApiProblem(response)
        if (problem) return problem
      }
      this.apisauce.setHeaders({
        'Content-Type': 'application/json',
      })
      const images = response.data

      return { kind: "ok", images }
    } catch (e) {
      __DEV__ && console.tron.log(e.message)
      return { kind: "bad-data" }
    }
  }
}
