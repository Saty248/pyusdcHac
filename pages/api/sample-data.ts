import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import { promises as fs } from 'fs';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const jsonFilePath = path.resolve('./public/sample-auction-datas.json');
  try {
    const data = await fs.readFile(jsonFilePath, 'utf8');
    const jsonData = JSON.parse(data);
    res.status(200).json({data: jsonData});
  } catch (error) {
    res.status(500).json({ error: 'Failed to load data' });
  }
};
