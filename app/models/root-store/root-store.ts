import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { CharacterStoreModel } from "../character-store/character-store"
import { InvoiceStoreModel } from "../invoice-store/invoice-store"
import { MemberStoreModel } from "../member-store/member-store"
import { NewsStoreModel } from "../news-store/news-store"
import { NotificationStoreModel } from "../notification-store/notification-store"
import { RequestStatusStoreModel } from "../request-status-store/request-status-store"
import { RequestStoreModel } from "../request-store/request-store"
import { RequestTypeStoreModel } from "../request-type-store/request-type-store"
import { UserBeehomeStoreModel } from "../user-beehome-store/user-beehome-store"
import { UserStoreModel } from "../user-store/user-store"
import { WithdrawStoreModel } from "../withdraw-store/withdraw-store"

/**
 * A RootStore model.
 */
// prettier-ignore
export const RootStoreModel = types.model("RootStore").props({
  characterStore: types.optional(CharacterStoreModel, {} as any),
  userStore: types.optional(UserStoreModel, {} as any),
  userBeehomeStore: types.optional(UserBeehomeStoreModel, {} as any),
  newsStore: types.optional(NewsStoreModel, {} as any),
  withdrawStore: types.optional(WithdrawStoreModel, {} as any),
  notiStore: types.optional(NotificationStoreModel, {} as any),
  requestTypesStore: types.optional(RequestTypeStoreModel, {} as any),
  requestStore: types.optional(RequestStoreModel, {} as any),
  memberStore: types.optional(MemberStoreModel, {} as any),
  invoiceStore: types.optional(InvoiceStoreModel, {} as any),
  requestStatusStore: types.optional(RequestStatusStoreModel, {} as any)
})

/**
 * The RootStore instance.
 */
export interface RootStore extends Instance<typeof RootStoreModel> {}

/**
 * The data of a RootStore.
 */
export interface RootStoreSnapshot extends SnapshotOut<typeof RootStoreModel> {}
