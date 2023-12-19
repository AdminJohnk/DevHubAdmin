import {
  Button,
  ConfigProvider,
  Input,
  message,
  Popover,
  Upload,
  Select,
  Form
} from 'antd';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { MailOutlined } from '@ant-design/icons';
import { v4 as uuidv4 } from 'uuid';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Picker from '@emoji-mart/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { UploadOutlined } from '@ant-design/icons';
import { faFaceSmile } from '@fortawesome/free-solid-svg-icons';
import { ButtonActiveHover } from '@/components/MiniComponent';
import { commonColor } from '@/util/cssVariable';
import { getTheme } from '@/util/theme';
import {closeModal} from '@/redux/Slice/ModalHOCSlice';
import { textToHTML } from '@/util/convertText';
import { toolbarOptions } from '@/util/constants/SettingSystem';
import { createPostForAdmin } from '@/hooks/mutation';
import { useAppDispatch, useAppSelector } from '@/hooks/special';
import { IEmoji, Visibility } from '@/types';
import { imageService } from '@/services/ImageService';
import StyleProvider from './cssNewPost';
import { useCheckExistEmail } from '@/hooks/fetch';
import { useForm } from 'react-hook-form';

//===================================================

const NewPost = () => {
  const [messageApi, contextHolder] = message.useMessage();

  // Lấy theme từ LocalStorage chuyển qua css
  useAppSelector(state => state.theme.changed);
  const { themeColorSet } = getTheme();

  const dispatch = useAppDispatch();

  const { mutateCreatePostForAdmin } = createPostForAdmin();

  const [random, setRandom] = useState(uuidv4().replace(/-/g, ''));

  const [file, setFile] = useState<File>();

  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [visibility, setVisibility] = useState<Visibility>('public'); // ['public', 'private', 'friend']
  const [isLoadingCreatePost, setIsLoadingCreatePost] = useState(false);

  const [emailCheck, setEmailCheck] = useState<string>('');
  const { checkEmail, isLoadingCheckEmail } = useCheckExistEmail(emailCheck);

  const ReactQuillRef = useRef<ReactQuill | null>(null);

  useEffect(() => {
    const quill = ReactQuillRef.current?.getEditor()!;

    quill.root.addEventListener('paste', (event: ClipboardEvent) => {
      event.preventDefault();
      const text = event.clipboardData!.getData('text/plain');

      // Instead parse and insert HTML
      const doc = new DOMParser().parseFromString(
        textToHTML(text),
        'text/html'
      );

      document.getSelection()!.getRangeAt(0).insertNode(doc.body);
    });
  }, []);

  // Hàm hiển thị mesage
  const error = () => {
    void messageApi.open({
      type: 'error',
      content: 'Please enter the content'
    });
  };

  const onSubmit = useCallback(async () => {
    if (!checkEmail) {
      console.log('checkEmail:: ', checkEmail);
      void messageApi.error('Email is invalid');
      return;
    }
    if (content === '<p><br></p>' || content === '<p></p>' || content === '') {
      console.log('content:: ', content);
      error();
    } else {
      setIsLoadingCreatePost(true);
      const formData = new FormData();
      if (file) {
        const result = await handleUploadImage(file);
        formData.append('image', result.url);
      }

      mutateCreatePostForAdmin(
        {
          email: emailCheck,
          title,
          content,
          images: formData.get('image')
            ? [formData.get('image')?.toString()]
            : undefined,
          visibility
        },
        {
          onSettled: () => {
            setIsLoadingCreatePost(false);
          },
          onSuccess: () => {
            setTitle('');
            setContent('');
            setEmailCheck('');
            setRandom(uuidv4().replace(/-/g, ''));
            setFile(undefined);

            dispatch(closeModal());

            void messageApi.success('Create post successfully');
          },
          onError: () => {
            void messageApi.error('Create post failed');
          }
        }
      );
    }
  }, [content, file, visibility, title, checkEmail]);

  const handleUploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append('image', file);
    const { data } = await imageService.uploadImage(formData);
    return {
      url: data.metadata.key,
      status: 'done'
    };
  };

  // const handleUploadImages = async (files: File[]) => {
  //   const formData = new FormData();
  //   files.forEach((file) => {
  //     formData.append('images', file);
  //   });
  //   const { data } = await imageService.uploadImages(formData);
  //   return {
  //     url: data.metadata,
  //     status: 'done'
  //   };
  // };

  const beforeUpload = (file: File) => {
    const isLt2M = file.size / 1024 / 1024 < 3;
    if (!isLt2M) {
      void messageApi.error('Image must smaller than 3MB!');
    }
    return isLt2M;
  };

  const form = useForm({
    defaultValues: {
      email: ''
    }
  });

  const onSubmitCheckEmail = (values: { email: string }) => {
    if (values.email === '') {
      void messageApi.error('Email is empty');
      return;
    }
    setEmailCheck(values.email);
  };

  const formEmail = useMemo(() => {
    return (
      <Form.Item
        style={{
          width: '70%'
        }}
        name='email'
        rules={[
          {
            required: true,
            message: 'Please input your E-mail!'
          },
          {
            type: 'email',
            message: 'The input is not valid E-mail!'
          }
        ]}>
        <div className='flex flex-row'>
          <Input
            className='rounded-md mr-4'
            placeholder='Email'
            allowClear
            prefix={<MailOutlined />}
            onChange={e => {
              form.setValue('email', e.target.value);
            }}
          />
          <ButtonActiveHover
            type='primary'
            onClick={form.handleSubmit(onSubmitCheckEmail)}
            loading={isLoadingCheckEmail && emailCheck != ''}>
            <span style={{ color: commonColor.colorWhite1 }}>
              {isLoadingCheckEmail && emailCheck != ''
                ? 'Checking...'
                : 'Check'}
            </span>
          </ButtonActiveHover>
        </div>
      </Form.Item>
    );
  }, [isLoadingCheckEmail, emailCheck]);

  return (
    <ConfigProvider
      theme={{ token: { controlHeight: 40, borderRadius: 0, lineWidth: 0 } }}>
      {contextHolder}
      <StyleProvider theme={themeColorSet} className='rounded-lg mb-4'>
        <div className='newPost px-4 py-3'>
          <div className='mt-4'> {formEmail} </div>
          <div>
            <span>
              {emailCheck === '' || isLoadingCheckEmail ? (
                <></>
              ) : checkEmail ? (
                <span style={{ color: 'green' }}>Email is valid</span>
              ) : (
                <span style={{ color: 'red' }}>Email is invalid</span>
              )}
            </span>
          </div>
          <div
            className='newPostHeader text-center text-xl font-bold'
            style={{ color: themeColorSet.colorText1 }}>
            Create Post
          </div>
          <div className='newPostBody'>
            <div className='AddTitle mt-4 z-10'>
              <Input
                key={random}
                name='title'
                placeholder='Add a Title'
                autoComplete='off'
                allowClear
                style={{ borderColor: themeColorSet.colorText3 }}
                maxLength={150}
                onChange={e => {
                  setTitle(e.target.value);
                }}
              />
            </div>
            <div className='AddContent mt-4'>
              <ReactQuill
                ref={ReactQuillRef}
                value={content}
                onChange={setContent}
                modules={{ toolbar: toolbarOptions }}
                placeholder='Add a Content'
                theme='snow'
              />
            </div>
          </div>
          <div className='newPostFooter mt-3 flex justify-between items-center'>
            <div className='newPostFooter__left'>
              <Popover
                placement='top'
                trigger='click'
                content={
                  <Picker
                    theme={themeColorSet.colorPicker}
                    data={async () => {
                      const response = await fetch(
                        'https://cdn.jsdelivr.net/npm/@emoji-mart/data'
                      );

                      return response.json();
                    }}
                    onEmojiSelect={(emoji: IEmoji) => {
                      ReactQuillRef.current
                        ?.getEditor()
                        .insertText(
                          ReactQuillRef.current?.getEditor().getSelection(true)
                            .index,
                          emoji.native
                        );
                    }}
                  />
                }>
                <span className='emoji'>
                  <FontAwesomeIcon
                    className='item mr-3 ml-3'
                    size='lg'
                    icon={faFaceSmile}
                  />
                </span>
              </Popover>
              <Select
                className='w-24'
                defaultValue='Public'
                onChange={value =>
                  setVisibility(value.toLowerCase() as Visibility)
                }
                options={[
                  { value: 'public', label: 'Public' },
                  { value: 'private', label: 'Private' },
                  { value: 'friend', label: 'Friend' }
                ]}
              />
              <span>
                <Upload
                  accept='image/png, image/jpeg, image/jpg'
                  key={random}
                  maxCount={5}
                  customRequest={({ onSuccess }) => {
                    if (onSuccess) onSuccess('ok');
                  }}
                  multiple
                  listType='picture'
                  beforeUpload={beforeUpload}
                  onChange={info => setFile(info.file.originFileObj)}
                  onRemove={() => {
                    setFile(undefined);
                  }}>
                  <Button icon={<UploadOutlined />}>Upload (Max: 5)</Button>
                </Upload>
              </span>
            </div>
            <div className='newPostFooter__right'>
              <ButtonActiveHover
                type='primary'
                onClick={onSubmit}
                loading={isLoadingCreatePost}>
                <span style={{ color: commonColor.colorWhite1 }}>
                  {isLoadingCreatePost ? 'Creating..' : 'Create'}
                </span>
              </ButtonActiveHover>
            </div>
          </div>
        </div>
      </StyleProvider>
    </ConfigProvider>
  );
};

export default NewPost;
