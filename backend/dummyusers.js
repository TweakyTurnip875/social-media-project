const users = []

function joinUser(id, username, room) {
  const p_users = { id, username, room }

  users.push(p_users)
  console.log(users, "users")

  return p_users
}

function getCurrUser(id) {
  return users.find((p_users) => p_users.id === id)
}

function userDisconnect(id) {
  const index = users.findIndex((p_users) => p_users.id === id)

  if(index !== -1) {
    return users.splice(index, 1)[0]
  }
}

module.exports = {
  joinUser,
  getCurrUser,
  userDisconnect
}