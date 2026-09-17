import { OPEN_SEARCH_MESSAGE } from '../platform/messages'

async function openSearch (tab) {
  if (!tab?.id) return
  try {
    await chrome.tabs.sendMessage(tab.id, { type: OPEN_SEARCH_MESSAGE })
  } catch {
    // Chrome internal pages and pages without the content script cannot receive
    // extension messages. Clicking the action there should remain harmless.
  }
}

chrome.action.onClicked.addListener(openSearch)

chrome.commands.onCommand.addListener(async command => {
  if (command !== 'open-fast-search') return
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true })
  await openSearch(tab)
})
