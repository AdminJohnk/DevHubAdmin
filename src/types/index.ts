import type { ModalFuncProps } from 'antd';

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IGoogleLogin {
  token: string;
}

export interface IUserRegister extends IUserLogin {
  name: string;
  confirm: string;
}

export interface IUserAToken {
  accessToken: string;
}

export interface IForgotPassword {
  email: string;
}

export interface IVerifyCode {
  email: string;
  code: string;
}

export interface IResetPassword {
  email: string;
  password: string;
  confirm?: string;
}

export interface IUserUpdate {
  name?: string;
  phone_number?: string;
  user_image?: string;
  cover_image?: string;
  tags?: string[];
  alias?: string;
  about?: string;
  experiences?: IExperience[];
  repositories?: IRepository[];
  contacts?: IContact[];
  location?: string;
}

export interface IRepository {
  id: string;
  name: string;
  private: boolean;
  html_url: string;
  watchers_count: number;
  forks_count: number;
  stargazers_count: number;
  languages: string;
}

export interface IExperience {
  position_name: string;
  company_name: string;
  start_date: string;
  end_date: string;
}

export interface IContact {
  key: string;
  tooltip: string;
  link: string;
  state?: boolean;
}

export interface IUserInfo {
  _id: string;
  name: string;
  email: string;
  role: string[];
  last_online: string;
  phone_number: string;
  user_image: string;
  cover_image: string;
  tags: string[];
  alias: string;
  about: string;
  posts: IPost[];
  experiences: IExperience[];
  repositories: IRepository[];
  contacts: IContact[];
  location: string;
  createdAt: string;
  favorites: string[];
  communities: string[];
  notifications: string[];
  friends: IUserInfo[];
  requestSent: String[];
  requestReceived: String[];
  friend_number: number;
  pendingFriend_number: number;
  members: IUserInfo[];
  post_number: number;
  is_friend: boolean;
  id_incr: number;
}

export interface TypeOfLink {
  address: string;
  title: string;
  description: string;
  image: string;
}

export interface ICreatePost {
  title: string;
  content: string;
  visibility: Visibility;
  images?: (string | undefined)[];
}
export interface ICreatePostForAdmin {
  email: string;
  title: string;
  content: string;
  visibility: Visibility;
  images?: (string | undefined)[];
}

export interface IUpdatePost {
  id: string;
  postUpdate: ICreatePost;
}

export interface ISharePost {
  post: string;
  visibility: Visibility;
  owner_post: string;
}

type TypeofPost = 'Post' | 'Share';

export interface IPost {
  _id: string;
  type: TypeofPost;
  visibility: Visibility;
  post_attributes: {
    user: IUserInfo;

    //if type is post
    title: string;
    content: string;
    images: string[];
    url?: TypeOfLink;

    //if type is share
    post?: IPost;
    owner_post?: IUserInfo;

    view_number: number;
    like_number: number;
    comment_number: number;
    share_number: number;
    save_number: number;
    likes: ILikePost[];
    comments: ICommentPost[];
    shares: ISharePost[];
  };
  is_liked: boolean;
  is_shared: boolean;
  is_saved: boolean;
  createdAt: string;
}

export interface ILikePost {
  _id: string;
  user: IUserInfo;
  post: IPost;
  owner_post: IUserInfo;
}

type TypeofComment = 'parent' | 'child';

export interface ICreateComment {
  content: string;
  type: TypeofComment;
  post: string;
  parent?: string;
}

export interface IImageResponse {
  key: string;
}

export interface ICreateLikeComment {
  id: string;
  comment: ILikeComment;
}

export interface IGetChildComments {
  post: string;
  parent: string;
}

export interface ILikeComment {
  type: TypeofComment;
  post: string;
  owner_comment: string;
}

export interface ICommentPost {
  _id: string;
  post: IPost;
  user: IUserInfo;
  content: string;
  type: TypeofComment;

  //if interface is child
  parent?: ICommentPost;

  //if interface is parent
  children?: ICommentPost[];

  is_liked: boolean;
  is_disliked: boolean;
  likes: ILikePost[];
  dislikes: ILikePost[];
  like_number: number;
  dislike_number: number;
  child_number: number;
  createdAt: string;
}

export interface ICommentUpdate {
  type: string;
  content: string;
}

export interface ISelectedComment {
  isReply: boolean;
  idComment: string | null;
  name: string | null;
  user_image: string | null;
}

export interface IResponse<T> {
  message: string;
  status: number;
  metadata: T;
}

export type TypeofConversation = 'private' | 'group';

export interface IConversation {
  _id: string;
  type: TypeofConversation;
  members: IUserInfo[];
  name: string;
  lastMessage: IMessage;
  seen: IUserInfo[];
  creator: string;
  admins: IUserInfo[];
  image?: string;
  cover_image?: string;
  createdAt: string;
  updatedAt: string;
}

export interface ICreateConversation {
  type: TypeofConversation;
  members: string[];
  name?: string;
  image?: string;
}

type TypeofUpdateConversation =
  | 'name'
  | 'image'
  | 'cover_image'
  | 'add_member'
  | 'remove_member'
  | 'commission_admin'
  | 'remove_admin';

export interface IUpdateConversation extends IConversation {
  typeUpdate: TypeofUpdateConversation;
}

type TypeofMessage =
  | 'text'
  | 'image'
  | 'notification'
  | 'audio'
  | 'file'
  | 'voice'
  | 'video';

export interface IMessage {
  _id: string;
  conversation_id: string;
  type: TypeofMessage;
  sender: IUserInfo;
  content: string;
  isSending?: boolean;
  images?: string[];
  createdAt: string;
}

export interface ICreateMessage {
  conversation_id: string;
  content?: string;
  image?: string;
}

export interface ICalled {
  _id: string;
  content: string;
  conversation_id: IConversation;
  sender: IUserInfo;
  type: TypeofMessage;
  createdAt: string;
}

export interface IEmoji {
  id: string;
  name: string;
  native: string;
  unified: string;
  keywords: string[];
  shortcodes: string;
}

export interface ISocketCall {
  author: IUserInfo;
  user_id: string;
  user_name: string;
  user_image: string;
  members: string[];
  token: string;
  first_call: boolean;
  type: 'missed' | 'ended';
  typeofConversation: TypeofConversation;
  conversation_id: string;
  conversation_name: string;
}

export type ModalType =
  | {
      destroy: () => void;
      update: (
        configUpdate:
          | ModalFuncProps
          | ((prevConfig: ModalFuncProps) => ModalFuncProps)
      ) => void;
      then<T>(
        resolve: (confirmed: boolean) => T,
        reject: VoidFunction
      ): Promise<T>;
    }
  | undefined;

export type Visibility = 'public' | 'private' | 'member' | 'friend';

export interface ICommunity {
  name: string;
  description: string;
  image: string;
  cover_image: string;
  about: string;
  tags: string[];
  rules: {
    title: string;
    content: string;
  }[];
  visibility: Visibility;
  creator: IUserInfo;
  posts: IPost[];
  members: IUserInfo[];
  recently_joined: IUserInfo[];
  admins: IUserInfo[];
  waitlist_users: IUserInfo[];
  waitlist_posts: IPost[];
  post_number: number;
  member_number: number;
  admin_number: number;
  waitlist_user_number: number;
  waitlist_post_number: number;
  createdAt: string;
}
