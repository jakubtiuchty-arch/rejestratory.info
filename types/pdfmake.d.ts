declare module 'pdfmake/build/pdfmake' {
  const pdfMake: {
    vfs: Record<string, string>;
    createPdf: (docDefinition: unknown) => {
      download: (filename?: string) => void;
      open: () => void;
      print: () => void;
      getBlob: (callback: (blob: Blob) => void) => void;
      getBase64: (callback: (data: string) => void) => void;
    };
  };
  export default pdfMake;
}

declare module 'pdfmake/build/vfs_fonts' {
  const pdfFonts: {
    pdfMake?: {
      vfs: Record<string, string>;
    };
    vfs?: Record<string, string>;
  };
  export default pdfFonts;
}
