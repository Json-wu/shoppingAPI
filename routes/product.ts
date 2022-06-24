import { importData } from '../service/product';
import { Handler } from '../middleware/type';

export const importPro: Handler = async (req, res) => {
  let data = await importData(req);
  if (data.code) {
    res.status(500).send('导入失败');
  } else {
    res.status(201).send('导入成功');
  }
};