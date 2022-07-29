import React from 'react';
import { Upload } from 'antd';
import ImgCrop from 'antd-img-crop';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { errorToast } from '../../../utils/toast';
import { imageUpdate } from '../../../api/user';

function getBase64 (img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

class ImageUpload extends React.Component {
    state = {
        loading: false,
        imageUrl: ''
    };
    componentDidMount(){
        this.setState({imageUrl: this.props.product_url || ''})
    }
    handleChange = info => {
        if (info.file.status === 'uploading') {
            this.setState({ loading: true });
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl =>
                this.setState({
                    imageUrl,
                    loading: false,
                }),
            );
        }
    };
    beforeUpload =(file)=> {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            errorToast('仅可支持上传 JPG/PNG 类型的文件!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            errorToast('图片大小不能超过 2MB!');
        }
        console.log(file);
        imageUpdate({
            file:file,
            config:{headers: { 'Content-Type': 'application/octet-stream',},onUploadProgress: () => {},},
        }).then((res) => {
            const {code,data,msg} =res.data
            if(code !== 0) {
                errorToast(msg)
                return
            }
            this.setState({imageUrl:data});
            this.props.onChange(data)
        });
        return false;
    }

    render () {
        const { loading } = this.state;
        const imageUrl  = this.props.product_url;
        const uploadButton = (
            <div style={{width:'50px'}}>
                {loading ? <LoadingOutlined /> : <PlusOutlined />}
                <div style={{ marginTop: 8 }}>Upload</div>
            </div>
        );
        return (
            <ImgCrop rotate aspect={1}>
                <Upload
                    name="avatar"
                    // listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    beforeUpload={this.beforeUpload}
                    onChange={this.handleChange}
                >
                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: "250px", borderRadius: '5px' }} /> : uploadButton}
                </Upload>
            </ImgCrop>
        );
    }
}

export default ImageUpload