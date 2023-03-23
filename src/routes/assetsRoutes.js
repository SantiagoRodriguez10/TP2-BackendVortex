import {Router} from "express"
import { methods as assetsController } from "./../controllers/assetsController";

const router = Router();

router.get('/get', assetsController.getAssets);
router.get('/get/:assets_id', assetsController.getAssetsById);
router.get('/pag', assetsController.getPaginatedAssets);
router.get('/employees/:employee_id/assets', assetsController.getAssetsByEmployeeId)
router.get('/filter', assetsController.getFilterAsset)
router.post('/add', assetsController.addAsset);
router.put('/update/:assets_id', assetsController.updateAsset)
router.delete('/delete/:assets_id', assetsController.deleteAsset)


export default router