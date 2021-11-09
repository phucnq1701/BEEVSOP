import { UserBeehomeStoreModel } from "./user-beehome-store"

test("can be created", () => {
  const instance = UserBeehomeStoreModel.create({})

  expect(instance).toBeTruthy()
})
