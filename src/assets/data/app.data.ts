import { Injectable } from '@angular/core';

@Injectable()
export class AppData {
	// base
	static users = [
		{ uID: 0, uName: 'Chaos', lovesID: [] , uImg: 'assets/imgs/1.jpg', loves: [], uInfo: "I'm Default User", uPass: '', isLogin: true, bgImg: 'assets/imgs/2.jpg'}, 
	];
	static writings = [
		{ wID: 0, wTitle: 'Hellow World', wContent: '许多问题待解决', wTime: '', isPublic: true ,loveCount: 0, conCount: 0, wImg: 'assets/imgs/_1.jpg'},
		{ wID: 1, wTitle: 'Hellow World', wContent: '许多问题待解决', wTime: '', isPublic: true ,loveCount: 0, conCount: 0, wImg: 'assets/imgs/_1.jpg'}
	];
	static comments = [
		{cID: 0, content: '', time: '', loveCount: 0}
	];
	// more
	static u_w = [
		{ uID: 0, wID: 0 },
		{ uID: 0, wID: 1 }
	];
	static w_c = [
		{wID: 0, uID: 0, cID: 0}
	];
	static c_c = [
		{wID: 0, cID: 0,uID: 0, content: '', time: '', loveCount: 0}
	];
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
	// 获取文章的评论列表
	static getWritingComments(wID) {
		let cIDArr = [];
		AppData.w_c.map( ret => {
			if(ret.wID == wID){
				cIDArr.push(ret.cID);
			}
		})
		return AppData.comments.filter( ret => {
			return cIDArr.indexOf(ret.cID) != -1;
		})
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
}