
const Photo = require('../models/photoModels');
const path = require('path');

const uploadPhoto = async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: 'No file uploaded',
        });
      }
  
      const newPhoto = new Photo({
        title: req.body.title,
        description: req.body.description,
        url: req.file.filename // Store only the filename
      });
  
      await newPhoto.save();
      res.json({
        success: true,
        data: newPhoto,
      });
    } catch (error) {
      console.error('Error uploading photo:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };
  
  



const fetchPhotos = async (req, res) => {
    try {
      const photos = await Photo.find();
      const formattedPhotos = photos.map(photo => ({
        ...photo._doc,
        url: `/uploads/${photo.url.split('\\').pop()}` 
      }));
      res.json({
        success: true,
        data: formattedPhotos,
      });
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(500).json({
        success: false,
        message: 'Server error',
      });
    }
  };
  
const getPhotosByUser = async (req, res) => {
    try {
      const userId = req.user.id; 
      const photos = await Photo.find({ userId });
      res.status(200).json({ success: true, data: photos });
    } catch (error) {
      console.error('Error fetching photos:', error);
      res.status(400).json({ success: false, message: 'Error fetching photos' });
    }
  };

module.exports = {
  uploadPhoto,
  fetchPhotos,
  getPhotosByUser
};
