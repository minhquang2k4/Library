import React, { useState, useContext } from 'react';
import { Button, Modal, Grid, GridColumn, GridRow, Input } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { authContext } from '../isLogin/isLogin';

const MyModal = () => {
    const [auth] = useContext(authContext);
    const [open, setOpen] = useState(false);
    const [genreCode, setGenreCode] = useState('');
    const [genreName, setGenreName] = useState('');

    const handle = () => {
        if (!auth) {
            alert('Bạn cần đăng nhập để thực hiện chức năng này');
            return;
        }

        if (genreCode === '' || genreName === '') {
            alert('Vui lòng nhập đủ thông tin');
            return;
        }

        fetch("http://localhost:8000/api/manager/genre", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                genreCode: genreCode,
                genreName: genreName
            })
        })

        setGenreCode('');
        setGenreName('');
    }

    return (
        <Modal
            onClose={() => setOpen(false)}
            onOpen={() => setOpen(true)}
            open={open}
            trigger={<Button>Thêm thể loại</Button>}
        >
            <Modal.Header>Thể Loại</Modal.Header>
            <Modal.Content>
                <Grid columns='equal'>
                    <GridRow>
                        <GridColumn>
                            <Input onChange={(e) => setGenreCode(e.target.value)} placeholder="Nhập mã code" required />
                        </GridColumn>
                        <GridColumn>
                            <Input onChange={(e) => setGenreName(e.target.value)} placeholder="Nhập thể loại" required />
                        </GridColumn>
                    </GridRow>
                </Grid>
            </Modal.Content>
            <Modal.Actions>
                <Button onClick={() => {
                    setOpen(false);
                    setGenreCode('');
                    setGenreName('');
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