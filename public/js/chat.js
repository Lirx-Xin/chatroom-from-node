new Vue({
		el: "#app",
		data: {
			name:'',
			userid: '',
			username: '少时诵诗书',
			firename: '',
			chatroom:'',
			mesg: '',
			validator1:false,
			validator2:false,
			onlineUsers:{},
			showwel:true,
			dialogFormVisible:false,
			dialogVisible:false,
			indexold:'',
			chatindexold:'',
			checkuserlist:[],
			checkusername:[],
			roomname:'',
			items: [],
			megs:[],
			groups:[],
			num:[],
			rooms:[],
			theroom:{},
			userlist:{},
			list:[]
		},
		created() {
			this.init()
		},
		mounted() {
			// this.init()
			this.getroom()
			this.getuser()
			Date.prototype.Format = function (fmt) {
				var o = {
					"M+": this.getMonth() + 1, //月份
					"d+": this.getDate(), //日
					"H+": this.getHours(), //小时
					"m+": this.getMinutes(), //分
					"s+": this.getSeconds(), //秒
					"q+": Math.floor((this.getMonth() + 3) / 3), //季度
					"S": this.getMilliseconds() //毫秒
				};
				if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
				for (var k in o)
				if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
				return fmt;
			}
		},
// 		updated(){
// 			this.scrollHeight = document.getElementsByClassName('message')[0].scrollHeight
// 			console.log(this.scrollHeight)
// 		},
		watch:{
// 			scrollHeight(newh,oldh){
// 				var message = document.getElementsByClassName('message')[0]
// 				message.scrollTop = message.scrollHeight
// 			}
		},
		methods: {
			getmesg(){
				this.dialogVisible = true
				this.name = (this.firename === '')?this.chatroom:this.firename;
				var param = {
					firename:this.firename,
					username:this.username,
					roomname:this.chatroom
				}
				var _this = this
				var ajax = new XMLHttpRequest()
				ajax.open( 'post', "http://127.0.0.1:3535/getmesg", true )
				ajax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
				ajax.send( JSON.stringify( param ) )
				ajax.onreadystatechange = function () {
					if ( ajax.readyState === 4 && ajax.status === 200 ) {
						var num = JSON.parse( ajax.responseText )
						_this.list = num
						var div = _this.$refs.box;
						setTimeout(()=>{
							div.scrollTop = div.scrollHeight;
						},0)
					}
				}
			},
			showuser(i){
				this.groups[i].usershow = !this.groups[i].usershow
			},
			checkthis(xx){
				console.log(xx)
				this.checkusername = []
				for(let i in xx){
					this.checkusername.push(this.onlineUsers[xx[i]])
				}
			},
			deleted(i){
				var x = this.checkusername.indexOf(i)
				this.checkusername.splice(x,1)
				this.checkuserlist.splice(x,1)
			},
			addroom(){
				this.dialogFormVisible = true
				for(var i in this.num){ 
					this.num[i].checked = false
				}
			},
			closeadd(){
				this.checkuserlist = []
				this.checkusername = []
				this.validator2 = false
				this.validator1 = false
				this.roomname = ''
			},
			toaddchat(){
				if(this.roomname==''){
					this.validator2 = false
					this.validator1 = true
					return
				}else if(this.checkuserlist.length == 0){
					this.validator1 = false
					this.validator2 = true
					return
				}
				this.checkuserlist.push(this.userid)
				var param = {
					chatroom:this.roomname,
					roomuser:this.checkuserlist
				}
				var _this = this
				var ajax = new XMLHttpRequest()
				ajax.open( 'post', "http://127.0.0.1:3535/addroom", true )
				ajax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
				ajax.send( JSON.stringify( param ) )
				ajax.onreadystatechange = function () {
					if ( ajax.readyState === 4 && ajax.status === 200 ) {
						var num = JSON.parse( ajax.responseText )
						console.log( ajax.responseText )
						if(num.success == '00'){
							_this.open()
							_this.dialogFormVisible = false
						}else{
							_this.open1()
						}
					}
				}
			},
			open(){
				this.$message({
				  message: '恭喜你，房间添加成功！',
				  type: 'success'
				});
			  },
			open1() {
				this.$message.error('房间添加失败！');
			  },
		    getuser(){
			  var _this = this
			  var ajax = new XMLHttpRequest()
			  ajax.open( 'get', "http://127.0.0.1:3535/getuser", true )
			  ajax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
			  ajax.send()
			  ajax.onreadystatechange = function () {
			  	if ( ajax.readyState === 4 && ajax.status === 200 ) {
			  		var num = JSON.parse( ajax.responseText )
			  		_this.userlist = num
			  	}
			  }
		    },
			getroom(){
				var _this = this
				var ajax = new XMLHttpRequest()
				ajax.open( 'get', "http://127.0.0.1:3535/getroom", true )
				ajax.setRequestHeader( 'Content-Type', 'application/x-www-form-urlencoded' );
				ajax.send()
				ajax.onreadystatechange = function () {
					if ( ajax.readyState === 4 && ajax.status === 200 ) {
						var num = JSON.parse( ajax.responseText )
						for(let i in num){
							if(num[i].roomuser.indexOf(_this.userid) != '-1'){
								_this.rooms.push(num[i])
							}
						}
						for(var i=0;i<_this.rooms.length;i++){
							var tep = {
								roomuser:_this.rooms[i].roomuser,
								roomname:_this.rooms[i].roomname,
								show:false,
								usershow:false,
								messageDIv:[]
							}
							_this.groups.push(tep)
							_this.theroom[_this.rooms[i].roomname] = _this.rooms[i].roomuser
						}
						console.log(_this.groups)
					}
				}
			},
			handleOpen(key, keyPath) {
				console.log(key, keyPath);
			},
			handleClose(key, keyPath) {
				console.log(key, keyPath);
			},
			checkuser(user,index) {
				if(this.items[index].msgremind == true){
					this.items[index].msgremind = false
				}
				this.firename = user
				if(typeof(this.indexold) == 'string'){//第一次点击用户
					 if(typeof(this.chatindexold) == 'string'){//房间没打开
						this.showwel = false
						this.megs[index].show=true
						this.indexold = index
						console.log(this.indexold) 
					 }else{
						 this.chatroom = ''
						 this.groups[this.chatindexold].show=false
						 this.megs[index].show=true
						 this.indexold = index
						 this.chatindexold = ''
					}
					
				}else{//点击另一个用户
					this.megs[this.indexold].show=false
					this.megs[index].show=true
					this.indexold = index
					console.log(this.indexold)
				}
			},
			checkroom(room,index){
// 				this.showwel = false
				this.chatroom = room
				if(typeof(this.indexold) != 'string' && this.showwel == false){
					this.firename = ''
					this.megs[this.indexold].show=false
					this.indexold = ''
					this.groups[index].show=true
					this.chatindexold = index
				}else{
					if(typeof(this.chatindexold) == 'string'){
						this.showwel = false
						this.groups[index].show=true
						this.chatindexold = index
					}else{
						this.groups[this.chatindexold].show=false
						this.groups[index].show=true
						this.chatindexold = index
					}
					
				}
			},
			//提交聊天消息内容
			submit() {
				// var content = d.getElementById("content").value;
				if (this.mesg != '') {
// 					var date = new Date();
// 					date.setHours(date.getHours() + 8);
					var obj = {
						userid: this.userid,
						username: this.username,
						content: this.mesg,
						firename:this.firename,
						roomname:this.chatroom,
						date:new Date().Format("yyyy-MM-dd HH:mm:ss")
					};
					this.socket.emit('meg', obj);
					var contentDiv = '<div>' + this.mesg + '</div>';
					var usernameDiv = '<span>' + this.username + '</span>';
					var div = { action: true, html: contentDiv + usernameDiv };
					if(this.firename != '' && this.chatroom == ''){
						this.megs[this.indexold].messageDIv.push(div)
						this.scrollToBottom(this.indexold)
					}
					this.mesg = '';
				}
				return false;
			},
			scrollToBottom(index){
				var onefire = document.getElementsByClassName('onefire')[index]
				setTimeout(()=>{
					onefire.scrollTop = onefire.scrollHeight;
				},0)
			},
			init() {
				/*
				客户端根据时间和随机数生成uid,这样使得聊天室用户名称可以重复。
				实际项目中，如果是需要用户登录，那么直接采用用户的uid来做标识就可以
				*/
// 				var scrollToBottom = function(){
// 					var message = document.getElementsByClassName('message')[0]
// 					message.scrollTop = message.scrollHeight
// 				};
				//分割成字符串
				var getval = document.URL.split('?')[1];
				var keyValue = getval.split('&');

				this.userid = keyValue[0].split('=')[1];

				this.username = decodeURI(keyValue[1].split('=')[1]);
				console.log(this.username)
				// d.getElementById("showusername").innerHTML = this.username;
				//this.msgObj.style.minHeight = (this.screenheight - db.clientHeight + this.msgObj.clientHeight) + "px";
				// this.scrollToBottom();

				//连接websocket后端服务器
				this.socket = io.connect('ws://127.0.0.1:3535');

				//告诉服务器端有用户登录
				this.socket.emit('login', { userid: this.userid, username: this.username });

				//监听新用户登录
				this.socket.on('login', function(o){
					_this.onlineUsers = o.onlineUsers
					console.log(o.useronline)
					for(let i=0;i<o.useronline.length;i++){
						if(o.useronline[i].userid == _this.userid){
							o.useronline.splice(i,1)
						}
					}
					console.log(o.useronline)
					_this.num = o.useronline
					_this.items=JSON.parse(JSON.stringify(_this.num))
					for(var i in _this.items){
						_this.items[i].msgremind = false
					}
					if(_this.megs.length == 0){//登录者的客户端
						for(var i=0;i<_this.num.length;i++){
							var tep = {
								firename:_this.num[i].username,
								show:false,
								messageDIv:[]
							}
							_this.megs.push(tep)
						}
					}else{//已登录的客户端
						var temp = {
							firename:o.user.username,
							show:false,
							messageDIv:[]
						}
						_this.megs.push(temp)
					}
				});

				//监听用户退出
				this.socket.on('logout', function(o){
					for(var j in _this.items){ //将退出用户从在线列表删除
						if(_this.items[j].username == o.user.username){
							_this.items.splice(j,1);
						}
					}
					for(var j in _this.megs){ //将退出用户聊天框从列表删除
						if(_this.megs[j].firename == o.user.username){
							_this.megs.splice(j,1);
						}
					}
					if(_this.firename == o.user.username){//如果退出用户是当前用户聊天对象
						_this.showwel = true
						_this.indexold = ''
					}else{//将当前打开的indexold修改为有用户退出后的index
						for(var i in _this.items){
							if(_this.firename == _this.items[i].username){
								_this.indexold = +i
							}
						}
					}
				});
				//监听新增房间
				this.socket.on('addroom', function(o){
					console.log(o)
					_this.rooms.push(o)
					var tep = {
						roomname:o.roomname,
						show:false,
						messageDIv:[]
					}
					_this.groups.push(tep)
					_this.theroom[o.roomname] = o.roomuser
				})
				//监听消息发送
				var _this = this
				this.socket.on('meg', function (obj) {
					// var isme = (obj.userid == _this.userid) ? true : false;
					var contentDiv = '<div>' + obj.content + '</div>';
					var usernameDiv = '<span>' + obj.username + '</span>';
					var div = { action: false, html: contentDiv + usernameDiv };
					// if(obj.firename != '' && obj.roomname == ''){
// 						if(obj.userid == _this.userid){//如果当前用户是此消息发送者
// 							_this.megs[_this.indexold].messageDIv.push(div)
						// }else if(obj.firename == _this.username){//如果当前用户是消息接受者
							for(var i in _this.megs){//在消息接收方客户端的消息发送者对应的消息框渲染
								if(_this.megs[i].firename == obj.username){
									_this.megs[i].messageDIv.push(div)
									_this.scrollToBottom(i)
								}
							}
							if(_this.firename != obj.username){//如果消息接受方当前打开的消息框不是此消息的发送者,给发送者昵称后加消息提示
								for(var j in _this.items){
									if(_this.items[j].username == obj.username){
										_this.items[j].msgremind = true
									}
								}
							}
						// }
// 					}else{
// 						if(obj.userid == _this.userid){//如果当前用户是此消息发送者
// 							_this.groups[_this.chatindexold].messageDIv.push(div)
// 						}else if(_this.theroom[obj.roomname].indexOf(_this.userid) != '-1'){
// 							for(var i in _this.groups){//在消息接收方客户端的消息发送者对应的消息框渲染
// 								if(_this.groups[i].roomname == obj.roomname){
// 									_this.groups[i].messageDIv.push(div)
// 								}
// 							}
// 						}
// 					}
					// _this.scrollToBottom()
				});
				this.socket.on('roommeg', function (obj) {
					var isme = (obj.userid == _this.userid) ? true : false;
					var contentDiv = '<div>' + obj.content + '</div>';
					var usernameDiv = '<span>' + obj.username + '</span>';
					var div = { action: isme, html: contentDiv + usernameDiv };
					if(obj.userid == _this.userid){//如果当前用户是此消息发送者
						_this.groups[_this.chatindexold].messageDIv.push(div)
					}else if(_this.theroom[obj.roomname].indexOf(_this.userid) != '-1'){
						for(var i in _this.groups){//在消息接收方客户端的消息发送者对应的消息框渲染
							if(_this.groups[i].roomname == obj.roomname){
								_this.groups[i].messageDIv.push(div)
							}
						}
					}
				});
			}
		}
	})