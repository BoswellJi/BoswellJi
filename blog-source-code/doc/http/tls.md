## Transport Layer Security(传输层安全协议)

- 以前被称为`ssl:安全套接层协议`;
- 属于网络模型中的`运输层协议`;
- 公钥/私钥;
- 利用公钥进行加密操作,私钥进行解密;

## 作用

- 通过`密码协议`提供网络传输的安全,确保没有第三方可以`偷听`和`篡改`传输的信息;

## 使用

- 这是一个client/server协议,因此需要都支持此协议;
- 为了建立安全连接,server需要提供一个满足身份识别的有效的`数字证书`;

## 数字证数

- 是一个将公开的已知密码私钥绑定到组织的数据文件;
- 包含内容: `有关组织的信息`
  - 通用名称
  - 组织单位
  - 位置
  - 公钥
  - 等
- 通常由`证书颁发机构`签名,证明证书的真实性;

## 凭证管理中心`(CA)`

- CA是对`数字证书`及其`相关公钥`进行签名的组织;

## 生成自签名证书

- 前提条件
  - 生成私密密钥的工具`openssl`;
  - 依赖公钥基础设施的`ssl/tls`协议集合;
  - 服务器必须要有一个私钥;

- https服务器创建步骤
  - 通过`openssl`生成数字证数文件;
  - `openssl genrsa -out ryans-key.pem 2048`: rsa私钥
  - `openssl req -new -sha256 -key ryans-key.pem -out ryans-csr.pem`: csr的私钥
  - `openssl x509 -req -in ryans-csr.pem -signkey ryans-key.pem -out ryans-cert.pem`: 自签名的证书