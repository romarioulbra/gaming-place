declare module "formidable" {
  interface File {
    filepath: string;
    originalFilename?: string;
    mimetype?: string;
    size: number;
  }

  interface Files {
    [key: string]: File;
  }
}
