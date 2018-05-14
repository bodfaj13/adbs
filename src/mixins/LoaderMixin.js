export const LoaderMixin = {
  data: () => ({
    loaderSwitch: false,
    btnDisabled: false
  }),
  methods: {
    timeOut () {
      setTimeout(() => {
        this.btnDisabled = false
        this.loaderSwitch = false
      }, 1200)
    }
  }
}
