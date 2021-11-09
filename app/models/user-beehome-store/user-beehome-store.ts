import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { UserApi } from "../../services/api/user-api"
import { citizen } from "../../utils/constant"
import { withEnvironment } from "../extensions/with-environment"
import { UserBeehomeModel, UserBeehomeSnapshot } from "../user-beehome/user-beehome"

/**
 * Model description here for TypeScript hints.
 */
export const UserBeehomeStoreModel = types
  .model("UserBeehomeStore")
  .props({
    users: types.optional(types.array(UserBeehomeModel), []),
    role: types.optional(types.string, citizen),
    selected: types.optional(types.number, -1),
    phone: types.optional(types.string, ""),
  })
  .extend(withEnvironment)
  .actions((self) => ({
    saveUsers: (userSnapshots: UserBeehomeSnapshot[]) => {
      self.users.replace(userSnapshots)
    },
    selectRole: (index: string) => {
      self.role = index
    },
    savePhone: (phone: string) => {
      self.phone = phone
    },
    saveSelectedApartment: (index: number) => {
      self.selected = index
    },
  }))
  .actions((self) => ({
    getUser: async (param) => {
      const userApi = new UserApi(self.environment.api)
      const result = await userApi.getUserInfo(param)
      if (result.kind === "ok") {
        self.saveUsers(result.users)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    uploadFile: async (CompanyCode, param) => {
      const result = await self.environment.api.uploadImage(CompanyCode, param)
      if (result.kind === "ok") {
       return (result.images)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
  }))

/**
 * Un-comment the following to omit model attributes from your snapshots (and from async storage).
 * Useful for sensitive data like passwords, or transitive state like whether a modal is open.

 * Note that you'll need to import `omit` from ramda, which is already included in the project!
 *  .postProcessSnapshot(omit(["password", "socialSecurityNumber", "creditCardNumber"]))
 */

type UserBeehomeStoreType = Instance<typeof UserBeehomeStoreModel>
export interface UserBeehomeStore extends UserBeehomeStoreType {}
type UserBeehomeStoreSnapshotType = SnapshotOut<typeof UserBeehomeStoreModel>
export interface UserBeehomeStoreSnapshot extends UserBeehomeStoreSnapshotType {}
export const createUserBeehomeStoreDefaultModel = () => types.optional(UserBeehomeStoreModel, {})
