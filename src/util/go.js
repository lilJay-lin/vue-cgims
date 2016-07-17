/**
 * Created by liljay on 2016/7/17.
 */
export default (url, $router) => {
  if (/^javas/.test(url) || !url) return
  const useRouter = typeof url === 'object' || (typeof url === 'string' && !/^http/.test(url))
  if (useRouter) {
    $router.go(url)
  } else {
    window.location.href = url
  }
}
