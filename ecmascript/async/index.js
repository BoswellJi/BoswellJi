async function a() {
  try {
    await Promise.reject('df')
  } catch (e) {
    console.log(e)
  }
}
a();