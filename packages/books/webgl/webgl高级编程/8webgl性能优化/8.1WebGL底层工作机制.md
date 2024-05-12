## 实际支持webgl的硬件

* webgl底层的工作机制，硬件组成和软件组成

* 硬件执行流程：
  + 网络连接（模型加载 -> cup（数据处理 -> 总线（cup到gpu数据传输 -> gpu(图像处理

* 软件：

``` 
            浏览器
    webkit               v8引擎
    opengl es   http     libc   
    
```

* webgl应用执行流程：
  + 输入地址，浏览器把url地址发送给webkit，webkit用http栈建立一个http请求消息
  + http通过套接字发送给Tcp/Ip栈，tcp/ip栈利用tcp和ip封装这个http请求，ip数据包由网络设备驱动程序存放到缓冲区中，并发送给蜂窝调制解调器或者wlan
  + web服务器响应消息，返回源代码文本
  + 响应内容，经过网络驱动程序，tcp/ip栈，http栈到达webkit, webkit解析html, css创建render tree，js代码发哦是那个给v8, v8逐行解析执行
  + webgl api这些调用语句返回到webkit，webkit会调用opengl es 2.0 api, 将代码上传到gpu
  + 最后创建各种缓冲区，将他们发送给gpu

## webgl性能优化

#### 陷阱
* gl.drawElements(), 图形流水线以异步的方式工作，所以测试不到执行时间；
* 需要使用 gl.flush() gl.finish()测试执行时间

### 确定性能瓶颈
- webgl绘制很大程度采用`流水线形式`/`一个帧期间`；这意味着webgl应用程序在流水线的某个阶段出现性能瓶颈；
- 为了改善整个绘制性能，优化瓶颈阶段
- 



## 支持webgl的重要软件组成

## 如何确定web图形流水线存在的性能瓶颈

## 如何优化不同的webgl瓶颈

## webgl的常见性能知识

## webgl的融合机制以及如何用它实现透明效果
