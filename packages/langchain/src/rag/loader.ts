import { readFileSync, readdirSync, statSync } from 'node:fs';
import { extname, join, resolve } from 'node:path';

export interface Document {
  content: string;
  metadata: {
    source: string;
    type: string;
  };
}

export interface LoaderOptions {
  /** 递归加载子目录 */
  recursive?: boolean;
  /** 支持的文件扩展名 */
  extensions?: string[];
}

const DEFAULT_EXTENSIONS = ['.md', '.txt', '.pdf'];

/**
 * 读取文本文件内容
 */
function readTextFile(filePath: string): string {
  return readFileSync(filePath, 'utf-8');
}

/**
 * 读取 PDF 文件内容
 */
async function readPdfFile(filePath: string): Promise<string> {
  const { default: pdfParse } = await import('pdf-parse');
  const buffer = readFileSync(filePath);
  const data = await pdfParse(buffer);
  return data.text;
}

/**
 * 解析单个文档文件
 */
async function parseFile(filePath: string): Promise<Document | null> {
  const ext = extname(filePath).toLowerCase();

  try {
    switch (ext) {
      case '.md':
      case '.txt': {
        const content = readTextFile(filePath);
        return { content, metadata: { source: filePath, type: ext.slice(1) } };
      }
      case '.pdf': {
        const content = await readPdfFile(filePath);
        return { content, metadata: { source: filePath, type: 'pdf' } };
      }
      default:
        return null;
    }
  } catch (error) {
    console.error(`[Loader] 读取文件失败: ${filePath}`, error);
    return null;
  }
}

/**
 * 扫描目录并返回所有匹配的文件路径
 */
function scanDirectory(
  dirPath: string,
  extensions: string[],
  recursive: boolean
): string[] {
  const files: string[] = [];

  let entries: string[];
  try {
    entries = readdirSync(dirPath);
  } catch (error) {
    console.warn(`[Loader] 无法读取目录: ${dirPath}`, error);
    return files;
  }

  for (const entry of entries) {
    const fullPath = join(dirPath, entry);

    let stat;
    try {
      stat = statSync(fullPath);
    } catch {
      // 跳过无法访问的文件/目录（如断开的符号链接、权限不足等）
      continue;
    }

    if (stat.isDirectory()) {
      if (recursive) {
        files.push(...scanDirectory(fullPath, extensions, recursive));
      }
    } else if (stat.isFile()) {
      const ext = extname(entry).toLowerCase();
      if (extensions.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * 文档加载器
 * 支持加载 .md, .txt, .pdf 文件
 */
export async function loadDocuments(
  inputPath: string,
  options: LoaderOptions = {}
): Promise<Document[]> {
  const { recursive = true, extensions = DEFAULT_EXTENSIONS } = options;
  const resolvedPath = resolve(inputPath);
  const stat = statSync(resolvedPath);

  let filePaths: string[];

  if (stat.isDirectory()) {
    filePaths = scanDirectory(resolvedPath, extensions, recursive);
  } else if (stat.isFile()) {
    filePaths = [resolvedPath];
  } else {
    throw new Error(`无效的路径: ${inputPath}`);
  }

  if (filePaths.length === 0) {
    console.warn('[Loader] 未找到匹配的文档文件');
    return [];
  }

  console.log(`[Loader] 发现 ${filePaths.length} 个文档文件，开始加载...`);

  const results = await Promise.all(filePaths.map(parseFile));
  const documents = results.filter((d): d is Document => d !== null);

  console.log(`[Loader] 成功加载 ${documents.length} 个文档`);
  return documents;
}
