interface IResGetNotebookConf {
  box: string;
  conf: NotebookConf;
  name: string;
}

interface IReslsNotebooks {
  notebooks: Notebook[];
}

interface IResUpload {
  errFiles: string[];
  succMap: { [key: string]: string };
}

interface IResdoOperations {
  doOperations: doOperation[];
  undoOperations: doOperation[] | null;
}

interface IResGetBlockKramdown {
  id: BlockId;
  kramdown: string;
}

interface IResGetChildBlock {
  id: BlockId;
  type: BlockType;
  subtype?: BlockSubType;
}

interface IResGetTemplates {
  content: string;
  path: string;
}

interface IResReadDir {
  isDir: boolean;
  isSymlink: boolean;
  name: string;
}

interface IResExportMdContent {
  hPath: string;
  content: string;
}

interface IResBootProgress {
  progress: number;
  details: string;
}

interface IResForwardProxy {
  body: string;
  contentType: string;
  elapsed: number;
  headers: { [key: string]: string };
  status: number;
  url: string;
}

interface IResExportResources {
  path: string;
}

interface IResGetDocInfo {
  id: string;
  rootId: string;
  name: string;
  refCount: number;
  subFileCount: number;
  refIDs: string[];
  icon: string;
}

interface IResDocPath {
  notebook: string;
  path: string;
}

interface IResDocsByPath {
  box: string;
  files: IResDocFileInfo[];
  path: string;
}

interface IResDocFileInfo {
  alias: string;
  bookmark: string;
  count: number;
  ctime: number;
  dueFlashcardCount: number;
  flashcardCount: number;
  hCtime: string;
  hMtime: string;
  hSize: string;
  hidden: boolean;
  icon: string;
  id: string;
  memo: string;
  mtime: number;
  name: string;
  name1: string;
  newFlashcardCount: number;
  path: string;
  size: number;
  sort: number;
  subFileCount: number;
}
