declare module 'pdf-parse' {
  interface PDFData {
    text: string;
    numpages: number;
    numrender: number;
    info: Record<string, unknown>;
    metadata: Record<string, unknown>;
    version: string;
  }

  function pdfParse(
    dataBuffer: Buffer,
    options?: Record<string, unknown>
  ): Promise<PDFData>;

  export default pdfParse;
}
