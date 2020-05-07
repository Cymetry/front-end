import React from 'react'
import { Button } from 'react-native'
import Variables from '../../assets/styles/variables'

const HeaderButton = (props) => (
    <Button
        color={Variables.vividBlue}
        {...props}
    />
)

export default HeaderButton