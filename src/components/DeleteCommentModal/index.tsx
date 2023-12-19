import { faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Modal, notification } from 'antd';

import {
  ButtonActiveHover,
  ButtonCancelHover
} from '@/components/MiniComponent';
import {
  useDeletePost,
  useDeleteUserForAdmin,
  userDeleteCommentForAdmin
} from '@/hooks/mutation';
import { commonColor } from '@/util/cssVariable';

type NotificationType = 'success' | 'info' | 'warning' | 'error';

interface IDeleteModalProps {
  isOpen: boolean;
  commentID: string;
  typecmt: string;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const DeleteCommentModal: React.FC<IDeleteModalProps> = ({
  commentID,
  typecmt,
  isOpen,
  setIsOpen
}) => {
  const { mutateDeleteCommentForAdmin, isLoadingDeleteCommentForAdmin } =
    userDeleteCommentForAdmin();

  const handleOk = () => {
    mutateDeleteCommentForAdmin(
      {
        commentID,
        type: typecmt
      },
      {
        onSuccess: () => {
          openNotificationWithIcon('success', 'Delete Successfully');
          setIsOpen(false);
        },
        onError: () => {
          openNotificationWithIcon('error', 'Delete Failed');
          setIsOpen(false);
        }
      }
    );
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  // Notification delete user
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (
    type: NotificationType,
    message: string
  ) => {
    api[type]({
      message: message,
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
            <span>Are you sure delete this comment?</span>
          </>
        }
        open={isOpen}
        onCancel={handleCancel}
        footer={
          <div className='flex justify-end'>
            <ButtonCancelHover
              className='mr-4'
              disabled={isLoadingDeleteCommentForAdmin}
              onClick={() => {
                handleCancel();
              }}>
              Cancel
            </ButtonCancelHover>

            <ButtonActiveHover
              loading={isLoadingDeleteCommentForAdmin}
              onClick={() => {
                handleOk();
              }}>
              Delete
            </ButtonActiveHover>
          </div>
        }>
        <p>You will not be able to recover the comment after deleted!</p>
      </Modal>
    </>
  );
};

export default DeleteCommentModal;
