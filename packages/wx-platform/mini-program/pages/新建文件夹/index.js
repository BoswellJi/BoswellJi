const getRandom = (min, max) => parseInt((Math.random() * (max - min + 1))) + min;

Page({
  data: {
    danmuList: [
      "你好科比布莱恩特",
      "这个老哥的评论说的很对啊，这都能被违规隐藏？是戳痛到某些人了吗。",
      "rip....",
      "resepct",
      "😂❤️😍😒👌☺️☺️😊😭😩😩😔😏😁👍🏿😁😏😏😔💕😭😘😊❤️😍",
      "圣何塞-穆里尼奥",
      "泰伦卢，泰伦卢，泰伦卢，泰伦卢",
      "勒布朗-詹姆斯",
      "emoji",
      "湖人阵容也不是特别豪华为什么能打到西部第一？ 由高田大叔 发表在篮球·湿乎乎的话题-说的很对啊，很对啊",
      "----huhuh---hahahha---",
      "😂❤️😍😒👌☺️☺️😊😭😩😩😔😏😁👍🏿😁😏😏😔💕😭😘😊❤️😍"
    ],
    bullets: [['34'], ['3444']],
    tracks: ['idle', 'idle'],
    queues: [],
    handler: null,
    num: 0,
  },
  onLoad: function () {
    this.handler = setInterval(() => {
      const str = this.data.danmuList[this.data.num];
      this.data.num++;
      if (this.num === this.data.danmuList.length) {
        clearInterval(this.data.handler);
      }
      this.screenPpush(str)
    }, 500);
  },
  screenPpush(item) {
    const canIndex = this._getTrackIndex(item);
    if (canIndex === -1) {
      // if (isSelf) {
      //   // 没有多余轨道的情况，自己发的弹幕先保存起来
      //   this.setData({
      //     queues: [...this.data.queues,item]
      //   });
      // }
    }
    else {

    }
  },
  _getTrackIndex(item) {
    let readyIdxs = [];
    let index = -1;
    // 优先去 idle 状态 找到空闲轨道
    this.data.tracks.forEach((v, idx) => v === "idle" && readyIdxs.push(idx));
    if (readyIdxs.length) {
      // 从空闲轨道中随机一个轨道运行
      const random = getRandom(0, readyIdxs.length - 1);
      index = readyIdxs[random];
      this.data.tracks[index] = "running";
      this.setData({
        bullets:index === 0 ? [[...this.data.bullets[0], item], this.data.bullets[1]] : [this.data.bullets[0], [...this.data.bullets[1], item]]
      });
      return;
    }
    // 没有轨道空闲，丛上到下巡检各轨道，选出可执行弹幕轨道
    for (let i = 0; i < this.data.bullets.length; i++) {
      const len = this.data.bullets[i].length;
      if (len) {
        const item = this.data.bullets[i][len - 1];
        this._checkTrack(item, () => {
          // 塞入弹幕存储器
          this.setData({
            bullets: i === 0 ? [[...this.data.bullets[0], item], this.data.bullets[1]] : [this.data.bullets[0], [...this.data.bullets[1], item]]
          });
        })
      }
    }
    return index;
  },
  // 判断该条轨道是否可执行弹幕
  _checkTrack(item, cb) {
    const query = wx.createSelectorQuery()
    query.select('#' + item).boundingClientRect(function (itemPos) {
      if (itemPos.right > 0) {
        return false;
      } else {
        cb();
      }
    })
  }
})