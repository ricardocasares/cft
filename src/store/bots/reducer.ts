import { merge, prop, uniqBy } from 'ramda'

// Actions
import {
  loadBot,
  loadBotsFail,
  loadBotsNextPage,
  loadBotsPrevPage,
  loadBotsSuccess,
  loadBotSuccess,
  reloadBotsCurrentPage,
  saveBot,
  updateBot,
  UpdateBotMeta
} from 'store/bots/actions'

// Utils
import { createReducer } from 'redux-act'

// Models
import { BotData, BotDataFull } from 'api/bots/bots.h'
import { AdiResponse } from 'models/api/responce'
import { BotsState } from 'store/bots/reducer.h'

const initialState = {
  bots: [],
  currentPageUrl: ''
}

export const botsReducer = createReducer<BotsState>(
  {
    [reloadBotsCurrentPage.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadBotsNextPage.getType()]: (state) =>
      merge(state, {
        currentPageUrl: state.nextPageUrl!,
        isLoading: true
      }),
    [loadBotsPrevPage.getType()]: (state) =>
      merge(state, {
        currentPageUrl: state.previousPageUrl!,
        isLoading: true
      }),
    [loadBotsSuccess.getType()]: (state, payload: AdiResponse<BotDataFull>) => ({
      bots: payload.result,
      currentPageUrl: state.currentPageUrl,
      nextPageUrl: payload.nextPageUrl || state.nextPageUrl,
      previousPageUrl: payload.previousPageUrl,
      isLoading: false,
      error: null
    }),
    [loadBotsFail.getType()]: (state, error: any) =>
      merge(state, {
        isLoading: false,
        error
      }),
    [saveBot.getType()]: (state, payload: BotData) =>
      merge(state, {
        bots: [payload, ...state.bots],
        isLoading: true
      }),
    [updateBot.getType()]: (state, payload: BotData, meta: UpdateBotMeta) =>
      merge(state, {
        bots: state.bots.map((bot) => {
          if (bot._id === meta.id) {
            return merge(bot, payload)
          }

          return bot
        }),
        isLoading: true
      }),
    [loadBot.getType()]: (state) =>
      merge(state, {
        isLoading: true
      }),
    [loadBotSuccess.getType()]: (state, payload: BotDataFull) =>
      merge(state, {
        bots: uniqBy<BotDataFull, string>(prop('_id'), [payload, ...state.bots]),
        isLoading: false
      })
  },
  initialState
)
