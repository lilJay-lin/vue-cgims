/**
 * Created by liljay on 2016/8/13.
 */
export default {
  filters: {
    orgPicture: function (pic) {
      return (pic === 'loading' || pic === '' || !pic) ? 'javascript:void(0)' : ~pic.lastIndexOf('@') ? pic.substring(0, pic.lastIndexOf('@')) : pic
    }
  },
  methods: {
    isNumber: (val) => {
      return /^\d+$/.test(val)
    },
    isFloatNumber: (val) => {
      return /^\d*\.?\d*$/.test(val)
    },
    isPhoneNumber: (val) => {
      return /^\d{11}$/.test(val)
    }
  }
}
