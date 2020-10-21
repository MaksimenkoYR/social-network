import React from 'react'
import {ButtonWithAction} from '../../ui'
import './UserPrewiev.scss'

const UserPrewiev = ({user, toggleFrienshipStatus, isFrendshipStatusLoading}) => {
    return (
        <div className='user-prewiev'>
            <div className='user-prewiev__avatar'>
                <img alt='' src={user.photos?.small || require('../../lib/defaultAvatar.svg')} />
            </div>
            <div className='user-prewiev__info'>
                <span className='user-prewiev__name'>{user.name}</span>
            </div>
            <div>
                <ButtonWithAction
                    className={user.followed ? 'follow-button--unfollow' : 'follow-button--follow'}
                    loading={isFrendshipStatusLoading}
                    action={() => toggleFrienshipStatus(user.id, !user.followed)}
                >
                    {user.followed ? 'Unfollow' : 'Follow'}
                </ButtonWithAction>
            </div>
        </div>
    )
}

export default UserPrewiev
