const ci = require('miniprogram-ci')

const preview = async () => {
  // 注意： new ci.Project 调用时，请确保项目代码已经是完整的，避免编译过程出现找不到文件的报错。
  const project = new ci.Project({
    appid: 'wx8492a9091978e77d',
    type: 'miniProgram',
    projectPath:
      'D:\\MyConfiguration\\mingzhuang.ji\\Downloads\\build_WX_LVCANG_10_20240812060615\\project',
    privateKeyPath:
      'D:\\MyConfiguration\\mingzhuang.ji\\Desktop\\private.wx8492a9091978e77d.key',
    ignores: ['node_modules/**/*']
  })

  const previewResult = await ci.preview({
    project,
    desc: 'hello', // 此备注将显示在“小程序助手”开发版列表中
    setting: {
      es6: true
    },
    qrcodeFormat: 'image',
    qrcodeOutputDest:
      'D:\\MyConfiguration\\mingzhuang.ji\\Desktop\\destination.jpg',
    onProgressUpdate: console.log
  })
  console.log(previewResult)
}

const upload = async () => {
  const project = new ci.Project({
    appid: 'wx8492a9091978e77d',
    type: 'miniProgram',
    projectPath:
      'D:\\MyConfiguration\\mingzhuang.ji\\Downloads\\build_WX_LVCANG_10_20240812060615\\project',
    privateKeyPath:
      'D:\\MyConfiguration\\mingzhuang.ji\\Desktop\\private.wx8492a9091978e77d.key',
    ignores: ['node_modules/**/*']
  })
  const uploadResult = await ci.upload({
    project,
    version: '1.3.14',
    desc: 'hello',
    setting: {
      es6: true
    },
    onProgressUpdate: console.log
  })
  console.log(uploadResult)
}

upload()
