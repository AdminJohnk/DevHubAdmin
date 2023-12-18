import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, notification } from 'antd';

import {
  ButtonActiveHover,
  ButtonCancelHover
} from '@/components/MiniComponent';
import { useDeletePost, useDeleteUserForAdmin } from '@/hooks/mutation';
import { commonColor } from '@/util/cssVariable';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface IDeleteModalProps {
  isOpen: boolean;
  userID: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteUserModal: React.FC<IDeleteModalProps> = ({
  userID,
  isOpen,
  setIsOpen
}) => {
  const { mutateDeleteUserForAdmin, isLoadingDeleteUserForAdmin } =
    useDeleteUserForAdmin();

  const handleOk = () => {
    mutateDeleteUserForAdmin(userID);
    setIsOpen(false);
    openNotificationWithIcon('success');
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  // Notification delete user
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type: NotificationType) => {
    api[type]({
      message: 'Delete Successfully',
      placement: 'bottomRight'
    });
  };

  return (
    <>
      {contextHolder}
      <Modal
        title={
          <>
            <FontAwesomeIcon
              className='icon mr-2'
              icon={faTriangleExclamation}
              style={{ color: commonColor.colorWarning1 }}
            />
            <span>Are you sure delete this user?</span>
          </>
        }
        open={isOpen}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-end'>
            <ButtonCancelHover
              className='mr-4'
              disabled={isLoadingDeleteUserForAdmin}
              onClick={() => {
                handleCancel();
              }}>
              Cancel
            </ButtonCancelHover>

            <ButtonActiveHover
              loading={isLoadingDeleteUserForAdmin}
              onClick={() => {
                handleOk();
              }}>
              Delete
            </ButtonActiveHover>
          </div>
        }>
        <p>You will not be able to recover the user after deleted!</p>
      </Modal>
    </>
  );
};

export default DeleteUserModal;
