贴吧电竞
http://admin.con.com:9088
http://admin.con.com:9088/api/game/

没有相关游戏id不能参赛
贴吧电竞api相关页面接口
如何用户有登陆接口带上用户的token

考虑到每个页面都有多个数据层，并且有时候用户只想看单个数据层的数据
每个数据层都会独立接口

首页接口相关api
返回结果中的参数还需要沟通，以配合相关需求

1:
获取参加赛事的游戏的api

地址    http://192.168.101.99:8088/game/

方法  get

参数说明
参数名称                             类型                                         是否必选                              字段说明
offset                               int                                            否                                   查询的起始位置
limit                                int                                            否                                   查询时的偏移量


返回结果数据示例

{
    "code": 0,
    "data": [
        {
            "game_name": "胜者为王22",
            "icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "id": 5,
            "tieba_url": "http://baidu.com"
        },
        {
            "game_name": "胜者为王2",
            "icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "id": 4,
            "tieba_url": "http://baidu.com"
        }
    ]
}

game_name：            游戏的名称
icon：                 游戏的图标
id：                   数据库编号 (进入赛区是需要的参数，也可根据参数条件查询时带上id进行查找)
tieba_url ：           游戏的贴吧地址

----------------------------------------------------------------------------------------------------------------------------------------------------------------------

2:
获取热门赛事api（是否只显示三个再管理后台标志的热门赛事）

地址  http://192.168.101.99:8088/tournament/

方法  get
请求参数
参数名称                                  类型                     是否必选                    参数说明
offset                                    int/string数字            否                          数据的起始位置(默认值为0)
limit                                     int/string数字            否                          数据偏移量(默认值为3)
hot_status                                int                       否                          是否为热门赛事(不选择默认1：为热门赛事0为普通赛赛)

返回结果数据示例

{
    "code": 0,
    "datas": [
        {
            "apply_time": "2018.07.03-2018.07.04",
            "award_name": "",
            "award_type": 0,
            "event_type_name": "官方赛",
            "events_title": "7777777         ",
            "game_name": "荒野行动",
            "has_team": 23,
            "icon": "http://pbp781cft.bkt.clouddn.com/25d55c67-390a-4a4e-aed9-addc1a704ae2.png",
            "id": 6,
            "max_team": 231,
            "status": "等待开赛",
            "total_bonus": 6666666
        },
        {
            "apply_time": "2018.07.03-2018.07.03",
            "award_name": "xxxxx大礼包",
            "award_type": 4,
            "event_type_name": "官方赛",
            "events_title": "FIFA联赛",
            "game_name": "荒野行动",
            "has_team": 50,
            "icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "id": 2,
            "max_team": 100,
            "status": "等待开赛",
            "total_bonus": 0
        }
    ]
}

apply_time  赛事报名时间
event_type_name  赛事类型
events_title  赛事标题
game_type     游戏名称
has_team      当前报名参加赛事的队伍数
max_team      可参加比赛的最大队伍上限
icon          赛事主题图
status        赛事的状态
total_bonus   赛事的总奖金  (award_type为1时为人民币奖品2时为平台币3：物品4：cdkey：当为3/4时total_bonus为0)
award_type    赛事奖品类型(1时为人民币奖品2时为平台币3：物品4：cdkey)
award_name    赛事奖品名称

--------------------------------------------------------------------------------------------------------------------------------------------------------------------

3:
赛事预告接口
地址：http://192.168.101.99:8088/eventforeshow/
 
方法 get


参数
名称       参数类型    是否未必选
year       string      必选
month      string      必选


返回结果

{
    "code": 0,
    "datas": [
        {
            "day": "29",
            "events_title": "xx联赛",
            "foreshow_details": "小组赛",
            "icon": "http://baidu.com",
            "start_hm": "21: 34"
        }
    ]
}

结果返回字段说明

字段                     描述
day                      当月的第几天
events_title             赛事的标题
foreshow_details         赛事阶段
icon                     游戏的icon（是图片地址）
start_hm                 游戏开始的时间

----------------------------------------------------------------------------------------------------------------------------------

4:
赛事预约与取消接口

地址：http://192.168.101.99:8088/appointmentevent/

