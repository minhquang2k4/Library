import React, { useState, useContext } from 'react';
import { Button, Modal, Grid, GridColumn, GridRow, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { authContext } from '../isLogin/isLogin';

const MyModal = () => {
    const [auth] = useContext(authContext);
    const [open, setOpen] = useState(false);
    const [typeCode, setTypeCode] = useState('');
    const [typeName, setTypeName] = useState('');

    const handle = () => {
        if(!auth){
            alert('Bạn cần đăng nhập để thực hiện chức năng này');
            return;
        }

        if (typeCode === '' || typeName === '') {
            alert('Vui lòng nhập đủ thông tin');
            return;
        }

        fetch("http://localhost:8000/api/manager/type", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                typeCode: typeCode,
                typeName: typeName
            })
        })

        setTypeCode('');
        setTypeName('');
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Thêm kiểu sách</Button>}
        >
            <Modal.Header>Kiểu Sách</Modal.Header>
            <Modal.Content>
                <Grid columns='equal'>
                    <GridRow centered>
                        <GridColumn>
                            <Input onChange={(e) => setTypeCode(e.target.value)} placeholder="Nhập mã code" required />
                        </GridColumn>
                        <GridColumn>
                            <Input onChange={(e) => setTypeName(e.target.value)} placeholder="Nhập tên kiểu" required />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => {
                    setOpen(false);
                    setTypeCode('');
                    setTypeName('');
                }}>Cancel</Button>
                <Button positive onClick={() => {
                    setOpen(false)
                    handle();
                }}>OK</Button>
            </Modal.Actions>
        </Modal>
    );
};

export default MyModal;