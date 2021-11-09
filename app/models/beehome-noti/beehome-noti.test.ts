import { BeehomeNotiModel } from "./beehome-noti"

test("can be created", () => {
  const instance = BeehomeNotiModel.create({})

  expect(instance).toBeTruthy()
})
