import { PSM, createWorker } from 'tesseract.js';

export const convertToOrc = async (code: string | Buffer): Promise<string> => {
  const worker = await createWorker('eng', 2);

  worker.setParameters({
    tessedit_pageseg_mode: PSM.SPARSE_TEXT,
  });

  const {
    data: { text },
  } = await worker.recognize(code);

  await worker.terminate();

  return text;
};