方法： post

参数                         类型               是否必选                字段说明
user_id                      int               必选                     用户id
event_id                     int               必选                     赛事id
status                       int               可选                     选上时为取消预约
token                        string            必选                     用户登陆授权令牌


返回结果
{
    "code": 0,
    "msg": "成功取消预约"
}

成功请求code为0
msg有'成功预约，预约失败，成功取消预约等提示语取msg即可'


-------------------------------------------------------------------------------------------------------------------------------------

5:
###------------------------------------
### 首页战队榜
### -----------------------------------

请求地址：http://192.168.101.99:8088/teamperformance/

方法：get

参数名称                 类型                 是否必选                               字段说明
performance_type         string               可选                                   默认值为w：表示近一周数据，all为全部历史数据汇总只有两种类型
game_id                  string               可选                                   选择查询的游戏id

结果示例：默认最多只有10结果
{
    "code": 0,
    "data_update_time": "2018-07-17 11:23:47",
    "datas": [
        {
            "competition_point": 11,
            "has_member": 10,
            "game_icon_urls": [
                "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
                "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg"
            ],
            "id": 4,
            "join_game_num": 1,
            "max_member": 50,
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_name": "我们的世界",
            "team_type": "竞技战队"
        },
        {
            "competition_point": 0,
            "has_member": 11,
            "game_icon_urls": [],
            "id": 5,
            "join_game_num": 0,
            "max_member": 50,
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_name": "我们的世界",
            "team_type": "竞技战队"
        }
    ]
}
competition_point  赛点
join_game_num      参赛的游戏场数
has_member         当前参数的队伍数
max_member         参数队伍上限
team_icon          战队图标地址
team_name          战队名称
team_type          战队的类型（例如：贴吧战队（面向吧主），电竞战队）
id                 战队id
game_icon_urls     战队擅长的游戏的icon地址

-----------------------------------------------------------------------------------------------------------------------------------------------



6:
### ----------------------------
### 赛事榜
### ----------------------------

地址： http://192.168.101.99:8088/eventperformance/

方法：get

参数名称                        类型                    是否为必选               参数说明
game_id                         int                     可选                     带上参数时会查询对应游戏的赛事
offset                          int                     可选                     默认值0
limit                           int                     可选                     默认值10
award_type                      int                     必选值1                  表示只查询出有人民币奖金的赛事

结果示例


{
    "code": 0,
    "data_update_time": "2018-07-17 25:14:31",
    "datas": [
        {
            "event_status": "等待开赛",
            "event_title": "7777777         ",
            "event_type_name": "官方赛",
            "participation": 92,
            "total_bonus": 6666666
        }
    ]
}

data_update_time        数据更新的时间
event_status            赛事状态描述
event_title             赛事名称
event_type_name         赛事级别
participation           当前参赛人数
total_bonus             赛事的总奖金



------------------------------------------------------------------------------------------------------------------
7:
#### 战队首页

创建战队

地址：http://192.168.101.99:8088/gameteam/

方法  post


参数

名称             类型                   是否必须                   字段说明
token            string                 必须					   用户授权token
user_id          int                    必须                       用户id
team_name        string                 必须	                   战队名称 
team_icon        file                   必须                       战队的图片
team_details     string                 可选                       战队宣言
team_type        int                    必选                       战队的id

返回结果

{
    "code": 0,
    "msg": "已有战队"
}

弹框提示取msg值

-----------------------------------------------------------------------------------------------------------------------

8:
战队赛时获取可参赛队员信息

地址: http://192.168.101.99:8088/teamjoingame/

方法：get

参数名称               类型                   是否必选                 参数说明
user_id                int                    必选                     用户的id，根据用户id来判断该用户是否有权限报名
event_id               int                    必选                     赛事id
team_id                int                    必选                     战队id
token                  string                 必选                     用户登陆的授权令牌

结果说明

{
    "datas": {
        "event_name": "xx联赛",
        "game_name": "胜者为王1",
        "user_datas": [
            {
                "icon": "http://baidu.com",
                "id": 1,
                "nickname": "test"
            }
        ]
    }
}

