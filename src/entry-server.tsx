import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import Router from './router';
import Nav from './components/Nav';
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <Nav />
        <Router />
      </StaticRouter>
    </StrictMode>,
  )
  return { html }
}