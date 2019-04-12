import Resize from './resize'

export default function install (Vue) {
  Vue.directive('resize', Resize)
}