所有的数据放在datas里面
event_name          赛事名称
game_name           举办赛事的游戏名称
user_datas          可报名参赛的战队成员为一个list
					icon             用户头像地址
					id               用户id
					nickname         用户昵称


					
					-----------------------------------------------------------------------
9:
战队排行榜接口

地址  ：http://192.168.101.99:8088/gameteam/


方法：get


参数名称                        类型                              是否必选                           参数说明
game_id                         int                               可选                               参赛游戏id
team_name                       string                            可选                               战队名称
offset                          int                               可选                               起始值(默认0)
limit                           int                               可选                               偏移值(默认10)


{
    "code": 0,
    "data_update_time": "2018-07-17 34:14:08",
    "datas": [
        {
            "competition_point": 0,
            "has_member": 11,
            "icon_urls": [],
            "join_game_num": 0,
            "rank": 3,
            "recruit": 0,
            "team_icon": "http://pbp781cft.bkt.clouddn.com/http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_id": 5,
            "team_name": "我们的世界",
            "team_type": "竞技战队"
        },
        {
            "competition_point": 1,
            "has_member": 10,
            "icon_urls": [
                "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
                "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg"
            ],
            "join_game_num": 1,
            "rank": 4,
            "recruit": 0,
            "team_icon": "http://pbp781cft.bkt.clouddn.com/http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_id": 4,
            "team_name": "我们的世界",
            "team_type": "竞技战队"
        }
    ],
    "total": 7
}

结果参数说明
data_update_time       数据最新更新时间
total                  当前条件下数据的总量
datas                  排行榜数据
                       competition_point                  战队的赛点数
					   has_member                         战队的拥有的人数
					   icon_urls                          战队擅长游戏的icon地址
					   join_game_num                      参赛次数
					   rank                               战队排行榜
					   team_icon                          战队icon图片地址
					   team_id                            战队id
					   team_name                          战队名称
					   team_type                          战队类型(利于辨别贴吧战队和竞技战队)
					   



---------------------------------------------------------------------------------------------------

10:					   
## 明星战队

地址： http://192.168.101.99:8088/starteam/

方法： get

不需要参数

返回结果

{
    "datas": [
        {
            "has_member": 50,
            "team_details": "我们的世界有你而精彩",
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_name": "我们的世界"
        },
        {
            "has_member": 1,
            "team_details": "欢迎你的到来",
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_name": "有你变得更加精彩12"
        }
    ]
}


has_member          战队当前人数
team_details        战队宣言
team_icon           战队icon地址
team_name           战队名字

-----------------------------------------------------------------------------------------------------
11:
### 明星队长

地址： http://192.168.101.99:8088/starteamleader/

方法： get

无需参数

返回结果

{
    "datas": [
        {
            "icon": "http://baidu.com",
            "id": 1,
            "nickname": "test"
        }
    ]
}

icon                 用户头像地址
id                   用户id
nickname             用户昵称


-------------------------------------------------------------------------------------------------------------
12:
### 获取战队类型

地址： http://192.168.101.99:8088/teamtype/

方法：get

无需参数

返回结果
{
    "datas": [
        {
            "id": 1,
            "name": "贴吧战队"
        },
        {
            "id": 2,
            "name": "竞技战队"
        }
    ]
}


--------------------------------------------------------------------------------------------------------------
13:
#### 战队页-》》基本信息接口

地址： http://192.168.101.99:8088/checkteam/

get

参数名称              类型                    是否为必选                  参数说明 
team_id               int                     必选                         战队id
token                 string                  可选                         用户已登陆的就加上token参数


返回结果


{
    "code": 0,
    "datas": [
        {
            "competition_point": 100000,
            "focus_on": 0,
            "has_member": 5,
            "id": 14,
            "like_num": 0,
            "max_member": 50,
            "nickname": "test",
            "rank": 1,
            "recruit": 0,
            "team_details": "欢迎你的到来",
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_name": "有你变得更加精彩1",
            "team_position": 0,
            "team_type": "竞技战队"
        }
    ]
}

