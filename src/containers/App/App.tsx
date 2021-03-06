import React from 'react'
import { injectGlobal } from 'styled-components'

// Components
import { Bot } from 'components/Bot/Bot'
import { BotAdd } from 'components/BotAdd/BotAdd'
import { BotList } from 'components/BotList/BotList'
import { Sidebar } from 'components/Sidebar/Sidebar'
import { TopBar } from 'components/TopBar/TopBar'
import { User } from 'components/User/User'
import { UserAdd } from 'components/UserAdd/UserAdd'
import { UserList } from 'components/UserList/UserList'
import { Route, Switch } from 'react-router-dom'
import { Box, Container, Flex, Provider } from 'rebass'

// Constants
import { listWidth, sidebarWidth } from 'constants/styles'

injectGlobal`
  @import url('https://fonts.googleapis.com/css?family=Roboto:300&subset=cyrillic,latin-ext');
  * { box-sizing: border-box; }
  body { margin: 0; }
  button { cursor: pointer; }
`

const theme = {
  radius: 0,
  font: 'Roboto, sans-serif'
}

export const App = () => (
  <Provider theme={ theme }>
    <Container maxWidth={ 1280 }>
      <TopBar />

      <Flex mx={ -2 }>
        <Box order={ 2 } px={ 2 } flex={ '0 0 auto' } w={ listWidth }>
          <Route path='/bots' component={ BotList } />
          <Route path='/users' component={ UserList } />
        </Box>
        <Box order={ 3 } px={ 2 } flex={ '1 1 auto' }>
          <Switch>
            <Route path='/bots/add' component={ BotAdd } />
            <Route path='/bots/:botId' component={ Bot } />
            <Route path='/users/add' component={ UserAdd } />
            <Route path='/users/:userId' component={ User } />
          </Switch>
        </Box>
        <Box order={ 0 } px={ 2 } flex={ '0 0 auto' } w={ sidebarWidth }>
          <Sidebar />
        </Box>
      </Flex>
    </Container>
  </Provider>
)
