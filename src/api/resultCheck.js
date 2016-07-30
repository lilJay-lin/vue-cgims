/**
 * Created by liljay on 2016/7/21.
 */
export default (res) => {
  return new Promise((resolve, reject) => {
    if (res.status === 1) {
      resolve(res)
    } else {
      reject(res)
    }
  })
}
