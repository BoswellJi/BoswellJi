Page({
  data: {
    text: ''
  },
  clickhandle: function()  {
    const text = this.data.text == '' ? 0 : undefined;
    this.setData({ text: text })
  },
});