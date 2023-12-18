import { AxiosResponse } from 'axios';

import {
  IRepository,
  IResponse,
  IUserUpdate,
  IUserInfo,
  IUserRegister,
  IPost,
  ICreatePost
} from '@/types';
import { BaseService } from './BaseService';

class AdminService extends BaseService {
  constructor() {
    super();
  }

  //   updateUser = (
  //     userUpdate: IUserUpdate
  //   ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
  //     return this.put(`/users/update`, userUpdate);
  //   };
  //   getFollowers = (
  //     userID: string
  //   ): Promise<AxiosResponse<IResponse<IUserInfo[]>>> => {
  //     return this.get(`/users/followers/${userID}`);
  //   };
  //   getFollowing = (
  //     userID: string
  //   ): Promise<AxiosResponse<IResponse<IUserInfo[]>>> => {
  //     return this.get(`/users/following/${userID}`);
  //   };
  //   getShouldFollow = (): Promise<AxiosResponse<IResponse<IUserInfo[]>>> => {
  //     return this.get(`/users/shouldfollow`);
  //   };
  //   getUserInfo = (): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
  //     return this.get(`/users/me`);
  //   };
  //   getUserInfoByID = (
  //     userID: string
  //   ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
  //     return this.get(`/users/find/${userID}`);
  //   };
  //   followUser = (userID: string): Promise<AxiosResponse<IResponse<boolean>>> => {
  //     return this.put(`/users/follow/${userID}`, '');
  //   };
  //   getRepositoryGithub = (): Promise<
  //     AxiosResponse<IResponse<IRepository[]>>
  //   > => {
  //     return this.getGithub(`/users/repositories`);
  //   };
  getUserForAdmin = (): Promise<AxiosResponse<IResponse<IUserInfo[]>>> => {
    return this.get(`/admin/users`);
  };
  updateUserForAdmin = (
    userID: string,
    userUpdate: IUserUpdate
  ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
    return this.put(`/admin/users/update/${userID}`, userUpdate);
  };
  deleteUserForAdmin = (
    userID: string
  ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
    return this.delete(`/admin/users/delete/${userID}`);
  };
  registerUserForAdmin = (
    userRegister: IUserRegister
  ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
    return this.post(`/admin/users/create`, userRegister);
  };
  getPostForAdmin = (): Promise<AxiosResponse<IResponse<IPost[]>>> => {
    return this.get(`/admin/posts`);
  };
  updatePostForAdmin = (id: string, post: ICreatePost): Promise<AxiosResponse<IResponse<IPost>>> => {
    return this.put(`/admin/posts/update/${id}`, post);
  };
  deletePostForAdmin = (id: string): Promise<AxiosResponse<IResponse<IPost>>> => {
    return this.delete(`/admin/posts/delete/${id}`);
  };
  createPostForAdmin = (post: ICreatePost): Promise<AxiosResponse<IResponse<IPost>>> => {
    return this.post(`/admin/posts/create`, post);
  };
  getCommentByPostForAdmin = (id: string): Promise<AxiosResponse<IResponse<IPost>>> => {
    return this.get(`/admin/comments/parents/${id}`);
  }
}

export const adminService = new AdminService();
