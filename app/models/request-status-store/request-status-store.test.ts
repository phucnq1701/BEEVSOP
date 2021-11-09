import { RequestStatusStoreModel } from "./request-status-store"

test("can be created", () => {
  const instance = RequestStatusStoreModel.create({})

  expect(instance).toBeTruthy()
})
