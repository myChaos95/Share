import { Injectable } from '@angular/core';

@Injectable()
export class AppData {
	// base
	static users = [
		{ uID: 0, uName: 'Chaos', lovesID: [] , uImg: 'assets/imgs/1.jpg', loves: [], lovesCID: [], lovesC_CID: [], uInfo: "I'm Default User", uPass: '', isLogin: true, bgImg: 'assets/imgs/2.jpg'}, 
		{ uID: 1, uName: 'HaHa', lovesID: [] , uImg: 'assets/imgs/1.jpg', loves: [], lovesCID: [], lovesC_CID: [], uInfo: "I'm Default User", uPass: '', isLogin: true, bgImg: 'assets/imgs/2.jpg'}, 
	];
	static writings = [
		{ wID: 0, wTitle: 'Hellow World', wContent: '许多问题待解决', wTime: '', isPublic: true ,loveCount: 0, conCount: 1, wImg: 'assets/imgs/_1.jpg'},
		{ wID: 1, wTitle: 'Hellow World', wContent: '许多问题待解决', wTime: '', isPublic: true ,loveCount: 0, conCount: 0, wImg: 'assets/imgs/_1.jpg'}
	];
	static comments = [
		{wID: 0 ,cID: 0,  uID: 0, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis consequatur error rem sed! Similique amet dignissimos ea quas perferendis doloremque laudantium incidunt saepe, minus tenetur ipsa dolorem, cumque, voluptate eos!', time: '2017/5/29 16:15:30', loveCount: 0},
		{wID: 0 ,cID: 1,  uID: 0, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis consequatur error rem sed! Similique amet dignissimos ea quas perferendis doloremque laudantium incidunt saepe, minus tenetur ipsa dolorem, cumque, voluptate eos!', time: '2017/5/29 16:15:30', loveCount: 0},
		{wID: 0 ,cID: 2,  uID: 1, content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Debitis consequatur error rem sed! Similique amet dignissimos ea quas perferendis doloremque laudantium incidunt saepe, minus tenetur ipsa dolorem, cumque, voluptate eos!', time: '2017/5/29 16:15:30', loveCount: 0},
	];
	// more
	static u_w = [
		{ uID: 0, wID: 0 },
		{ uID: 1, wID: 1 }
	];
	static c_c = [
		{c_cID: 0, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 1, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 2, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 3, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 4, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 5, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 6, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
		{c_cID: 7, wID: 0, cID: 0, toID: 0, fromID: 0, content: '回复', time: '', loveCount: 0},
	];
	// 获取作者信息
	static getUser(uID) {
		return AppData.users.find(ret => {
			return ret.uID == uID;
		})
	}
	// 根据文章获取作者
	static getUserByWritings(wID) {
		let u_w = AppData.u_w.find( ret => {
			return ret.wID == wID;
		});
		return AppData.getUser(u_w.uID);
	}
	// 获取热门文章 !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	static getHotWritings(n = 6) {
		return AppData.writings.slice(0,n);
	}
	// 获取我的关注的文章
	static getAllMyLoveWritings(uID,n = 6) {
		let myLoves = AppData.getMyLove(uID);
		let wr = [];
		myLoves.map(  ret => {
			let arr = AppData.getMyWritings(ret.uID);
			wr = wr.concat(arr);
		})
		return wr.slice(0,n);
	}

	// 获取文章列表
	static getMyWritings(id, n?) {
		let arr = [];
		AppData.u_w.map( ret => {
			if(ret.uID == id){
				arr.push(ret.wID);
			}
		});
		let ret =  AppData.writings.filter( ret => {
			return arr.indexOf(ret.wID) != -1;
		});
		n = n || ret.length;
		return ret.slice(0,n);
	}
	// 发布文章
	static publicWrings(userID,title,content,wImg='',isPublic=true) {
		var newW = { wID: 0, wTitle: 'hi', wContent: 'test', wTime: '', isPublic: true ,loveCount: 0, conCount: 0, wImg: ''};
		let l = AppData.writings.length;

		newW.wID = l + 1;
		newW.wTitle = title;
		newW.wContent = content;
		newW.isPublic = isPublic; 
		newW.wImg = wImg;
		newW.wTime = new Date().toLocaleString();

		AppData.writings.push(newW);
		AppData.u_w.push({uID: userID,wID: l + 1});
	}
	// 获取我的关注列表
	static getMyLove(userID) {
		let user = AppData.users.find( obj => {
			return obj.uID == userID;
		})
		return AppData.users.filter( obj => {
			return user.lovesID.indexOf(obj.uID) != -1;
		})
	}
	// 获取我的粉丝列表
	static getMyFans(userID) {
		return AppData.users.filter( obj => {
			return obj.lovesID.indexOf(userID) != -1;
		})
	}
	// 获取我的收藏列表以及其作者信息
	static getMyLoveWritings(userID) {
		let myLoveWritings = [];
		let user = AppData.users.find( obj => {
			return obj.uID == userID;
		})
		let wIDArr = user.loves;
		let autorIDArr = [];
		AppData.u_w.map( ret => {
			if(wIDArr.indexOf(ret.wID) != -1){
				autorIDArr.push(ret.uID);
			}
		})
		let autorArr = AppData.users.filter( ret => {
			return autorIDArr.indexOf(ret.uID) != -1;
		})
		let writings = AppData.writings.filter( ret => {
			return wIDArr.indexOf(ret.wID) != -1;
		})
		writings.map( (ret,index) => {
		 	let obj:any = ret;
		 	obj.autor = autorArr[index];
		 	myLoveWritings.push(obj);
		} )
		return myLoveWritings;
	}
	// 获取文章的评论列表 op = 0 代表 所有人,其余=作者评论
	static getWritingComments(wID, num?, op = 0, autorID?) {
		let arr: any;
		if(op == 0) {
			arr = AppData.comments.filter( ret => {
				return ret.wID == wID;
			});
		}else {
			arr = AppData.comments.filter( ret => {
				return ret.wID == wID && ret.uID == autorID;
			})
		}
		if( num == undefined) {
			num = arr.length;
		}
		return arr.slice(0, num);
	}
	// 根据文章评论获取评论人
	static getUserByComments(cID) {
		let uID = AppData.comments.find( ret => {
			return ret.cID == cID;
		}).uID;
		return AppData.getUser(uID);
	}
	// 获取评论的评论
	static getCommentComments(wID,cID) {
		return AppData.c_c.filter( ret => {
			return ret.cID == cID && ret.wID == wID;
		})
	}
	// 关注操作 0 加关注 1 删除关注
	static opLovePerson(uID,lID,num = 0) {
		let user =  AppData.users.find( ret => {
			return ret.uID == uID;
		})
		if(num == 0){
			user.lovesID.push(lID);
		}else{
			let i = user.lovesID.indexOf(lID);
			user.lovesID.splice(i,1);
		}
	}
	// 判断是否已关注
	static isGuanzhu(uID,lID){
		let user = AppData.users.find( ret => {
			return ret.uID == uID;
		}) 
		if(user.lovesID.indexOf(lID) != -1){
			return true;
		}else{
			return false;
		}
	}
	// 获取某人文章图片合集
	static getPersonPic(uID,len) {
		let arr = AppData.getMyWritings(uID);
		let images = [];
		arr.map( ret => {
			if(ret.wImg != ''){
				images.push(ret.wImg);
			}
		})
		return images.slice(0,len);
	}
	// 查看是评论是否已经点赞
	static isZan(uID,cID) {
		let user = AppData.getUser(uID);
		let i = user.lovesCID.indexOf(cID);
		if( i != -1) {
			return true;
		}else {
			return false;
		}
	}
	// 查看回复是否已经点赞
	static replyIsZan(uID,c_cID) {
		let user = AppData.getUser(uID);
		let i = user.lovesC_CID.indexOf(c_cID);
		if( i != -1) {
			return true;
		}else {
			return false;
		}
	}
	// 评论点赞操作 0 点赞 / 其他 取消赞
	static operZan(uID,cID,num = 0) {
		let user = AppData.getUser(uID);
		if( num == 0){
			user.lovesCID.push(cID);
		}else {
		 	let i = user.lovesCID.indexOf(cID);
		 	user.lovesCID.splice(i,1);
		}
		return true;
	}
	// 回复点赞操作
	static operReplyZan(uID, c_cID, num = 0) {
		let user = AppData.getUser(uID);
		if( num == 0){
			user.lovesC_CID.push(c_cID);
		}else {
		 	let i = user.lovesC_CID.indexOf(c_cID);
		 	user.lovesC_CID.splice(i,1);
		}
		return true;
	}
	// 获取评论的回复
	static getC_C(cID, num?) {
		let arr = AppData.c_c.filter( ret => {
			return ret.cID == cID;
		});
		if( num == undefined) {
			num = arr.length;
		}
		return arr.slice(0, num);
	}
	// 发布评论
	static publicWritingComments(wID,uID,content) {
		let cID = AppData.comments.length;
		let time = new Date().toLocaleString();
		let newCom = {
			wID: wID,
			uID: uID,
			cID: cID,
			content: content,
			time: time,
			loveCount: 0
		};
		AppData.comments.push(newCom);
		return true;
	}
	// 回复评论
	static replyComments(wID,cID,fromID,toID,content) {
		let c_cID = AppData.c_c.length;
		let time = new Date().toLocaleString();
		let newRep = {
			c_cID: c_cID,
			wID: wID,
			cID: cID,
			fromID: fromID,
			toID: toID,
			content: content,
			time: time,
			loveCount: 0
		}
		AppData.c_c.push(newRep);
		return true;
	}
}