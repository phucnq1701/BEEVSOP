import { Instance, SnapshotOut, types } from "mobx-state-tree"
import { NewsApi } from "../../services/api/news-api"
import { BeehomeNotiModel, BeehomeNotiSnapshot } from "../beehome-noti/beehome-noti"
import { withEnvironment } from "../extensions/with-environment"
import { NewsModel, NewsSnapshot } from "../news/news"

/**
 * Model description here for TypeScript hints.
 */
export const NewsStoreModel = types
  .model("NewsStore")
  .props({
    news: types.optional(types.array(NewsModel), []),
    newsBeehome: types.optional(types.array(BeehomeNotiModel), []),
  })
  .extend(withEnvironment)
  .views((self) => ({
    get getBanner() {
      return self.news.filter((item) => item.IsBanner)
    },
    get getBeehomeBanner() {
      return self.newsBeehome.filter((item) => item.isBanner)
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    saveNews: (newsSnapshots: NewsSnapshot[], isLoadmore) => {
      if (isLoadmore) {
        const jsonData: NewsSnapshot[] = JSON.parse(JSON.stringify(self.news))
        self.news.replace([
          ...new Map(jsonData.concat(newsSnapshots).map((item) => [item.ID, item])).values(),
        ])
      } else {
        self.news.replace(newsSnapshots)
      }
    },
    saveNewsBeehome: (newsSnapshots: BeehomeNotiSnapshot[], isLoadmore) => {
      if (isLoadmore) {
        const jsonData: BeehomeNotiSnapshot[] = JSON.parse(JSON.stringify(self.newsBeehome))
        self.newsBeehome.replace([
          ...new Map(jsonData.concat(newsSnapshots).map((item) => [item.TieuDe, item])).values(),
        ])
      } else {
        self.newsBeehome.replace(newsSnapshots)
      }
    },
  })) // eslint-disable-line @typescript-eslint/no-unused-vars
  .actions((self) => ({
    getNews: async (param, isLoadmore) => {
      const newsApi = new NewsApi(self.environment.api)
      const result = await newsApi.getNews(param)
      if (result.kind === "ok") {
        self.saveNews(result.news, isLoadmore)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    getBeehomeNews: async (param, isLoadmore) => {
      const newsApi = new NewsApi(self.environment.api)
      const result = await newsApi.getBeehomeNews(param)
      if (result.kind === "ok") {
        self.saveNewsBeehome(result.news, isLoadmore)
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    getBeehomeNewsDetail: async (param) => {
      const newsApi = new NewsApi(self.environment.api)
      const result = await newsApi.getDetailBeehomeNews(param)
      if (result.kind === "ok") {
        return result.data
      } else {
        __DEV__ && console.log(result.kind)
      }
    },
    getDetailNews: async (param) => {
      const newsApi = new NewsApi(self.environment.api)
      const result = await newsApi.getDetailNews(param)
      if (result.kind === "ok") {
        return result.data
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

type NewsStoreType = Instance<typeof NewsStoreModel>
export interface NewsStore extends NewsStoreType {}
type NewsStoreSnapshotType = SnapshotOut<typeof NewsStoreModel>
export interface NewsStoreSnapshot extends NewsStoreSnapshotType {}
export const createNewsStoreDefaultModel = () => types.optional(NewsStoreModel, {})
