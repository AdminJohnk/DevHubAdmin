import React, { useMemo, useState } from 'react';
import { ConfigProvider, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { v4 as uuidv4 } from 'uuid';
import { getTheme } from '@/util/theme';
import { useAppDispatch, useAppSelector } from '@/hooks/special';
import StyleProvider from './cssPost';
import { useGetPostForAdmin, useGetPostNumberForAdmin } from '@/hooks/fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPenToSquare,
  faArrowsRotate,
  faPlus,
  faComment
} from '@fortawesome/free-solid-svg-icons';
import { openDrawer } from '@/redux/Slice/DrawerHOCSlice';
import DeleteModal from '@/components/PostProperties/DeletePostModal';
import { openModal } from '@/redux/Slice/ModalHOCSlice';
import EditPostForm from '@/components/Form/EditPostForm';
import NewPost from '@/components/NewPost';
import ShowComment from '@/components/ShowComment';

const columns: ColumnsType<DataType> = [
  {
    title: 'Title',
    dataIndex: 'title',
    width: '23%'
  },
  {
    title: 'Content',
    dataIndex: 'content',
    width: '29%'
  },
  {
    title: 'Owner',
    dataIndex: 'owner',
    width: '15%'
  },
  {
    title: 'Visibility',
    dataIndex: 'visibility',
    width: '10%'
  },
  {
    title: 'Interaction',
    dataIndex: 'interaction',
    width: '15%'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '8%'
  }
];

interface DataType {
  key: React.Key;
  title: string;
  content: React.ReactNode;
  owner: string;
  visibility: string;
  interaction: string;
  action: React.ReactNode;
}

const Post = () => {
  useAppSelector(state => state.theme.changed);
  const { themeColorSet, themeColor } = getTheme();
  const dispatch = useAppDispatch();

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [postID, setPostID] = useState<string>('');

  const { postNumberForAdmin, refetchPostNumberForAdmin } =
    useGetPostNumberForAdmin();

  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(20);

  const { postListForAdmin, isLoadingPostForAdmin, refetchPostForAdmin } =
    useGetPostForAdmin(page, pageSize);

  const data: DataType[] = useMemo(() => {
    return postListForAdmin?.map(post => {
      const contentText: string =
        post.post_attributes.content?.length > 100
          ? post.post_attributes.content.slice(0, 100) + '...'
          : post.post_attributes.content;

      const contentHTML = (
        <div dangerouslySetInnerHTML={{ __html: contentText }} />
      );

      return {
        key: post._id,
        title:
          post.post_attributes.title?.length > 42
            ? post.post_attributes.title.slice(0, 42) + '...'
            : post.post_attributes.title,
        content: contentHTML,
        owner: post.post_attributes.user?.name,
        visibility: post.visibility,
        interaction:
          `Like: ${post.post_attributes.like_number} - Share: ${post.post_attributes.share_number}` +
          `\nComment: ${post.post_attributes.comment_number} - Save: ${post.post_attributes.save_number}`,
        action: (
          <div className='flex flex-row'>
            <div>
              <button
                className='btn-edit'
                onClick={() => {
                  dispatch(
                    openDrawer({
                      title: 'Edit post',
                      component: (
                        <EditPostForm
                          key={post._id}
                          id={post._id}
                          title={post.post_attributes.title!}
                          content={post.post_attributes.content!}
                          image={post.post_attributes.images}
                          visibility={post.visibility}
                        />
                      )
                    })
                  );
                }}>
                <FontAwesomeIcon size='1x' icon={faPenToSquare} />
              </button>
            </div>
            <div className='ml-3'>
              <button
                className='btn-delete'
                onClick={() => {
                  setPostID(post._id);
                  showModal();
                }}>
                <FontAwesomeIcon size='1x' icon={faTrash} />
              </button>
            </div>
            {post.post_attributes.comment_number > 0 && (
              <div className='ml-3'>
                <button
                  className='btn-showComment'
                  onClick={() => {
                    dispatch(
                      openDrawer({
                        title: 'Edit post',
                        component: (
                          <ShowComment
                            key={uuidv4().replace(/-/g, '')}
                            typeCMT={'parent'}
                            postID={post._id}
                          />
                        ),
                        width: 1000
                      })
                    );
                  }}>
                  <FontAwesomeIcon size='1x' icon={faComment} />
                </button>
              </div>
            )}
          </div>
        )
      };
    });
  }, [postListForAdmin]);

  const onChange: TableProps<DataType>['onChange'] = (
    pagination,
    filters,
    sorter,
    extra
  ) => {
    console.log('params', pagination, filters, sorter, extra);
  };

  return (
    <ConfigProvider theme={{ token: themeColor }}>
      <StyleProvider theme={themeColorSet}>
        <DeleteModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          postID={postID}
        />
        <div className='admin-user flex justify-center'>
          <div className='w-11/12 mt-2'>
            <div className='mb-5 flex flex-row'>
              <button
                className='btn-refresh'
                onClick={() => {
                  refetchPostForAdmin();
                  refetchPostNumberForAdmin();
                }}>
                <FontAwesomeIcon icon={faArrowsRotate} size='lg' />
              </button>
              <button
                className='btn-plus ms-3'
                onClick={() => {
                  dispatch(
                    openModal({
                      title: 'Create Post',
                      component: <NewPost key={uuidv4().replace(/-/g, '')} />,
                      footer: <></>
                    })
                  );
                }}>
                <FontAwesomeIcon icon={faPlus} size='lg' />
              </button>
            </div>
            <Table
              className='content-table'
              columns={columns}
              dataSource={data}
              onChange={onChange}
              loading={isLoadingPostForAdmin}
              pagination={{
                pageSize: pageSize,
                total: postNumberForAdmin,
                onChange: (page, pageSize) => {
                  setPage(page);
                  setPageSize(pageSize || 20);
                }
              }}
              scroll={{ y: 480 }}
            />
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default Post;
