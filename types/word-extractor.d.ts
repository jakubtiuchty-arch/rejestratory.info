declare module 'word-extractor' {
  interface ExtractedDocument {
    getBody(): string;
    getHeaders(): { [key: string]: string };
    getFooters(): { [key: string]: string };
    getFootnotes(): string;
    getEndnotes(): string;
    getAnnotations(): string[];
  }

  class WordExtractor {
    extract(input: Buffer | string): Promise<ExtractedDocument>;
  }

  export = WordExtractor;
}
