## Cookie

1. 浏览器通过HTTP Request中的“Cookie: header”,将Cookie发送给web服务器
2. Web服务器通过HTTP Response中的"Set-Cookie: header"把cookie发送给浏览器

服务器决定是否需要cookie，然后浏览器通过set-cookie字段的要求，在http请求中自动包装cookie进行传输

每个域下，Cookie的数量是有限制的，当超过限制时，浏览器会清除以前设置的Cookie,火狐会随机清除，ie(7+ 50个上限)和opera(30个上限)会删除使用最少的，
safri和chrome对于每个域下的cookie的数量限制没有硬性规定
cookie的大小大约在4096B(加减1)的长度范围，尺寸Cookie影响到的是域下的所有Cookie,并非每个cookie单独受到限制

#### 临时Cookie




#### 持久Cookie




#### Cookie利用了P3P协议对其进行保护，P3P能够自动识别多种cookies的嵌入方式，然后对有关的Cookie自动拒绝

### 服务器
1. 服务器可以通过使用Path(路径)更改Cookie的默认范围和Domain attributes(域属性)
2. 服务器可以存储多个Cookie
3. 不返回cookie属性。尤其是，
   服务器无法从Cookie头单独确定
   Cookie将过期，Cookie的哪个主机有效
   cookie的路径是有效的，还是cookie是否设置
   Secure或HttpOnly属性。

```

Set-Cookie：SID = 31d4d96e407aad42; Path= /; Domain = example.com

Set-Cookie: SID=31d4d96e407aad42; Path=/; Secure; HttpOnly

Path属性： 路径，修改Cookie的默认范围

Domain属性： 设置接受cookie的域

  如果没有设置path属性：用户代理将使用request-uri的路径组件的'directory'作为默认值。

  如果服务器省略了Domain属性，则该用户代理将仅将Cookie返回到源服务器

  比如： 设置Path=/accounts; Domain=docs.foo.com
这告诉浏览器只有当请求页面包含在docs.foo.com/accounts下时才返回这个Cookie;

  比如： 设置Path=/accounts; Domain=.foo.com
这告诉浏览器只有当请求页面包含在.foo.com/accounts的任何子域下时才返回这个Cookie;

Secure属性：HTTPS传输的cookie会自动带上secure属性，限制Cookie传输必须在加密传输(通常是通过传输层安全性（TLS）的HTTP)中，浏览器只能通过安全/加密使用Cookie,如果在一个非安全连接中给Cookie设置了一个Secure属性，这个Cookie在发送给用户时仍然可以通过中间人拦截到，因此必须通过安全连接状态下设置secure属性

HttpOnly属性： 指示浏览器除了HTTP和HTTPS请求之外不再显示Cookie,这样表示这种cookie不能在客户端通过脚本进行获取，因此不会轻易的被跨站脚本窃取

Expries / Max-age


```
