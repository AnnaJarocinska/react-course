import React from 'react';
import {Link} from 'ract-router-dom';
import {useTranslation} from 'react-i18next'

import {Button} from './components';
import {Container, NavigationWrapper, List} from './Navigation.css';
import PropTypes from 'prop-types';


function Navigation ({items = [], RightElement}){

    const { t } = useTranslation();

    return(
        <Container>
            <NavigationWrapper>
                <List>
                    {items.map(item=> (
                        <li key ={item.to}>
                            <Button to={item.to}> {t(item.content)}</Button>
                        </li>
                    )
                    ) }
                </List>
                {RightElement}
            </NavigationWrapper>
        </Container>
    )
}

Navigation.propTypes ={
    items: PropTypes.array.isRequired
};

export default Navigation;