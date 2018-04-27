
|方法|地址|
|------|------|
| [查询用户的积分流水（根据积分类型查）](#查询用户的积分流水（根据积分类型查）) | /flowRecordMC/coinOrderFlow/ |
| [游戏列表](#游戏列表) | /gameMC/gamesList/ |
| [添加游戏](#添加游戏) | /gameMC/add/ |
| [删除游戏](#删除游戏) | /gameMC/delete/ |
| [修改游戏](#修改游戏) | /gameMC/modify/ |
| [记录游戏分数](#记录游戏分数) | /gameMC/record/ |
| [用户完成其他用户发起的任务列表（分页）](#用户完成其他用户发起的任务列表（分页）) | /userMC/completeTaskList/ |
| [用户发起的任务列表（分页）](#用户发起的任务列表（分页）) | /userMC/startTaskList/ |
| [添加用户](#添加用户) | /userMC/add/ |
| [关联好友](#关联好友) | /userMC/friendRelate/ |
| [查询好友列表](#查询好友列表) | /userMC/friendList/ |
| [用户发起任务](#用户发起任务) | /userMC/startTask/ |
| [查询积分](#查询积分) | /userMC/queryCoin/ |
| [删除任务（置del字段为 1）](#删除任务（置del字段为 1）) | /userMC/deleteTask/ |
| [修改任务](#修改任务) | /userMC/modifyTask/ |
| [完成任务](#完成任务) | /userMC/completeTask/ |
| [购买积分](#购买积分) | /userMC/buyCoin/ |
| [赠送积分](#赠送积分) | /userMC/coinPresent/ |
| [提现（发红包）](#提现（发红包）) | /userMC/withdrawAsRedpacket/ |


## 查询用户的积分流水（根据积分类型查）
#### 地址 : /flowRecordMC/coinOrderFlow/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| type | query | true | 积分流水类型（0:购买，1:创建任务，2:赠送，3:返回(任务取消)，4:提现，5:完成任务获得） | 
| page | query | false | 当前页 | 
| pageRows | query | false | 每页显示行数（默认20行） | 
| { | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 602 | 无流水 | 
| 700 | 用户不存在 | 

#### 返回值 :
```
 {  returnJSON = {      params : {          totalCount: totalRows, 总页数          limitCount: pageRows, 每页行数          currentPage: page, 当前页          state: stateFlag, result是否为空      },      data : result, 数据  } }
```


## 游戏列表
#### 地址 : /gameMC/gamesList/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| page | query | false | 当前页 | 
| pageRows | query | false | 每页显示行数（默认20行） | 
| { | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 

#### 返回值 :
```
 {   returnJSON = {      params : {          totalCount: totalRows, 总页数          limitCount: pageRows, 每页行数          currentPage: page, 当前页          state: stateFlag, result是否为空      },      data : result, 数据  }  }
```


## 添加游戏
#### 地址 : /gameMC/add/
#### 方法 : post
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| name | body | true | 游戏名称 | 
| type | body | false | 游戏类型（0:未知，1:休闲，2:动作，3:答题） | 
| amount | body | false | 类型为2才会有，金额数量 | 
| url | body | false | 游戏url地址 | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 

#### 返回值 :
```
 {  data: result 新添加数据id }
```


## 删除游戏
#### 地址 : /gameMC/delete/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| gameId | query | true | 游戏id | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 900 | 游戏不存在 | 

#### 返回值 :
```
 {  data: result 影响行数 }
```


## 修改游戏
#### 地址 : /gameMC/modify/
#### 方法 : post
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| gameId | body | true | 游戏id | 
| name | body | true | 游戏名称 | 
| type | body | false | 游戏类型（0:未知，1:休闲，2:动作，3:答题） | 
| amount | body | false | 类型为2才会有，金额数量 | 
| url | body | false | 游戏url地址 | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 900 | 游戏不存在 | 

#### 返回值 :
```
 {  data: result 影响行数 }
```


## 记录游戏分数
#### 地址 : /gameMC/record/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| gameId | query | true | 游戏id | 
| userId | query | true | 用户id | 
| score | query | true | 游戏分数 | 
| taskId | query | false | 任务id | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 
| 800 | 任务不存在 | 
| 801 | 任务已删除 | 
| 802 | 任务已完成 | 
| 803 | 任务已过期 | 
| 900 | 游戏不存在 | 


## 用户完成其他用户发起的任务列表（分页）
#### 地址 : /userMC/completeTaskList/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| page | query | false | 当前页 | 
| pageRows | query | false | 每页显示行数（默认20行） | 
| { | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 

#### 返回值 :
```
 {   returnJSON = {      params : {          totalCount: totalRows, 总页数          limitCount: pageRows, 每页行数          currentPage: page, 当前页          state: stateFlag, result是否为空      },      data : result, 数据  }  }
```


## 用户发起的任务列表（分页）
#### 地址 : /userMC/startTaskList/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| page | query | false | 当前页 | 
| pageRows | query | false | 每页显示行数（默认20行） | 
| taskType | query | false | 任务类型（0：未完成，1：已完成） | 
| startTime | query | true | 区间段的开始时间 | 
| endTime | query | true | 区间段的结束时间 | 
| { | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 

#### 返回值 :
```
 {   returnJSON = {      params : {          totalCount: totalRows, 总页数          limitCount: pageRows, 每页行数          currentPage: page, 当前页          state: stateFlag, result是否为空      },      data : result, 数据  }  }
```


## 添加用户
#### 地址 : /userMC/add/
#### 方法 : post（form 的 enctype="multipart/form-data"）
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| openid | body | true | 微信ID | 
| nickname | body | true | 微信姓名 | 
| headimgurl | body | false | 微信头像 | 
| mobile | body | false | 手机号码 | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 702 | 用户已存在 | 

#### 返回值 :
```
 {  data: insertId 新插入数据的id }
```


## 关联好友
#### 地址 : /userMC/friendRelate/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| relateId | query | true | 任务id或用户id | 
| realteType | query | true | 关联类型（0：通过任务id关联，1：通过用户id关联） | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 
| 703 | 好友已关联 | 
| 800 | 任务不存在 | 

#### 返回值 :
```
 {  data: 'success' 成功 }
```


## 查询好友列表
#### 地址 : /userMC/friendList/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| page | query | false | 当前页 | 
| pageRows | false | 每页显示行数（默认20行） | 
| { | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 

#### 返回值 :
```
 {   returnJSON = {      params : {          totalCount: totalRows, 总页数          limitCount: pageRows, 每页行数          currentPage: page, 当前页          state: stateFlag, result是否为空      },      data : result, 数据  }  }
```


## 用户发起任务
#### 地址 : /userMC/startTask/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| gameId | query | true | 游戏id | 
| taskName | query | true | 任务名字 | 
| type | query | true | 奖品类型（0:实体，1:虚拟物品） | 
| amount | query | true | 奖品数量 | 
| startTime | query | true | 任务开始时间 | 
| endTime | query | true | 任务结束时间 | 
| target | query | true | 任务目标，达到什么条件 | 
| isshow | query | true | 展示状态（0:好友可见，1:都可见） | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 
| 900 | 游戏不存在 | 

#### 返回值 :
```
 {  data: result 用户信息 }
```


## 查询积分
#### 地址 : /userMC/queryCoin/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 

#### 返回值 :
```
 {  data: result 用户信息 }
```


## 删除任务（置del字段为 1）
#### 地址 : /userMC/deleteTask/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| taskId | query | true | 用户id | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 800 | 任务不存在 | 
| 801 | 任务已删除 | 

#### 返回值 :
```
 {  data: result 用户信息/删除行数 }
```


## 修改任务
#### 地址 : /userMC/modifyTask/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| taskId | query | true | 任务id | 
| taskname | query | true | 任务名字 | 
| type | query | false | 奖品类型（0:实体，1:虚拟物品） | 
| amount | query | false | 奖品数量 | 
| startTime | query | true | 任务开始时间 | 
| endTime | query | true | 任务结束时间 | 
| target | query | false | 任务目标，达到什么条件 | 
| isshow | query | false | 展示状态（0:好友可见，1:都可见） | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 800 | 任务不存在 | 
| 801 | 任务已删除 | 
| 802 | 任务已完成 | 
| 803 | 任务已过期 | 

#### 返回值 :
```
 {  data: result 影响行数 }
```


## 完成任务
#### 地址 : /userMC/completeTask/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| taskId | query | true | 任务id | 
| completeUserId | query | true | 用户id | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 
| 800 | 任务不存在 | 
| 801 | 任务已删除 | 
| 802 | 任务已完成 | 
| 803 | 任务已过期 | 

#### 返回值 :
```
 {  data: result 影响行数 }
```


## 购买积分
#### 地址 : /userMC/buyCoin/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| outTradeNo | query | true | 商户订单号 | 
| userId | query | true | 用户id | 
| productId | query | true | 商品ID | 
| resultCode | query | true | 业务结果SUCCESS/FAIL | 
| errCode | query | false | 错误代码 | 
| errCodeDes | query | false | 错误代码描述 | 
| totalFee | query | true | 订单总金额，单位为元，详见支付金额 | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 

#### 返回值 :
```
 {  data: result 影响行数 }
```


## 赠送积分
#### 地址 : /userMC/coinPresent/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| giveUserId | query | true | 赠送方id | 
| receiveUserId | query | true | 接受方id | 
| coin | 赠送积分 | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 
| 701 | 用户剩余积分不足 | 

#### 返回值 :
```
 {  data: result 新插入数据id }
```


## 提现（发红包）
#### 地址 : /userMC/withdrawAsRedpacket/
#### 方法 : get
#### 参数 :

|参数名|类型|必填|说明|
|------|------|------|------|
| userId | query | true | 用户id | 
| coin | query | true | 用户积分 | 
| mchBillno | query | true | 商户订单号 | 
| sendListid | query | true | 红包订单的微信单号 | 
| resultCode | query | true | 业务结果SUCCESS/FAIL | 
| errCode | query | false | 错误代码 | 
| errCodeDes | query | false | 错误代码描述 | 
| returnMsg | query | false | 返回信息 | 

#### 返回码 :

|返回码|说明|
|------|------|
| 200 | 操作成功 | 
| 700 | 用户不存在 | 
| 701 | 用户剩余积分不足 | 

