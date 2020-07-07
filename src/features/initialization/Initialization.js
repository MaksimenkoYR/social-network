import React, {useEffect} from 'react'
import {initializeApp} from './actions'
import {connect} from 'react-redux'
import {initializationSelector} from './selectors'
import {Redirect} from 'react-router-dom'

const Initialization = ({
    children,
    initializeApp,
    initializationComplete,
    initializationFailed,
}) => {
    useEffect(() => {
        initializeApp()
    }, [])
    if (!initializationComplete && !initializationFailed) {
        return <p>preloader</p>
    } else if (initializationComplete) {
        return children
    } else if (initializationFailed) {
        return <Redirect push to='/sign-in' />
    }
}

const mapStateToProps = store => ({
    ...initializationSelector(store),
})
export default connect(mapStateToProps, {initializeApp})(Initialization)