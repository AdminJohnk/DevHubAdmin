import { useAppDispatch, useAppSelector } from '@/hooks/special';
import { getTheme } from '@/util/theme';
import type { ColumnsType, TableProps } from 'antd/es/table';
import StyleProvider from './cssShowComment';
import { useMemo, useState } from 'react';
import {
  useGetChildCommentByParentCommentForAdmin,
  useGetParentCommentByPostForAdmin
} from '@/hooks/fetch';
import {
  ConfigProvider,
  Form,
  Input,
  Skeleton,
  Table,
  Typography,
  message
} from 'antd';
import {
  faArrowsRotate,
  faTrash,
  faPenToSquare,
  faComments,
  faArrowLeftLong
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import DeleteModal from '@/components/DeleteCommentModal';
import { getDateTimeToNow } from '@/util/formatDateTime';
import { useForm } from 'react-hook-form';
import {
  userDeleteCommentForAdmin,
  useupdateCommentForAdmin
} from '@/hooks/mutation';
import { ICommentUpdate } from '@/types';

interface DataType {
  user: string;
  content: React.ReactNode;
  interaction: string;
  time: string;
  action: React.ReactNode;
}

const columns: ColumnsType<DataType> = [
  {
    title: 'User',
    dataIndex: 'user',
    width: '20%'
  },
  {
    title: 'Content',
    dataIndex: 'content',
    width: '29%'
  },
  {
    title: 'Interaction',
    dataIndex: 'interaction',
    width: '19%'
  },
  {
    title: 'Time',
    dataIndex: 'time',
    width: '16%'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '16%'
  }
];

interface IShowCommentProps {
  postID: string;
  typeCMT: string; // 'parent' | 'child'
}

// ======================= Component =======================

const ShowComment: React.FC<IShowCommentProps> = ({ postID, typeCMT }) => {
  useAppSelector(state => state.theme.changed);
  const { themeColorSet, themeColor } = getTheme();

  const [commentID, setCommentID] = useState<string>('');
  const [userID, setUserID] = useState<string>('');
  const [commentIDShow, setcommentIDShow] = useState<string>('');
  const [typecmt, setTypecmt] = useState<string>(typeCMT);

  const [messageApi, contextHolder] = message.useMessage();

  // parent comment
  const { parentComments, isLoadingParentComments, refetchParentComments } =
    useGetParentCommentByPostForAdmin(postID);

  // child comment
  const { childComments, isLoadingChildComments, refetchChildComments } =
    useGetChildCommentByParentCommentForAdmin(commentIDShow);

  const { mutateupdateCommentForAdmin } = useupdateCommentForAdmin();

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  // ============= Editable Cell =============

  const form = useForm({
    defaultValues: {
      content: '',
      type: typecmt
    }
  });
  const [editingKey, setEditingKey] = useState('');

  const editForm = (content: string) => {
    return (
      <Input
        placeholder='Enter content'
        allowClear
        defaultValue={content}
        onChange={e => {
          form.setValue('content', e.target.value);
        }}
      />
    );
  };

  const onSubmit = async (values: ICommentUpdate) => {
    if (values.content === '') {
      void messageApi.error('Content is empty!');
      return;
    }

    await mutateupdateCommentForAdmin(
      {
        commentID: editingKey,
        comment: values
      },
      {
        onSuccess: () => {
          void messageApi.success('Update comment successfully!');
          setEditingKey('');
        },
        onError: () => {
          void messageApi.error('Update comment failed!');
        }
      }
    );
  };

  const originData: DataType[] | undefined = useMemo(() => {
    const commentList = typecmt === 'parent' ? parentComments : childComments;
    return commentList?.map(comment => {
      return {
        user: comment.user.name,
        content:
          editingKey === comment._id
            ? editForm(comment.content)
            : comment.content,
        interaction: `Like: ${comment.like_number} - Dislike: ${comment.dislike_number}`,
        time: getDateTimeToNow(comment.createdAt),
        action:
          editingKey !== comment._id ? (
            <div className='flex flex-row'>
              <div>
                <button
                  className='btn-function btn-edit'
                  onClick={() => {
                    form.setValue('content', comment.content);
                    setEditingKey(comment._id);
                  }}>
                  <FontAwesomeIcon size='1x' icon={faPenToSquare} />
                </button>
              </div>
              <div className='ml-3'>
                <button
                  className='btn-function btn-delete'
                  onClick={() => { 
                    setCommentID(comment._id);
                    setUserID(comment.user._id);
                    showModal();
                  }}>
                  <FontAwesomeIcon size='1x' icon={faTrash} />
                </button>
              </div>
              {typecmt === 'parent' && comment?.child_number > 0 && (
                <div className='ml-3'>
                  <button
                    className='btn-function btn-showComment'
                    onClick={() => {
                      setcommentIDShow(comment._id);
                      setTypecmt('child');
                      form.setValue('type', 'child');
                    }}>
                    <FontAwesomeIcon size='1x' icon={faComments} />
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className='flex flex-row justify-center'>
              <Typography.Link
                className='me-2'
                onClick={form.handleSubmit(onSubmit)}>
                Save
              </Typography.Link>
              <Typography.Link
                onClick={() => {
                  setEditingKey('');
                }}>
                Cancel
              </Typography.Link>
            </div>
          )
      };
    });
  }, [parentComments, childComments, editingKey, typecmt]);

  return (
    <ConfigProvider theme={{ token: themeColor }}>
      {contextHolder}
      {(isLoadingParentComments && typecmt === 'parent') ||
      (isLoadingChildComments && typecmt === 'child') ? (
        <StyleProvider theme={themeColorSet}>
          <div className='admin-user'>
            <div className='px-10 py-10'>
              <Skeleton className='mb-7' active paragraph={{ rows: 4 }} />
              <Skeleton className='mb-7' active paragraph={{ rows: 4 }} />
              <Skeleton className='mb-7' active paragraph={{ rows: 4 }} />
            </div>
          </div>
        </StyleProvider>
      ) : (
        <StyleProvider theme={themeColorSet}>
          <DeleteModal
            isOpen={isModalOpen}
            setIsOpen={setIsModalOpen}
            commentID={commentID}
            postID={postID}
            userID={userID}
            typecmt={typecmt}
          />
          <div className='admin-user flex justify-center'>
            <div className='w-11/12 mt-2'>
              <div className='mb-5 flex flex-row'>
                {typecmt === 'child' && (
                  <button
                    className='btn-refresh me-5 btn-back'
                    onClick={() => {
                      setTypecmt('parent');
                      setCommentID('');
                      form.setValue('type', 'parent');
                    }}>
                    <FontAwesomeIcon icon={faArrowLeftLong} size='xl' />
                  </button>
                )}
                <button
                  className='btn-refresh'
                  onClick={() => {
                    if (typecmt === 'parent') refetchParentComments();
                    else refetchChildComments();
                  }}>
                  <FontAwesomeIcon icon={faArrowsRotate} size='lg' />
                </button>
              </div>
              <Table
                className='content-table'
                columns={columns}
                dataSource={originData}
                // onChange={onChange}
                rowClassName='editable-row'
                bordered
                pagination={{ pageSize: 20 }}
                scroll={{ y: 480 }}
              />
            </div>
          </div>
        </StyleProvider>
      )}
    </ConfigProvider>
  );
};

export default ShowComment;
