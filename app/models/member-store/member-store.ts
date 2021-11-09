import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { MemberApi } from "../../services/api/members-api"
import { withEnvironment } from "../extensions/with-environment"
import { MemberModel, MemberSnapshot } from "../member/member"

/**
 * Model description here for TypeScript hints.
 */
export const MemberStoreModel = types
  .model("MemberStore")
  .props({
    members: types.optional(types.array(MemberModel), []),
    loading: types.optional(types.boolean, false),
  })
  .extend(withEnvironment)
  .views((self) => ({})) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveMember: (newsSnapshots: MemberSnapshot[]) => {
      self.members.replace(newsSnapshots)
    },
    setLoading: (loading) => {
      self.loading = loading
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getMembers: async (param) => {
      const newsApi = new MemberApi(self.environment.api)
      const result = await newsApi.getMember(param)
      if (result.kind === "ok") {
        self.saveMember(result.members)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    createMember: async (param) => {
      self.setLoading(true)
      const notifApi = new MemberApi(self.environment.api)
      const result = await notifApi.createMember(param)
      if (result.kind === "ok") {
        self.setLoading(false)
        return result.message
      } else {
        self.setLoading(false)
        __DEV__ && console.log(result.kind)
      }
    },
    deleteMember: async (param) => {
      self.setLoading(true)
      const notifApi = new MemberApi(self.environment.api)
      const result = await notifApi.deleteMember(param)
      if (result.kind === "ok") {
        self.setLoading(false)
        return result.message
      } else {
        self.setLoading(false)
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

type MemberStoreType = Instance<typeof MemberStoreModel>
export interface MemberStore extends MemberStoreType {}
type MemberStoreSnapshotType = SnapshotOut<typeof MemberStoreModel>
export interface MemberStoreSnapshot extends MemberStoreSnapshotType {}
export const createMemberStoreDefaultModel = () => types.optional(MemberStoreModel, {})
