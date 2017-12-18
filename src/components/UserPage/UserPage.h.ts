import { loadUser } from 'store/users/actions'

// Models
import { UserDataFull } from 'api/users/users.h'
import { NavigationProps } from 'containers/App/App.h'
import { RouteComponentProps } from 'react-router'

export type UserPageProps = RouteComponentProps<NavigationProps> & {
  user?: UserDataFull
  userId: string
  isLoading?: boolean
} & {
  loadUser: typeof loadUser
}