competition_point                                     当前战队获得的赛点总数
focus_on                                              获得关注数
has_member                                            拥有的成员
max_member                                            成员上限
nickname                                              队长昵称
rank                                                  排名
team_details                                          战队宣言
team_icon                                             战队徽章
team_name                                             战队昵称
team_position                                         战队职位（0不在战队中，1战队成员，2战队队长）
recruit                                               战队是否对外招募(0对外招募1关闭招募;当team_position为2时才会有这个参数)
team_type                                             战队的类型（例如：贴吧战队（面向吧主），电竞战队）


--------------------------------------------------------------------------------------------------------------------------
14:
## 战队页，获取战队成员信息

地址： http://192.168.101.99:8088/teammember/

get

参数名称                                          参数类型                        是否为必选                        参数说明
team_id                                           int                              必选                              战队id
nick_name                                         string                          可选                               战队成员昵称
token                                             string                          可选                               登陆的用户就带上token参数


返回结果格式以及参数说明



{
    "code": 0,
    "datas": [
        {
            "icon": "http://baidu.com",
            "nickname": "test",
            "team_position": 2,
            "user_id": 1,
            "user_team_id": 7
        }
    ],
    "position_status": 0
}


icon                      用户的头像地址
nickname                  用户的昵称
team_position             战队职位标志（0普通成员，1副队长，2队长）
user_id                   战队成员的id
user_team_id              用户与战队之间关联表的id



position_status           查看信息的人在战队中的职位（0不在战队中，1战队成员，2队长）

--------------------------------------------------------------------------------------------------------

15: 
## 战队页，战队解散或者退出战队

地址： http://192.168.101.99:8088/teammember/

put


参数名称                                   类型                           是否为必选                        参数说明
token                                      string                         必选                               用户登陆令牌
team_id                                    int                            必选                               用户所在的战队id

结果

{
    "code": 0,
    "msg": ""
}



例如成功解散时 msg为  成功解散   

------------------------------------------------------------------------------------------------------------------------------------
16:
## 战队页，战队成员任命或者踢人

地址： http://192.168.101.99:8088/teamposition/



put

参数名称                                   类型                          是否为必选                     参数说明
token                                      string                        必选                            用户登陆的标志
team_id                                    int                           必选                            战队id
user_id                                    int                           必选                            被任命或者请离成员的id




结果

{
    "code": 0,
    "msg": "命副队人数已上限"
}



例如成功解散时 msg为  命副队人数已上限  



---------------------------------------------------------------------------------------------------------------------
17：
战队赛事管理


地址：http://192.168.101.99:8088/eventmanagement/

方法：get

参数
参数名称                                类型                         是否必选              参数说明
team_id                                 int                          必选                   战队id
user_id                                 int                          必选                   用户id
token                                   string                       必选                   用户授权令牌
offset                                  int                          可选                   查询数据的起始位置(默认为0)
limit                                   int                          可选                   偏移量(默认10)




{
    "code": 0,
    "datas": [
        {
            "award_name": "xxxxx大礼包",
            "award_type": 4,
            "events_title": "FIFA联赛",
            "flag": "等待开赛",
            "game_icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "game_name": "荒野行动",
            "has_max_team": "50/100",
            "op_team": 1,
            "total_bonus": 0,
            "user_data": [
                {
                    "icon": "student/dynamic/105",
                    "id": 4,
					"au_id": 26
                }
            ]
        }
    ],
    "total": 1
}


参数说明

flag                赛事状态描述
events_title        赛事主题
game_name           游戏名称
game_icon           游戏icon地址
total_bonus         总奖金
has_max_team        当前赛事报名队伍和队伍上限
award_type          奖品类型
award_name          奖品名称
op_team             该赛事是否可以管理

user_data           参数战队成员
					id             参赛成员的id
					icon           参赛成员的icon
					au_id          替换某个参赛成员时回传需要带上    
					
total               该战队参与赛事总数

--------------------------------------------------------------------------------------------------------------------

18:

赛事管理参赛成员替换

地址：http://192.168.101.99:8088/eventmanagement/

方法： put

参数名称                       类型                              是否必选                                    参谁说明
token                          string                            必选                                        用户授权令牌
team_id                        int                               必选                                        战队id
au_id                          int                               必选                                        报名赛事成员表id
event_id                       int                               必选                                        赛事id
user_id                        int                               必选                                        替换的成员id

返回结果

{
    "code": 0,
    "msg": "替换成功"
}



