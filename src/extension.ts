// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import { BrightBaseRealtime, initBrightBase } from 'bsdweb'
import * as vscode from 'vscode'

// This method is called when your extension is activated
// Your extension is activated the very first time the command is executed

initBrightBase(
  'https://ybpjdhzaqaogrojgsjxh.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlicGpkaHphcWFvZ3JvamdzanhoIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNzMyOTYsImV4cCI6MjAyMTk0OTI5Nn0.CWTPdwYlV1g6Zif2dKRfVJHK8xwxNhS8gb9Sg3EY4Dg'
)

type Events = {
  'send-files': {
    files: { path: string; content: string }[]
  }
}

const realtime = new BrightBaseRealtime<Events>('chrome-gpt-fire')

export function activate(context: vscode.ExtensionContext) {
  console.log('Chrome Voice GPT Extension is now active!')

  const disposable = vscode.commands.registerCommand('chrome-gpt-fire.sendOpenFiles', () => {
    const openEditors = vscode.window.visibleTextEditors

    // Extract file paths and contents
    const files = openEditors.map((editor) => ({
      path: editor.document.uri.fsPath,
      content: editor.document.getText(),
    }))

    console.log(files)

    realtime.emit('send-files', { files })

    vscode.window.showInformationMessage('Sending files to Chrome Voice GPT Extension')
  })

  context.subscriptions.push(disposable)
}

// This method is called when your extension is deactivated
export function deactivate() {}
