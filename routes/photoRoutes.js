const express = require('express');
const router = express.Router();
const upload = require('../middlewares/multer');
const { uploadPhoto  , fetchPhotos ,fetchPhotoDetails} = require('../controllers/photoController');
const Photo = require("../models/photoModels")



router.post('/upload', upload.single('image'), uploadPhoto);


router.get('/photos', fetchPhotos);
router.get('/photos/:id', async (req, res) => {
    try {
      const photo = await Photo.findById(req.params.id);
      if (!photo) {
        return res.status(404).json({
          success: false,
          message: 'Photo not found',
        });
      }
      res.json({
        success: true,
        data: photo,
      });
    } catch (error) {
      console.error('Error fetching photo:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  });

module.exports = router;
