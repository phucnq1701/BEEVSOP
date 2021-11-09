import { MemberModel } from "./member"

test("can be created", () => {
  const instance = MemberModel.create({})

  expect(instance).toBeTruthy()
})
