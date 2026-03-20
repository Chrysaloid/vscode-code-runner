import * as vscode from "vscode";
import { CodeManager } from "./codeManager.js";

export function activate(context: vscode.ExtensionContext) {
	const codeManager = new CodeManager();

	vscode.window.onDidCloseTerminal(() => {
		codeManager.onDidCloseTerminal();
	});

	const run = vscode.commands.registerCommand("code-runner.run", (fileUri: vscode.Uri) => {
		codeManager.run(null, fileUri);
	});

	const runCustomCommand = vscode.commands.registerCommand("code-runner.runCustomCommand", () => {
		codeManager.runCustomCommand();
	});

	const runByLanguage = vscode.commands.registerCommand("code-runner.runByLanguage", () => {
		codeManager.runByLanguage();
	});

	const stop = vscode.commands.registerCommand("code-runner.stop", (printFinalLine: boolean) => {
		codeManager.stop(printFinalLine);
	});

	const stopWait = vscode.commands.registerCommand("code-runner.stopWait", (printFinalLine: boolean) => {
		return codeManager.stop(printFinalLine);
	});

	context.subscriptions.push(run);
	context.subscriptions.push(runCustomCommand);
	context.subscriptions.push(runByLanguage);
	context.subscriptions.push(stop);
	context.subscriptions.push(stopWait);
	context.subscriptions.push(codeManager);
}

export function deactivate() {
}
