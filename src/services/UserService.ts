import { AxiosResponse } from 'axios';

import { IRepository, IResponse, IUserUpdate, IUserInfo } from '@/types';
import { BaseService } from './BaseService';

class UserService extends BaseService {
  constructor() {
    super();
  }

  updateUser = (
    userUpdate: IUserUpdate
  ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
    return this.put(`/users/update`, userUpdate);
  };

  // Friend request
  getFriends = (
    userID: string
  ): Promise<AxiosResponse<IResponse<IUserInfo[]>>> => {
    return this.get(`/users/friend_list/${userID}`);
  };
  getRequestSent = (
    userID: string
  ): Promise<AxiosResponse<IResponse<string[]>>> => {
    return this.get(`/users/request_sent`, userID);
  };
  getRequestReceived = (
    userID: string
  ): Promise<AxiosResponse<IResponse<string[]>>> => {
    return this.get(`/users/request_received`, userID);
  };
  sendFriendRequest = (
    userID: string
  ): Promise<AxiosResponse<IResponse<boolean>>> => {
    return this.post(`/users/send_friend_request/${userID}`, '');
  };
  acceptFriendRequest = (
    userID: string
  ): Promise<AxiosResponse<IResponse<boolean>>> => {
    return this.post(`/users/accept_friend_request/${userID}`, '');
  };
  getShouldAddFriend = (): Promise<AxiosResponse<IResponse<IUserInfo[]>>> => {
    return this.get(`/users/should-add-friend`);
  };

  // User request
  getUserInfo = (): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
    return this.get(`/users/me`);
  };
  getUserInfoByID = (
    userID: string
  ): Promise<AxiosResponse<IResponse<IUserInfo>>> => {
    return this.get(`/users/find/${userID}`);
  };

  getRepositoryGithub = (): Promise<
    AxiosResponse<IResponse<IRepository[]>>
  > => {
    return this.getGithub(`/users/repositories`);
  };
  checkExistEmail = (
    email: string
  ): Promise<AxiosResponse<IResponse<boolean>>> => {
    return this.put(`/users/checkemail/${email}`);
  };
}

export const userService = new UserService();
