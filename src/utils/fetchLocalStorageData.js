const userObj = {
  AccessToken: null,
  RefreshToken: null,
  email: null,
  username: null,
  avatar: null,
  _id: null,
  authenticated: false,
}

export const fetchUser = () => {
  if (localStorage.getItem("user") === null) localStorage.setItem('user', JSON.stringify(userObj))
  // console.log(localStorage.getItem('user'))
  const userInfo =
    JSON.parse(localStorage.getItem("user"))

  return userInfo;
};
