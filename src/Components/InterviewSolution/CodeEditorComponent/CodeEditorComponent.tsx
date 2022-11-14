import React, { FC, useMemo, useRef, useState } from "react";
import Editor, { DiffEditor, useMonaco, loader } from "@monaco-editor/react";

export const CodeEditorComponent: React.FC = React.memo(() => {
    // return <div className="editorWrapper">
    //     <Editor height="90vh" defaultLanguage="typescript" defaultValue="// some comment"/>
    // </div>
    return <Editor height="90vh" defaultLanguage="typescript" defaultValue="// some comment"/> //как вообще фронтендеры верстку делают
})