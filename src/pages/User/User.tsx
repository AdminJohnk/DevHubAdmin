import React, { useMemo, useState } from 'react';
import { ConfigProvider, Skeleton, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
import { v4 as uuidv4 } from 'uuid';
import { getTheme } from '@/util/theme';
import { useAppDispatch, useAppSelector } from '@/hooks/special';
import StyleProvider from './cssUser';
import { useGetUserForAdmin } from '@/hooks/fetch';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faTrash,
  faPenToSquare,
  faArrowsRotate,
  faPlus
} from '@fortawesome/free-solid-svg-icons';
import { openDrawer } from '@/redux/Slice/DrawerHOCSlice';
import EditProfileForm from '@/components/Form/EditProfileForm';
import DeleteModal from '@/components/DeleteUserModal';
import { openModal } from '@/redux/Slice/ModalHOCSlice';
import FormRegister from '../../components/Form/FormRegister/FormRegister';

const columns: ColumnsType<DataType> = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'Joe',
        value: 'Joe'
      },
      {
        text: 'Category 1',
        value: 'Category 1',
        children: [
          {
            text: 'Yellow',
            value: 'Yellow'
          },
          {
            text: 'Pink',
            value: 'Pink'
          }
        ]
      },
      {
        text: 'Category 2',
        value: 'Category 2',
        children: [
          {
            text: 'Green',
            value: 'Green'
          },
          {
            text: 'Black',
            value: 'Black'
          }
        ]
      }
    ],
    filterMode: 'tree',
    filterSearch: true,
    onFilter: (value: string, record) => record.name.includes(value),
    width: '20%'
  },
  {
    title: 'Email',
    dataIndex: 'email',
    sorter: (a, b) => a.age - b.age,
    width: '23%'
  },
  {
    title: 'Expertises',
    dataIndex: 'expertises',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    onFilter: (value: string, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '29%'
  },
  {
    title: 'Experiences',
    dataIndex: 'experiences',
    filters: [
      {
        text: 'London',
        value: 'London'
      },
      {
        text: 'New York',
        value: 'New York'
      }
    ],
    onFilter: (value: string, record) => record.address.startsWith(value),
    filterSearch: true,
    width: '20%'
  },
  {
    title: 'Action',
    dataIndex: 'action',
    width: '8%'
  }
];

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  expertises: string;
  experiences: string;
  action: React.ReactNode;
}

const User = () => {
  useAppSelector(state => state.theme.changed);
  const { themeColorSet, themeColor } = getTheme();
  const dispatch = useAppDispatch();

  // modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const [userID, setuserID] = useState<string>('');

  const { userListForAdmin, isLoadingUserForAdmin, refetchUserForAdmin } =
    useGetUserForAdmin();

  const data: DataType[] = useMemo(() => {
    return userListForAdmin?.map(user => {
      return {
        key: user._id,
        name: user.name,
        email: user.email,
        expertises:
          user.tags.length <= 7
            ? user.tags.map(tag => tag).join(', ')
            : user.tags
                .slice(0, 7)
                .map(tag => tag)
                .join(', ') + ',...',
        experiences:
          user.experiences.length <= 3
            ? user.experiences
                .map(
                  (experience: any) =>
                    experience.position_name + ': ' + experience.company_name
                )
                .join(', ')
            : user.experiences
                .slice(0, 3)
                .map(
                  (experience: any) =>
                    experience.position_name + ': ' + experience.company_name
                )
                .join(', ') + ',...',
        action: (
          <div className='flex flex-row justify-center'>
            <div>
              <button
                className='btn-edit'
                onClick={() => {
                  dispatch(
                    openDrawer({
                      title: 'Edit post',
                      component: (
                        <EditProfileForm
                          key={uuidv4().replace(/-/g, '')}
                          userID={user._id}></EditProfileForm>
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
                  showModal();
                  setuserID(user._id);
                }}>
                <FontAwesomeIcon size='1x' icon={faTrash} />
              </button>
            </div>
          </div>
        )
      };
    });
  }, [userListForAdmin]);

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
      {isLoadingUserForAdmin ? (
        <StyleProvider theme={themeColorSet}>
          <div className='admin-user'>
            <div className='px-40 py-10'>
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
            userID={userID}
          />
          <div className='admin-user flex justify-center'>
            <div className='w-11/12 mt-2'>
              <div className='mb-5 flex flex-row'>
                <button
                  className='btn-refresh'
                  onClick={() => {
                    refetchUserForAdmin();
                  }}>
                  <FontAwesomeIcon icon={faArrowsRotate} size='lg' />
                </button>
                <button
                  className='btn-plus ms-3'
                  onClick={() => {
                    dispatch(
                      openModal({
                        title: 'Create user',
                        component: (
                          <FormRegister
                            key={uuidv4().replace(/-/g, '')}></FormRegister>
                        ),
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
                pagination={{ pageSize: 50 }}
                scroll={{ y: 480 }}
              />
            </div>
          </div>
        </StyleProvider>
      )}
    </ConfigProvider>
  );
};

export default User;
