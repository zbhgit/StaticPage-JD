
### 静态页面项目

##### 环境搭建
* clone该项目
```
  $ git clone https://github.com/zbhgit/StaticPage-JD.git

  $ cd StaticPage-JD
  $ npm install 
```
* 使用gulp搭建开发环境，完成文件压缩、合并、替换等功能
```
  $ gulp build // 完成上述功能，生成上线文件
```
* 开发时运行下面的命令，实现浏览器实时更新

```
  $ gulp server // 打开 http://localhost:8080 即可看到效果
```