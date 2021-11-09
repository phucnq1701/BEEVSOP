import { UserBeehomeModel } from "./user-beehome"

test("can be created", () => {
  const instance = UserBeehomeModel.create({})

  expect(instance).toBeTruthy()
})
