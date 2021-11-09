import { GeneralApiProblem } from "./api-problem"
import { Character } from "../../models/character/character"
import { User } from "../../models/user/user"
import { News } from "../../models/news/news"
import { Withdraw } from "../../models/withdraw/withdraw"
import { Notification } from "../../models/notification/notification"
import { BeehomeNoti, Invoice, Member, Request, RequestStatus, RequestType, UserBeehome } from "../../models"
import { RFValue } from "react-native-responsive-fontsize";




export type GetUsersResult = { kind: "ok"; users: User[] } | GeneralApiProblem
export type GetUserBeehomeResult = { kind: "ok"; users: UserBeehome[] } | GeneralApiProblem

export type GetNewsResult = { kind: "ok"; news: News[] } | GeneralApiProblem

export type GeBeehomeNotiResult = { kind: "ok"; news: BeehomeNoti[] } | GeneralApiProblem


export type GetNotificationResult = { kind: "ok"; notifs: Notification[] } | GeneralApiProblem

export type GetWithdrawResult = { kind: "ok"; withdraws: Withdraw[] } | GeneralApiProblem


export type GetUserResult = { kind: "ok"; user: User } | GeneralApiProblem

export type GetCharactersResult = { kind: "ok"; characters: Character[] } | GeneralApiProblem
export type GetCharacterResult = { kind: "ok"; character: Character } | GeneralApiProblem

export type GetRequestTypeResult = { kind: "ok"; requestTypes: RequestType[] } | GeneralApiProblem

export type GetRequestResult = { kind: "ok"; requests: Request[] } | GeneralApiProblem

export type GetRequestStatusResult = { kind: "ok"; requests: RequestStatus[] } | GeneralApiProblem

export type GetMemberResult = { kind: "ok"; members: Member[] } | GeneralApiProblem

export type GetInvoiceResult = { kind: "ok"; invoices: Invoice[] } | GeneralApiProblem


