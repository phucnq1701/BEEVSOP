import { RequestTypeStoreModel } from "./request-type-store"

test("can be created", () => {
  const instance = RequestTypeStoreModel.create({})

  expect(instance).toBeTruthy()
})