---------------------------------------------------------------------------------------------------------------------


19:
战队荣誉接口
地址：http://192.168.101.99:8088/honor/?offset=0&limit=2&team_id=14

方法 ： get 


参数名称                           类型                                   是否必须                                     参数说明
team_id                            int                                    必选                                         战队id
offset                             int                                    可选                                         数据起始位置(默认值0)
limit                              int                                    可选                                         偏移量(默认值10)


结果

{
    "code": 0,
    "datas": [
        {
            "award": "2000 彩豆",
            "event_level_name": "官方赛",
            "events_title": "FIFA联赛",
            "game_icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "game_name": "荒野行动",
            "rank": 1
        }
    ],
    "total": 1
}

                      



award                       奖项名称
event_level_name            赛事级别
events_title                赛事主题
game_icon                   游戏icon地址
game_name                   游戏名称
rank                        获得的名次


-----------------------------------------------------------------------------------------------------------

20：个人中心个人信息接口

地址：http://192.168.101.99:8088/usermessgemanage/

方法：get

参数名称                               类型                        是否必选                                参数说明
token                                  string                      可选                                    用户已登陆就带上token
user_id                                string                      必选                                    被查看者的id

结果

{
    "code": 0,
    "datas": [
        {
            "addr": "上海",
            "honor": [
                {
                    "create_time": "2018-07-06",
                    "events_title": "FIFA联赛",
                    "game_name": "荒野行动",
                    "rank": " 冠军"
                }
            ],
            "icon": "student/dynamic/105",
            "phone": "123",
            "platform_login_l": [
                {
                    "tieba": "哒哒么"
                }
            ],
            "team_name": "有你变得更加精彩1"
        }
    ],
    "op_status": 1
}

addr                      地址
icon                      icon地址
phone                     手机号码
team_name                 战队昵称
platform_login_l          绑定的第三方(tiba:贴吧的昵称,wc:昵称,qq:昵称)
honor                     获得的荣誉
							create_time           获得的时间
							events_title          赛事主题
							game_name             游戏名称
							rank                  荣誉


--------------------------------------------------------------------------------------------------------------

21:更改个人信息

地址：http://192.168.101.99:8088/usermessgemanage/

方法： put


参数名称                                类型                                 是否必选                     参数说明
user_id                                 int                                  必选                          用户的id
token                                   string                               必选                          用户的授权令牌
phone                                   string                               可选                          手机号码 
addr                                    string                               可选                          地址


{
    "code": 0,
    "msg": "修改成功"
}


--------------------------------------------------------------------------------------------------------------



22:我的游戏

地址：http://192.168.101.99:8088/usergame/?token=eyJhbGciOiJIUzI1NiIsImV4cCI6MTUzMTgyNTcxNSwiaWF0IjoxNTMxODE5NzE1fQ.eyJpZCI6IjIifQ.uxIiel8nQEfY6fPIaJjcn8Z6cRCEC1qWKxMD5Tm-sPI&user_id=2

1-1 方法：get

参数名称                               类型                            是否必选                        参数说明
token                                  string                          必选                            用户登陆授权令牌
user_id                                int                             必选                            用户id
offset                                 int                             可选                            数据起始位置(默认为0)
limit                                  int                             可选                            偏移量(默认10)

{
    "code": 0,
    "datas": [
        {
            "dan": "穷追不舍",
            "game_name": "胜者为王2",
            "guser_name": "梦or现实",
            "icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "id": 3
        },
        {
            "dan": "高级军官",
            "game_name": "荒野行动",
            "guser_name": "鸾雄乱想",
            "icon": "http://p2.ifengimg.com/a/2017_47/e289eaaee58e894_size27_w250_h258.jpg",
            "id": 2
        }
    ],
    "total": 2
}


dan               游戏段位
game_name         游戏名称
icon              游戏icon
guser_name        游戏任务id
id                我的游戏表id(用于修改游戏绑定和删除游戏)


1-2  方法: post
		



1-3  方法：put
		


1-4 方法： delete

参数名称                       类型                          是否必选                         参数说明
user_id                        int                           必选                              用户id
token                          string                        必选                              用户授权令牌
id                             int                           必选                              上面get方法中的id


