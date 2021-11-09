import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { RequestTypeApi } from "../../services/api/request-type-api"
import { withEnvironment } from "../extensions/with-environment"
import { RequestTypeModel, RequestTypeSnapshot } from "../request-type/request-type"

/**
 * Model description here for TypeScript hints.
 */
export const RequestTypeStoreModel = types
  .model("RequestTypeStore")
  .props({
    requestTypeList: types.optional(types.array(RequestTypeModel), []),
  })
  .extend(withEnvironment) // eslint-disable-line @typescript-eslint/no-unused-vars
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveNotifs: (newsSnapshots: RequestTypeSnapshot[]) => {
      self.requestTypeList.replace(newsSnapshots)
    },
  }))
  .actions((self) => ({
    getRequestTypes: async (param) => {
      console.log(param)
      const notifApi = new RequestTypeApi(self.environment.api)
      const result = await notifApi.getRequestType(param)
      if (result.kind === "ok") {
        self.saveNotifs(result.requestTypes)
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

type RequestTypeStoreType = Instance<typeof RequestTypeStoreModel>
export interface RequestTypeStore extends RequestTypeStoreType {}
type RequestTypeStoreSnapshotType = SnapshotOut<typeof RequestTypeStoreModel>
export interface RequestTypeStoreSnapshot extends RequestTypeStoreSnapshotType {}
export const createRequestTypeStoreDefaultModel = () => types.optional(RequestTypeStoreModel, {})
