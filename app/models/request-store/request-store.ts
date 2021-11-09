import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RequestApi } from "../../services/api/request-api"
import { withEnvironment } from "../extensions/with-environment"
import { RequestModel, RequestSnapshot } from "../request/request"

/**
 * Model description here for TypeScript hints.
 */
export const RequestStoreModel = types
  .model("RequestStore")
  .props({
    requestList: types.optional(types.array(RequestModel), []),
    loading: false,
  })
  .extend(withEnvironment) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveRequest: (newsSnapshots: RequestSnapshot[], isLoadmore: boolean) => {
      if (isLoadmore) {
        const jsonData: RequestSnapshot[] = JSON.parse(JSON.stringify(self.requestList))
        self.requestList.replace([
          ...new Map(jsonData.concat(newsSnapshots).map((item) => [item.ID, item])).values(),
        ])
      } else {
        self.requestList.replace(newsSnapshots)
      }
    },
    setLoading: (loading) => {
      self.loading = loading
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getRequest: async (param, isLoadmore) => {
      const notifApi = new RequestApi(self.environment.api)
      const result = await notifApi.getRequest(param)
      if (result.kind === "ok") {
        self.saveRequest(result.requests, isLoadmore)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    createRequest: async (param) => {
      self.setLoading(true)
      const notifApi = new RequestApi(self.environment.api)
      const result = await notifApi.createRequest(param)
      if (result.kind === "ok") {
        self.setLoading(false)
        return result.message
      } else {
        self.setLoading(false)
        __DEV__ && console.log(result.kind)
      }
    },
    getRequestDetail: async (param) => {
      const notifApi = new RequestApi(self.environment.api)
      const result = await notifApi.getRequestDetail(param)
      if (result.kind === "ok") {
        return result.requests
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type RequestStoreType = Instance<typeof RequestStoreModel>
export interface RequestStore extends RequestStoreType {}
type RequestStoreSnapshotType = SnapshotOut<typeof RequestStoreModel>
export interface RequestStoreSnapshot extends RequestStoreSnapshotType {}
export const createRequestStoreDefaultModel = () => types.optional(RequestStoreModel, {})
