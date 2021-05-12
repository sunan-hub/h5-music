/*
 * @Descripttion:
 * @Author: 清香<ivestszheng@qq.com>
 * @Date: 2020-12-10 18:23:43
 * @LastEditTime: 2021-02-24 15:52:39
 */
import axios from 'axios'  // 下载音乐需要用到
import {get,post} from "./http";

//===============轮播图===================
//查询所有轮播图
export const getAllSwiper =() => get(`swiper/allSwiper`);

//============歌手相关================
//查询歌手
export const getAllSinger =() => get(`singer/allSinger`);
//根据性别查询歌手
export const getSingerOfSex = (sex) => get(`singer/singerOfSex?sex=${sex}`);

//============歌曲相关================
//根据歌手id查询歌曲
export const songOfSingerId =(id) => get(`song/singer/detail?singerId=${id}`);
//根据歌曲id查询歌曲对象
export const songOfSongId =(id) => get(`song/detail?songId=${id}`);
//根据歌手名字模糊查询歌曲
export const likeSongOfName =(keywords) => get(`song/likeSongOfName?songName=${keywords}`);

//============歌单相关================
//查询歌单
export const getAllSongList =() => get(`songList/allSongList`);
//返回标题包含文字的歌单列表
export const getSongListOfLikeTitle = (keywords) => get(`songList/likeTitle?title=${keywords}`);
//根据风格模糊查询歌单列表
export const getSongListOfLikeStyle = (style) => get(`songList/likeStyle?style=${style}`);


//============歌单的歌曲相关============
//根据歌单id查询歌曲列表
export const listSongDetail = (songListId) => get(`listSong/detail?songListId=${songListId}`);

//============用户相关================
//查询用户
export const getAllUsers =() => get(`users/allUsers`);
//注册
export const SignUp =(params) => post(`/users/add`,params);
//登录
export const loginIn =(params) => post(`/users/login`,params);
//根据用户id查询该用户的详细信息
export const getUserOfId =(id) => get(`/users/selectByPrimaryKey?id=${id}`);
//更新用户信息
export const updateUserMsg =(params) => post(`/users/update`,params);

//下载音乐
export const download = (url)  => axios({
    method: 'get',
    url: url,
    responseType: 'blob'
});

//===========评价======================
//提交评分
export const setPingfen =(params) => post(`/pingfen/add`,params);
//获取指定歌单的平均分
export const getPingfenOfSongListId = (songListId) => get(`/pingfen?songListId=${songListId}`);

//===========评论======================
//提交评论
export const setPinglun =(params) => post(`/pinglun/add`,params);
//点赞
export const setLike =(params) => post(`/pinglun/like`,params);
//返回当前歌单或歌曲的评论列表
export const getAllPinglun = (type,id) => {
    if(type == 0){              //歌曲
        return get(`/pinglun/pinglunOfSongId?songId=${id}`);
    }else{                      //歌单
        return get(`/pinglun/pinglunOfSongListId?songListId=${id}`);
    }
}

//===============收藏===================
//新增收藏
export const setShoucang =(params) => post(`/shoucang/add`,params);
//指定用户的收藏列表
export const getShoucangOfUserId = (userId) => get(`/shoucang/shoucangOfUserId?userId=${userId}`);
// 删除用户收藏的歌曲
export const deleteShoucangion = (userId, songId) => get(`shoucang/delete?userId=${userId}&songId=${songId}`)


