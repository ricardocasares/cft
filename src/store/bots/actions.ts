import { FormikBag } from 'formik'
import { createAction } from 'redux-act'

import { BotData } from 'api/bots/bots.h'
import { ApiResponce } from 'models/api/responce'

export const loadBotsNextPage = createAction('LOAD MOAR BOTS PLS')
export const loadBotsPrevPage = createAction('Load previous portion of bots list')
export const loadBotsSuccess = createAction<ApiResponce<BotData>>('Bots loaded')
export const loadBotsFail = createAction<any>('Bots loading failed')
export const saveBot = createAction<BotData, FormikBag<{}, BotData>>(
  'Save new bot',
  (values: BotData) => values,
  (_, bag: FormikBag<{}, BotData>) => bag
)
