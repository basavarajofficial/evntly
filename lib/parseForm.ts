import { IncomingMessage } from 'http';
import formidable from 'formidable';

export interface ParsedForm {
  fields: formidable.Fields;
  files: formidable.Files;
}

export async function parseForm(req: IncomingMessage): Promise<ParsedForm> {
  return new Promise((resolve, reject) => {
    const form = formidable({ multiples: true });

    form.parse(req, (err, fields, files) => {
      if (err) reject(err);
      else resolve({ fields, files });
    });
  });
}
