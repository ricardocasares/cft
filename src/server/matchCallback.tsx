import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router'
import { configureStore } from '../store/store'

// Components
import { App } from '../containers/App/App'
import { Html } from '../containers/Html/Html'

// Static
import manifest from '../../build/manifest.json'

interface MatchCallbackResult {
  code: 301 | 200
  message: string
}

interface RouterContext {
  url?: string
}

export const matchCallback = async (url: string): Promise<MatchCallbackResult> => {
  const context: RouterContext = {}
  const markup = ReactDOMServer.renderToString(
    <StaticRouter location={ url } context={ context }>
      <App />
    </StaticRouter>
  )

  if (context.url) {
    return {
      code: 301,
      message: context.url
    }
  } else {
    return {
      code: 200,
      message: renderHTML(markup, configureStore())
    }
  }
}

function renderHTML (markup: string, store: any): string {
  const html = ReactDOMServer.renderToString(
    <Html markup={ markup } manifest={ manifest } store={ store } />
  )

  return `<!doctype html> ${html}`
}