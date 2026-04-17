import * as vscode from 'vscode'
import { Json2Ts, isJson } from './JsonToTs'

export function activate(context: vscode.ExtensionContext) {
  const restJson2ts = vscode.commands.registerCommand(
    'rest.json2ts',
    async () => {
      const clipboardText = await vscode.env.clipboard.readText()
      const url = isHttpUrl(clipboardText)
        ? clipboardText.trim()
        : await vscode.window.showInputBox({
            prompt: 'Insert your REST-Service URL.',
            placeHolder: 'https://example.com/api/data',
            validateInput: value =>
              value.trim() === '' || isHttpUrl(value)
                ? undefined
                : 'Please enter a valid http or https URL.'
          })

      if (!url || !isHttpUrl(url)) {
        void vscode.window.showErrorMessage('No valid REST-Service URL.')
        return
      }

      await callRestService(url)
    }
  )

  const clipboardJson2ts = vscode.commands.registerCommand(
    'convert.json2ts',
    async () => {
      const content = await vscode.env.clipboard.readText()
      if (!isJson(content)) {
        void vscode.window.showErrorMessage(
          'Clipboard has no valid JSON content.'
        )
        return
      }

      await convert(content)
    }
  )

  context.subscriptions.push(restJson2ts, clipboardJson2ts)
}

async function callRestService(url: string): Promise<void> {
  vscode.window.setStatusBarMessage(`Call ${url}...`, 2000)

  try {
    const response = await fetch(url)
    const body = await response.text()

    if (!response.ok) {
      void vscode.window.showErrorMessage(
        `REST-Service request failed with status ${response.status}.`
      )
      return
    }

    if (!isJson(body)) {
      void vscode.window.showErrorMessage(
        'REST-Service has no valid JSON result.'
      )
      return
    }

    await convert(body)
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown error'
    void vscode.window.showErrorMessage(
      `REST-Service request failed: ${message}`
    )
  }
}

async function convert(content: string): Promise<void> {
  const editor = vscode.window.activeTextEditor
  if (!editor) {
    void vscode.window.showErrorMessage('No active editor found.')
    return
  }

  vscode.window.setStatusBarMessage(
    'Convert JSON to TypeScript interfaces...',
    2000
  )

  const json2ts = new Json2Ts()
  const result = json2ts.convert(content)
  const line = editor.selection.start.line
  const character = editor.document.lineAt(line).text.length
  const position = new vscode.Position(line, character)

  await editor.edit(editBuilder => {
    editBuilder.insert(position, result)
  })

  vscode.window.setStatusBarMessage(
    'Here are your TypeScript interfaces... Enjoy! :)',
    3000
  )
}

function isHttpUrl(value: string): boolean {
  try {
    const url = new URL(value.trim())
    return url.protocol === 'http:' || url.protocol === 'https:'
  } catch {
    return false
  }
}

export function deactivate() {}
