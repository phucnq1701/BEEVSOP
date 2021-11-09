import { MemberStoreModel } from "./member-store"

test("can be created", () => {
  const instance = MemberStoreModel.create({})

  expect(instance).toBeTruthy()
})
