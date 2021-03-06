// Utils
import { isNil } from 'ramda'
import React from 'react'
import { connect } from 'react-redux'
import { branch, compose, renderComponent, setDisplayName } from 'recompose'
import { dispatchWillMount } from 'utils/hoc/dispatchWillMount/dispatchWillMount'

// Components
import { AddListItem } from 'components/AddListItem/AddListItem'
import { ListItem } from 'components/ListItem/ListItem'
import { UserListNav, UserListNext, UserListPrev } from 'components/UserList/UserList.s'
import { Link } from 'react-router-dom'
import { Box, Flex, Text } from 'rebass'

// Actions
import { loadUsersNextPage, loadUsersPrevPage, reloadUsersCurrentPage } from 'store/users/actions'

// Models
import { UserListProps } from 'components/UserList/UserList.h'
import { UserListLoader } from 'components/UserList/UserListLoader'
import { State } from 'store/store.h'

const connectToStore = connect((store: State) => store.users, {
  loadUsersNextPage,
  loadUsersPrevPage
})

const showLoader = branch(
  (props: UserListProps) => !!props.isLoading,
  renderComponent(UserListLoader)
)

const enhance = compose<UserListProps, {}>(
  dispatchWillMount([reloadUsersCurrentPage()]),
  connectToStore,
  showLoader,
  setDisplayName('UserList')
)

export const UserList = enhance((props) => (
  <Flex wrap>
    <Box w={ '100%' }>
      <AddListItem title='Добавить' link={ '/users/add' } />
    </Box>
    { props.users.map((user) => {
      return (
        <Box w={ '100%' } mt={ 3 } key={ user._id }>
          <ListItem link={ `/users/${user._id}` } title={ user.name } imageSrc={ user.avatarUrl } />
        </Box>
      )
    }) }
    <UserListNav w={ '100%' } mt={ 3 }>
      <Text>
        { !isNil(props.previousPageUrl) && (
          <Link onClick={ props.loadUsersPrevPage } to='/users'>
            <UserListPrev /> Назад
          </Link>
        ) }
      </Text>
      <Text>
        { !isNil(props.nextPageUrl) && (
          <Link onClick={ props.loadUsersNextPage } to='/users'>
            Вперед <UserListNext />
          </Link>
        ) }
      </Text>
    </UserListNav>
  </Flex>
))