{
    "code": 0,
    "msg": "删除成功"
}

-----------------------------------------------------------------------------------------------------------------

23：审核

地址：http://192.168.101.99:8088/checkteammember/

1-1
方法：get

参数名称                                     类型                    是否必选                           参数说明
token                                        string                   必须                              用户登陆令牌
user_id                                      int                      必须                              用户id
offset                                       int                      可选                              数据起始位置(默认为0)
limit                                        int                      可选                              偏移量(默认为10)


{
    "code": 0,
    "datas": [
        {
            "detail": "一起玩吧",
            "icon": "student/dynamic/105",
            "id": 12,
            "nickname": "test4"
        }
    ],
    "total": 1
}


detail              申请留言
icon                用户icon地址
nickname            昵称


1-3
方法： put


参数名称                             类型                                     是否必选                            参数说明
token                                string                                   必选                                 用户登陆令牌
user_id                              int                                      必选                                 用户id
status                               int                                      必选                                 1为同意申请2拒绝
id                                   int                                      必选                                 上面get方法中的id

     
{
    "code": 0,
    "msg":"申请成功"
}

--------------------------------------------------------------------------------------------------------------------------


24: 我的消息

地址：http://192.168.101.99:8088/usermessage/

方法：get

参数名称                                  类型                           是否必选                                参数说明
token                                     string                         必选                                     用户登陆令牌
user_id                                   int                            必选                                    用户id
offset                                    int                            可选                                    数据起始位置(默认值为0)
limit                                     int                            可选                                    偏移量(默认10)


{
    "code": 0,
    "datas": [
        {
            "create_time": "2018-07-09 19:10:31",
            "message": "你申请的战队  有你变得更加精彩1  拒绝加入，可到其他战队看看哦~"
        },
        {
            "create_time": "2018-07-09 19:09:31",
            "message": "你申请的战队  有你变得更加精彩1  拒绝加入，可到其他战队看看哦~"
        },
        {
            "create_time": "2018-07-09 19:09:05",
            "message": "加入战队  有你变得更加精彩1  有了战队要好好加油~"
        }
    ],
    "total": 7
}


create_time                      数据创建时间
message                          消息内容
total                            消息的条数


-----------------------------------------------------------------------------------------------------------------
25：我的赛事

地址:http://192.168.101.99:8088/usertournament/

方法：get


参数名称                               类型                                  是否必选                              参数说明
token                                  string                                必选                                   用户授权令牌
user_id                                int                                   必选                                   用户id
offset                                 int                                   可选                                   数据起始位置(默认值为0)
limit                                  int                                   可选                                   偏移量(默认10)



{
    "code": 0,
    "datas": [
        {
            "event_title": "FIFA联赛 ",
            "id": 2,
            "status": "等待开赛"
        }
    ],
    "total": 1
}

event_title                      赛事主题
id                               赛事id
status                           赛事状态
total                            参与赛事的总条数

---------------------------------------------------------------------------------------------------------------------


26:我的关注
地址：http://192.168.101.99:8088/focuson/

1-1
方法：get


参数名称                                      类型                                        是否为必选                                 参数说明
token                                         string                                      必选                                        用户授权令牌
user_id                                       int                                         必选                                        用户id
offset                                        int                                         可选                                        数据起始位置(默认值0)
limit                                         int                                         可选                                        偏移量(默认值10)




{
    "code": 0,
    "datas": [
        {
            "id": 6,
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_id": 18,
            "team_name": "王者战区"
        },
        {
            "id": 7,
            "team_icon": "http://img.taopic.com/uploads/allimg/121019/234917-121019231h258.jpg",
            "team_id": 19,
            "team_name": "王者战区1111"
        }
    ],
    "total": 2
}

team_icon                                 战队icon图片地址
team_name                                 战队名称
team_id                                   战队id


1-2
方法 ： post


参数名称                                 类型                                        是否必选                               参数说明
token                                    string                                      必选                                   用户授权令牌
user_id                                  int                                         必选                                   用户id
team_id                                  int                                         必选                                   战队id
focus_type                               int                                         必选                                   0取消关注1关注

{
    "code": 0,
    "msg": "还未关注"
}

























