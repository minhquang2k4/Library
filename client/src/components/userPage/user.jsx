import React, { useState, useEffect } from 'react';
import { Form, Input, TextArea, Select, Button, Dropdown } from 'semantic-ui-react';
import style from './user.module.css';


const User = () => {
    const [userBooks, setUserBooks] = useState([]);
    const [showForm, setShowForm] = useState(true);
    useEffect(() => {

    }, []);


    return (
        <div className={style.container}>
            <h1>Your Books</h1>
            <Button onClick={() => setShowForm(!showForm)}>Mượn sách</Button>
            {showForm && (
                <Form>
                    <Form.Field>
                        <label>Chọn sách</label>
                        <Dropdown
                            placeholder='Chọn sách'
                            fluid
                            selection
                            options={userBooks}
                        />
                    </Form.Field>
                </Form>
            )}
        </div>
    );
};

export default User;