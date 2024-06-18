import React, { useState } from 'react';
import { Grid, GridRow, GridColumn } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

import ModalType from './modalType.jsx';
import ModalGenre from './modalGenre.jsx';
import style from './manager.module.css';

const Manager = () => {
    const [open, setOpen] = useState(false);

    return (
        <div className={style.container} >
            <Grid divided>
                <GridRow>
                    <GridColumn width={8}>
                        <ModalType />
                    </GridColumn>
                    <GridColumn width={8}>
                        <ModalGenre />
                    </GridColumn>
                </GridRow>
            </Grid>
        </div>
    )
};
export default Manager;