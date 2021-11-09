import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RequestApi } from "../../services/api/request-api"
import { withEnvironment } from "../extensions/with-environment"
import { RequestStatusModel, RequestStatusSnapshot } from "../request-status/request-status"

/**
 * Model description here for TypeScript hints.
 */
export const RequestStatusStoreModel = types
  .model("RequestStatusStore")
  .props({
    requestStatusList: types.optional(types.array(RequestStatusModel), []),
  })
  .extend(withEnvironment) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((self) => ({
    get getAvailableStatus() {
      return self.requestStatusList.filter((item) => item.ViewAppCuDan)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveRequest: (newsSnapshots: RequestStatusSnapshot[]) => {
      self.requestStatusList.replace(newsSnapshots)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getRequest: async (param) => {
      const notifApi = new RequestApi(self.environment.api)
      const result = await notifApi.getRequestStatus(param)
      if (result.kind === "ok") {
        self.saveRequest(result.requests)
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

type RequestStatusStoreType = Instance<typeof RequestStatusStoreModel>
export interface RequestStatusStore extends RequestStatusStoreType {}
type RequestStatusStoreSnapshotType = SnapshotOut<typeof RequestStatusStoreModel>
export interface RequestStatusStoreSnapshot extends RequestStatusStoreSnapshotType {}
export const createRequestStatusStoreDefaultModel = () =>
  types.optional(RequestStatusStoreModel, {})
